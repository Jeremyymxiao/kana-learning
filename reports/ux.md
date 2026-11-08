# LearnKana.pro 用户体验（UX）审查报告

| 项目 | 内容 |
|---|---|
| 审查对象 | https://learnkana.pro （仓库 `kana-learning`，Next.js 15 App Router） |
| 审查角色 | UX / 产品设计（教育产品 + WCAG 2.2 + 移动优先） |
| 审查日期 | 2026-11-07 |
| 审查方式 | 线上 HTML（curl）+ 源码逐行阅读；**无浏览器截图能力**，不做视觉臆测 |
| 证据等级 | 【已核实】= 线上 HTML 或源码可直接证明；【推断】= 基于类名/尺寸/规范推导，需浏览器复核；【无法核实】= 需后台或真机 |
| 源码版本 | 本地仓库 HEAD 与线上部署**不完全一致**（见 §1.3），细粒度视觉结论以源码为准 |

---

## 0. 结论摘要（TL;DR）

**总评：5.0 / 10（不合格线附近：能用，但"学不会、留不下、部分人用不了"）。**

一句话诊断：**这是一个"选择题打分器"，还不是一个"学习产品"——答完即走、无停顿无讲解、无进度、无名可携带的学习资产；同时页面骨架与交互语义的问题让键盘用户、屏幕阅读器用户和 4/5 的非英语用户被系统性地挡在门外。**

必须先修的三件事（按 ROI 排序）：

1. **文档骨架崩塌**：`[locale]` 页面出现两层 `<html><head><body>`，非英语页面实际仍按 `lang="en"` 解析（WCAG 3.1.1 直接失败），且全站 0 处 `lang="ja"`（3.1.2 失败）。
2. **Quiz 配置区不是可操作控件**：假名类型 / 题型选项是 `<div onClick>`，键盘与屏幕阅读器用户**只能做默认的 Hiragana + Single Choice**（WCAG 2.1.1/4.1.2 失败）。
3. **答题反馈不可感知、不可学习**：答完立即切换下一题，没有 `aria-live`、没有正确答案对照、没有讲解；听写题在语音不可用时静默失效。

---

## 1. 审查方法与证据边界

### 1.1 证据分级

- **【已核实】** 线上实际 HTML（含 HTTP 状态码），或源码中可直接断言的实现。
- **【推断】** 由类名、尺寸、断点、HTML 规范推导出的结果（例如"按钮在 667px 视口下位于折叠线下"）。**没有截图，所有纯视觉判断均属此类。**
- **【无法核实】** AdSense 后台 Auto Ads 开关、真机语音合成可用性、实际转化率。

### 1.2 抓取清单（2026-11-07）

| 路径 | HTTP | 用途 |
|---|---|---|
| `/` | 200 | 英文根首页（**由 `src/app/page.tsx` 硬编码版服务**） |
| `/hiragana-katakana-quiz` | 200 | 核心练习页（rewrite → `/en/...`） |
| `/hiragana-katakana-chart` | 200 | 五十音图 |
| `/learn` | 200 | 文章列表 |
| `/learn/hiragana-basics` | 200 | 文章详情（slug 与 `src/data/articles.ts` 一致；`/learn/hiragana-guide` 404 属正常，站内无此链接） |
| `/chat` | 200 | AI 对话 |
| `/login`、`/register`、`/auth?mode=login` | 200 | 认证（**三套入口并存**） |
| `/de`、`/de/hiragana-katakana-quiz`、`/de/hiragana-katakana-chart`、`/de/learn` | 200 | 德语页（验证 lang 与 i18n 缺失） |
| `/nonexistent-page-xyz`、`/quiz` | 404 | 无自定义 404；`/quiz` 是死路由 |

### 1.3 部署与源码的偏差（重要，避免误判）

- 线上 `/` 的 `<h1>` 类名为 `text-7xl md:text-8xl`，源码 `src/app/page.tsx:29` 为 `text-5xl sm:text-6xl md:text-8xl`；线上 quiz 标题是 `<h2 id="quiz-heading">`，源码 `page-content.tsx:69` 已是 `<h1>`。→ **线上部署落后于仓库 HEAD**。凡涉及"标题层级、字号"的结论，本报告以**源码**为准并注明线上差异。
- 线上 `/hiragana-katakana-quiz` 的 SEO 区块（`page.tsx:26` "How Our Kana Quiz Works"）在抓取到的 HTML 中未出现，同属版本差异。

---

## 2. 总评与分项打分

| 维度 | 分数 | 判断依据 |
|---|---|---|
| 信息架构与导航 | 5/10 | 6 个入口平铺，无"学习路径"；两套首页；导航用按钮非链接 |
| 首屏与激活 | 5/10 | CTA 落点正确（quiz），但到"答第一题"需 2 次点击 + 2 次配置决策，默认值不可见地替你做了决定 |
| 练习核心循环 | 3/10 | 无停顿、无讲解、无发音、无难度递进；四种题型体验彼此割裂 |
| 反馈与容错 | 3/10 | 语音/接口失败无用户可见降级；听写完成会"踢回配置页" |
| 学习闭环与留存 | 2/10 | 无进度持久化、无错题本、无连续打卡、注册无任何专属价值 |
| 无障碍（WCAG 2.2 AA） | 2/10 | 3.1.1、3.1.2、2.1.1、4.1.2、4.1.3、1.4.3 多项失败（详见 §5） |
| 移动端 | 4/10 | 触控目标勉强达标，但 50 音表 romaji 依赖 hover，答题目录与匹配盘在窄屏过密 |
| i18n | 2/10 | 页面框架 5 语言，核心练习区 100% 硬编码英文；lang 声明失效 |
| 信任与商业化 | 4/10 | 页脚 15 个"友情链接"更像链接农场；无手动广告位（这一点是加分项） |

**加权总分：5.0 / 10。**

---

## 3. 用户旅程图

### 3.1 现状（As-Is）

```text
[广告/SEO 落地]
   │
   ▼
首页 hero（大色块 + "Start Hiragana & Katakana Quiz"）
   │ 点击 1（唯一主 CTA；同页还有 3 个等价入口指向 /quiz、3 个文章卡里有 1 个也指向 /quiz）
   ▼
Quiz 配置页（首屏：H1 + "Select Kana Type" 5 张卡）
   │ ★ 摩擦 F1：5 张卡 + 4 张卡 + 按钮纵向约 700–800px，667px 视口下 Start 在折叠线下【推断】
   │ ★ 摩擦 F2：默认选中 Hiragana + Single Choice，但"已选中"只靠蓝色边框表达，无文字/无说明
   │ ★ 摩擦 F3：卡片是 <div onClick>，键盘/屏读不可选（P0）
   ▼
点击 "Start the Quiz"（点击 2，决策 2 次）
   ▼
第 1 题（进度条 0%，文案 "Progress: 0/10"）
   │ ★ 摩擦 F4：答完立即进入下一题（choice 无任何停留），只在 1.5s 内闪绿/红 + 蜂鸣
   │ ★ 摩擦 F5：答错不显示正确答案、不显示你的答案、无讲解、无发音
   │ ★ 摩擦 F6：键盘无快捷键；焦点随组件卸载丢失
   │ ★ 摩擦 F7：点 "Back" 直接回配置页，本轮 10 题进度无提示清空
   ▼
第 10 题结束
   ├── choice：进入 QuizResult（有错题回顾，但"你的答案"永远缺失，见 P0-5）
   ├── dictation：**不会进入结果页**，直接回到配置页（P0-6）
   ├── matching：进入结果页，但 "Try Again" 回到配置页；分数从 100 起算，最高 200/100
   └── spelling：进入结果页，"Try Again" 回到配置页
   ▼
结果页：Score/100 + 错题列表 + "AI Analysis"（调 /api/analyze，可能无 key 失败）
   ▼
"Try Again" → 覆盖配置页 → 用户再次面对 9 张卡
   ▼
离开（无任何可回访的资产：无进度、无错题本、无 streak、无邮件提醒）
```

### 3.2 应有（To-Be，建议目标态）

```text
首页 CTA（"立即开始 · 3 题摸底"）
   │ 一次点击即进入第 1 题（默认 Hiragana 清音·认读，无需配置）
   ▼
第 1 题 → 答 → 就地反馈（对/错 + 正确读音 + 假名/罗马音对照 + 自动发音）
   │ 显式 [下一题]（或按 Enter/Space），焦点自动落到下一题题干
   ▼
第 3 题后 → "你的水平：清音入门" → [继续 10 题] / [换成片假名]
   ▼
10 题结束 → 结果页：得分、用时、正确率环、错题卡（可点听音）、[复习错题] [再来一轮]
   ▼
localStorage 持久化：连续练习天数、已掌握假名集合、错题池 → 回访时首页直接显示"继续上次"
   ▼
（可选）登录：同步进度、跨设备、每日目标、邮件/Web Push 提醒
```

### 3.3 激活漏斗量化（【推断】，基于点击与决策计数）

| 阶段 | 现状 | 目标 |
|---|---|---|
| 首页 → 开始练习 | 1 次点击 | 1 次点击 |
| 配置决策数 | 2 次（5 选 1 + 4 选 1） | 0（默认值直达）/ 1（可选） |
| 首页 → 答第一题 | **2 次点击 + 2 次决策 + 1 次滚动**（折叠线下） | 1 次点击 |
| 中途退出丢失 | 100% | 0（会话可恢复） |
| 结果页到达率 | choice 100%；matching 50%（可到）；dictation 0%；spelling 100% | 100% |
| 回访理由 | 无 | 连续天数 + 错题池 + 每日目标 |

> 说明：上表"折叠线下"与"到达率"为源码结构推导，需用真实埋点（GA4 `begin_quiz` / `quiz_complete` / `session_resume`）验证。当前代码里没有任何学习行为事件，只有 GA/Umami 页面级 PV → **建议同时补埋点**。

---

## 4. 问题清单（按严重度）

> 编号规则：P0 = 阻断核心任务或直接违反 AA；P1 = 显著伤害体验/留存；P2 = 打磨项；P3 = 细节。
> 每条：**证据 → 用户影响 → 具体修复**。修复方案可直接落到组件与行号。

### P0（立即修，1–2 周）

#### P0-1 文档骨架嵌套：`<html><head><body>` 渲染两层，非英语页面 `lang` 失效（WCAG 3.1.1）

**【已核实】** 根布局 `src/app/layout.tsx:22` 渲染 `<html className="scroll-smooth" lang="en">` 与 `<body>`；`src/app/[locale]/layout.tsx:42-63` **又渲染了一套** `<html lang={locale}>`、`<head>`、`<body>`。线上实测：

```bash
curl -s https://learnkana.pro/de | grep -o '<html[^>]*>'
# <html class="scroll-smooth" lang="en">
# <html lang="de" class="scroll-smooth">
```

进一步实测 locale 页面有 **2 个 `</head>`、2 个 `<body>`**（`/de`、`/hiragana-katakana-quiz`、`/hiragana-katakana-chart`、`/learn`、`/learn/hiragana-basics`、`/login` 全部如此）；只有 `/`（英文根首页，由 `src/app/page.tsx` 服务）是单文档。

**影响**：按 HTML 规范，body 中重复的 `<html>` 起始标签是解析错误，**已存在的 `lang` 属性不会被覆盖**，因此 `/de`、`/fr`、`/pt`、`/es` 页面在浏览器/屏幕阅读器/翻译插件里仍是"英语文档"，而正文是德语/法语。这是 WCAG **3.1.1（页面语言）直接失败**；同时嵌套 `<head>` 让 AdSense/Umami 脚本被塞进 body，SSR/水合结构异常，SEO 也存在解析风险。

**修复（二选一，推荐 A）**

- **A. 只保留 `[locale]` 作为唯一文档骨架**：删除 `src/app/layout.tsx` 的 `<html>/<head>/<body>` 与 `src/app/page.tsx`（根首页重复实现），让 `/` 由 middleware 落到 `/en`；`[locale]/layout.tsx` 保留 `<html lang={locale}>`。同时把根布局里的 GA/AdSense/Clarity/结构化数据合并进 `[locale]/layout.tsx`（避免重复加载）。
- **B. 保留根布局，把 `[locale]/layout.tsx` 降级为纯 Provider 容器**（去掉 html/head/body，只返回 `<NextIntlClientProvider>`），语言通过 `<html>` 上的 `dir/lang` 在根布局里用 header/`params` 不可得 → 需要用 middleware 注入 `x-locale` header 再在根布局读取。工程成本高于 A。

> 附带收益：消除"两套首页"（`src/app/page.tsx` 276 行硬编码英文 vs `src/app/[locale]/page-content.tsx` 272 行 i18n 版）——**两份首页会长期漂移**，且英文根首页完全不走翻译（`t('aiPowered')` 等键在根首页被丢弃）。

#### P0-2 全站 0 处 `lang="ja"`：日语假名被按英语/德语发音朗读（WCAG 3.1.2）

**【已核实】** 在所有抓取页面中 `grep 'lang="ja'` 结果为 **0**，而每页含 34–149 个日文字符（`かな`、`あいう`、`ア`、`Hiragana` 表格等）。出现假名的位置：

- `src/features/quiz/components/QuizQuestion/index.tsx:47` `<div className="text-4xl font-bold mb-2">{displayText}</div>`
- `src/features/quiz/components/spelling/index.tsx:203` `<div className="text-6xl font-bold mb-4">{questions[currentIndex]?.kana}</div>`
- `src/features/quiz/components/matching/index.tsx:236` `<span>{card.content}</span>`
- `src/features/kana/components/gojuon-table/index.tsx:75、91、116、132…` 所有假名 `<span>`
- `src/features/kana/components/nav-bar/index.tsx:94-96` logo 中的 `かな`

**影响**：屏幕阅读器用页面语言（实为 en）的语音库朗读假名 —— VoiceOver 会读成 "a i u e o" 之外的乱码或直接跳过；德语环境更糟。对日语学习者而言，**发音示范完全失效**。

**修复**：统一封装一个可复用的假名文本组件，强制语言标注，避免逐处手写：

```tsx
// src/components/ui/kana-text.tsx
export function KanaText({ children, className }: { children: string; className?: string }) {
  return <span lang="ja" className={className}>{children}</span>;
}
// 罗马音（拉丁转写）建议标注为拉丁转写：<span lang="ja-Latn">{romaji}</span>
```

改造点：`QuizQuestion`（题干与 2×2 选项）、`spelling` 题干、`matching` 卡片、`gojuon-table` 每个单元格、`nav-bar` logo、`QuizResult` 错题卡。**并行**：`QuizQuestion` 的选项按钮与 `spelling` 输入框要有可读的英文/本地语言提示（例如 `aria-label={`${kana} 的读音选项`}`）。

#### P0-3 Quiz 配置区用 `<div onClick>` 伪装成选项，键盘/屏读完全不可用（WCAG 2.1.1 / 4.1.2）

**【已核实】** `src/features/quiz/components/QuizPanel.tsx:78-91`（假名类型）与 `:99-113`（题型）都是：

```tsx
<div onClick={() => setSelectedDifficulty(level.value)} className="cursor-pointer ...">
```

线上 HTML 同样是 `<div class="cursor-pointer ...">`。**没有** `role`、`tabIndex`、`aria-checked`/`aria-pressed`、没有 `fieldset/legend`、也不可聚焦。

**影响**：只看得到 `<h3>`、`<h4>` 和一段不可点文字。Tab 键会直接跳过 9 张卡落到 "Start the Quiz"。键盘用户与屏幕阅读器用户**永远只能做默认的 Hiragana + Single Choice**；触屏用户没有 hover 反馈（`hover:border-blue-300` 无效），选中态只靠蓝框。

**修复**：用原生单选语义（最能被所有 AT 正确朗读），保留卡片外观：

```tsx
<fieldset className="space-y-4">
  <legend className="text-xl font-medium text-center">选择假名类型</legend>
  <div className="grid md:grid-cols-2 gap-4">
    {difficultyLevels.map(level => (
      <label key={level.value} className={`... ${selected === level.value ? 'ring-2 ring-blue-500' : ''}`}>
        <input
          type="radio" name="kana-type" value={level.value}
          checked={selectedDifficulty === level.value}
          onChange={() => setSelectedDifficulty(level.value)}
          className="sr-only peer"
        />
        <span className="peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ...">
          <span className="font-bold">{level.label}</span>
          <span className="text-sm">{level.description}</span>
        </span>
      </label>
    ))}
  </div>
</fieldset>
```

同时：默认值要**显式标注**"已默认选择，可直接开始"；`Start the Quiz` 用 `useTranslations('QuizPage').startQuiz`（该键已存在于 `messages/en.json`，但目前未被使用）。

#### P0-4 答题反馈无任何可感知通道：立即跳题、无 `aria-live`、无正确答案、无讲解（WCAG 4.1.3 / 2.2.2）

**【已核实】** `QuizQuestion/index.tsx:24-39`：`onSubmit(answer)` 直接调用 `useQuiz.submitAnswer`，后者在同一个 `setState` 里 `currentQuestionIndex + 1`（`useQuiz.ts:208-215`），因此**答题的绿色/红色高亮几乎不可能被看到**——组件在下一帧就换成新题（`useEffect` 依据 `question.id` 重置）。整个仓库只有 `src/components/ui/alert.tsx:41` 有 `role="alert"`，**没有任何 `aria-live`**。

对比其他三种题型的不一致：

| 题型 | 答后停留 | 是否显示正确答案 | 是否进结果页 |
|---|---|---|---|
| choice | ≈0ms（立即换题） | 否 | 是 |
| spelling | 1500ms（`spelling/index.tsx:162-171`） | 否（只显示 ✓/✗） | 是 |
| dictation | 反馈 1500ms，换题 0ms（`dictation/index.tsx:51-53、79-85`） | 否 | **否**（见 P0-6） |
| matching | 1s 抖动后复位 | 位置提示即答案 | 是 |

**影响**：学习者**得不到任何"错在哪、正确答案是什么、为什么"的信号**；对屏幕阅读器用户，题目变化没有任何播报，等于盲答。这是"教育产品"最核心的失败。

**修复**（改 `QuizQuestion` + `useQuiz` 的推进职责，把"推进"从答题里拆出来）：

```tsx
// useQuiz.ts：submitAnswer 只判分，不推进
submitAnswer(answer) { /* 只更新 questions[i].userAnswer + score + wrongAnswers */ }
nextQuestion() { /* currentQuestionIndex+1, isComplete 判定 */ }
```

```tsx
// QuizQuestion：答后就地展示反馈 + 显式下一题
{isAnswered && (
  <div role="status" aria-live="polite" className="rounded-lg p-4 border">
    <p className="font-bold">{isCorrect ? t('correct') : t('incorrect')}</p>
    <p><KanaText lang="ja">{question.kana}</KanaText> → <span lang="ja-Latn">{question.romaji}</span></p>
    <Button autoFocus onClick={onNext} className="mt-3">下一题 / Next</Button>
  </div>
)}
```

配套：`Progress` 的 `aria-label`（见 P1-3）、错误音效之外给出文字、可选"显示讲解"（AI 分析可复用）。

#### P0-5 结果页链路半坏：choice 的"你的答案"永远不显示，romajiToKana 题的正确答非所问

**【已核实】**

1. `useQuiz.ts:204-206`：答错时 `wrongAnswers: [...prev.wrongAnswers, currentQuestion]` —— 推入的是**更新前的对象**（没有 `userAnswer`）。`QuizResult/index.tsx:132-136` 只有在 `q.userAnswer` 存在时才渲染 "Your Answer" → **choice 错题永远看不到自己选了什么**。
2. `QuizResult/index.tsx:128-131`：所有题型都渲染 `Correct Answer: {q.romaji}`。但 `romajiToKana` 题的正确答案是**假名**（`useQuiz.ts:193-195`，比较 `answer === currentQuestion.kana`）→ 复习卡会把正确答案标成罗马音，属于**内容性错误**，会教错。
3. `QuizResult` 本身有 "Review Wrong Answers"（`index.tsx:114-141`）—— 所以"结果页无错题回顾"的假设**不成立**；真实问题是：**回顾只对 choice 可达、且内容有缺陷**。

**修复**：

```tsx
// useQuiz.ts
const answered = { ...currentQuestion, userAnswer: answer };
newQuestions[prev.currentQuestionIndex] = answered;
wrongAnswers: isCorrect ? prev.wrongAnswers : [...prev.wrongAnswers, answered],
```

```tsx
// QuizResult.tsx
const correct = q.type === 'kanaToRomaji' ? q.romaji : q.kana;   // 按题型取答案
const prompt  = q.type === 'kanaToRomaji' ? q.kana  : q.romaji;
```

并把错题卡做成可点重听/重练（`<KanaText>` + `useSpeech`），每题一个 `[再练这题]`。

#### P0-6 听写题完成即被"踢回配置页"，且它根本不是听写

**【已核实】**

- `QuizPanel.tsx:186-193` 给 `DictationQuiz` 传 `onComplete={handleReset}`；`handleReset`（`:43-52`）在 `isComplete`（外层 `useQuiz` 的，永远是 false）为 false 时执行 `setShowConfig(true)`。
- `dictation/index.tsx:75-78`：最后一题 `setIsComplete(true); onComplete();` → 父组件切回配置页，**结果页永远看不到**。
- 同类问题：`matching/index.tsx:198`、`spelling/index.tsx:187` 的 `onRetry={onComplete}` 也会回到配置页，而不是"再来一轮"。
- 内容层面：`dictation/index.tsx:198` 直接把 `{questions[currentIndex]?.kana}` **显示在屏幕上**，同时要求"Type the romaji"（`:199`）。配置页却写着 "Dictation: Listen and select the correct kana"（`QuizPanel.tsx:59`）。→ **它既不是听写，也不是选假名**，而是一个带多余"Play Sound"按钮的拼写题。

**影响**：四种题型中体验最差的一条，用户做完 10 题得不到任何结算，只觉得"白做了"。

**修复**：

- `DictationQuiz` 自己管理结果页（已在自己的 `isComplete` 里渲染 `QuizResult`），**不要把 `onComplete` 接到父级 `handleReset`**；父级只接收 `onFinish(score, wrong)` 用于埋点。
- 真正的听写：隐藏假名文本，只保留 `[▶ 再听一次]` + 4 个假名选项（或输入框），音频不可用时降级为"显示假名 → 输入罗马音"并在 UI 明示（见 P1-7）。
- 统一四个题型的结果页入口与 `Try Again` 语义（应为"同配置再来一轮"）。

#### P0-7 匹配题计分从 100 起、最高 200/100

**【已核实】** `matching/index.tsx:123` `setScore(100)`，`:153` 每对 `+10`，10 对后 `score = 200`；而 `QuizResult/index.tsx:110` 显示 `{score}/100`。用户会看到 "Your Score: 200/100"。且答错不扣分（只有 `wrongAnswers` 累积），得分与正确率脱钩。

**修复**：初始 `setScore(0)`；按配对正确率结算（`correctPairs / 10 * 100`），错配只记录错题不扣分；容器最终分数上限 100。

#### P0-8 文字对比度多处不达标（WCAG 1.4.3）

**【已核实：色值取自源码，对比度按 WCAG 公式计算；是否实际叠在该背景上属【推断】**，需浏览器取色复核）

| 文本位置 | 前景 / 背景 | 对比度 | 要求 | 结论 |
|---|---|---|---|---|
| 首页 hero H1 "AI-Powered"（`[locale]/page-content.tsx:31`）| `#FF7E67` on `#2B7FFF`（同文件 `:21`） | **1.51:1** | 大字 3:1 | ❌ |
| 首页 hero 副文案 `text-white/80`（`[locale]/page-content.tsx:39`）| 白 80% 合成于 `#2B7FFF` = `#D5E5FF` | **2.95:1** | 正文 4.5:1 | ❌ |
| Quiz 标题渐变（`hiragana-katakana-quiz/page-content.tsx:71`）| `#60A5FA`→`#34D399` on `#FFFFFF` | **2.54 / 1.92:1** | 大字 3:1 | ❌ |
| 五十音图 H1（`hiragana-katakana-chart/page-content.tsx:31`）| `#F59E0B`→`#F97316` on 白 | **2.15:1** | 大字 3:1 | ❌ |
| 首页 "Learn More →" 卡（`[locale]/page-content.tsx:154、210、218`）| `#FFD600` / `#2B7FFF` on 白 | **1.41 / 3.76:1** | 正文 4.5:1 | ❌ |
| Learn 页 H1（`learn/page-content.tsx:33`）| `#2E7D32`→`#66BB6A` on 白 | **5.13→2.36:1**（渐变尾部不达标）| 大字 3:1 | ❌ |
| 主按钮（`globals.css:18`）| `#FFFFFF` on hsl(201 96% 32%) | 5.74:1 | 4.5:1 | ✅ |

**修复**：hero 的大色块与文字**不要互相压叠**——给文案加一层 `bg-[#1A1B2F]/85` 的容器，或把 `AI-Powered` 改为白色/`#FFD600`（对 `#1A1B2F` 分别为 16.9:1 / 12.0:1，达标且更醒目）；渐变标题统一把浅色端压深到 4.5:1（如 `#2563EB`→`#059669`），或干脆用纯色；"Learn More" 用 `text-[#1A1B2F] dark:text-white` + 彩色下划线。

---

### P1（2–4 周内，直接伤害留存）

#### P1-1 无"开始前说明 / 难度推荐 / 时长预期"

**【已核实】** `QuizPanel.tsx:72-123` 只有 9 张卡 + 开始按钮，没有"10 题、约 2 分钟、答错会显示答案"这类预期管理，也没有"第一次来？从清音开始"的推荐。`page-content.tsx` 的 `QuizPage.description` 只说了"Test your hiragana and katakana knowledge"。

**修复**：配置页顶部加一行 `10 题 · 约 2 分钟 · 答完可看错题`；默认卡加 `推荐` 徽章；给 `special`/`all` 标注前置要求（"建议先完成清音"）。

#### P1-2 进度表达 off-by-one 且双份

**【已核实】** `QuizPanel.tsx:144-146` 文本 `Progress: {currentQuestionIndex}/10`（第 1 题显示 `0/10`）；`:164` `Progress value={(currentQuestionIndex/10)*100}`（第 1 题为 0%）；而 `dictation`/`spelling` 又各自实现了一套（`dictation:194、243`、`spelling:196`），四种题型共 3 套进度 UI。

**修复**：抽 `QuizProgress({ current, total, score })` 组件，`current` 从 1 起，`value={current/total*100}`，文案 `第 3 / 10 题`；配 `aria-label`（见 §5）。删除各题型内的重复实现。

#### P1-3 `Progress` 组件无可访问名称

**【已核实】** `src/components/ui/progress.tsx:12-24` 直接透传 Radix Root，调用处（`QuizPanel:164`、`dictation:194`）没有 `aria-label`，也没有可见文本关联。

**修复**：`<Progress aria-label="答题进度" value={...} />`，或在外部 `<span id="quiz-progress-label">` + `aria-labelledby`。

#### P1-4 键盘无快捷键、无"选项 1–4"、无焦点管理

**【已核实】** 全站唯一的键盘处理是 `spelling/index.tsx:174-179`（Enter 提交，且用的是已废弃的 `onKeyPress`）与 `dictation` 的 `onKeyDown`。选择题 4 个选项只能 Tab 4 次。答题后焦点随组件卸载丢失，下一题不会自动聚焦任何元素。

**修复**：`1-4` 键选答案、`Enter` 下一题、`R` 重听；答题后把焦点设到反馈卡或下一题的第一个选项（`autoFocus` 或 `ref.focus()`）；用 `useEffect` 监听 `keydown` 并在输入框聚焦时禁用。

#### P1-5 中途退出无确认、无恢复

**【已核实】** `QuizPanel.tsx:134-141` 的 `Back` 直接 `handleReset()`；`handleReset` 在非完成态 `setShowConfig(true)`，`useQuiz` 状态被下一次 `startTest` 覆盖。**全仓库 quiz 相关代码没有 `localStorage`**（仅 `chat/page-content.tsx:22` 存聊天记录）。

**修复**：Back 触发 `<Dialog>`「本轮的 6/10 题会丢失，继续退出？」；同时把 `{ quizType, kanaType, questions, answers, index }` 写 `sessionStorage`，配置页加「继续上次（第 7/10 题）」。

#### P1-6 零留存机制：无账号进度、无错题本、无打卡、注册无价值

**【已核实】** `useQuiz` 无持久化；`AuthProvider` 只做 Firebase 登录态（`providers/AuthProvider.tsx`），未写任何学习数据；`QuizResult` 不落库；`src/models/user.ts` 也没有学习进度字段（仅有 `additionalInfo`）。注册后除头像外**没有任何额外能力**。

**修复（最小可用，不依赖后端）**：
- `localStorage` 存 `learnkana.progress = { streak, lastPracticeDate, mastered: { [kana]: {seen, correct} }, wrongPool: [...] }`；
- 首页/结果页显示"连续 3 天 · 已掌握 24/46 个清音"；
- 结果页「复习错题」进入只含错题的迷你会话；
- 登录后（`/api/user/progress`）同步；**到那时注册才有意义**，并把「保存进度」作为注册 CTA。

#### P1-7 语音合成无降级（听写/五十音图）

**【已核实】** `useSpeech.ts:6-9` 在 `!window.speechSynthesis` 时**只 `console.warn`**；`dictation/index.tsx:37-40` 与 `gojuon-table/index.tsx:18-20` **完全没有**能力检测，直接 `new SpeechSynthesisUtterance(...)` —— 在不支持 TTS 的浏览器（部分 Linux Firefox、部分 Android WebView、企业策略禁用）会**抛异常**，点击毫无反应。iOS 静音模式/未安装日语语音时也不会响。

**修复**：
- 能力检测 + 首次点击时探测是否真的发声（`utterance.onstart`）；
- 探测失败 → 显示非阻断提示「当前浏览器不支持日语语音，已切换为文字模式」，听写题降级为「看假名写罗马音」；
- 引入预录音频（`public/audio/*.mp3`，46×2 + 浊音/拗音）作为主路径，TTS 作兜底 —— 这也是**发音教学质量**的关键；
- `gojuon-table` 的 `speak` 加 try/catch 与 toast。

#### P1-8 五十音图 romaji 只在 hover 时可见（触屏/键盘永远看不到）

**【已核实】** `gojuon-table/index.tsx:26`：`romajiText: "... opacity-0 group-hover:opacity-100 transition-opacity"`。单元格本身是 `<td onClick>`（`:67-79` 等）。

**影响**：手机上点一下只会发音，**看不到罗马音**；这正是初学者最需要的对照。键盘用户无法聚焦单元格，也无法触发发音（WCAG 2.1.1 / 1.4.13）。

**修复**：
- romaji 默认 `opacity-100`（小字灰色，`text-xs`），`sm:` 以上可保持轻量显示；
- `<td>` 内放 `<button type="button" aria-label={`${kana}，发音 ${romaji}`} className="w-full min-h-11">`，键盘可聚焦、可回车播放；`role` 保持表格语义；
- 给表格补 `<caption class="sr-only">五十音图（清音）</caption>`、`<th scope="col">`（a/i/u/e/o 行头）—— 目前 `<table>` 无 `thead`、无 `th`、无 `caption`（`:64-99`），屏幕阅读器无法说明"这是第几行第几列"。

#### P1-9 导航不是链接：无 href、无法新标签页、无 `aria-current`

**【已核实】** `nav-bar/index.tsx:104-117` 桌面导航是 `<button onClick={() => router.push(...)}>`；`:86-99` logo 是 `<div onClick>`（不可聚焦、不可键盘）；线上 HTML 确认。移动端菜单是 `<button>`（`:124-130`）打开后为 `<Link>`（`:138-152`）。

**影响**：中键/⌘+点击开新标签页失效（学习者常用），SEO 内链权重丢失，屏幕阅读器读作"按钮"而非"链接"，当前页面没有 `aria-current="page"` 状态。

**修复**：全部改为 `i18n.config` 的 `<Link href>`；logo 用 `<Link href="/" aria-label="LearnKana 首页">`；当前项加 `aria-current="page"` + 视觉指示；移动端汉堡按钮补 `aria-label="打开主菜单" aria-expanded={isMenuOpen} aria-controls="mobile-nav"`，菜单容器加 `id="mobile-nav"`，支持 `Escape` 关闭并把焦点还给按钮。汉堡按钮**当前没有任何可访问名称**（线上 HTML 只有 `<button>` + lucide `<svg>`，`grep` 不到 `aria-label`）。

#### P1-10 Quiz 全部文案硬编码英文，非英语用户看到"半德语半英语"

**【已核实】** `src/features/quiz/**` **零** `useTranslations`（`grep -rn useTranslations src/features/quiz` 返回空）。`QuizPanel.tsx:56-68、76、97、120`，`QuizQuestion/index.tsx:49-50`，`QuizResult/index.tsx:105-177`，`dictation:199-243`，`spelling:194-246`，`matching:208-214` 全是英文字面量。而 `messages/en.json` 里 **`QuizPage.*` 已存在**（`title/description/selectQuiz/startQuiz/question/of/correct/incorrect/yourScore/tryAgain/backToQuizzes…`）—— **翻译资源被浪费**。

线上实测 `/de/hiragana-katakana-quiz`：页面框架是德语（"Kana-Quiz / Testen Sie Ihr Hiragana- und Katakana-Wissen"），紧接着配置区变成 "Select Kana Type / Hiragana Only / Select Quiz Type / Start the Quiz"。

**修复**：给 `QuizPanel/QuizQuestion/QuizResult/{dictation,matching,spelling}` 注入 `useTranslations('QuizPage')`；把 9 张卡的 label/description 移到 `messages/*.json`（新增 `QuizPage.kanaTypes.*`、`QuizPage.quizTypes.*`）；`QuizPage.correct/incorrect/yourScore/tryAgain` 直接复用。**同时补德语/法语/葡语/西语译文**（现有 5 个 locale 文件的 `QuizPage` 已齐全）。

#### P1-11 配置面板在移动端过窄、按钮在折叠线下

**【已核实（类名）】** 双层容器叠加：`MainLayout` 的 `main` 有 `px-4`（`main-layout.tsx:113`）→ 页面 `container mx-auto px-4 py-12`（`quiz/page-content.tsx:47`）→ 卡片 `p-8`（`:50`）。375px 视口下内容宽约 `375-16*2-16*2-32*2 ≈ 247px`（【推断】，由类名计算）。
【推断】配置区总高 ≈ `5 张卡 × 96px + 间距 + 4 张卡 × 96px + 标题 + 按钮 ≈ 800px`，667px 视口下 **Start 按钮在折叠线下**。

**修复**：页面外壳去掉一层 `container/px-4`；卡片 `p-8` → `p-4 sm:p-8`；卡片区在 `<sm` 用 `grid-cols-1` 且 `h-20`；把 `Start` 做成 `sticky bottom-0` 的整宽按钮（移动端始终可见）；`QuizPanel` 的 `min-h-[650px]` 改为 `sm:min-h-[650px]`。

#### P1-12 匹配题在窄屏必然拥挤

**【已核实（类名）】** `matching/index.tsx:219` `grid grid-cols-4 gap-4`，卡片 `h-32 text-3xl`；20 张卡（`:96-118`）。375px 下每格约 `(247-3*16)/4 ≈ 50px` 宽、128px 高，`text-3xl`（30px）的拗音（きょ）会溢出；20 张卡纵向 5 行 = 640px+。

**修复**：`grid-cols-2 sm:grid-cols-4`；卡片 `h-20 sm:h-32`；字号 `text-2xl sm:text-3xl`；给卡片 `aria-pressed` 与 `aria-label`（"さ，假名卡"），匹配成功后用 `role="status"` 播报"已配对 3/10"。

#### P1-13 没有页面级 `<h1>`（答题进行中），标题层级跳跃

**【已核实】** `quiz/page-content.tsx:51-79`：`showQuizHeader` 为 false 时整个含 `<h1 id="quiz-heading">` 的头部被卸载 → 答题过程中页面**没有 h1**。配置区用 `<h3>`（`QuizPanel:76、97`），中间没有 h2。线上（旧部署）标题直接是 `<h2 id="quiz-heading">`，全页 0 个 `<h1>`。

**修复**：`<h1 className={showQuizHeader ? '' : 'sr-only'}>{t('title')}</h1>` 始终保留；`Select Kana Type` → `<h2>`，`Select Quiz Type` → `<h2>`，选项组用 `<fieldset><legend>`（见 P0-3）。

#### P1-14 两套首页 + 重复文档骨架带来的信任与维护风险

**【已核实】** `src/app/page.tsx`（276 行，英文硬编码，`<Link href="/...">`）与 `src/app/[locale]/page-content.tsx`（272 行，i18n）是**两份几乎相同的首页**；`/` 由前者服务。加一条改动就要改两处；两版 hero 文案/样式已经不同（见 §1.3）。

**修复**：删除 `src/app/page.tsx`，`/` 由 middleware 走 `/en`（P0-1 的 A 方案）。短期若不能删，至少在 `page.tsx` 顶部加注释并在 CI 加一条"两份首页关键文案 diff"检查。

---

### P2（打磨，1–2 个迭代）

| ID | 问题 | 证据 | 修复 |
|---|---|---|---|
| P2-1 | 加载态硬编码英文且无播报 | `quiz/page-content.tsx:16` `Loading quiz...`，无 `role="status"` | 用 `t('loading')` + `<div role="status" aria-live="polite">` + 骨架屏 |
| P2-2 | 无 `prefers-reduced-motion` 支持 | 全站 grep 为 0；hero `hover:scale-105`、卡片 `hover:scale-[1.02]`、`animate-spin` | 加 `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }`；R3F 类 3D 无关，纯 CSS 即可 |
| P2-3 | 无"跳到主内容"链接 | `main-layout.tsx:113` 之前无 skip link，导航是 fixed | `<a href="#main" className="sr-only focus:not-sr-only ...">跳到练习</a>`，`<main id="main">` |
| P2-4 | 无自定义 404 | `/nonexistent-page-xyz` → 404 默认页；仓库无 `not-found.tsx` | 加 `src/app/not-found.tsx`：大标题 + "返回练习 / 五十音图 / AI 对话" 三个出口 |
| P2-5 | 认证文案混语言、用 `alert()` | `AuthForm.tsx:160-162` 分隔线硬编码中文"或"；`:50` 用 `alert()` 提示重置邮件 | 用 `t('or')`；用页面内 `Alert` + 倒计时跳转 |
| P2-6 | 表单错误未关联字段 | `AuthForm.tsx:84-88` 只在顶部渲染 `Alert`，输入框无 `aria-invalid`/`aria-describedby` | 字段级 `aria-invalid` + `<p id="email-error">` + `aria-describedby` |
| P2-7 | 密码框无 `autoComplete`、无显示/隐藏 | `AuthForm.tsx:116-123` | `autoComplete="current-password" / "new-password"`，加眼睛按钮 |
| P2-8 | Google 登录只有 redirect、失败无可见兜底 | `AuthProvider.tsx:96-103` `signInWithRedirect`；失败仅 `setError` 且 redirect 回来后 `getRedirectResult` 异常只进 console | 检测 `signInWithRedirect` 失败后回退 `signInWithPopup`；失败时在 AuthForm 显示"Google 登录不可用，可使用邮箱登录" |
| P2-9 | 三套登录入口 | `/login`（`login/page.tsx`）、`/register`、`/auth?mode=login`（导航按钮 `main-layout.tsx:82`）| 统一到 `/auth`，`/login`、`/register` 301 过去；导航按钮改为链接 |
| P2-10 | 页脚 15 个外链（"Friend Links" 9 + "Support" 6）| `footer.tsx:42-69` | 收起到"更多"折叠，或只保留 3–5 个与日语学习相关的；外链加 `rel="noopener noreferrer"`（已有）+ 明确"外部链接"图标；**这是信任与 E-E-A-T 的负分项** |
| P2-11 | 音效每次 `new AudioContext()` 不释放 | `audio-utils.ts:1-3、27-29` | 模块级单例 + `resume()`（autoplay 策略）+ 失败静默降级 |
| P2-12 | 无"上次练习"入口 | 全站 | 首页 hero 下方加"继续上次：Hiragana · 7/10" |

### P3（细节）

- `nav-bar/index.tsx:72-78` 图标尺寸 `w-7 h-4`（7:4 拉伸变形），应为 `w-4 h-4`。
- `page-content.tsx:210、218、226` "Learn More →" 硬编码英文（未走 `t()`）。
- `page-content.tsx:205-228` 三个文章卡分别跳 `/learn`、`/learn`、`/quiz` —— 都叫 "Learn More" 但落点不同，且前两个不直达具体文章。
- `page-content.tsx:179-189` "Learn Hiragana" 与 "Learn Katakana" 都跳同一个 `/hiragana-katakana-chart`（无锚点/无 tab 参数）。
- `NotFound` / `QuizPanel` 的 `min-h-[650px]` 在小屏制造空白滚动。
- 无 `lang` 的 `<html>` 之外，`<html>` 上的 `className="scroll-smooth"` 在 reduced-motion 下也应关闭（见 P2-2）。
- 首页 hero H1 两个 `<span>` 之间无空格，屏幕阅读器会读成 "AI-PoweredFree"（线上 HTML 已核实）。

---

## 5. 无障碍检查清单（WCAG 2.2 AA）

图例：✅ 通过｜⚠️ 部分/需复核｜❌ 不通过｜— 不适用

| SC | 项目 | 结论 | 证据 / 说明 |
|---|---|---|---|
| 1.1.1 | 非文本内容 | ✅ | 抓取到的 9 个页面（首页/练习/图表/列表/文章/登录/聊天）均 **0 个 `<img>`**（`grep` 统计），图标均为 lucide SVG；Google 图标有 `aria-hidden`（`AuthForm.tsx:172`） |
| 1.2.x | 音视频 | — | 无媒体；无字幕需求 |
| 1.3.1 | 信息与关系 | ❌ | 五十音图 `<table>` 无 `caption`/`thead`/`th`（`gojuon-table:64-99`）；9 张配置卡无语义（`div`） |
| 1.3.2 | 有意义的顺序 | ✅ | DOM 顺序合理 |
| 1.3.4 | 方向 | ✅ | 无横竖屏限制 |
| 1.4.1 | 不只靠颜色 | ❌ | 对错只靠绿/红 + 蜂鸣；无 ✓/✗ 文本（spelling 有 ✓/✗，choice 无）；选项选中只靠蓝框 |
| 1.4.3 | 对比度（4.5:1 / 大字 3:1） | ❌ | 见 P0-8 表格（1.41–3.76:1 多处） |
| 1.4.4 | 200% 缩放 | ⚠️ | 未验证；固定 `min-h-[650px]`、`text-6xl` 有溢出风险 |
| 1.4.5 | 文本图像 | ✅ | 无文字位图 |
| 1.4.10 | 重排（320px） | ❌ | matching `grid-cols-4`（`matching:219`）、52 卡配置网格在 320–375px 过密 |
| 1.4.11 | 非文本对比度 3:1 | ⚠️ | `border-gray-200` 卡片边框对白底 1.5:1；选中态 `border-blue-500` 达标【推断】 |
| 1.4.12 | 文本间距 | ⚠️ | 未验证；无 `!important` 行高锁定，风险低 |
| 1.4.13 | 悬停/聚焦内容 | ❌ | 五十音图 romaji 仅 `group-hover`（`gojuon-table:26`），键盘/触屏无 |
| 2.1.1 | 键盘 | ❌ | 配置卡（`QuizPanel:78/99`）、表格单元格（`gojuon-table`）、logo（`nav-bar:86`）均不可聚焦 |
| 2.1.2 | 无键盘陷阱 | ✅ | 无焦点陷阱实现（移动菜单也无 trap，但可 Tab 走） |
| 2.1.4 | 字符快捷键 | — | 无快捷键 |
| 2.2.1 | 计时可调 | ✅ | 无计时限制 |
| 2.2.2 | 暂停/停止/隐藏 | ❌ | 答题自动推进（0ms / 1500ms）不可暂停、不可延缓 |
| 2.3.1 | 三次闪烁 | ✅ | 无闪烁 |
| 2.4.1 | 跳过重复块 | ❌ | 无 skip link，导航在每页重复 7 项 |
| 2.4.2 | 页面标题 | ✅ | 各页有 `generateMetadata` |
| 2.4.3 | 焦点顺序 | ⚠️ | 基本合理；答题后焦点丢失（P1-4） |
| 2.4.4 | 链接目的 | ⚠️ | "Learn More →" 多处同文案不同落点（P3） |
| 2.4.6 | 标题与标签描述主题 | ⚠️ | 答题中无 h1；`Select Kana Type` 用 h3（P1-13） |
| 2.4.7 | 焦点可见 | ⚠️ | `Button` 基类 `button.tsx:10` 未定义 `focus-visible`，依赖浏览器默认 outline；深色底上可能不可见 |
| 2.4.11 | 焦点不被遮挡（2.2 新增） | ⚠️ | fixed 导航 `h-16` + `scroll-smooth`，Tab 到页首元素时可能被遮挡【推断，需键盘实测】 |
| 2.5.1 | 单指/多点手势 | ✅ | 无复杂手势 |
| 2.5.7 | 拖动运动 | ✅ | 无 |
| 2.5.8 | 目标尺寸（24×24 最小） | ⚠️ | 配置卡足够大；五十音图单元格在 320px 下约 40×40【推断】；汉堡按钮 `p-2` + 24px 图标 ≈ 40px ✅ |
| 3.1.1 | 页面语言 | ❌ | 嵌套 `<html>` → `/de` 等实际 `lang="en"`（P0-1） |
| 3.1.2 | 局部语言 | ❌ | 全站 0 处 `lang="ja"`（P0-2） |
| 3.2.1 | 聚焦时无上下文变化 | ✅ | 无 onfocus 跳转 |
| 3.2.2 | 输入时无上下文变化 | ✅ | 无 |
| 3.2.3 | 一致的导航 | ✅ | NavBar 全站一致（但 `currentTab` prop 实际未被使用，`main-layout.tsx:92-100` 靠 pathname 推断） |
| 3.2.4 | 一致的标识 | ✅ | 页脚/导航一致 |
| 3.2.6 | 一致的帮助（2.2 新增） | ❌ | 无任何帮助/联系入口存在于答题流程（页脚 Contact 在页面最底部） |
| 3.3.1 | 错误识别 | ❌ | 认证错误未绑定到字段；quiz 无错误态；`QuizResult` 的错误信息中文硬编码（`index.tsx:62`）却渲染英文文案（`:155`） |
| 3.3.2 | 标签或说明 | ⚠️ | 认证有 `<label>` ✅；quiz 输入框只有 placeholder（`dictation:219`、`spelling:211`），无 `<label>` |
| 3.3.3 | 错误建议 | ❌ | 只有 "Incorrect!"，无正确项提示 |
| 3.3.7 | 冗余输入（2.2 新增） | ⚠️ | 注册后无进度导入；无重复填写场景 |
| 3.3.8 | 可访问认证（2.2 新增） | ✅ | 无验证码/无认知测试；邮箱密码可粘贴 ✅ |
| 4.1.2 | 名称、角色、值 | ❌ | `div` 模拟单选（P0-3）；汉堡按钮无可访问名称；`Progress` 无名称（P1-3）；`<Select>` 触发器名称仅 "EN" |
| 4.1.3 | 状态消息 | ❌ | 无 `aria-live`；对错、进度、加载都不播报 |

**结论：AA 级共 12 项失败、10 项部分/待复核。** 这不是"补几个 aria 属性"的量级，而是交互结构（配置卡、表格单元格、自研进度）需要替换为语义控件。

---

## 6. 移动端与响应式专项

**已核实的类名层面问题：**

1. **双层 container**：`MainLayout` `px-4` + 页面 `container px-4` + 卡片 `p-8` → 窄屏内容区 ≈247px（P1-11）。
2. **matching `grid-cols-4` + `h-32 text-3xl`**（`:219`）在 375px 下每格 ≈50px 宽，拗音溢出（P1-12）。
3. **五十音图**：`grid-cols-1 lg:grid-cols-2`，每个表 5 列，`p-0.5` 单元格；`romajiText` 仅 hover → **触屏永远看不到罗马音**（P1-8）。
4. **固定导航 `h-16` + `main mt-16`**：`login/register` 页面自己又是 `min-h-screen flex items-center` + `py-12`，在移动端可能出现双重留白与内容被顶出（【推断】）。
5. **触控目标**：选项按钮 `size="quiz"` `h-16 w-full`（`button.tsx:53`）✅；提交/提示按钮 `px-8 py-2` ≈ 40px ✅；ThemeToggle `h-9 w-9` = 36px ⚠️（低于 44px 推荐，仍满足 24px 最小）。
6. **字号**：`text-[10px]` 用于表格 romaji 与 logo 的 `かな`（`nav-bar:94`）→ 10px 在手机上不可读（WCAG 无硬性下限，但可读性差）。
7. **无 `dvh` 处理**：`min-h-screen` 在 iOS Safari 地址栏下会被截（P3）。

**建议的移动端最小改动（按收益排序）**：① 配置页 Start 固定底部；② romaji 常显；③ matching 改 2 列；④ 去掉一层 padding；⑤ 结果页分数用 3 秒内可读完的卡片布局（当前 `space-y-6` 纵向堆叠 + AI 分析长文，手机需滚动 3 屏）。

---

## 7. 国际化（i18n）专项

| 问题 | 证据 | 影响 |
|---|---|---|
| **lang 失效** | 见 P0-1 | 5 个语言里 4 个的页面语言错误 |
| **Quiz 区 100% 英文** | 见 P1-10；`messages/*.json` 的 `QuizPage.*` 未被使用 | 非英语用户的核心任务语言断裂 |
| **首页英文根页硬编码** | `src/app/page.tsx` 全文英文字面量（`AI Tutor`、`Master Both Kana Systems`、FAQ…） | 英文用户拿到的是"另一个实现"，与 `/de` 版内容不一致 |
| **首页/页脚部分未翻译** | 线上 `/de` 实测仍含 `Master Both Kana Systems`、`Learning Guides`、`Quick Links`、`Friend Links`、`Learn More`（`page-content.tsx:171、202、210`；`footer.tsx` 无 `useTranslations`，而 `messages` 里**有 `Footer` 键**） | 德语页 30% 英文，信任受损 |
| **Chart/Quiz SEO 区块硬编码** | `chart/page-content.tsx:31-41`、`:55-193` 全文英文；`quiz/page.tsx:26-88` 英文 | 非英语页出现整段英文 |
| **文章仅英文** | `src/data/articles.ts` 标题/描述英文；`learn/[slug]` 直接渲染 | `/de/learn` 列表是英文文章，但页面 `lang` 仍是 de |
| **语言切换器** | `language-switcher.tsx:31-49` 手写 path 拆分、`useRouter` 用 `next/navigation` 而非 i18n 版；`defaultValue` 非受控 | 切换后无过渡反馈；URL 是 `/de/...` 时正确，但**在 `/` 切到 DE 会得到 `/de`**（正确）；术语 `EN/DE` 无语言全名（可选） |
| **日期/数字格式** | `footer.tsx:76` `new Date().getFullYear()` 构建期求值 | 无大影响 |

**结论**：i18n 只做到了"页面骨架 5 语言"，**核心学习流程与信任区域仍是英文**。建议把 i18n 作为一次独立冲刺：所有文案迁移到 `messages/*.json`，CI 加"源码中禁止英文字面量"的 ESLint 规则（至少覆盖 `src/features/**`）。

---

## 8. 信任、商业化与视觉一致性

1. **页脚 "Friend Links" 9 个 + "Support" 6 个外链**（`footer.tsx:42-69`）指向 grok-ani.com、ramen.tools、ffs.com、rollit.io、markitdown.tech 等与日语学习无关的站点。对学习者/家长而言这像**链接农场**，直接削弱可信度；对 SEO 也是外链权重流失。**建议只保留 3–5 个相关伙伴，其余移到 `/partners` 独立页。**
2. **广告**：源码中**没有**任何手动广告位（`grep 'ins class="adsbygoogle"'` = 0；线上 HTML 同样 0）。所以"广告位插在答题流程中"的怀疑**在代码层面不成立**（✅ 这是当前设计的一个优点）。但 AdSense 脚本在 `<head>` 加载，若后台开启 **Auto Ads**，Google 可能自动插入答题区——**这属于【无法核实】**，需登录 AdSense 后台确认；建议在 `/hiragana-katakana-quiz` 页面加 `<IsAutoRelaxedAdsAllowed>` 排除或使用 `data-no-auto-ads`，并在答题容器加 `google-anno-skip` / `data-nosnippet` 保护。
3. **构建期重复脚本**：locale 页面同时由根布局与 locale 布局注入 GA/AdSense（线上实测 2 个 `<head>`、2 个 `adsbygoogle.js`、2 个 `gtag`）→ 统计重复计数、LCP 变差。随 P0-1 一并修掉。
4. **性能与核心体验**：`QuizPanel` 用 `dynamic(ssr:false)` 懒加载（`quiz/page-content.tsx:9-22`），首屏会有 spinner + 文案（无骨架）。`_next/static/chunks/*` 首个 CSS 与 JS 体积未测（【无法核实】），但 10 个第三方分析脚本（GA/Clarity/AdSense/Umami/Vercel Analytics）叠加在移动端值得做一次 Lighthouse 复核。
5. **设计一致性**：首页/Chart/Learn/Quiz 各用一套"大色块 + `-skew-y-6` + `rounded-3xl` + 渐变标题"的装饰模式，视觉语言统一 ✅；但**颜色语义泛滥**（蓝=Quiz、黄=Chart、绿=Learn、紫=Analyzer），且这些颜色同时被用作正文/标题色 → 正是对比度失败的来源。
6. **深色模式**：`next-themes` + `darkMode:"class"` 配置正确 ✅；`ThemeToggle` 有 `sr-only` 名称 ✅，但挂载前渲染空按钮（`theme-toggle.tsx:13`，无名称，可接受）。**深色下 `border-gray-200`（浅灰）未配 dark 变体**（`QuizPanel:85、106`），深色卡片边框会过亮（【推断】）。
7. **空/错误状态**：Chat 接口失败会插入一条助手消息 "An error occurred. Please try again later."（`chat/page-content.tsx:115`）✅ 有提示但**无重试按钮**、无 `role="alert"`；`/api/analyze` 失败时 `QuizResult` 显示英文硬编码，而 catch 里写的是中文（`index.tsx:62` vs `:155`）❌。Chat 输入框无 label（只有 placeholder）。

---

## 9. 最值得做的 10 件事（按对激活/留存的影响排序）

| # | 事项 | 影响 | 成本 | 建议做法 | 成功指标 |
|---|---|---|---|---|---|
| 1 | **修文档骨架 + `lang`**（P0-1/P0-2） | 🔥🔥🔥 影响 4/5 用户 + 全部 AT 用户 | S（1–3 天） | 删根布局 html/body，统一 `[locale]`；假名包 `<span lang="ja">` | 非英语页 `<html lang>` 正确；Lighthouse a11y +15 分 |
| 2 | **配置卡改原生 radio + 默认值显式化**（P0-3） | 🔥🔥🔥 解锁键盘/屏读用户 | S（0.5–1 天） | `<fieldset><legend><input type=radio>` + 蓝色 focus ring | 键盘可完成全部 4 种题型 |
| 3 | **答题反馈重构：停顿 + 正确答案 + `aria-live` + 下一题**（P0-4） | 🔥🔥🔥 教育产品的地基 | M（2–4 天） | `useQuiz` 拆 `submitAnswer`/`next`；反馈卡 `role=status` | 答题正确率提升；错题复习点击率 |
| 4 | **四种题型统一结果页 + 修计分/错题内容**（P0-5/6/7） | 🔥🔥 结果页到达率 50%→100% | M（2–3 天） | 结果页由 `QuizPanel` 统一渲染，题型只上报 `{score,wrong[]}` | `quiz_complete` 事件率；"再来一轮"点击率 |
| 5 | **localStorage 进度 + 连续打卡 + 错题本**（P1-6） | 🔥🔥 留存核心，无需登录即可做 | M（3–5 天） | `progress` 对象 + 首页"继续上次"卡片 + 结果页"复习错题" | D7 回访；连续练习 ≥3 天用户占比 |
| 6 | **首页 CTA 直达第一题（3 题摸底）**（P1-1 + IA） | 🔥🔥 激活漏斗 | M（2–3 天） | `/quiz?start=hiragana-choice` 跳过配置；配置收进"自定义"折叠 | `begin_quiz`→`first_answer` 转化 |
| 7 | **对比度批量修复**（P0-8） | 🔥🔥 所有用户可读性 + AA 合规 | S（1 天） | hero 文案加深色底板；渐变标题深色端；"Learn More" 用深色 | axe 0 color-contrast 违规 |
| 8 | **五十音图：常显 romaji + 卡片按钮化 + 表格语义**（P1-8） | 🔥🔥 最高频参考页 + 移动端致命 | M（1–2 天） | `<button>` 包单元格；`<thead><th scope>`；发音按钮独立 | 图表页停留/回访；移动端点击发音率 |
| 9 | **导航语义化 + 移动菜单 aria**（P1-9） | 🔥 可用性 + SEO | S（0.5 天） | `<Link>` + `aria-current`；`aria-expanded/controls` + Escape | 新标签页打开率；SR 导航可用 |
| 10 | **听写模式重做 + 语音降级**（P1-7 + P0-6） | 🔥 差异化卖点与公平性 | L（3–5 天） | 预录音频为主；TTS 探测失败降级；真听写 | 听写模式完成率 |

> 若只有 2 天：只做 1、2、7。若有一周：做 1、2、3、7、8。若有一个月：1→5、6、10。

---

## 10. 附录

### A. 建议的 i18n 键（`messages/en.json` 已有可直接复用）

`QuizPage` 现有键（`title/description/selectQuiz/startQuiz/question/of/correct/incorrect/yourScore/tryAgain/backToQuizzes`）**已足够覆盖 70% 的 quiz UI**，只需补齐：

```json
"QuizPage": {
  "kanaTypes": { "hiragana": "Hiragana Only", "katakana": "Katakana Only", "mixed": "Hiragana & Katakana", "special": "Special Combinations", "all": "All Characters" },
  "kanaTypesDesc": { "hiragana": "Basic Hiragana (あ、い、う…)", "...": "..." },
  "quizTypes": { "choice": "Single Choice", "spelling": "Spelling", "matching": "Matching", "dictation": "Dictation" },
  "quizTypesDesc": { "...": "..." },
  "progress": "Question {current} of {total}",
  "correctAnswer": "Correct answer: {answer}",
  "next": "Next",
  "reviewWrong": "Review your mistakes",
  "resume": "Resume last session ({current}/{total})",
  "noSpeech": "Your browser can't play Japanese audio. Switched to text mode."
}
```

同样的模式补到 de/fr/pt/es（`QuizPage` 已存在，只需增补键）。

### B. 可复现的验证命令

```bash
# 1) 嵌套 html（能复现 P0-1）
curl -s https://learnkana.pro/de | grep -o '<html[^>]*>'          # 两行
curl -s https://learnkana.pro/    | grep -o '<html[^>]*>'          # 一行（根首页）
curl -s https://learnkana.pro/de | grep -c '</head>'               # 2

# 2) 全站 0 处 lang="ja"（P0-2）
for p in / /de /hiragana-katakana-quiz /hiragana-katakana-chart /chat /learn; do
  echo -n "$p: "; curl -s "https://learnkana.pro$p" | grep -c 'lang="ja'
done

# 3) quiz 配置区是 div 不是控件（P0-3）
curl -s https://learnkana.pro/hiragana-katakana-quiz | grep -o 'cursor-pointer rounded-lg p-6 border-2' | head -2

# 4) 无手动广告位（§8）
curl -s https://learnkana.pro/hiragana-katakana-quiz | grep -c 'adsbygoogle'   # 仅脚本，无 ins
grep -rn 'ins class="adsbygoogle"' src/ || echo "no manual ad units"

# 5) 源码层证据
grep -rn "onClick={() => setSelectedDifficulty" src/features/quiz/components/QuizPanel.tsx
grep -rn "opacity-0 group-hover:opacity-100" src/features/kana/components/gojuon-table/index.tsx
grep -rn "localStorage" src/ | grep -v chat                    # 只有 chat
grep -rn "aria-live" src/                                      # 无
grep -rn "font-japanese" src/ tailwind.config.ts               # 用了但未定义
```

### C. 本次无法核实、需要真机/后台的项

1. **AdSense Auto Ads 是否开启**（决定广告是否真的会插进答题区）。
2. **iOS Safari / Android WebView 的 `speechSynthesis` 行为**（是否真的有日语语音、静音键影响）。
3. **真实视觉层级与折叠位置**（无截图能力，所有"折叠线下/过窄"结论均由类名+尺寸推导，建议用 375×667 真机复核）。
4. **实际转化率与流失点**（代码里没有 `begin_quiz`/`answer`/`complete` 事件，只有页面级 PV → 建议先补埋点再谈优化）。
5. **深色模式下所有对比度**（本次按浅色主题计算；深色下 `green-300`/`red-300` 组合需再算）。
6. **字体渲染**：`Noto_Sans_JP` 只请求 `subsets:['latin']`（`app/layout.tsx:10-14`、`[locale]/layout.tsx:13-17`），日文字形大概率走系统回退字体；同时 `font-japanese` 在 `tailwind.config.ts` 中**未定义**（只有 `sans`），所以 `gojuon-table:25`、`japanese-text-analyzer` 上的 `font-japanese` 是**无效类名**。→ 建议在 `tailwind.config.ts` 增加 `japanese: ['var(--font-noto-sans-jp)', '"Hiragino Sans"', '"Yu Gothic"', 'Meiryo', 'sans-serif']`，并重新评估字体子集策略。

---

## 11. 给人看的修复顺序（一页版）

**第 1 周（止血，全部为 S 级成本）**
1. 删掉 `[locale]/layout.tsx` 的 html/head/body（或删根布局），修 lang + 去重复统计脚本。
2. 假名包 `lang="ja"`（一个 `KanaText` 组件替换 6 处）。
3. 配置卡换原生 radio；默认值加文字说明。
4. 对比度：hero 文案加深色底、渐变标题加深、Learn More 改深色。
5. 修 matching 计分、dictation 结果页回跳、choice 的 `userAnswer` 写入。

**第 2–4 周（把"打分器"变成"练习循环"）**
6. 反馈重构（停顿 + 正确答案 + aria-live + 下一题 + 键盘 1–4）。
7. 统一四种题型的结果页与"再来一轮"。
8. localStorage 进度 + 首页"继续上次" + 结果页"复习错题"。
9. 五十音图 romaji 常显 + 单元格按钮化 + 表格语义。

**第 5–8 周（增长）**
10. 首页 CTA 直达第一题 + 3 题摸底 + 难度推荐。
11. 语音：预录音频 + 失败降级提示。
12. i18n 全量补齐（quiz + footer + chart + 首页重复实现合并）。
13. 埋点：`begin_quiz` / `answer` / `next` / `complete` / `resume` / `wrong_review_click`，用数据验证上面的【推断】。

---

*报告完。所有"已核实"项均可用附录 B 的命令复现；"推断"项已逐条标注，请勿当作视觉事实引用。*
