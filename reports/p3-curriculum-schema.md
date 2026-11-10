# P3-4 · 7 单元课程路径：数据模型与 i18n 契约（唯一事实源）

## 1. 产品设计

新路由 `/course`（5 locale：`/course`、`/de/course`…），顶部一句话目标，下面 7 个单元卡片 + 末尾「综合测试」。

**7 个单元（顺序固定）**

| # | 单元 | 假名范围 | 主练习 |
|---|---|---|---|
| 1 | 清音 ① あ・か・さ行 | あいうえお / かきくけこ / さしすせそ（15） | rows=a,ka,sa |
| 2 | 清音 ② た・な・は行 | たちつてと / なにぬねの / はひふへほ（15） | rows=ta,na,ha |
| 3 | 清音 ③ ま・や・ら・わ行＋ん | まみむめも / やゆよ / らりるれろ / わをん（15） | rows=ma,ya,ra,wa,n |
| 4 | 浊音・半浊音 | が〜ぽ（20 + 5） | special（dakuon） |
| 5 | 拗音 | きゃ〜ぴょ（33） | special（youon） |
| 6 | 特殊拍：促音・长音・拨音 | っ ー ん | all + 文章 |
| 7 | 片假名与外来音 | ア〜ン + ファ/ティ/ウィ 等 | katakana / mixed |

> 教学依据：先按「行」推进（同辅音 × 五段），再进入浊音/拗音，最后处理特殊拍与片假名；每单元都有 认读 → 听辨 → 拼写 → 匹配 的递进。

## 2. 数据模型（`src/data/curriculum.ts`）

```ts
import type { KanaType, QuizType } from '@/features/quiz/types';

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

export const curriculum: Unit[] = [ /* 7 个单元 */ ];
```

- 页面文案全部走 `useTranslations('Course')`，**不要在数据里写任何人类可读文案**（除了 id）。
- 进度：把 `unit.kana` 传给 `src/lib/progress.ts` 的 `getProgressSummary`，显示每单元 `mastered/total`（数据里的 kana 是平假名，与 progress key 一致）。

## 3. 路由与链接约定

- 课程页：`/[locale]/course`（各自 `generateMetadata`，canonical 自指，纳入 sitemap）。
- 单元开练：`/hiragana-katakana-quiz?start=<kanaType>&rows=<a,ka,sa>&type=<quizType>`
  - `start`：`hiragana|katakana|mixed|special|all`（已有）
  - `rows`：可选，逗号分隔的行 id：`a,ka,sa,ta,na,ha,ma,ya,ra,wa,n`（新增）
  - `type`：`choice|spelling|matching|dictation`（已有 `start=katakana-spelling` 后缀写法，兼容）
- 图表课：`/hiragana-katakana-chart`（可选 `?tab=seion|dakuon|youon`）。
- 文章课：`/learn/<slug>`。
- 导航：主导航 `learn` 项保留，指向 `/course`（`/learn` 仍是文章列表，课程页顶部可链接到文章库）。

## 4. i18n 键（`Course` 命名空间，5 语言）

| key | en |
|---|---|
| title | `Your 7-unit kana course` |
| subtitle | `Start with one row of kana at a time, then build up to dakuten, yōon, special sounds and katakana.` |
| progressLabel | `Course progress` |
| masteredCount | `{count} of {total} kana mastered` |
| unitProgress | `{count} of {total} in this unit` |
| startUnit | `Start unit {number}` |
| continueUnit | `Continue unit {number}` |
| reviewUnit | `Review unit {number}` |
| lessonsLabel | `Lessons` |
| finalTest | `Final test` |
| finalTestDesc | `10 mixed questions across everything you have learned.` |
| startFinalTest | `Start final test` |
| articleLibrary | `Browse all articles` |
| lockedHint | `Finish earlier units to get the most out of this one.`（仅提示，不锁死） |
| lessonTypes.chart | `Chart` |
| lessonTypes.quiz | `Practice` |
| lessonTypes.article | `Reading` |

单元标题/目标：`units.<id>.title`、`units.<id>.goal`（id = u1…u7）
课时标题/描述：`lessons.<id>.title`、`lessons.<id>.desc`

**课时 id 约定**（供翻译 agent 用）：
- chart：`u1-chart`、`u2-chart`、…、`u7-chart`
- quiz：`u1-quiz-choice`、`u1-quiz-dictation`、`u1-quiz-spelling`、`u1-quiz-matching`（u1–u7 同构）
- 特殊拍的 article：`u6-article-sokuon`
- 片假名 article：`u7-article-loanwords`
- final：`final-quiz`

> 只翻译 `Curriculum` 实际用到的键；每单元固定 2 个 quiz（choice + 一种变体）即可，避免 ×4 爆炸。

## 5. 验收

- `/course` 与 5 个 locale 全部 200；单元卡片显示各自 mastered/total。
- 点「Start unit 1」→ `/hiragana-katakana-quiz?start=hiragana&rows=a,ka,sa`，第 1 题只出现 あ〜そ 15 字。
- 点「Start unit 4」→ `?start=special`，只出浊音/半浊音。
- 键盘/读屏：单元卡片是链接或 button，可 Tab；每单元有 `aria-label` 带单元号。
- sitemap 增加 5 条 `/course`（不含 `/de/course` 之外的重复）。
- 无 `MISSING_MESSAGE Course.*` 警告。
