// 难度等级
export type Difficulty = 'easy' | 'middle' | 'hard';

// 测验类型（UI 显示用）
export type QuizType = 'choice' | 'matching' | 'dictation' | 'spelling';

// 问题类型（针对选择题）
export type QuestionType = 'kanaToRomaji' | 'romajiToKana' | 'dictation' | 'matching' | 'spelling';

// 假名类型
export type KanaType = 'hiragana' | 'katakana' | 'mixed' | 'special' | 'all';

// 基础问题接口
export interface BaseQuestion {
  id: string | number;
  kana: string;
  romaji: string;
  /**
   * 稳定进度 key：始终是**平假名**（片假名 / 混合题共用同一份掌握度）。
   * 由 getQuizKana() 的 QuizKana.hiragana 提供，用于 recordKanaResult / 加权出题。
   * 可选项：只由 useQuiz 生成的题目保证有值，题型子组件可自行补齐。
   */
  hiragana: string;
  /** 其他可接受的拼写（如 ぢ 的 di） */
  aliases?: string[];
  userAnswer?: string;
  /** 判分结果，供结果页复用，避免重复比较 */
  isCorrect?: boolean;
}

// 选择题问题接口
export interface ChoiceQuestion extends BaseQuestion {
  type: 'kanaToRomaji' | 'romajiToKana';
  options: string[];
}

// 听写题问题接口
export interface DictationQuestion extends BaseQuestion {
  type: 'dictation';
  options: string[];
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
  /** 课程单元按行出题时传入（a,ka,sa…）；空 = 整池 */
  rows?: string[];
}
