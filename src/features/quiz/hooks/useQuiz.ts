import { useState, useCallback } from 'react';
import { gojuonData } from '@/data/gojuon';
import { 
  KanaType, 
  QuestionType, 
  TestState, 
  Question,
  QuizType,
  ChoiceQuestion,
  DictationQuestion,
  MatchingQuestion,
  SpellingQuestion
} from '../types';

// 根据假名类型获取可用的假名字符
const getAvailableKana = (kanaType: KanaType) => {
  const kanaChars: Array<{ hiragana: string; katakana: string; romaji: string }> = [];

  // 收集清音
  const addSeion = () => {
    kanaChars.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => kanaChars.push(...row));
  };

  // 收集浊音和拗音
  const addSpecial = () => {
    gojuonData.dakuon.consonants.forEach(row => kanaChars.push(...row));
    gojuonData.youon.combinations.forEach(row => kanaChars.push(...row));
  };

  switch (kanaType) {
    case 'hiragana':
    case 'katakana':
    case 'mixed':
      addSeion();
      return kanaChars;
    case 'special':
      addSpecial();
      return kanaChars;
    default:
      return kanaChars;
  }
};

// 生成随机选项
const generateOptions = (
  correctAnswer: string,
  allPossibleAnswers: string[],
  count: number = 4
) => {
  const options = new Set([correctAnswer]);
  
  while (options.size < count) {
    const randomAnswer = allPossibleAnswers[Math.floor(Math.random() * allPossibleAnswers.length)];
    if (randomAnswer !== correctAnswer) {
      options.add(randomAnswer);
    }
  }
  
  return shuffle([...options]);
};

// Fisher-Yates 洗牌算法
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// 生成问题
const generateQuestions = (kanaType: KanaType, quizType: QuizType): Question[] => {
  const availableKana = getAvailableKana(kanaType);
  const shuffledKana = shuffle(availableKana);
  const selectedKana = shuffledKana.slice(0, 10);

  switch (quizType) {
    case 'choice':
      return selectedKana.map((kana, index): ChoiceQuestion => {
        const questionType: 'kanaToRomaji' | 'romajiToKana' = Math.random() > 0.5 ? 'kanaToRomaji' : 'romajiToKana';
        const kanaChar = kanaType === 'katakana' ? kana.katakana : kana.hiragana;
        
        return {
          id: index,
          type: questionType,
          kana: kanaChar,
          romaji: kana.romaji,
          options: generateOptions(
            questionType === 'kanaToRomaji' ? kana.romaji : kanaChar,
            questionType === 'kanaToRomaji' 
              ? availableKana.map(k => k.romaji)
              : availableKana.map(k => kanaType === 'katakana' ? k.katakana : k.hiragana)
          )
        };
      });

    case 'dictation':
      return selectedKana.map((kana, index): DictationQuestion => ({
        id: index,
        type: 'dictation',
        kana: kanaType === 'katakana' ? kana.katakana : kana.hiragana,
        romaji: kana.romaji
      }));

    case 'matching':
      return selectedKana.map((kana, index): MatchingQuestion => ({
        id: index,
        type: 'matching',
        kana: kanaType === 'katakana' ? kana.katakana : kana.hiragana,
        romaji: kana.romaji,
        isFlipped: false,
        isMatched: false
      }));

    case 'spelling':
      return selectedKana.map((kana, index): SpellingQuestion => ({
        id: index,
        type: 'spelling',
        kana: kanaType === 'katakana' ? kana.katakana : kana.hiragana,
        romaji: kana.romaji
      }));

    default:
      return [];
  }
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

  // 开始新测试
  const startTest = useCallback((kanaType: KanaType, quizType: QuizType) => {
    const questions = generateQuestions(kanaType, quizType);
    
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

  // 提交答案
  const submitAnswer = useCallback((answer: string) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = answer.toLowerCase() === currentQuestion.romaji.toLowerCase();

    setState(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[prev.currentQuestionIndex] = {
        ...currentQuestion,
        userAnswer: answer
      };

      const newWrongAnswers = isCorrect 
        ? prev.wrongAnswers 
        : [...prev.wrongAnswers, currentQuestion];

      return {
        ...prev,
        questions: newQuestions,
        score: isCorrect ? prev.score + 10 : prev.score,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        wrongAnswers: newWrongAnswers,
        isComplete: prev.currentQuestionIndex === prev.questions.length - 1
      };
    });

    return isCorrect;
  }, [state.currentQuestionIndex, state.questions]);

  // 获取当前问题
  const getCurrentQuestion = useCallback(() => {
    return state.questions[state.currentQuestionIndex];
  }, [state.currentQuestionIndex, state.questions]);

  return {
    ...state,
    startTest,
    submitAnswer,
    getCurrentQuestion,
  };
};