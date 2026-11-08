import { useState, useCallback, useRef } from 'react';
import { getQuizKana } from '@/data/gojuon';
import { trackQuizAnswer } from '@/lib/tracking';
import {
  loadProgress,
  recordKanaResult,
  sampleWeighted,
  type ProgressMap,
} from '@/lib/progress';
import {
  KanaType,
  TestState,
  Question,
  QuizType,
  ChoiceQuestion,
  DictationQuestion,
  MatchingQuestion,
  SpellingQuestion
} from '../types';

/** 每轮题目数量（结果页与配置页都以此为准） */
export const TOTAL_QUESTIONS = 10;

// Fisher-Yates 洗牌算法
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 生成随机选项（去重；不足以凑满时返回已有选项，不无限循环）
const generateOptions = (
  correctAnswer: string,
  allPossibleAnswers: string[],
  count: number = 4
) => {
  const uniqueCandidates = [
    ...new Set(allPossibleAnswers.filter((answer) => answer !== correctAnswer)),
  ];
  const distractors = shuffle(uniqueCandidates).slice(0, Math.max(0, count - 1));
  return shuffle([correctAnswer, ...distractors]);
};

// 生成问题：取池统一走 src/data/gojuon.ts 的 getQuizKana
// SRS 加权抽题：答错过的优先、没见过的次之、已掌握的只做少量复习（替代纯随机 slice）
const generateQuestions = (kanaType: KanaType, quizType: QuizType): Question[] => {
  const availableKana = getQuizKana(kanaType);
  const selectedKana = sampleWeighted(availableKana, TOTAL_QUESTIONS);

  switch (quizType) {
    case 'choice':
      return selectedKana.map((kana, index): ChoiceQuestion => {
        const questionType: 'kanaToRomaji' | 'romajiToKana' = Math.random() > 0.5 ? 'kanaToRomaji' : 'romajiToKana';

        return {
          id: index,
          type: questionType,
          kana: kana.kana,
          romaji: kana.romaji,
          aliases: kana.aliases,
          hiragana: kana.hiragana,
          options: generateOptions(
            questionType === 'kanaToRomaji' ? kana.romaji : kana.kana,
            questionType === 'kanaToRomaji'
              ? availableKana.map(k => k.romaji)
              : availableKana.map(k => k.kana)
          )
        };
      });

    case 'dictation':
      return selectedKana.map((kana, index): DictationQuestion => ({
        id: index,
        type: 'dictation',
        kana: kana.kana,
        romaji: kana.romaji,
        aliases: kana.aliases,
        hiragana: kana.hiragana,
        options: generateOptions(
          kana.kana,
          availableKana.map(k => k.kana)
        )
      }));

    case 'matching':
      return selectedKana.map((kana, index): MatchingQuestion => ({
        id: index,
        type: 'matching',
        kana: kana.kana,
        romaji: kana.romaji,
        aliases: kana.aliases,
        hiragana: kana.hiragana,
        isFlipped: false,
        isMatched: false
      }));

    case 'spelling':
      return selectedKana.map((kana, index): SpellingQuestion => ({
        id: index,
        type: 'spelling',
        kana: kana.kana,
        romaji: kana.romaji,
        aliases: kana.aliases,
        hiragana: kana.hiragana
      }));

    default:
      return [];
  }
};

// 判断当前题目的答案
const isAnswerCorrect = (question: Question, answer: string): boolean => {
  if (question.type === 'kanaToRomaji') {
    return answer.trim().toLowerCase() === question.romaji.toLowerCase();
  }
  return answer === question.kana;
};

export const useQuiz = () => {
  const [state, setState] = useState<TestState>({
    isStarted: false,
    questions: [],
    currentQuestionIndex: 0,
    timeRemaining: 0,
    score: 0,
    wrongAnswers: [],
    isComplete: false,
    quizType: 'choice',
    kanaType: 'hiragana'
  });

  /**
   * 本地进度（SRS）的内存副本，供 UI 刷新。
   * 真正的持久化由 recordKanaResult() 写入 localStorage，这里只镜像返回值。
   * 注意：初始值在客户端组件里读取（QuizPanel 走 dynamic ssr:false）。
   */
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());

  /** 同一道题只允许记录一次进度（防双击/连按；StrictMode 下也不会重复写入） */
  const recordedIdsRef = useRef<Set<string | number>>(new Set<string | number>());

  /** 从 localStorage 重新读取进度（回到配置页 / 结果页时用） */
  const refreshProgress = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  // 添加设置分数的方法
  const setScore = useCallback((newScore: number) => {
    setState(prev => ({
      ...prev,
      score: newScore
    }));
  }, []);

  // 添加设置当前问题索引的方法
  const setCurrentQuestionIndex = useCallback((newIndex: number) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: newIndex,
      isComplete: newIndex >= prev.questions.length
    }));
  }, []);

  // 开始新测试
  const startTest = useCallback((kanaType: KanaType, quizType: QuizType) => {
    const questions = generateQuestions(kanaType, quizType);
    recordedIdsRef.current = new Set<string | number>();

    setState({
      isStarted: true,
      questions,
      currentQuestionIndex: 0,
      timeRemaining: 0,
      score: 0,
      wrongAnswers: [],
      isComplete: false,
      quizType,
      kanaType
    });
  }, []);

  /**
   * 提交答案：只记录答案与对错，不推进题目。
   * 写入 questions / wrongAnswers 的都是带 userAnswer 的**新对象**。
   * 用户点 Next（或按 Enter）时才调用 nextQuestion()。
   */
  const submitAnswer = useCallback((answer: string): boolean => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return false;

    // 同一题重复提交（双击/连按）直接返回首次结果，不重复计分
    if (currentQuestion.userAnswer !== undefined) {
      return currentQuestion.isCorrect ?? false;
    }

    const correct = isAnswerCorrect(currentQuestion, answer);
    const answeredQuestion: Question = {
      ...currentQuestion,
      userAnswer: answer,
      isCorrect: correct,
    };

    // SRS：把这一题的对错写进进度（以平假名为 key，片假名共用统计）
    if (currentQuestion.hiragana && !recordedIdsRef.current.has(currentQuestion.id)) {
      recordedIdsRef.current.add(currentQuestion.id);
      setProgress(recordKanaResult(currentQuestion.hiragana, correct));
    }

    trackQuizAnswer(state.kanaType, state.quizType, correct);

    setState(prev => {
      const question = prev.questions[prev.currentQuestionIndex];
      if (!question || question.userAnswer !== undefined) return prev;

      const newQuestions = [...prev.questions];
      newQuestions[prev.currentQuestionIndex] = {
        ...question,
        userAnswer: answer,
        isCorrect: correct,
      };

      return {
        ...prev,
        questions: newQuestions,
        score: correct ? prev.score + 10 : prev.score,
        wrongAnswers: correct ? prev.wrongAnswers : [...prev.wrongAnswers, answeredQuestion],
      };
    });

    return correct;
  }, [state.currentQuestionIndex, state.questions, state.kanaType, state.quizType]);

  // 进入下一题（未作答时不允许跳过）
  const nextQuestion = useCallback(() => {
    setState(prev => {
      const currentQuestion = prev.questions[prev.currentQuestionIndex];
      if (!currentQuestion) return prev;
      if (currentQuestion.userAnswer === undefined) return prev;

      const nextIndex = prev.currentQuestionIndex + 1;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        isComplete: nextIndex >= prev.questions.length,
      };
    });
  }, []);

  // 获取当前问题
  const getCurrentQuestion = useCallback((): Question | undefined => {
    return state.questions[state.currentQuestionIndex];
  }, [state.currentQuestionIndex, state.questions]);

  return {
    ...state,
    startTest,
    submitAnswer,
    nextQuestion,
    getCurrentQuestion,
    setScore,           // 暴露设置分数的方法
    setCurrentQuestionIndex,  // 暴露设置当前问题索引的方法
    progress,           // SRS 进度内存副本（recordKanaResult 的返回值）
    refreshProgress     // 从 localStorage 重新读取进度
  };
};
