export type Difficulty = 'easy' | 'middle' | 'hard';

export type QuestionType = 'kanaToRomaji' | 'romajiToKana' | 'matching' | 'dictation';

export type KanaType = 'hiragana' | 'katakana' | 'mixed' | 'special';

export interface Question {
  id: string | number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
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
  wrongAnswers: Question[];
  isComplete: boolean;
} 