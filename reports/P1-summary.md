# Phase 1 交付与验收

> 提交：`b175e39`（已推到 `origin/main`）· CI：**success**（type-check + build + 32 项 smoke 全绿）
> 本地验证：`tsc --noEmit` exit 0 · `next build` exit 0 · `smoke 32/32 PASS`
> 生产状态：**已上线** — `https://learnkana.pro/api/version` → `12a20d0`（含 `b175e39` 全部 P1 代码）

## 一、交付内容

### 1. 最小 SRS + 进度持久化（新增 `src/lib/progress.ts`）
- localStorage 版本化存储 `learnkana.progress.v1`，按平假名为 key（片假名共用统计）。
- 掌握度 0–3：新学 / 见过 / 熟悉 / 已掌握（`correct ≥3 && streak ≥2 && 正确率 ≥80%` → 3）。
- 加权不放回抽题：答错过的权重 4、没见过 2、熟悉 1、已掌握 0.4 → 10 题优先打弱点。
- 四种题型全部写进度：`choice`（`useQuiz.submitAnswer`）、`dictation`（`answerQuestion`）、`spelling`（`handleSubmit`）、`matching`（配对成功时 `recordKanaResult`）。

### 2. 练习界面闭环
- 配置页新增进度卡：`X of N kana mastered` + 进度条 + 最弱 6 个假名 chips + `Start now` 按钮。
- 结果页新增掌握度小结（累计 mastered/total），保留错题回顾、SignupCTA、再来一轮、换假名。
- `TOTAL_QUESTIONS = 10` 统一常量。

### 3. 一键开练
- 首页 hero CTA → `/hiragana-katakana-quiz?start=hiragana`，**直接进第 1 题**（无配置页、隐藏页头）。
- 支持 `?start=katakana|mixed|special|all`，以及 `katakana-spelling` 这种带题型后缀；非法值回落配置页。
- `Start now` 按钮用当前已选配置立即开局。

### 4. Quiz 全量 i18n
- `QuizPage` 命名空间从 17 键扩到 **59 键 × 5 语言**（en/de/fr/pt/es 键集合完全一致，脚本校验）。
- `QuizPanel / QuizQuestion / QuizResult / dictation / matching / spelling` 内无硬编码英文残留；ICU 占位符（`questionOf`、`masteredCount`、`hintFirstLetter`）5 语言实跑校验。
- 拼写题保留 hint（`showHint/hideHint/hintFirstLetter`），键盘提示保留（`keyboardTip`），加载态复用 `Common.loading`。

### 5. 真·五十音「行 × 段」网格
- 按 romaji 末尾元音反推段位：5 列（あ/い/う/え/お），每行有行头（あ行/か行/…/わ行 + romaji）。
- や行 = `や · ゆ · よ`（a/u/o），わ行 = `わ · · · を`，空缺列留空对齐；ん 单独一行 `colSpan=5`；っ/ッ 不入网格（注记说明）。
- 语义化：`<th scope="col">` 段头、`<th scope="row">` 行头、`<caption class="sr-only">`；保留 tab、点击发音、`lang="ja"`、移动端 romaji 常显、button 可键盘聚焦。

## 二、上线前最后一步

生产域名的 promotion 没有自动发生（与 P0 时同一现象）：`b175e39` 的部署对象是 `Production` + `success`，但 `learnkana.pro` 仍返回 `8963f07`。

任选其一：
```bash
# A. Vercel 控制台：Deployments → 最新 b175e39 → ⋯ → Promote to Production
# B. 给我 CLI 权限（打开浏览器完成授权后告诉我）：
npx vercel login
```
完成后我会跑 `BASE_URL=https://learnkana.pro npm run smoke` 并贴 32 项结果。

## 三、浏览器手测清单（5 分钟）

1. 清掉 `localStorage.learnkana.progress.v1`，打开 `/hiragana-katakana-quiz`：配置页顶部显示 `0 of N kana mastered`、空进度条。
2. 首页 hero「Start the Quiz」→ 应**直接看到第 1 题**（地址带 `?start=hiragana`）。
3. 选择题故意答错 2 题 → 答后停住显示正确答案，Enter/Next 进入下一题；结果页显示分数 + 掌握度小结 + 错题「Correct answer / Your answer」。
4. 回配置页：出现刚才答错的假名 chips；刷新页面进度仍在。
5. 听写：TTS 正常时只给音频+4 选项；DevTools 里把 `speechSynthesis` 置 undefined 后刷新 → 出现降级提示 + 假名输入模式。
6. 匹配：`Progress / Score` 从 0/0 开始，满分 100，走完进结果页。
7. 拼写：`Show hint` → `Hint: it starts with "x"`；大小写/长音/别名判对。
8. `/hiragana-katakana-chart`：や行/わ行空格对齐、ん 独立行、Tab 可聚焦并回车发声、375px 不溢出。
9. 切 de/fr/pt/es：Quiz 全流程无英文残留，`Frage 3 von 10` 等 ICU 正常。

## 四、仍未做（Phase 2）

1. 文章 24 条事实纠错 + 罗马字统一规范。
2. 正文层 i18n（de/fr/pt/es 文章仍为英文）。
3. 笔顺动画（46+46）。
4. 真人音频替换 TTS。
5. 页面级 SEO 内容重建（去关键词堆砌、FAQPage/HowTo schema、sitemap lastmod）。
6. 性能：首页静态化 + CDN、追踪脚本再减、`/learn/[slug]` 310KB 首屏 JS。

## 五、线上验收（promotion 后）

```
$ curl -s https://learnkana.pro/api/version
{"commit":"12a20d0…","env":"production"}

$ BASE_URL=https://learnkana.pro node scripts/smoke.mjs
RESULT: PASS — 32/32 checks passed
```

P1 关键标记（生产实测）：
- 首页 CTA `?start=hiragana` ✅
- de/fr/pt/es 消息载荷含 `switchToHiragana` 等新键 ✅（`Frage {current} von {total}` ICU 已下发）
- 五十音图：每表 5 个 `th scope="col"` 段头 + 11 个 `th scope="row"` 行头（含 ん 行）✅
