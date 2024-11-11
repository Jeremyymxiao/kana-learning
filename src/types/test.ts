export type Difficulty = 'easy' | 'middle' | 'hard';

export type QuestionType = 'kanaToRomaji' | 'romajiToKana' | 'matching';

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  content: string;
  options?: string[];  // 用于匹配题
  correctAnswer: string | string[];  // string用于单选，string[]用于匹配题
  userAnswer?: string | string[];
}

export interface TestResult {
  date: string;
  difficulty: Difficulty;
  score: number;
  timeSpent: number;
  wrongQuestions: Question[];
}

export interface TestState {
  isStarted: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  score: number;
}