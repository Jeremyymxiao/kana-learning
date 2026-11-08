# LearnKana.pro 日语教学内容体系审查报告

**审查角色**：日语教学专家（N1 / 10 年以上教学经验 / 熟悉 JF 标准、假名教学法、第二语言习得研究）
**审查对象**：https://learnkana.pro（线上）＋ `/Users/jeremyx/Documents/GitHub/kana-learning`（仓库 HEAD `0a0f2f5`）
**审查日期**：2026-11-07
**证据约定**：代码证据用 `文件:行`；线上证据用可复现 URL；仓库与线上不一致处已单独标注。
**方法**：通读假名数据层与全部练习组件、精读 12 篇文章（21 篇中）、核对线上 4 个页面文案、按学习科学逐项验证功能是否存在。

---

## 一、总评

### 4 / 10

**一句话诊断**：内容骨架（21 篇文章 + 四类练习 + 参考图表）已经搭起来，且个别文章质量确实不错；但数据层存在会把学生**教错**的罗马字错误，四种练习里有两种名不副实、一种几乎没有纠错反馈，营销文案宣称的间隔重复／自适应／笔顺动画／学习分析**一项都没有实现**——作为「可信任的假名学习产品」，目前不达标。

| 维度 | 分数 | 依据 |
|---|---|---|
| 假名数据准确性 | 3 / 10 | `っ` 罗马字为 `tsu`；`ぢ/づ` 两套数据互相矛盾；无 ゃゅょ 独立项、无 ー/ヴ/ファ 系 |
| 五十音图教学法 | 3 / 10 | 不是行×段网格；无列头/行标签；罗马字默认 opacity 0（触屏看不到） |
| 练习设计（四题型） | 4 / 10 | 题型齐全，但 Dictation 不是听写；选择题无可见纠错；评分体系不可靠；无错题重练 |
| 课程路径 | 2 / 10 | 无顺序、无入口引导、无「认读 vs 书写」区分、促音/长音/拨音无专项训练 |
| 学习科学落地 | 2 / 10 | 主动回忆部分做到；间隔重复、自适应、desirable difficulty、即时纠错均未落地 |
| 音频与书写 | 2 / 10 | 仅浏览器 TTS；无真人音；笔顺内容仅 7/46 字、无图无动画 |
| 内容事实准确性 | 4 / 10 | 精读 12 篇中发现 15+ 处事实错误（音高重音、`っ` 定义、假名拼写、词源） |
| 文案与实现一致性 | 2 / 10 | FAQ 5 条核心声称全部无代码支撑；同一页面内部自相矛盾 |

---

## 二、P0｜阻断性问题（会直接教错，必须先修）

### P0-1　`っ`（促音）被标成 `tsu`，与 `つ` 撞车

- **证据**：`src/data/gojuon.ts:142-145`
  ```ts
  // っ (小さいつ)
  [ { hiragana: 'っ', katakana: 'ッ', romaji: 'tsu' } ],
  ```
- **连带证据**：`src/features/quiz/hooks/useQuiz.ts:101-106` 用 `kana.romaji` 生成选项；`src/features/quiz/components/matching/index.tsx:96-118` 为每个 pair 生成一张罗马字卡片。
- **问题**：促音不是 `tsu`，它是「下一个辅音双写」的符号（`がっこう` = gakkou）。因为数据层给了它 `tsu`：
  1. 选择题 `kanaToRomaji` 出现「っ → tsu」这种错误正确答案；
  2. `romajiToKana` 出现「tsu → っ」与「tsu → つ」**两个都像对的选项**，只能活一个；
  3. 匹配题里会出现**两张内容都是 `tsu` 的卡片**（一张 つ、一张 っ），学生无法用任何规则匹配，只能试错；
  4. Dictation 的 TTS 会对「っ」单独发音（读成 tsu 或念「促音」），音值完全错误。
- **教学后果**：初学者第一次接触促音就建立错误概念（促音 = 一个音节 /tsu/），后期要拆掉重学；这属于「错误前置知识」，比不教更糟。
- **修复建议**：`っ` 不进入单字题池；新增 `type: 'sokuon'`，罗马字表示为双写辅音（`kko`），题目一律以词组形式出现（`がっこう`）。同时给数据加 `kind` 字段（seion / dakuon / handakuon / youon / sokuon / choon / hatsuon）。

### P0-2　两套假名数据源罗马字互相矛盾（`ぢ/づ`）

- **证据 A**：`src/data/gojuon.ts:170-171` → `ぢ = 'ji'`、`づ = 'zu'`
- **证据 B**：`src/constants/kana.ts:84-85` → `di: { kana: 'ぢ', romaji: 'di' }`、`du: { kana: 'づ', romaji: 'du' }`
- **附带**：`src/constants/kana.ts` 全文件**没有任何 import**（`grep -rn "HIRAGANA_TABLE\|KATAKANA_TABLE" src/` 零命中），属于死数据；但它的 `di/du` 是 Kunrei 式，混进了整体 Hepburn 体系（`shi/chi/tsu/fu/ji/sha/cha/ja`）。
- **问题**：同一个字符在项目里有两个「正确答案」。任何未来接入 `kana.ts` 的功能（转换器、分析器、聊天提示）都会与练习产生冲突。
- **教学后果**：日语的 `ぢ/づ` 在 Hepburn 中写作 `ji/zu`（与 `じ/ず` 同音），Kunrei 才写 `di/du`。把两套方案混用是教材级错误——学生会以为 `ぢ` 和 `じ` 是不同音，或反过来在输入法里打 `di` 却查不到。
- **修复建议**：确立唯一数据源（建议 `gojuon.ts` 演进为 `kana-data.ts`）；`ぢ/づ` 的 canonical 值用 `ji/zu`，另设 `aliases: ['di','du']` 只用于输入法容错；删除或迁移 `kana.ts`。

### P0-3　选择题「零可见纠错」——点完立刻跳题，正确答案从未展示

- **证据**：`src/features/quiz/hooks/useQuiz.ts:197-216` —— `submitAnswer` 在同一次 setState 里把 `currentQuestionIndex + 1`，并写 `isComplete`；`src/features/quiz/components/QuizQuestion/index.tsx:24-39` 靠本地 `isAnswered/isCorrect` 着色，但 `:18-22` 的 `useEffect(..., [question.id])` 会在新题到达时重置本地状态。
- **问题**：点击选项 → 父组件立即换题 → 子组件收到新 `question.id` → effect 清空 `isAnswered`。结果是：正确答案高亮、错误选项标红、「正确答案是什么」全部只存在不到一帧；唯一留下的反馈是 `playCorrectSound/playWrongSound` 的一声哔。
- **教学后果**：练习的价值 90% 来自「答错 → 立即看到正确答案 → 修正记忆痕迹」。现在这个闭环不存在，学生只知道自己「好像错了」，错在哪、对的是什么都不知道。这也是 FAQ 里「instant feedback」唯一可能的落点，而它并不成立。
- **修复建议**：反馈闸门——`submitAnswer` 只评分不前进；`QuizQuestion` 显示「✓/✗ + 正确答案 + 你的答案」，用户点「下一题」再 `next()`；错题自动进入本轮末尾重练一次。

### P0-4　「Dictation（听写）」不是听写，而是第二个拼写题

- **证据**：`src/features/quiz/components/dictation/index.tsx:198-199`
  ```tsx
  <div className="text-4xl font-bold mb-2">{questions[currentIndex]?.kana || ''}</div>
  <div className="text-sm text-gray-500">Type the romaji for this kana</div>
  ```
  以及 `:204-211` 的「Play Sound」只是一个可点可不点的按钮（`:33-41` 使用 `speechSynthesis`）。
- **线上文案**：<https://learnkana.pro/hiragana-katakana-quiz> 写「**Dictation — Listen and select the correct kana**」。
- **问题**：字号最大的是**假名字形本身**，指示语是「为这个假名输入罗马字」——这正是 `spelling/index.tsx:203` 做的事（`:203` 显示 kana + `:211` "Type the romaji..."）。两个题型的认知任务完全相同。
- **教学后果**：站点宣称覆盖「认读 / 听辨 / 拼写 / 匹配」四个通道，实际只有「看形→写音」一个通道被练了两次。「音→字」这个初学者最需要的映射（听到 `ka` 想到 か）完全没有训练；且学生可以永远不点 Play Sound 也拿满分。
- **修复建议**：Dictation 必须**隐藏字形**，只留音频按钮（可重播、可 0.7 倍速）；干扰项优先取易混音（`し/ち`、`つ/す`、`ふ/ほ`、浊音对）；答错后展示「你听到的是 か，你选了 が」并重播。

### P0-5　线上参考图表**缺少 `ん`**（与仓库不一致）

- **证据（线上）**：抓取 <https://learnkana.pro/hiragana-katakana-chart> 的 DOM，清音表格共 **45 个假名**，无 `ん`；片假名表格无 `ン`；HTML 中 `ん` 仅出现 1 次且在正文「46 fundamental characters from あ to ん」里。
- **证据（仓库）**：`src/data/gojuon.ts:139-141` 已有 `ん/ン`，且 `git log` 显示由 commit `88a80a2`「add missing kana characters」补入。
- **问题**：部署版本落后于仓库；更严重的是**同一页面自己打脸**——正文说 46 个，表格只有 45 个。
- **教学后果**：`ん` 是唯一不能独立成音节的假名，也是最容易被初学者忽略的一个。参考图表里没有它，学生查 `パン`（文章 `common-katakana-words.md:23` 正在教）时查不到 `ン`。
- **修复建议**：核对线上部署 commit（Vercel 重新构建）；加一条构建期断言：图表渲染数量必须等于数据层字符数，否则 CI 失败。

### P0-6　「五十音图」不是五十音图：没有行×段结构

- **证据**：`src/features/kana/components/gojuon-table/index.tsx:82-97`（及 123-138、152-167 等）按数组顺序逐格生成 `<tr>`，**没有列坐标**：
  ```tsx
  {gojuonData.seion.consonants.map((row, rowIndex) => (
    <tr key={rowIndex}>{row.map(char => <td .../>)}</tr>
  ))}
  ```
- **数据证据**：`gojuon.ts:120-124` や行只有 3 项（や ゆ よ）→ 渲染在第 1-3 列，而正确位置是第 1、3、5 列（a / u / o 段）；`gojuon.ts:134-137` わ行 2 项（わ を）→ 渲染在第 1-2 列，`を` 应在第 5 列（o 段）；`gojuon.ts:139-145` `ん` 和 `っ` 各自单独成行，占第 1 列。
- **线上可见证据**：<https://learnkana.pro/hiragana-katakana-chart> 的表格里 `や ゆ よ` 三格贴在第 1 列起，`わ を` 两格贴在第 1 列起——视觉上完全错位。
- **问题**：缺三样东西：① `あ い う え お` 列头（段）；② 行标签（あ行・か行・さ行…）；③ 空格占位（い/え 段的 や行空位、ゐ/ゑ 等）。点击行为只有 `speak()`（`:17-21`），没有「按行播放」「按段播放」「只练这一行」。
- **教学后果**：五十音图的教学功能不是「罗列 46 个字」，而是**让学习者看到元音列的规律**（か/さ/た/な 行的第 2 格都发 i），从而把 46 个孤立符号压缩成 10 行 × 5 段的矩阵记忆。现在它退化成一张列表，学生失去最重要的记忆支架；也无法支持「今天只学 か行」「先练 a 段」这类标准教学动作。
- **修复建议**：数据改为 `{ row: 'ka', col: 'a' }` 坐标 + `null` 占位渲染；表头加 `あ/い/う/え/お`；每行/列头可点击播放并高亮；加「隐藏罗马字」开关（默认显示——见 P2-1）。

---

## 三、P1｜严重问题（明显损害学习效果 / 宣称与实现不符）

### P1-1　罗马字方案全站不统一（Hepburn / Kunrei / 双写 / 长音符号混用）

| 位置 | 写法 | 体系 |
|---|---|---|
| `gojuon.ts:82,90,91,107,162` | shi / chi / tsu / fu / ji | Hepburn ✓ |
| `kana.ts:84-85` | ぢ=di / づ=du | Kunrei ✗ |
| `public/articles/writing-numbers-hiragana.md:95` | 3月 = `sangatu` | Kunrei ✗（同一行其余是 Hepburn） |
| `public/articles/hiragana-pronunciation.md:157,178` | `kuukoo` / `ryokou` | 双写 o ✗ |
| `public/articles/common-katakana-words.md:34-35` | `keeki` / `juusu` | 双写 ee/uu ✗ |
| `public/articles/katakana-loanwords.md:49,101` | `bīru` / `kōhī` | 长音符号 ✗ |
| `src/constants/kana.ts:295-299` | `ā ī ū ē ō`，且把「アー」当成独立词条 | 与全站冲突 ✗ |

- **教学后果**：学生在拼写题里不知道该打 `si` 还是 `shi`、`koohii` 还是 `kōhī`；跨文章同一个词两种写法（`コーヒー` 在 `common-katakana-words.md:52` 是 `koohii`，在 `katakana-loanwords.md:101` 是 `kōhī`）——这对正在建立「音↔形」映射的初学者是直接干扰。
- **修复建议**：定义 canonical = Hepburn（`shi/chi/tsu/fu/ji/wo`，长音用双写 `ou/uu/oo` 以匹配输入法），另建 `typingAliases`（si→shi、tu→tsu、hu→fu、zi→ji、di→ji、du→zu）只用于判题容错；文章统一按 canonical 重写长音。

### P1-2　拼写 / 听写的判题过于严格，正确输入会被判错

- **证据**：`spelling/index.tsx:134,137`（`currentAnswer.trim()` 只用于非空校验，比较时用未 trim 的原值）；`dictation/index.tsx:47` 只做 `toLowerCase()` 全等；`useQuiz.ts:193-195` 同样只 `toLowerCase()` 全等。
- **问题**：不接受 Kunrei 别名（`si`/`tu`/`hu`/`zi`）、不接受长音替代写法（`ou`/`oo`/`ō`）、不接受多余空格、大小写以外的任何变体。
- **教学后果**：这是典型的「false negative」——学生其实掌握正确，却被打红叉。它同时污染错题记录，进而污染 `QuizResult` 的错题复习与「AI 分析」（见 P1-5），形成错误诊断的连锁。
- **修复建议**：建立 `normalize(answer, expected)`：小写 → 去空格/连字符 → 展开 `ā→aa` 等 → 别名映射 → 比较；`QuizResult` 展示时给出「我们接受 shi/si 两种写法」。

### P1-3　没有任何记忆持久化 / 间隔重复（但首页声称「spaced repetition」）

- **证据**：全仓仅 `src/app/[locale]/chat/page-content.tsx:22,33,39` 使用 `localStorage`（聊天记录）；`useQuiz.ts` 无存储、无复习计划、无 `localStorage`/IndexedDB；`profile/page.tsx:76-89` 的三个统计是**硬编码字符串**「0 days」「0 quizzes」「0 sessions」。
- **营销证据**：`messages/en.json:177`
  > "Yes, our Hiragana & Katakana Quiz employs **spaced repetition** and active recall techniques proven by cognitive science... We've **collaborated with language learning experts**..."
- **自我矛盾证据**：`public/articles/memorize-katakana.md:113-118` 把 SRS 讲得很好，但建议是「**Use a flashcard app (Anki is the most flexible)** or the built-in quiz on this site」——而站内 quiz 并没有任何间隔算法；`memorize-hiragana.md:61` 同样写「Use SRS apps and tools」。文章等于在承认站内没有 SRS。
- **教学后果**：假名学习的关键不是「一次做 10 题」，而是「第二天、第四天、第七天各见到一次」。当前每次都是全新随机 10 题，学生练 50 遍也不会形成针对薄弱字的复习队列；且刷新即失忆，无法积累。
- **修复建议**：最小可用版（1-2 天工作量）：localStorage 存 `{kana: {seen, correct, lastSeen, interval, ease}}`；出题权重 = 到期未复习优先 + 错误率高优先；首页文案同步改为「错题优先复习」，或明确写「配合 Anki 使用」。

### P1-4　出题是「从全池随机 10 题」，没有掌握门槛、没有顺序、没有自适

- **证据**：`useQuiz.ts:85-88`（`shuffle(availableKana).slice(0, 10)`）；`QuizPanel.tsx:63-69` 的 5 个难度只是「假名类别」筛选，不是难度阶梯；`quiz types` 与顺序无关。
- **营销证据**：`messages/en.json:175`
  > "The quiz system **adapts to your learning pace, ensuring you master each character before moving to more complex ones**."
- **教学后果**：选 `special`（浊音+拗音）时，学生可能连 `か行` 都不熟就被丢进 33 个拗音里；没有任何机制检查「你 5 个元音都过了吗」。这与「master before moving on」完全相反，也违背 desirable difficulty 的基本原则（难度应略高于当前水平，而不是无关的随机难度）。
- **修复建议**：把难度换成「单元」：①あいうえお ②か行…⑩わ/を/ん ⑪浊音 ⑫半浊音 ⑬拗音 ⑭促音/长音/拨音；每单元正确率 ≥ 90% 才解锁下一单元；出题从「当前单元 + 到期复习」取。

### P1-5　「进度分析 / 每字掌握度 / 响应时间」不存在；「AI 分析」是通用 LLM 兜底

- **证据**：`profile/page.tsx:74-89` 硬编码 0；无成绩 API（`src/app/api/` 下只有 analyze/chat/convert/furigana/og/articles）；`QuizResult/index.tsx:110` 分数写死 `/100`。
- **营销证据**：`messages/en.json:183,185`
  > "...provides **detailed analytics** on your progress..."、"You'll get detailed analytics showing your **mastery level for each character, accuracy rates, response times**, and learning trends over time. Our **dashboard visualizes your progress with intuitive charts**..."
- **AI 分析的实际实现**：`QuizResult/index.tsx:23` POST 到 `/api/analyze`，`src/app/api/analyze/route.ts:20-35` 把错题拼成一段 prompt 发给 DeepSeek，**没有任何站内数据/罗马字规范作为约束**。
- **教学后果**：① 学生得不到任何「我哪几个字还不熟」的信号，只能靠总分；② `/api/analyze` 的模型可能输出 `si` 这类与站点 `shi` 冲突的罗马字，或对 `っ` 给出「tsu」的确认（因为错题数据本身就是错的），等于**用 AI 把错误再确认一遍**。
- **修复建议**：先做真实统计（每字尝试数/正确率/最近一次错误），再让 LLM 只做「基于这些统计的解读」，并把 canonical 罗马字表一起塞进 prompt；在统计落地前，把「详细分析/仪表盘」文案改成「本轮错题回顾」。

### P1-6　「笔顺动画 / 描红 / 笔画判定」完全没有；文章只覆盖 7/46 个字

- **证据**：全仓 grep `stroke` 只命中 SVG 图标与文案（如 `hiragana-katakana-chart/page-content.tsx:133` 的「Stroke Order」小标题），**没有任何笔画路径数据、canvas、动画组件**。
- **文章证据**：`public/articles/how-to-write-hiragana.md:41-77` 只写了 `あ い う え お か さ` 共 7 个字的文字描述，而且描述本身有错（如 `お` 第 3 笔写成「bottom curve」，实际是右侧的点，见第五节）。
- **metadata 证据**：`src/app/[locale]/learn/[slug]/metadata.ts:33-34`
  > title: 'How to Write Hiragana: **Complete Stroke Order** & Writing Guide'
  > description: '...detailed instructions for **all 46 basic characters**'
- **营销证据**：`messages/en.json:181`
  > "...features **dedicated stroke order practice modes with animated demonstrations and interactive tracing exercises**. The system **analyzes your stroke order** and provides instant feedback..."
- **教学后果**：认读与书写被彻底混为一谈。假名书写确实需要「笔顺 + 手写动作」，但站内连一张笔顺图都没有；学生以为买了这项服务（FAQ 原话），实际拿到的是 7 段文字。「书写是否达标」这个学习目标在系统里不存在。
- **修复建议**：短期：把 7 字扩到 46 字 + 每个字一张 SVG 笔顺图（分步高亮），明确标注「认读练习」与「书写练习」是两个入口。中期：接入 KanjiVG / 自绘路径做描红。在功能上线前，删除 FAQ 第 4 条的动画/判定声称。

### P1-7　评分体系互相矛盾，分数不可作为学习信号

| 位置 | 行为 |
|---|---|
| `useQuiz.ts:211` | 答对 +10，答错 +0（满分 100） |
| `dictation/index.tsx:57-64` | 答对 +10，答错 +0（但 `useDictationTest.ts:117` 版本是 −10） |
| `matching/index.tsx:123,153` | **初始 100**，每配对 +10 → 理论上限 200 |
| `QuizResult/index.tsx:110` | 显示 `{score}/100` → 匹配题会显示「200/100」 |

- **附带问题**：`matching/index.tsx:94,121` 用 `sort(() => Math.random() - 0.5)` 洗牌（有偏，非 Fisher-Yates，而同仓 `useQuiz.ts:68-75` 已有正确实现）；`:179-184` 错配只红 1 秒、不揭示正确配对；`:155` 用闭包里的 `matchedPairs` 判断完成。`useDictationTest.ts:33-35` 的 `addKatakana()` 只做了 `{...char}` 浅拷贝，**并没有把平假名换成片假名**，`:92-95` 的 `playSound` 还是 `console.log` TODO——该 hook 整个是死代码（无任何 import），但若将来接线会立刻出 bug。
- **教学后果**：分数是学生唯一的进度反馈。一个能显示 200/100 的评分系统会立刻摧毁学生对「进度」的信任；错配无正确答案展示则让匹配题退化为盲猜。
- **修复建议**：统一为「正确率 %」而非加减分；`QuizResult` 显示「答对 X / 10」；匹配题错配后高亮正确配对再翻回；删除或修复死代码 hook。

### P1-8　学习内容只有英文，5 个界面语言实际只翻译了「外壳」

- **证据**：`QuizPanel.tsx:56-69` 的题型/难度名称与描述全部硬编码英文；`QuizResult/index.tsx:69-100` 同样硬编码；`gojuon-table/index.tsx:40,47,54` 的表头硬编码「清音 / 濁音 / 拗音」+ 英文 `Seion/Dakuon/Yōon`（既非本地化，也非统一语言）；21 篇文章只有英文（`public/articles/*.md`），`/learn/[slug]` 无本地化内容。
- **教学后果**：de/fr/pt/es 用户（`messages/*.json` 存在）进入学习流程后，面对的仍是英文练习题和英文文章。对西语/葡语母语者尤其不利：他们的 L1 音系与日语的重叠方式和英语母语者不同（如西语 `r` 是闪音，反而更接近日语 ら行；葡语有 nasal vowel，对 ん 的理解路径不同），用英文注释反而增加一层中介。
- **修复建议**：至少本地化 quiz 的 UI 文案与选项说明；文章标题/摘要本地化；或在非英语 locale 下明确提示「学习内容目前仅提供英文」。

---

## 四、P2｜中等问题（体验与教学质量损耗）

### P2-1　图表罗马字默认不可见 → 手机用户永远看不到

- **证据**：`gojuon-table/index.tsx:26`
  ```tsx
  romajiText: "... opacity-0 group-hover:opacity-100 transition-opacity"
  ```
- **问题**：罗马字靠 `:hover` 显示。触屏设备没有 hover → **移动端彻底看不到罗马字**；桌面端也无法扫读对照。
- **教学后果**：图表的核心信息是「形↔音」，而移动端是假名学习的主场景（碎片时间）。这个设计让图表在手机上退化成 46 个看不懂的符号。
- **修复建议**：默认显示罗马字，提供「隐藏罗马字（自测模式）」开关；触屏用 `active:` 或点击切换。

### P2-2　音频只有浏览器 TTS，且线上宣称「native audio」

- **证据**：`gojuon-table/index.tsx:17-21`、`dictation/index.tsx:33-41`、`src/hooks/useSpeech.ts`（未被引用）；`public/` 下无任何 `.mp3/.wav/.ogg/.m4a`；无 rate/pitch 控制、无重播历史、无录音对比。
- **线上证据**：`messages/en.json:162` → "Reference our Hiragana & Katakana Quiz charts with **native and nature audio** pronunciation"（"nature" 还是笔误）；<https://learnkana.pro/hiragana-katakana-chart> 的 Learning Tips 写 "Listen to **native** pronunciation for each kana character"。
- **问题**：TTS 不是真人音；不同 OS/浏览器音色差异巨大；Linux 或未装日语语音包的浏览器会静默失败（`gojuon-table` 没有 try/catch，也没有「无可用语音」提示）。
- **教学后果**：`ん` 的三种音值、`っ` 的促音、长音拍数、母音无声化——这些恰恰是 TTS 最容易读错、也最需要真人示范的地方。学生在最需要「听」的地方拿到的是合成音。
- **修复建议**：至少为 46×2 个假名 + 拗音录真人音（可用 OSS 语料如「日本語学習者向け音声」或自录）；在真人音就位前，把「native」改成「browser speech synthesis」并在无语音时提示。

### P2-3　课程路径不存在：/learn 是按发布日期的平铺列表

- **证据**：`src/app/[locale]/learn/page-content.tsx:45-74` 直接 `articles.map(...)` 渲染；`src/data/articles.ts:10-171` 的 `id` 顺序 = 发布顺序，与教学顺序无关（`katakana-basics` 排 id 11，在 10 篇平假名文章之后，而 `hiragana-basics` 在 id 1）。
- **问题**：没有「从这里开始」、没有前置/后续、没有等级标签、没有「认读 / 书写」分流、没有完成条件。入口只有导航栏（`nav-bar`）与首页卡片。
- **线上证据**：<https://learnkana.pro/learn> 只列 10 篇（线上版本止于 2025 年那批），更说明路径没有任何「课程」语义——加文章只是往后追加。
- **教学后果**：零基础学习者落地后不知道该点哪里、按什么顺序、什么时候算「过关」。
- **修复建议**：增加 `level`（BEGINNER/CORE/ADVANCED）+ `order` + `prereq` 字段；`/learn` 顶部放「零基础 7 天路径」卡片；把「书写」类文章（how-to-write-*）与「认读」类分开标注。

### P2-4　关键难点覆盖不足：促音 / 长音 / 拨音 / 无声化

- **证据**：仅 `hiragana-pronunciation.md:151-165` 用 3 行提到长音、3 行提到促音；`ん` 只有一句 "Nasal n sound"（`:123`）；**母音无声化（desu、shita、kitte 的 i/u 弱化）全站未提**；`ん` 在词尾/词中/词首的音值变化（m/n/ŋ/ɴ）未提；促音没有专项练习（数据层还把它标错，见 P0-1）。
- **教学后果**：这三个是中文/英语母语者学日语的真实卡点——促音拍数（`きて` vs `きって`）、长音拍数（`おばさん` vs `おばあさん`）、拨音同化。没有专项训练，学生会在「听不出差别」的阶段停滞很久。
- **修复建议**：新增「拍（mora）」专项：最小对立对听力（`おばさん/おばあさん`、`きて/きって`、`しゃしん` 的拍数）；数据层为 `っ/ー/ん` 建立 `choon/sokuon/hatsuon` 类型；文章补一段「んでんわ」类音变说明。

### P2-5　文章质量参差：空壳章节、主题重复、标题与内容不符

| 证据 | 问题 |
|---|---|
| `writing-numbers-hiragana.md:167-177` | 「Advanced Topics」下只有 3 行无内容 bullet（"Traditional counting methods" 等） |
| `writing-numbers-hiragana.md:129-139` | 「Digital Tools and Resources」列手机 App/闪卡/视频教程，但**没有任何链接** |
| `writing-numbers-hiragana.md:3` | 标题「如何用平假名写数字」——实际日语数字用汉字/阿拉伯数字书写，平假名只是读法，标题会误导学习目标 |
| `how-to-write-hiragana.md:41-77` | 只覆盖 7/46 字，标题却是 "Complete Stroke Order Guide" |
| `hiragana-basics.md` 全文 110 行 | 与前 10 篇内容高度重叠（`hiragana-practice` 299 行、`memorize-hiragana` 217 行都在讲同一批基础） |
| `articles.ts:29` 与 `:157` | `hiragana-vs-katakana` 与 `katakana-vs-hiragana-usage` 是同一主题的两个标题 |

- **教学后果**：学生在「Complete / Comprehensive」的标题下拿到的是半成品，会破坏对整站的信任；重复内容稀释学习路径。
- **修复建议**：给每篇加「预估学习时长 / 前置文章 / 学完能做什么」；空壳章节直接删除或补实；`how-to-write-*` 扩到 46 字之前改标题为「上册（7 字示范）」。

### P2-6　AI 聊天没有教学法设计，链接还会 404

- **证据**：`src/app/[locale]/chat/page-content.tsx:58-65` 的 system prompt：
  > "You are a professional Japanese language learning assistant... **Always respond in English** unless specifically asked to use another language. ... direct them to these features: Learning Materials: **/learn**、Practice Quizzes: **/quiz**、Kana Converter: **/converter**、Visual Charts: **/chart**"
- **问题**：① 硬编码英文输出，与 5 locale 体系冲突；② 指向 `/quiz`、`/converter`——`next.config.js` 只对 `'/chart'` 做了 redirect（`:107`），**`/quiz` 和 `/converter` 不存在，会 404**（已 `grep -n "'/quiz'\|'/converter'" next.config.js` 确认无匹配）；③ 没有等级控制（N5/N4/零基础）、没有纠错规则、没有脚本化练习、不要求用假名输出、不要求给罗马字标注规范、没有「不要直接给答案」的教学约束。
- **教学后果**：它本质上是一个套了「日语助教」皮的通用聊天机器人：会顺着学生的问题闲聊、可能输出错误假名（无数据校验）、可能给出与站内不同的罗马字；对「我这样写对不对」这类真实需求没有任何结构化处理。
- **修复建议**：system prompt 里注入：学习者等级、只用该等级假名、每次回复必须包含「你的句子的修正版 + 假名 + 罗马字（canonical 方案）」、纠错用固定模板、禁止替学生做题；修掉两个 404 链接；按 locale 切换回复语言。

---

## 五、内容事实纠错表（精读 12 篇，按严重度排序）

| # | 位置 | 现有内容 | 问题 | 应为 |
|---|---|---|---|---|
| 1 | `src/data/gojuon.ts:144` | `っ` → `romaji: 'tsu'` | 促音被当成一个音节 | 无独立音值；双写下一辅音（`kko`），或 `''` + kind=sokuon |
| 2 | `src/data/gojuon.ts:244` | 注释「じゃ、じゅ、じょ的发音与ちゃ、ちゅ、ちょ相同」 | じゃ /dʒa/ 是 しゃ /ʃa/ 的浊音，与 ちゃ /tʃa/ 无关 | 「じゃ行是しゃ行的浊音」 |
| 3 | `gojuon.ts:170-171` vs `kana.ts:84-85` | `ぢ=ji/づ=zu` vs `ぢ=di/づ=du` | 同仓两套答案 | 统一 `ji/zu`，`di/du` 仅作输入别名 |
| 4 | `public/articles/katakana-loanwords.md:107` | チョコレート = **chokoreēto** | 多了一个 e | chokorēto（或 chokoreeto） |
| 5 | `public/articles/katakana-loanwords.md:213` | 「シーズン … also used to mean seasoning / spice」 | 事实错误 | seasoning = シーズニング；シーズン 只有「季节」义 |
| 6 | `public/articles/katakana-loanwords.md:186` | コンセント ← **consent** | 民间词源；通行说法是 concentric plug | 标注「语源有争议，多认为来自 concentric plug」 |
| 7 | `public/articles/katakana-loanwords.md:137` | ジャーロ ← jarra（jar） | 非常用/可疑词形，且罗马字留空「—」 | 建议删除或换成 ジュバン/シャボン 等确有语源的词 |
| 8 | `public/articles/common-katakana-words.md:68` | ズボン ← French *jupon* | 通常归为葡萄牙语 jubão（法语 jupon 亦有一说） | 注明「葡语 jubão／法语 jupon，说法不一」 |
| 9 | `public/articles/common-hiragana-phrases.md:92` | **もすこし**まってください | 假名漏字（罗马字 `mou sukoshi` 是对的） | もうすこしまってください |
| 10 | `public/articles/common-hiragana-phrases.md:133` | 假名「**すみます**」对应罗马字 "**Shimizu** desu" | 假名与罗马字完全不对应；说话人标签用「び」表示 B | しみずです；标签用 びー／B |
| 11 | `public/articles/hiragana-pronunciation.md:159-165` | 「Small Tsu (っ) — **Glottal Stop**」 | 促音是辅音延长/拍，不是喉塞音（喉塞音只在句末/强调时出现） | 「促音：占一拍，把下一辅音拉长」 |
| 12 | `public/articles/hiragana-pronunciation.md:186-196` | 音高重音四型的例词 | **8 个例词至少 5 个错**：いぬ（尾高）列为头高；さくら（平板）列为头高；あたま（尾高[3]）列为中高；あめ「雨」（头高[1]）列为尾高；はし「橋」（尾高）列为平板 | 请以 NHK アクセント辞典为准重写：头高=あめ(雨)/はし(箸)；尾高=いぬ/はし(橋)；平板=さくら/やま；中高=こころ |
| 13 | `public/articles/hiragana-pronunciation.md:211` | 「❌ Adding vowels between consonants (e.g., strike → sutoraiku)」 | 表述误导：外来语中 `sutoraiku` 正是正确转写；问题在英语发音习惯，不在转写 | 改为「❌ 用英语辅音簇发音，✅ 按日语拍读 su-to-ra-i-ku」 |
| 14 | `public/articles/hiragana-pronunciation.md:65,81` | さ「like **sa** in saw」；な「like **na** in nasty」 | 英语参照词元音不对（saw /sɔː/、nasty /næ/） | 用元音更接近的词（如 `sa` 参照 Spanish/Italian 的 a），或直接给 IPA |
| 15 | `public/articles/writing-numbers-hiragana.md:95` | 3月 = **sangatu** | 混入 Kunrei | sangatsu |
| 16 | `public/articles/writing-numbers-hiragana.md:101-102` | 1000円 = **sen en**；10000円 = **ichiman en** | `ん`+元音未加撇号，与 `typing-hiragana.md:285` 自己教的规则冲突 | sen'en / ichiman'en |
| 17 | `public/articles/typing-hiragana.md:268` | **arigato** → ありがと | 非标准拼写（同文 `:111` 又写对了 arigatou） | arigatou → ありがとう |
| 18 | `public/articles/typing-hiragana.md:117-120` | macOS：Ctrl+K 片假名 / Ctrl+L 全角 / **Ctrl+J 半角 ASCII** | Apple 官方是 **⌃⇧K / ⌃⇧L / ⌃⇧J**（含 Shift），且 ⌃⇧J 是平假名，不是半角 ASCII | 按 Apple 官方键位修正（建议核对后再写） |
| 19 | `public/articles/typing-hiragana.md:64-65` | 「Alt+` 切换平假名/直接输入；Ctrl+Caps Lock: Same as above」 | MS IME 中 Ctrl+Caps Lock 是「切换为平假名输入」，不是「平假名/直接输入开关」 | 改写为各快捷键的实际行为 |
| 20 | `public/articles/how-to-write-hiragana.md:60-63` | お 3 笔：「1 上部弧线 2 中央交叉 3 **底部弧线**」 | お 的第 3 笔是右侧的点 | 第 3 笔为右侧点 |
| 21 | `public/articles/how-to-write-hiragana.md:41-77` | 「Complete Stroke Order Guide」只写 7 个字 | 与标题及 `metadata.ts:34`「all 46 basic characters」不符 | 补齐 46 字或改标题 |
| 22 | `public/articles/hiragana-vs-katakana.md:81` | 「あめ vs アメ = **rain vs candy**」 | 虚构对立：雨/飴 靠汉字区分；アメ 常作「アメリカ」缩写 | 改为「同音异义靠汉字区分」的正例（雨/飴 都写作 あめ） |
| 23 | `hiragana-katakana-chart/page-content.tsx:161-162` | 「46 basic + **25 voiced sounds (dakuten)** + 5 semi-voiced + 33 combinations」 | 浊音实为 **20**（が/ざ/だ/ば 各 5），25 是「浊音 20 + 半浊音 5」的和，此处重复计数；**同页 `:70` 自己写对了 20** | 46 + 20 + 5 + 33 = 104 |
| 24 | `hiragana-basics` / `katakana-basics.md:9` 等 | 「46 core characters」 | 数据层为 47（含 `っ`）或 45（线上缺 ん） | 口径统一为 46（`っ`/`ー`/`ん` 单列「特殊拍」） |

> 补充：`public/articles/hiragana-practice.md`（299 行）与 `katakana-practice.md`（388 行）中大量练习是「纸上练习」文字描述，不接入站内任何功能；建议与 quiz 联动（练习项直接给对应 quiz 链接），否则只是阅读材料。

---

## 六、FAQ / 营销声称 vs 实现：逐条核对

| # | 声称（原文位置） | 判定 | 证据 |
|---|---|---|---|
| 1 | 「**spaced repetition** and active recall... proven by cognitive science」（`messages/en.json:177`） | **完全没有** | 无任何 SRS 数据/算法/存储；`useQuiz.ts` 无持久化；文章反而建议用 Anki（`memorize-katakana.md:116`） |
| 2 | 「We've **collaborated with language learning experts**」（同上） | **完全没有证据** | 仓库无任何专家审校记录/署名；`/about` 也未列专家；文章中出现 `っ=glottal stop`、音高重音例词错误等，与「专家合作」不相符 |
| 3 | 「quiz system **adapts to your learning pace**，master each character before moving on」（`en.json:175`） | **完全没有** | `useQuiz.ts:85-88` 随机抽 10 题；无掌握判定、无解锁机制 |
| 4 | 「**dedicated stroke order practice modes with animated demonstrations and interactive tracing**... analyzes your stroke order」（`en.json:181`） | **完全没有** | 无笔画数据/动画/画布；`how-to-write-hiragana.md` 仅 7 字文字说明 |
| 5 | 「**detailed analytics** ... mastery level **for each character**, accuracy rates, **response times**, learning trends... dashboard visualizes」（`en.json:185`） | **完全没有** | `profile/page.tsx:76-89` 硬编码 0；无成绩 API；无图表组件 |
| 6 | 「**visual mnemonics**」（`en.json:175`） | **完全没有** | 全站无字形联想图/助记内容 |
| 7 | 「**progressive difficulty levels**」（`en.json:175`） | **部分有** | `QuizPanel.tsx:63-69` 有 5 个「假名类别」筛选，但不是难度阶梯（`special` 会把零基础直接丢进拗音） |
| 8 | 「instant feedback」（`en.json:175`） | **部分有** | 有提示音；但选择题的视觉纠错在换题瞬间被清掉（P0-3） |
| 9 | 「**native** audio pronunciation」（`en.json:162`；chart 页 `:144`） | **完全没有** | 仅 `speechSynthesis`；`public/` 无音频文件 |
| 10 | 「Real-time feedback system / **Adaptive difficulty adjustment** / Detailed performance analytics / **Customizable learning paths**」（`en.json:79-84`，About 页） | **完全没有** | 与 #1/#3/#5 同证 |
| 11 | 「AI-powered personalization... **custom learning paths**」（`en.json:157,183`） | **完全没有** | 聊天无个性化上下文，quiz 无路径 |
| 12 | 图表 FAQ「**2-4 weeks** 基础认读、6-8 weeks 完全掌握」（`chart/page-content.tsx:179-180`） | **需修正** | 与 `memorize-katakana.md:126`「3-4 周认读 46 个片假名」不一致；且未说明「每天多久」的前提，属营销化数字 |

**结论**：12 条核心教学声称里，**0 条「已有」，2 条「部分有」，10 条「完全没有」**。这不是措辞问题，而是产品承诺与交付内容的系统性偏离——对教育产品来说，这同时是信任风险和合规风险（可被视为虚假宣传）。

---

## 七、课程路径评估：从零基础到「假名过关」

**结论：不存在课程路径，只有内容仓库。**

现状：
1. **入口**：首页 4 张功能卡（Chat / Chart / Quiz / Converter）→ 没有「先学什么」的指引。
2. **顺序**：`/learn` 按 `articles` 数组顺序平铺（`learn/page-content.tsx:45-74`），该顺序 = 发布日期（`articles.ts:10-171`），不是教学顺序。
3. **分级**：无 level、无前置、无完成标准；difficulty 只有假名类别。
4. **认读 vs 书写**：完全不区分。`how-to-write-*` 是文字文章，quiz 里没有任何书写题；「过关」标准默认只有选择题正确率。
5. **关键难点**：促音/长音/拨音/无声化没有专门练习（P2-4），且在数据层就有错误（P0-1）。

一个零基础学习者今天在站内的真实路径是：首页 → 随便点进 Quiz → 选「Hiragana Only」→ 做 10 道随机题（看不清对错）→ 得 70/100 → 不知道下一步 → 去 `/learn` 看到 21 篇文章，按发布日期排列 → 读 `hiragana-basics` → 再回来做 10 道随机题。**这个循环里没有任何「掌握」判定，也没有任何针对薄弱字的回收机制。**

建议的最小课程骨架（可直接映射到数据字段）：

```
单元 1 元音 あいうえお        认读：听音选字 / 拼写     书写：笔顺图 + 描红
单元 2 か行・さ行             …
单元 3 た行・な行・は行        …
单元 4 ま行・や行・ら行・わ行   …
单元 5 ん・っ・ー（特殊拍）     ← 目前最薄弱
单元 6 浊音 20 / 半浊音 5
单元 7 拗音 33
通关条件：每单元「认读」≥90% 且「书写」自评完成；错题进入复习队列
```

---

## 八、学习科学对照：声称 vs 真实落地

| 原理 | 站内是否有 | 证据与说明 |
|---|---|---|
| **主动回忆（active recall）** | ✅ 部分 | 选择题/拼写/匹配都在做「从记忆取答案」，这是目前最大优点。但 `matching` 可盲试（无惩罚、无次数限制），回忆强度打折 |
| **间隔重复（spaced repetition）** | ❌ 无 | P1-3 |
| **交错练习（interleaving）** | ⚠️ 偶然 | 随机抽题确实「交错」了不同行/不同类别，但不是有意设计（`useQuiz.ts:85-88`），也没有「易混字对对碰」（し/ち、つ/す、ね/れ/わ）的刻意编排 |
| **desirable difficulty** | ❌ 无 | 难度由学生自选类别，与当前水平无关；无「略高于当前水平」的调节 |
| **即时纠错（immediate corrective feedback）** | ❌ 无（选择题） | P0-3；拼写/听写有 ✓/✗ 但没有正确答案展示（`dictation/index.tsx:223-235` 只显示 "Correct!/Incorrect!" 1.5 秒） |
| **提取练习的反馈闭环（错题重练）** | ❌ 无 | `QuizResult` 只列错题，不安排重练；`wrongAnswers` 只在本轮内存里 |
| **多重编码（形/音/义/书写）** | ⚠️ 部分 | 形（视觉）+ 音（TTS）有；书写/运动编码完全没有；语义几乎没有（练习全是孤立假名，没有词） |
| **可理解输入（comprehensible input）** | ⚠️ 部分 | 文章不错，但与练习脱节：文章教 `パン`，练习里只有孤立假名 |
| **间隔测试的自适应** | ❌ 无 | 无 |

**一句话**：站内真正做到的只有「主动回忆」一项，且被「无反馈 + 无复习」削弱到接近随机刷题。

---

## 九、教学内容层面最值得做的 8 件事（按投入产出排序）

### 1. 建单一数据源 + 自动化校验（半天，收益最大）
把 `gojuon.ts` 升级为唯一 `kana-data.ts`，每个字符带 `kind`（seion/dakuon/handakuon/youon/sokuon/choon/hatsuon）+ `row`/`col` + `romaji` + `aliases`。写一个脚本断言：①罗马字→假名双向唯一；②无重复 romaji（立刻会抓到 `っ=tsu`）；③行/段坐标无冲突；④字符总数 = 46 + 20 + 5 + 33。接进 CI（现在 `package.json` 无测试框架，加一个 `node scripts/validate-kana.mjs` 即可）。

### 2. 把五十音图做成真正的行×段网格（1-2 天）
列头 `あ い う え お`、行标签 `あ行…わ行`、`null` 占位、默认显示罗马字 + 「隐藏罗马字」自测开关、每行每列可点击整行/整段播放。这一步直接决定「五十音图」这个产品是否成立。

### 3. 给所有题型加「反馈闸门」（1 天）
提交 → 冻结界面 → 显示 `✓/✗ + 正确答案 + 你的答案 + 一句解释（如「し 读 shi，不是 si；输入法两者都接受」）` → 点「下一题」。选择题当前的「瞬时跳题」必须去掉。

### 4. 把 Dictation 重做成真正的听写（1-2 天）
隐藏字形、只放音频（可重播/0.7 速）、干扰项取易混音、答错重播并显示「你听到的是 か」。同时把四题型的定位写清楚：认读（choice）、拼写（spelling）、听辨（dictation）、配对（matching）。

### 5. 最小可用 SRS（1-2 天）
localStorage 每字 `{seen, correct, lastSeen, intervalDays}`；出题 = 「到期复习字」优先 + 「错误率高的字」次之 + 新字补齐到 10 题；`/learn` 记录上次进度。上线当天同步改 FAQ 文案。

### 6. 文章事实纠错 + 统一罗马字规范（1-2 天）
按第五节表格逐条修；音高重音章节要么按 NHK 辞典重写（并用音频示范），要么整节删除——**错误的重音标注比不教更糟**。统一 canonical 罗马字，并在每篇文章顶部声明「本页罗马字采用 Hepburn」。

### 7. 建「零基础 → 假名过关」路径（2-3 天）
按第八节的 7 个单元改造 quiz 入口；每单元一个页面：目标 → 认读练习 → 书写笔顺图 → 小测 → 通关。`/learn` 首屏放「从这里开始」。这一步会把「内容仓库」变成「课程」。

### 8. 营销文案与实现对齐（半天，法律/信任风险最高）
把第六节 12 条逐条改为真实能力。**必须先删**：spaced repetition、expert collaboration、stroke order animation、per-character mastery analytics、native audio、visual mnemonics；或改为「即将推出」。同时修掉 `messages/en.json:162` 的 "native and nature audio" 笔误，以及 chat prompt 里 `/quiz`、`/converter` 两个 404 链接。

---

## 十、附：核查方法与遗留问题

### 线上 / 仓库不一致（需运维确认）
- 线上图表缺 `ん`/`ン`（45 格），线上 Quiz 配置缺「All Characters」（`https://learnkana.pro/hiragana-katakana-quiz` 只有 4 个 kana type，仓库 `QuizPanel.tsx:63-69` 有 5 个），线上 `/learn` 只有 10 篇（仓库 20 篇）。**说明线上部署版本旧于仓库 HEAD**，建议核对 Vercel 的部署 commit，并在修完后重新部署验证。

### 未覆盖 / 建议下一轮审
1. **转换器 `/hiragana-katakana-converter`** 与 **文本分析器 `/japanese-text-analyzer`**（kuroshiro）：未审其转写是否用了与教学不同的罗马字方案（很可能用 kuroshiro 默认，与站内不一致）。
2. **`katakana-words-guide.md` / `common-katakana-words.md` 的词汇表**：未逐词核对（只抽检），建议用 Jisho/JMdict 批量校验拼写与词频。
3. **可访问性**：题型按钮无 `aria-label`，图表纯字符无语义朗读顺序；对「用键盘学习的用户」不友好。
4. **数据层缺少**：`ゔ/ヴ`、`ファ/フォ/ティ/ディ/ウィ/シェ/ジェ` 等外来音组合（文章 `katakana-loanwords.md:74,85` 正在教 `フォーク`、`ディスク`、`スマートフォン`，但图表/quiz 里没有对应组合，学生查不到）。
5. **未审**：`/api/convert`、`/api/furigana` 的假名输出正确性（可能同样存在 `っ` 独立成字的问题）。

### 证据可复现命令
```bash
# 数据层
grep -n "っ" src/data/gojuon.ts src/constants/kana.ts
grep -n "ぢ\|づ" src/data/gojuon.ts src/constants/kana.ts
grep -rn "HIRAGANA_TABLE\|KATAKANA_TABLE" src/ --include=*.ts --include=*.tsx   # → 无消费者
# 无 SRS / 无持久化
grep -rn "localStorage\|spaced\|interval\|ease" src/ --include=*.ts --include=*.tsx
# 无笔顺
grep -rni "stroke" src/ public/articles | grep -v "strokeWidth\|strokeLinecap\|strokeLinejoin\|stroke="
# 线上图表缺 ん（DOM 中清音表格只有 45 格）
curl -sL https://learnkana.pro/hiragana-katakana-chart | grep -c "ん"
```

---

*本报告只审查教学内容与练习设计，不涉及代码质量、SEO、性能与商业合规；源码未做任何修改。*
