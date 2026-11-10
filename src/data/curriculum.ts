import type { KanaType, QuizType } from '@/features/quiz/types';

/**
 * 课程路径数据（`/course` 的唯一数据源）。
 *
 * 设计约束（与 reports/p3-curriculum-schema.md 对齐）：
 * - 只存 id，不存任何人类可读文案；文案走 `Course.*` i18n 键。
 * - `Unit.kana` 是**平假名**，逐字取自 `src/data/gojuon.ts`，作为进度/掌握度统计的 key
 *   （`src/lib/progress.ts` 规定：片假名与平假名共用同一份掌握度）。
 * - 促音 っ/ッ 不是独立音节（`isStandalone: false`），不进入 `Unit.kana`。
 * - ぢ/づ 与 じ/ず 同音，`gojuon.ts` 标记 `quizExcluded: true`，永远不会被出到题，
 *   因此也不进入 `Unit.kana`（否则该单元的 mastered/total 永远到不了 100%）。
 * - 课时 id 遵循契约：`uX-chart`、`uX-quiz-<type>`、`u6-article-sokuon`、`u7-article-loanwords`。
 */

export type LessonKind = 'chart' | 'quiz' | 'article';

export interface Lesson {
  /** 稳定 id，同时作为 i18n key：Course.lessons.<id>.title / .desc */
  id: string;
  kind: LessonKind;
  /** quiz 课的预设 */
  quiz?: { kanaType: KanaType; rows?: string[]; quizType: QuizType };
  /** article 课的 slug（public/articles/{slug}.md） */
  articleSlug?: string;
}

export interface Unit {
  id: string;              // 'u1' … 'u7'
  order: number;           // 1…7
  /** 该单元覆盖的假名（平假名，用于进度/掌握度统计） */
  kana: string[];
  lessons: Lesson[];
}

export const curriculum: Unit[] = [
  // ── u1 清音①：あ行・か行・さ行（15） ─────────────────────────────
  {
    id: 'u1',
    order: 1,
    kana: ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ'],
    lessons: [
      { id: 'u1-chart', kind: 'chart' },
      {
        id: 'u1-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['a', 'ka', 'sa'], quizType: 'choice' },
      },
      {
        id: 'u1-quiz-matching',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['a', 'ka', 'sa'], quizType: 'matching' },
      },
    ],
  },

  // ── u2 清音②：た行・な行・は行（15） ─────────────────────────────
  {
    id: 'u2',
    order: 2,
    kana: ['た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
    lessons: [
      { id: 'u2-chart', kind: 'chart' },
      {
        id: 'u2-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['ta', 'na', 'ha'], quizType: 'choice' },
      },
      {
        id: 'u2-quiz-dictation',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['ta', 'na', 'ha'], quizType: 'dictation' },
      },
    ],
  },

  // ── u3 清音③：ま行・や行・ら行・わ行・ん（16） ─────────────────────
  {
    id: 'u3',
    order: 3,
    kana: ['ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'],
    lessons: [
      { id: 'u3-chart', kind: 'chart' },
      {
        id: 'u3-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['ma', 'ya', 'ra', 'wa', 'n'], quizType: 'choice' },
      },
      {
        id: 'u3-quiz-spelling',
        kind: 'quiz',
        quiz: { kanaType: 'hiragana', rows: ['ma', 'ya', 'ra', 'wa', 'n'], quizType: 'spelling' },
      },
    ],
  },

  // ── u4 浊音・半浊音：が〜ぽ（23，排除同音的 ぢ/づ） ──────────────────
  {
    id: 'u4',
    order: 4,
    kana: [
      'が', 'ぎ', 'ぐ', 'げ', 'ご',
      'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
      'だ', 'で', 'ど',
      'ば', 'び', 'ぶ', 'べ', 'ぼ',
      'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
    ],
    lessons: [
      { id: 'u4-chart', kind: 'chart' },
      {
        id: 'u4-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'special', rows: ['ga', 'za', 'da', 'ba', 'pa'], quizType: 'choice' },
      },
      {
        id: 'u4-quiz-matching',
        kind: 'quiz',
        quiz: { kanaType: 'special', rows: ['ga', 'za', 'da', 'ba', 'pa'], quizType: 'matching' },
      },
    ],
  },

  // ── u5 拗音：きゃ〜ぴょ（33） ────────────────────────────────────
  {
    id: 'u5',
    order: 5,
    kana: [
      'きゃ', 'きゅ', 'きょ',
      'しゃ', 'しゅ', 'しょ',
      'ちゃ', 'ちゅ', 'ちょ',
      'にゃ', 'にゅ', 'にょ',
      'ひゃ', 'ひゅ', 'ひょ',
      'みゃ', 'みゅ', 'みょ',
      'りゃ', 'りゅ', 'りょ',
      'ぎゃ', 'ぎゅ', 'ぎょ',
      'じゃ', 'じゅ', 'じょ',
      'びゃ', 'びゅ', 'びょ',
      'ぴゃ', 'ぴゅ', 'ぴょ',
    ],
    lessons: [
      { id: 'u5-chart', kind: 'chart' },
      {
        id: 'u5-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'special', rows: ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'bya', 'pya'], quizType: 'choice' },
      },
      {
        id: 'u5-quiz-dictation',
        kind: 'quiz',
        quiz: { kanaType: 'special', rows: ['kya', 'sha', 'cha', 'nya', 'hya', 'mya', 'rya', 'gya', 'ja', 'bya', 'pya'], quizType: 'dictation' },
      },
    ],
  },

  // ── u6 特殊拍：っ・ー・ん ────────────────────────────────────────
  // っ / ー 没有独立音节，不能进 kana；可统计的只有 ん。
  {
    id: 'u6',
    order: 6,
    kana: ['ん'],
    lessons: [
      { id: 'u6-chart', kind: 'chart' },
      {
        id: 'u6-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'all', quizType: 'choice' },
      },
      {
        id: 'u6-quiz-spelling',
        kind: 'quiz',
        quiz: { kanaType: 'all', quizType: 'spelling' },
      },
      {
        id: 'u6-article-sokuon',
        kind: 'article',
        articleSlug: 'hiragana-pronunciation',
      },
    ],
  },

  // ── u7 片假名与外来音：ア〜ン（46 的基本假名） ─────────────────────
  // 进度 key 只能是平假名（progress.ts 设计），故取 ア〜ン 的平假名对照。
  {
    id: 'u7',
    order: 7,
    kana: [
      'あ', 'い', 'う', 'え', 'お',
      'か', 'き', 'く', 'け', 'こ',
      'さ', 'し', 'す', 'せ', 'そ',
      'た', 'ち', 'つ', 'て', 'と',
      'な', 'に', 'ぬ', 'ね', 'の',
      'は', 'ひ', 'ふ', 'へ', 'ほ',
      'ま', 'み', 'む', 'め', 'も',
      'や', 'ゆ', 'よ',
      'ら', 'り', 'る', 'れ', 'ろ',
      'わ', 'を', 'ん',
    ],
    lessons: [
      { id: 'u7-chart', kind: 'chart' },
      {
        id: 'u7-quiz-choice',
        kind: 'quiz',
        quiz: { kanaType: 'katakana', quizType: 'choice' },
      },
      {
        id: 'u7-quiz-dictation',
        kind: 'quiz',
        quiz: { kanaType: 'mixed', quizType: 'dictation' },
      },
      {
        id: 'u7-article-loanwords',
        kind: 'article',
        articleSlug: 'katakana-loanwords',
      },
    ],
  },
];
