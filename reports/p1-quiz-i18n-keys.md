# Phase 1 · Quiz 交互层 i18n 键规范（唯一事实源）

所有 quiz 组件改用 `useTranslations('QuizPage')`，禁止硬编码英文。
`messages/en.json` 的 `QuizPage` 下需要下列键（其余 4 个语言同步补齐）。

## 已有键（保留，不要改名）

| key | en |
|---|---|
| title | `Kana Quiz` |
| description | `Test your hiragana and katakana knowledge` |
| startQuiz | `Start the Quiz` |
| tryAgain | `Try Again` |
| question | `Question` |
| of | `of` |
| correct | `Correct!` |
| incorrect | `Not quite` |
| yourScore | `Your Score` |

## 新增键（本次要加）

| key | en |
|---|---|
| selectKanaType | `Select Kana Type` |
| selectQuizType | `Select Quiz Type` |
| hiraganaOnly | `Hiragana Only` |
| katakanaOnly | `Katakana Only` |
| mixedKana | `Hiragana & Katakana` |
| specialKana | `Special Combinations` |
| allKana | `All Characters` |
| hiraganaOnlyDesc | `Basic hiragana characters (あ、い、う...)` |
| katakanaOnlyDesc | `Basic katakana characters (ア、イ、ウ...)` |
| mixedKanaDesc | `A mix of basic hiragana and katakana` |
| specialKanaDesc | `Dakuten, handakuten and yōon (が、ぱ、きょ...)` |
| allKanaDesc | `Everything: seion, dakuon and yōon combined` |
| singleChoice | `Single Choice` |
| singleChoiceDesc | `Choose the correct kana or romaji` |
| spellingDesc | `Type the romaji for the given kana` |
| matchingDesc | `Match kana with their romaji` |
| dictationDesc | `Listen and choose the kana you hear` |
| progressLabel | `Progress` |
| scoreLabel | `Score` |
| next | `Next` |
| correctAnswer | `Correct answer` |
| yourAnswer | `Your answer` |
| reviewWrong | `Review your mistakes` |
| switchToKatakana | `Try katakana` |
| aiAnalysis | `AI Analysis` |
| analyzing | `Analyzing...` |
| listenAndChoose | `Listen and choose the kana you hear` |
| replaySound | `Play sound (unlimited replays)` |
| playing | `Playing...` |
| typeTheRomaji | `Type the romaji for this kana` |
| submit | `Submit` |
| typeRomajiPlaceholder | `Type romaji here...` |
| ttsUnavailable | `Your browser does not support speech. Switched to reading mode.` |
| masteredCount | `{count} of {total} kana mastered` |
| startNow | `Start now` |
| weakHint | `We'll focus on the kana you get wrong.` |
| questionOf | `Question {current} of {total}` |
| showHint | `Show hint` |
| hideHint | `Hide hint` |
| hintFirstLetter | `Hint: it starts with "{letter}"` |
| keyboardTip | `Tip: press 1–4 to answer, Enter for next` |

> 加载态文案统一用已有的 `Common.loading`，不要在 `QuizPage` 里另建 `loading` 键。

## 使用约定

- 带占位符的键用 next-intl 的富文本形式：`t('masteredCount', { count, total })`
- `dictation` / `matching` / `spelling` 作为题型名沿用已有键
- 数值型文案不要拼接字符串，用 ICU：如 `questionOf`: `Question {current} of {total}`（本次新增，替换原来的 `question`+`of` 拼接）
