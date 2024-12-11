// 难度等级
export type Difficulty = 'easy' | 'middle' | 'hard';

// 测验类型（UI 显示用）
export type QuizType = 'choice' | 'matching' | 'dictation' | 'spelling';

// 问题类型（针对选择题）
export type QuestionType = 'kanaToRomaji' | 'romajiToKana' | 'dictation' | 'matching' | 'spelling';

// 假名类型
export type KanaType = 'hiragana' | 'katakana' | 'mixed' | 'special';

// 基础问题接口
export interface BaseQuestion {
  id: string | number;
  kana: string;
  romaji: string;
  userAnswer?: string;
}

// 选择题问题接口
export interface ChoiceQuestion extends BaseQuestion {
  type: 'kanaToRomaji' | 'romajiToKana';
  options: string[];
}

// 听写题问题接口
export interface DictationQuestion extends BaseQuestion {
  type: 'dictation';
}

// 匹配题问题接口
export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  isFlipped: boolean;
  isMatched: boolean;
}

// 拼写题问题接口
export interface SpellingQuestion extends BaseQuestion {
  type: 'spelling';
}

// 联合类型：所有问题类型
export type Question = ChoiceQuestion | DictationQuestion | MatchingQuestion | SpellingQuestion;

// 测试结果接口
export interface TestResult {
  date: string;
  difficulty: Difficulty;
  quizType: QuizType;
  score: number;
  timeSpent: number;
  wrongQuestions: Question[];
}

// 测试状态接口
export interface TestState {
  isStarted: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  score: number;
  wrongAnswers: Question[];
  isComplete: boolean;
  quizType: QuizType;
  kanaType: KanaType;
}