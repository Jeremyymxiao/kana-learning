# LearnKana.pro 全站重审报告与迭代路线图

| 项目 | 内容 |
|---|---|
| 审查对象 | https://learnkana.pro（仓库 `kana-learning`，Next.js 15 App Router） |
| 审查日期 | 2026-11-07 |
| 审查角色 | 日语教学专家 + 网站分析专家 + UX 专家（三方独立审查后由 Lead 汇总） |
| 证据方式 | 线上 curl/HTML 实测 + 源码逐行阅读 + 本地 `type-check`/`build`/`next start` 复现 |
| 详细报告 | [教学审查](./pedagogy.md) · [网站分析](./site-analysis.md) · [UX 审查](./ux.md) |

---

## 0. 一页结论

### 综合评分：4 / 10

| 视角 | 得分 | 一句话 |
|---|---|---|
| 日语教学 | **4 / 10** | 骨架搭起来了，但数据层有会直接教错的罗马字错误，四种练习里两种名不副实，营销宣称的学习科学一项都没落地 |
| 网站分析 | **3 / 10** | **代码里已经写对了，但从来没上线**；线上那版又在架构层把 canonical / lang / 文档结构同时做错 |
| 用户体验 | **5 / 10** | 这是一个「选择题打分器」，还不是一个「学习产品」：答完即走、无讲解、无进度、无可回访资产 |

### 真正的诊断：不是「做得差」，是四条链同时断了

```
① 发布链断裂  → 仓库 2026-03/11 的修复（per-page metadata、hreflang、新页面、
                全字符 quiz、深色模式）全部没上线，生产停在 2025-11 的旧构建
② 文档骨架断裂 → 双 root layout 各渲染一次 <html>，产生嵌套 <html>/<head>/<body>；
                [locale]/layout 又把「语言首页」的 metadata 下发给所有子页
                → 95/100 条 URL 的 canonical 指向首页、lang 永远是 en、追踪脚本各 ×2
③ 学习设计断裂 → 答完立即跳题、不显示正确答案、无讲解、无进度持久化、
                无 SRS、无错题本；四种题型体验互相割裂
④ 增长/信任断裂 → 首页 0 个注册入口、0 个转化事件、AdSense 加载了但 0 个广告位、
                5 套追踪无 cookie 同意、Cookie Policy 是 18 词占位页
```

**关键判断：用户说「当时上线做得很差」——但线上这版其实比仓库里的代码差得多。**
`npm run type-check` 与 `npm run build` 在仓库 HEAD 均通过（exit 0），也就是说过去 8 个月做的 SEO/UX 修复**已经写好了，只是没部署**。所以第一优先级不是写代码，是**让代码上线**。

### 如果只做 3 件事

1. **修好发布链路，部署 HEAD**（0.5–1 天，零开发，收益最大）
2. **删掉重复的 root layout + 重复首页**（0.5–1 天，一次改动修 4 个 P0）
3. **给答题加「反馈闸门」**（0.5–1 天，从「打分器」变成「能学」的分水岭）

---

## 1. P0：最致命的 7 个问题

> 每条都附可复现证据。完整的 20 条 P0/P1 见三份详细报告。

### P0-1 生产 canonical 全站塌缩到首页 → 95/100 条 URL 不被当独立页面收录

```bash
$ curl -s https://learnkana.pro/hiragana-katakana-quiz | grep canonical
<link rel="canonical" href="https://learnkana.pro"/>
$ curl -s https://learnkana.pro/learn/hiragana-basics | grep canonical
<link rel="canonical" href="https://learnkana.pro"/>
$ curl -s https://learnkana.pro/de/learn | grep canonical
<link rel="canonical" href="https://learnkana.pro/de"/>
```

**根因**：`src/app/[locale]/layout.tsx:21` 有 `export { generateMetadata }`，而 `src/app/[locale]/metadata.ts:12` 里 canonical 的页路径写死为空串 `getCanonicalUrl(locale, '')` → 这套「语言首页」metadata 被该 locale 下**所有子页继承**。

**后果**：这不是「排名差」，是**主动告诉 Google 这 95 个页面都是首页的副本**。sitemap 提交 100 条，实际能被当成独立页面收录的只有 5 个语言首页。过去所有内容、外链、内链投入的搜索回报 = 0。

**修复**：删掉 layout 里的那一行 re-export（子页各自已有 `export { generateMetadata } from './metadata'`），部署后即生效。

### P0-2 生产部署落后仓库约 8 个月

| 能力 | 仓库 HEAD | 线上 |
|---|---|---|
| per-page metadata / canonical | ✅ | ❌ 全部退化到语言首页 |
| hreflang | ✅ 含 x-default | ⚠️ 有标签，但全部指向 5 个语言首页 |
| 服务端 SEO 正文（quiz 页） | ✅ | ❌ SSR 仅 161 词、0 个 H1 |
| `/japanese-text-analyzer` | ✅ | ❌ 404 |
| `/api/og`（动态 OG 图） | ✅ | ❌ 404 |
| 全字符 quiz / 深色模式 / 图表补 `ん` | ✅ | ❌ 无（线上图表仅 45 格，缺 `ん`/`ン`） |

**证据**：线上 sitemap `lastmod = 2025-11-18`；`.github/workflows/ci.yml` 只跑 `type-check` + `build`，**没有 deploy 步骤**，部署完全依赖 Vercel Git 集成，而它现在失效了。

**修复**：① 立刻在 Vercel 手动 deploy HEAD 并核对 commit hash；② 恢复 Git 集成或 CI 加 `vercel deploy --prod`；③ 加部署后冒烟断言（见 §5）；④ 加 `/api/version` 返回 commit sha + build time，让线上可自证版本。

### P0-3 双 root layout：嵌套 `<html>/<head>/<body>`，lang 永久 en，追踪脚本各加载 2 次

```bash
$ curl -s https://learnkana.pro/de | grep -o '<html[^>]*>'
<html class="scroll-smooth" lang="en">
<html lang="de" class="scroll-smooth">
```

除 `/` 以外的**所有页面**都有两套 `<html>/<head>/<body>`（`/` 是唯一例外，由硬编码的 `src/app/page.tsx` 提供，本身又是第二个首页——见 P0-4）。

**后果**：
- 外层 `lang="en"` 先出现 → de/fr/pt/es 的语言声明对浏览器、屏幕阅读器、翻译工具全部失效（WCAG 3.1.1 直接失败）
- GA ×2、AdSense ×2、Clarity ×2、Umami ×2、Vercel Analytics ×2 → 数据双倍污染
- 非法 HTML，React hydration 与第三方脚本行为不可预期

**根因**：`src/app/layout.tsx` 渲染完整文档，`src/app/[locale]/layout.tsx` 又渲染一次。
**修复**：让 `[locale]/layout.tsx` 成为唯一文档根（next-intl 标准做法），删除 `src/app/layout.tsx` 与 `src/app/page.tsx`，由 middleware 把 `/` rewrite 到默认 locale；所有追踪脚本只在唯一 layout 里挂一次。

### P0-4 两套首页 + `/en` 不重定向，稀释首页权重

`src/app/page.tsx`（硬编码英文版，动态渲染 `ƒ /`）与 `src/app/[locale]/page.tsx`（SSG `● /[locale]`）并存；`/` 与 `/en` 都返回 200。→ 同一个首页有 2 个 URL、2 套实现、2 份 SEO 信号，且 `cache-control: no-store` + `x-vercel-cache: MISS`，首页完全不走 CDN。

**修复**：删 `src/app/page.tsx`；`/en/*` 301 → `/*`；首页恢复静态生成与 CDN 缓存。

### P0-5 回答正确性是坏的：数据会教错、反馈看不见

- `src/data/gojuon.ts:144` 把促音 `っ`/`ッ` 的罗马字写成 `tsu` → 选择题出现两个 `tsu` 选项、匹配题出现两张都写 `tsu` 的卡、TTS 把促音读成「tsu」
- `gojuon.ts:170-171`（ぢ=ji / づ=zu）与 `src/constants/kana.ts:84-85`（ぢ=di / づ=du）互相矛盾；而 `kana.ts` 全仓**没有任何 import**，是一份死数据
- **选择题零可见纠错**：提交即跳题（`useQuiz.ts`），新题到达时清空着色（`QuizQuestion/index.tsx`），用户从未看见正确答案，只剩一声提示音
- **Dictation 不是听写**：`dictation/index.tsx` 直接把假名显示在屏幕上让你打罗马字，与 Spelling 重复，而配置文案写的是 "Listen and select the correct kana"
- **匹配题分数从 100 起算**，每对 +10 → 结果页显示 200/100

**修复**：见 Phase 1。这是「教学产品」与「打分器」的分界线。

### P0-6 Quiz 配置区不是可操作控件（a11y 阻断）

假名类型/题型选项是 `<div onClick>`（`QuizPanel.tsx:78/99`），没有 `role`、没有键盘处理 → 键盘用户与屏幕阅读器用户**只能做默认的 Hiragana + Single Choice**，其余选项不可达。全站 0 处 `lang="ja"`，假名会被英语语音库朗读。对比度实测失败（hero 1.51:1、quiz 渐变标题 2.54/1.92:1）。

### P0-7 变现与留存漏斗根本不存在

- 首页 SSR HTML 里指向 `/register`、`/login` 的链接数 = **0**；quiz 页内链只有 about/contact/chart/隐私/条款
- `src/lib/gtag.ts` 封装了 `event()`，**全站零调用** → 没有任何转化埋点
- AdSense 脚本加载了（且 ×2），但全站 `class="adsbygoogle"` 出现 **0 次** → 零收入，纯付性能与合规成本
- `/cookie-policy` 正文实测 **18 词**（`"This is the cookie policy page content..."`），却在无同意的情况下加载 5 套追踪脚本

---

## 2. 根因：四条断裂

### 2.1 发布断裂（最贵的一条）

`ci.yml` 无 deploy job + Vercel Git 集成失效 + 无部署后断言 = 修复可以「完成」但永远不生效。**这次事故能存活 8 个月，就是因为没有任何自动化断言在部署后说一句「canonical 错了」。**
另一个脆弱点：`next/font/google` 在构建时拉取字体，构建依赖外网（本次本地构建出现过 `ECONNRESET` 重试），CI/部署环境网络抖动会直接导致构建失败或超时，需查 Vercel 部署日志确认。

### 2.2 文档骨架断裂

两个 root layout 是「先有硬编码英文站、后加 i18n」的典型遗留：加 `[locale]` 时没有把文档根迁移过去，而是复制了一份。它同时污染了 HTML 合法性、`lang` 语义、追踪数据和 hydration。

### 2.3 学习设计断裂（教学视角的核心）

站点把「学习」简化成了「10 道随机选择题 + 一个分数」：

| 学习科学要素 | 线上实现 |
|---|---|
| 即时纠错（corrective feedback） | ❌ 答完即跳题，正确答案不可见 |
| 间隔重复（SRS） | ❌ 无复习队列、无调度 |
| 掌握度建模 | ❌ 无每字符掌握度、无错题池 |
| 难度递进 | ❌ 从全池随机抽 10 题 |
| 书写/笔顺 | ❌ 零实现（但 FAQ 声称有动画与描红） |
| 发音输入 | ❌ 只有浏览器 TTS，且线上文案声称 "native audio" |

而 FAQ/营销文案逐条核对结果是：**12 条教学声称中，0 条「已有」、2 条「部分有」、10 条「完全没有」**。这既是教学问题，也是信任与合规问题（消费者保护/广告真实性）。

### 2.4 增长与信任断裂

5 个界面语言里，**4 个语言的正文 100% 是英文**（`/de/learn` 列表标题是英文，文章正文也是英文）；50 条非英语文章 URL 属于纯重复内容。真正被翻译好的只有「外壳」（`messages/*.json` 键完整性 100%，且**不是机翻**——这一点值得肯定）。同时页脚挂了 13–15 条不相关站外链接（AI 工具目录站），有链接方案风险；Google 对「教育站点 + 大量无关外链」的信任评估会被拉低。

---

## 3. 三方视角速览

### 3.1 日语教学专家（4/10）

- **P0**：`っ=tsu` 数据错误；两套数据源 `ぢ/づ` 矛盾；选择题零可见纠错；Dictation 名不副实；线上图表缺 `ん`；五十音图不是「行×段」网格（や行 3 格挤在 1–3 列、わ行 2 格挤在 1–2 列，看不到元音规律）
- **P1**：罗马字方案全站混用（Hepburn/Kunrei/双写/长音符号四种写法并存）；拼写判题只做全等比较；无 SRS；随机出题无掌握门槛；「笔顺动画」零实现而 `how-to-write-hiragana` 只覆盖 7/46 字却标 "Complete"
- **24 条事实纠错**：音高重音章节 8 个例词至少 5 个错（いぬ/さくら 列头高、あたま 列中高、あめ雨 列尾高、はし橋 列平板）；`っ` 被定义成 glottal stop；`common-hiragana-phrases.md` 假名「もすこし」漏 う；`katakana-loanwords.md` 把「シーズン = seasoning」写成词源（编造）
- **8 件事排序**：① 单一数据源 + CI 校验 ② 真五十音网格 ③ 反馈闸门 ④ 重做听写 ⑤ 最小 SRS ⑥ 文章纠错 + 罗马字统一 ⑦ 7 单元课程路径 ⑧ 营销文案对齐

### 3.2 网站分析专家（3/10）

- **根因链**：双 layout → 嵌套文档 + lang 失效 + 追踪 ×2；layout 下发首页 metadata → 95 子页 canonical 塌缩；生产停在 2025-11 → 8 个月修复贡献为 0
- **量化**：100 条 sitemap URL 只有 5 个唯一 title；首页 689 词内「Hiragana & Katakana Quiz」出现 **24 次**（3.5% 词组密度）；quiz 页 SSR 161 词、0 个 H1；TTFB 0.38–0.73s；首屏 CSS 原始 ≈369KB（含 373 条 `@font-face`，CJK unicode-range 分片）、Next 报告首屏 JS 207–310KB
- **索引信号**：JSON-LD 每页 2 个 `WebSite` 实体重复；`SearchAction` 指向 `/search`（实测 404）；`inLanguage:["en","ja","zh-CN"]` 与真实 5 locale 不符；robots 在 `User-Agent: *` 段写了 `Disallow: *.xml`，自己屏蔽 sitemap
- **工程债**：5 组重复 API 路由（内容 diff 完全一致）；无 `error.tsx`/`not-found.tsx`；无任何测试；`vercel.json` 用已废弃 `routes` 字段；Firebase `measurementId` 与站点实际 GA 属性不是同一个

### 3.3 UX 专家（5/10）

- **旅程现状**：首页 1 次点击 → 配置页（5 张卡 + 4 张卡 + 按钮，667px 视口下 Start 在折叠线下【推断】）→ 2 次决策 → 第 1 题；答完立即跳题；中途退出全丢；结果页只有 choice 能正常到达
- **a11y**：WCAG 2.2 AA 逐项核查 12 项失败（3.1.1 lang、3.1.2 日文 lang、2.1.1 键盘、4.1.2 名称角色、4.1.3 状态消息、1.4.3 对比度等）
- **去留**：无进度持久化、无连续打卡、无错题本、注册无任何专属价值 → 用户没有回来的理由
- **10 件事排序**：① 文档骨架 ② 配置卡片改真控件 ③ 反馈闸门 + aria-live ④ 进度持久化 ⑤ 结果页统一并修坏 ⑥ 首页一键开练 ⑦ 真听写 ⑧ 进度可视化 ⑨ i18n 接正文 ⑩ 注册价值

---

## 4. 迭代路线图

> 排序原则：**先让已写好的东西生效（止血）→ 再让产品能学（正确性+反馈）→ 再让体验好学（路径+内容）→ 最后让用户留下来（留存+护城河）**。
> 工作量按 1 名熟悉该代码库的工程师估算。

### Phase 0 — 止血（72 小时内，~2 天）

目标：**把「已经写好的修复」送上生产，并让下次不会再无声失效。**

| # | 任务 | 主要文件 | 工作量 | 验收 |
|---|---|---|---|---|
| 0.1 | 手动 deploy HEAD，核对 commit hash；加 `/api/version` | Vercel 控制台 / `src/app/api/version/route.ts` | 2h | 线上 `/api/version` 返回 HEAD sha |
| 0.2 | 删除 `src/app/layout.tsx` 与 `src/app/page.tsx`，`[locale]/layout.tsx` 作为唯一文档根；追踪脚本各只挂 1 次 | `src/app/layout.tsx`、`src/app/page.tsx`、`src/app/[locale]/layout.tsx` | 4h | 每页 `<html>` 计数 == 1；`/de` 的 `<html lang="de">`；GA/Clarity/Umami/AdSense 各 1 次 |
| 0.3 | 删掉 `[locale]/layout.tsx` 的 `export { generateMetadata }` | `src/app/[locale]/layout.tsx:21` | 10min | 每个 URL 的 canonical == 自身 URL |
| 0.4 | 关掉 AdSense 脚本（0 个广告位时纯负收益）；追踪脚本改为同意后加载或用 cookieless 方案；补 Cookie/Privacy 正文 | `layout.tsx`、`cookie-policy`、`privacy-policy` | 3h | 无同意时无第三方 cookie；Cookie Policy ≥ 300 词且列全 5 个供应商 |
| 0.5 | 部署后冒烟断言进 CI（canonical / hreflang / html 计数 / 关键 URL 200 / LCP 预算） | `.github/workflows/ci.yml`、`scripts/smoke.sh` | 4h | 断言失败即阻断发布 |
| 0.6 | `robots.txt` 去掉 `Disallow: *.xml`；`/en/*` 301 → `/*` | `src/app/robots.ts`、`middleware.ts` | 1h | `/en` 返回 301 |

**Phase 0 结束时应看到的变化**：索引里能出现 95 个独立页面、德语页面真的被当德语、数据不再双倍、合规风险解除。这是整份报告里 ROI 最高的一段。

### Phase 1 — 能学（2 周，教学正确性 + 反馈闭环）

| # | 任务 | 主要文件 | 工作量 | 影响 |
|---|---|---|---|---|
| 1.1 | 单一假名数据源 + 构建期校验（假名/罗马字/重复/缺失，含 ゔ、ファ/ティ/ウィ 等外来音）；修 `っ=tsu`；统一 Hepburn（ぢ/づ 主标 ji/zu，附 di/du 别名）；删除死数据 `kana.ts` | `src/data/gojuon.ts`、`src/constants/kana.ts`、新增 `scripts/validate-kana.ts` | 1d | 消除「会教错」 |
| 1.2 | **反馈闸门**：答后停住，显示对错 + 正确答案 + 假名/罗马音对照 + 发音按钮 + 一句讲解；显式「下一题」或 Enter | `QuizQuestion/index.tsx`、`useQuiz.ts` | 1d | 从打分器变学习工具 |
| 1.3 | 配置卡片改 `RadioGroup`/`<button role="radio">`；`aria-live` 播报对错；所有假名加 `lang="ja"`；焦点管理；修复对比度 | `QuizPanel.tsx`、`globals.css`、`tailwind.config.ts` | 1–2d | 键盘/屏读用户可用；WCAG AA |
| 1.4 | 修 Quiz 正确性：真听写（只播音频、选项为假名）；匹配分数从 0 起；四种题型统一结果页；修 `userAnswer` 与 `romajiToKana` 正确答案标注 | `dictation/`、`matching/`、`QuizResult/`、`useQuiz.ts` | 1.5d | 四种题型体验一致可信 |
| 1.5 | 最小 SRS + 进度持久化：每字符 `{seen, correct, lastSeen, ease}` 存 localStorage（后续同步账号）；出题优先弱点；错题池 | 新增 `src/lib/progress.ts`、`useQuiz.ts` | 2d | 有「学习」而非「测试」 |
| 1.6 | 结果页重做：得分/正确率/用时、错题卡可点听音、[复习错题] [再来一轮] [换片假名]；不再回配置页 | `QuizResult/index.tsx` | 1d | 闭环 |
| 1.7 | 首页 CTA 一键开练：默认 Hiragana 清音认读，首题 1 次点击可达；配置作为「设置」入口 | `page-content.tsx`、`QuizPanel.tsx` | 0.5d | 激活率 |
| 1.8 | 真五十音网格：行×段，列头元音、行标签辅音、ん/っ 独立位；手机端 romaji 常显 | `gojuon-table/index.tsx` | 1d | 教学核心功能成立 |

### Phase 2 — 好学（4–6 周，内容 + 国际化 + 性能）

| # | 任务 | 说明 | 工作量 |
|---|---|---|---|
| 2.1 | 内容事实纠错 24 条 + 罗马字规范手册 | 按 `pedagogy.md` 第五节纠错表逐条改；全站统一 Hepburn（长音、双写、外来音） | 3d |
| 2.2 | 7 单元课程路径 | 清音按行 → 浊音/半浊音 → 拗音 → 促音/长音/拨音 → 片假名 → 外来音 → 综合测验；每单元 = 认读 + 书写 + 听辨 + 小测 | 5d |
| 2.3 | 正文层 i18n 决策 | 二选一：**(a)** de/fr/pt/es 只保留壳 + 英文正文并明确标注、canonical 指向英文版；**(b)** 翻译核心 10 篇并各自 canonical。禁止「英文正文 + 本地 canonical」 | 2d 或 15d |
| 2.4 | 笔顺：SVG 笔顺动画（kanjivg 类数据）+ 46+46 覆盖 | 首页 FAQ 已声称，补上或删掉宣称 | 5d |
| 2.5 | 真人音频替换 TTS | 92 个假名 + 拗音，自录或用可商用音源；TTS 仅作兜底 | 2d |
| 2.6 | 页面级 SEO 重建 | 每页唯一 title/desc/H1；去掉关键词堆砌；FAQPage/HowTo/BreadcrumbList；JSON-LD 去重、`SearchAction` 改真实搜索或删除、`inLanguage` 改真实 5 locale | 3d |
| 2.7 | 性能 | 首页恢复静态 + CDN；追踪脚本 5 → 1–2；字体子集/`display` 核验；`/learn/[slug]` 首屏 JS 从 310KB 降下来 | 3d |
| 2.8 | 转化漏斗 | 结果页加「保存进度（注册）」；注册权益明确（跨设备同步 + 每日目标 + 错题云同步）；接 `gtag.event()` 埋点 | 3d |

### Phase 3 — 留下来（季度，护城河）

1. **账号同步 + 每日目标 + streak + 邮件/Web Push 提醒**（有提醒才有回访）
2. **自适应出题**：基于掌握度与响应时间的 mastery model，替代「随机 10 题」
3. **能力外延**：假名学完 2–4 周就会流失，必须接 N5 词汇/句型/听力，否则天花板就是「一次性工具站」
4. **商业化**：AdSense 合规投放（**答题流程内绝对不放**）+ 订阅去广告；或纯捐赠/开源赞助
5. **质量基建**：Playwright E2E 覆盖「首页 → 答第一题 → 结果页 → 再练」；Lighthouse CI 预算；学习行为事件看板上线

---

## 5. KPI 与验证

### 技术健康（每周自动跑）

| 指标 | 现状 | 30 天目标 |
|---|---|---|
| canonical 正确率（canonical == 自身 URL） | 5% | 100% |
| hreflang 覆盖（每页 6 条含 x-default） | 0%（标签存在但指向错） | 100% |
| 每页 `<html>` 计数 | 2（除 `/`） | 1 |
| 唯一 title 数 | 5 / 100 | 100 / 100 |
| 可索引页面数（GSC） | 5 | 100+ |
| LCP（移动端） | 未测（CSS 369KB / JS 207–310KB） | < 2.5s |
| TTFB（首页，有 CDN） | 0.4–0.7s `MISS` | < 0.3s `HIT` |

### 学习效果（需先补埋点）

- `quiz_start` / `quiz_question_answered` / `quiz_complete` / `review_clicked` / `session_resume`
- 练习完成率（开始 → 10 题结束）≥ 60%
- 次日回访率 ≥ 25%（当前无任何回访理由，应从接近 0 起算）
- 错题复习率 ≥ 30%
- 每字符掌握度分布（用于验证 SRS 是否真的在工作）

### 增长

- GSC 点击/展现；被收录页面数
- 注册转化率（结果页 → 注册）≥ 3%
- 邮件订阅（如上线）

---

## 6. 明确不要做的事

1. **不要再堆 SEO 文案、不要加语言、不要买外链** —— 在 canonical 修好前，这些投入的边际收益都是 0。删掉页脚 13–15 条无关「友情链接/Support」外链（或移到 `/about` 并 `rel="nofollow"`）。
2. **不要在答题流程里放广告** —— 教育类产品，一次打断就流失；先修留存再谈变现。
3. **不要把浏览器 TTS 当唯一音频源** —— 音质和可用性都不可控，且与 "native audio" 的宣称不符（有合规风险）。
4. **不要继续维护两套假名数据** —— 合并成一份并在 CI 里校验，否则同类错误会反复出现。
5. **不要先做「AI 个性化」再补基础** —— 现在的 AI 分析是在坏数据上做总结；先让题目和反馈正确。
6. **不要在营销文案里保留未实现的功能宣称** —— 12 条声称 10 条完全没有，属于广告真实性问题，且 Google 的 helpful content 评估也会看。

---

## 7. 审查过程中的事实修正（保持严谨）

三方报告交叉核对后，Lead 修正了 2 处结论、澄清了 1 处归因：

1. **修正：「全站 0 条 hreflang」不准确。** 实测 HTML 中存在 `<link rel="alternate" hrefLang="...">`（5 条，React 输出为 camelCase，浏览器解析等价）。真正的问题是**这些 hreflang 指向 5 个语言首页而不是当前页面**，且缺 `x-default`。结论「hreflang 无效」成立，但「不存在」不成立——修复动作相同（删 layout re-export + 部署）。
2. **修正：「结果页无错题回顾」不成立。** `QuizResult` 确实有错题回顾，但实现是坏的：`useQuiz.ts` 推入的是没有 `userAnswer` 的旧对象（"你的答案"永远不显示），且所有题型都标 `Correct Answer: {romaji}`（romajiToKana 题的正确答案是假名）；另外只有 choice 能正常到达结果页。
3. **澄清归因：部署滞后不是「构建失败」直接导致。** 本次在仓库 HEAD 实测 `npm run type-check` 与 `npm run build` 均 **exit 0**（构建成功，产出 100 个静态页 + 全部 API 路由）。因此更可能是 Vercel Git 集成失效/未触发部署，而非 build 挂掉；但 `next/font/google` 构建期拉取字体确实存在网络重试，需查 Vercel 日志确认是否叠加了构建不稳定因素。

---

## 8. 附录：一键复现的验证命令

```bash
# 1) canonical 是否塌缩（应为自身 URL）
for u in / /hiragana-katakana-quiz /learn /learn/hiragana-basics /de/learn; do
  printf "%-32s " "$u"; curl -s "https://learnkana.pro$u" | grep -o 'rel="canonical" href="[^"]*"'
done

# 2) 嵌套 html / lang 失效
curl -s https://learnkana.pro/de | grep -o '<html[^>]*>'

# 3) 追踪脚本重复加载
curl -s https://learnkana.pro/de | grep -c 'adsbygoogle.js'   # 期望 1

# 4) 生产 vs 仓库版本差
curl -s -o /dev/null -w "%{http_code}\n" https://learnkana.pro/japanese-text-analyzer  # 期望 200
curl -s https://learnkana.pro/sitemap.xml | grep -m1 lastmod

# 5) 广告位是否存在
curl -s https://learnkana.pro/ | grep -c 'class="adsbygoogle"'   # 现状 0 = 加载了脚本但没投放

# 6) 本地复现（HEAD 构建通过）
npm run type-check && npm run build
```

---

### 结语

这个项目的**框架、组件、i18n 文案、文章深度、AI 流式对话**都有不错的基础，真正的失败不在「能力」，而在**工程纪律**：修复写好了没上线、上线了没有断言、宣传写了没实现、数据有两份、首页有两个。

好消息是：**最贵的三件事（发布链路、文档骨架、反馈闸门）加起来不到 3 天工作量，却能把站点从「索引里不存在」拉到「可以被正常收录、可以真正学东西」。** 建议按 Phase 0 → 1 严格执行，Phase 0 完成后再做任何内容投入。
