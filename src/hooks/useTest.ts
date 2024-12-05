import { useState, useCallback } from 'react';
import { gojuonData } from '@/data/gojuon';

export type KanaType = 'hiragana' | 'katakana' | 'mixed' | 'special';
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
      addSeion();
      return kanaChars;
    case 'katakana':
      addSeion();
      return kanaChars;
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
  const startTest = useCallback((kanaType: KanaType) => {
    const availableKana = getAvailableKana(kanaType);
    
    // 随机选择10个不重复的假名
    const shuffledKana = [...availableKana].sort(() => Math.random() - 0.5);
    const selectedKana = shuffledKana.slice(0, 10);
    
    // 生成10个问题
    const questions: Question[] = selectedKana.map((randomKana, i) => {
      // 随机决定题目类型
      const questionType: QuestionType = Math.random() > 0.5 ? 'kanaToRomaji' : 'romajiToKana';
      
      // 根据假名类型选择显示的字符
      const getKanaChar = () => {
        switch (kanaType) {
          case 'hiragana':
            return randomKana.hiragana;
          case 'katakana':
            return randomKana.katakana;
          case 'mixed':
            return Math.random() > 0.5 ? randomKana.hiragana : randomKana.katakana;
          case 'special':
            return Math.random() > 0.5 ? randomKana.hiragana : randomKana.katakana;
          default:
            return randomKana.hiragana;
        }
      };

      const question: Question = {
        id: i,
        type: questionType,
        question: questionType === 'kanaToRomaji' ? getKanaChar() : randomKana.romaji,
        correctAnswer: questionType === 'kanaToRomaji' ? randomKana.romaji : getKanaChar(),
        options: []
      };

      const allPossibleAnswers = questionType === 'kanaToRomaji' ?
        availableKana.map(k => k.romaji) :
        availableKana.map(k => {
          switch (kanaType) {
            case 'hiragana':
              return k.hiragana;
            case 'katakana':
              return k.katakana;
            case 'mixed':
            case 'special':
              return Math.random() > 0.5 ? k.hiragana : k.katakana;
            default:
              return k.hiragana;
          }
        });

      question.options = generateOptions(question.correctAnswer, allPossibleAnswers);
      return question;
    });

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