import { useState, useCallback } from 'react';
import { gojuonData } from '@/data/gojuon';

export type Difficulty = 'easy' | 'middle' | 'hard';
export type QuestionType = 'kanaToRomaji' | 'romajiToKana';

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  options: string[];
  type: QuestionType;
  userAnswer?: string;
}

interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  wrongAnswers: Question[];
  isComplete: boolean;
}

// 根据难度获取可用的假名字符
const getAvailableKana = (difficulty: Difficulty) => {
  const kanaChars: Array<{ hiragana: string; katakana: string; romaji: string }> = [];

  // 收集清音
  const addSeion = () => {
    kanaChars.push(...gojuonData.seion.vowels);
    gojuonData.seion.consonants.forEach(row => kanaChars.push(...row));
  };

  // 添加片假名
  const addKatakana = (chars: typeof kanaChars) => {
    return chars.map(char => ({ ...char }));
  };

  // 收集浊音和拗音
  const addDakuonAndYouon = () => {
    gojuonData.dakuon.consonants.forEach(row => kanaChars.push(...row));
    gojuonData.youon.combinations.forEach(row => kanaChars.push(...row));
  };

  // 根据难度级别选择字符
  switch (difficulty) {
    case 'easy':
      addSeion();
      return kanaChars;
    case 'middle':
      addSeion();
      return [...kanaChars, ...addKatakana(kanaChars)];
    case 'hard':
      addSeion();
      addDakuonAndYouon();
      return [...kanaChars, ...addKatakana(kanaChars)];
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
const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useTest = () => {
  const [state, setState] = useState<TestState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    wrongAnswers: [],
    isComplete: false,
  });

  // 开始新测试
  const startTest = useCallback((difficulty: Difficulty) => {
    const availableKana = getAvailableKana(difficulty);
    const questions: Question[] = [];
  
    // 生成10个问题
    for (let i = 0; i < 10; i++) {
      const randomKana = availableKana[Math.floor(Math.random() * availableKana.length)];
      // 随机决定题目类型
      const questionType: QuestionType = Math.random() > 0.5 ? 'kanaToRomaji' : 'romajiToKana';
      
      const question: Question = {
        id: i,
        type: questionType,
        question: questionType === 'kanaToRomaji' ? 
          (difficulty === 'easy' ? randomKana.hiragana : Math.random() > 0.5 ? randomKana.hiragana : randomKana.katakana) :
          randomKana.romaji,
        correctAnswer: questionType === 'kanaToRomaji' ? 
          randomKana.romaji :
          (difficulty === 'easy' ? randomKana.hiragana : Math.random() > 0.5 ? randomKana.hiragana : randomKana.katakana),
        options: []
      };
  
      const allPossibleAnswers = questionType === 'kanaToRomaji' ?
        availableKana.map(k => k.romaji) :
        availableKana.map(k => difficulty === 'easy' ? k.hiragana : Math.random() > 0.5 ? k.hiragana : k.katakana);
  
      question.options = generateOptions(question.correctAnswer, allPossibleAnswers);
      questions.push(question);
    }
  
    setState({
      questions: shuffle(questions),
      currentQuestionIndex: 0,
      score: 0,
      wrongAnswers: [],
      isComplete: false,
    });
  }, []);

  // 提交答案
  const submitAnswer = useCallback((answer: string) => {
    setState(prevState => {
      const currentQuestion = prevState.questions[prevState.currentQuestionIndex];
      const isCorrect = currentQuestion.correctAnswer === answer;
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[prevState.currentQuestionIndex] = {
        ...currentQuestion,
        userAnswer: answer
      };

      return {
        ...prevState,
        questions: updatedQuestions,
        score: isCorrect ? prevState.score + 10 : prevState.score,
        wrongAnswers: isCorrect 
          ? prevState.wrongAnswers 
          : [...prevState.wrongAnswers, { ...currentQuestion, userAnswer: answer }],
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        isComplete: prevState.currentQuestionIndex === 9
      };
    });
  }, []);

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