# P0 修复说明与上线步骤

> 修复日期：2026-11-08 · 仓库 HEAD 工作区（未提交）
> 验证方式：`npx tsc --noEmit`、`npx next build`、`next start` + `scripts/smoke.mjs`（32 项断言）

## 一、当前状态

| 检查 | 结果 |
|---|---|
| TypeScript `tsc --noEmit` | ✅ exit 0 |
| 生产构建 `next build` | ✅ exit 0（100 个静态页 + 全部 API 路由） |
| 本地冒烟 `node scripts/smoke.mjs` | ✅ **32/32 PASS** |
| 源码可上线 | ✅ 只差部署（本机 Vercel token 无效，无法代为部署） |

本地起服务：`npm run build && npx next start -p 3100`，另开终端 `BASE_URL=http://127.0.0.1:3100 node scripts/smoke.mjs`。

## 二、七条 P0 的修复对照

### P0-1 canonical 全站塌缩 ✅

- `src/app/[locale]/layout.tsx` 不再 `export { generateMetadata }`，改为**静态** `metadata`（只有 `metadataBase` + icons，明确注释「禁止在此声明 canonical/alternates/title/description」）。
- 每个子页保留自己的 `export { generateMetadata } from './metadata'`；缺 metadata 的若干路由（login/register/profile/settings/auth/terms）新增 `layout.tsx` 做 metadata 透传。
- 实测：`/`、`/hiragana-katakana-quiz`、`/learn/hiragana-basics`、`/de/learn`、`/de` 的 canonical 全部等于自身 URL。

### P0-2 生产落后仓库 8 个月 ⏳（代码已就绪，待部署）

- 新增 `src/app/api/version/route.ts`：返回 `{commit, env, builtAt}`，上线后用它自证版本。
- 新增 `scripts/smoke.mjs` + `npm run smoke`；CI 已改为 build 后起服务跑冒烟，**断言不过就不绿**。
- 部署动作见第四节。

### P0-3 双 root layout / 嵌套文档 / lang 失效 / 脚本 ×2 ✅

- 删除 `src/app/layout.tsx`、`src/app/page.tsx`、`src/app/metadata.ts`、`src/app/providers.tsx`。
- `src/app/[locale]/layout.tsx` 成为唯一文档根（`generateStaticParams` + `<html lang={locale}>`）。
- 实测：`/`、`/hiragana-katakana-quiz`、`/de`、`/learn`、`/japanese-text-analyzer` 的 `<html>` 计数全部 == 1；`/de` 首元素即 `<html lang="de">`。
- **额外发现并修复**：`middleware.ts` 一直在仓库根，项目页面在 `src/app`，Next 只认 `src/middleware.ts` → 中间件从未打包（`.next/server/middleware-manifest.json` 里 middleware 为空）。已迁移到 `src/middleware.ts`，`/` 从 404 恢复为 200，`/en` → 307 回 `/`，as-needed 前缀策略生效。

### P0-4 两套首页 + `/en` 不归一 ✅

- 删除硬编码英文首页 `src/app/page.tsx`；`/` 现在由 `[locale]/page-content.tsx` 渲染，与 de/fr/pt/es 同一实现。
- `/en` 现在 307 → `/`（如需 301，在 next-intl 配置 `localeDetection`/自定义 redirect 里改，属 P1 细节）。
- robots.txt 里 `Disallow: *.xml` / `*.json` 已删除（不再自屏蔽 sitemap）；重复的 `[locale]/robots.ts`、`[locale]/sitemap.ts` 已删除。

### P0-5 会教错的数据 + 无反馈 ✅

数据（`src/data/gojuon.ts` 成为唯一数据源）：
- `っ`/`ッ` 标 `isStandalone: false`，图表 romaji 显示 `—`，**不再进入任何练习池**（修掉「两个 tsu 选项」）。
- `ぢ`/`づ` 统一为 Hepburn `ji`/`zu`，`aliases: ['di']/['du']` 仅用于图表小字与判分，`quizExcluded: true` 不进题池（避免与 じ/ず 同音双正确答案）。
- 删除死数据 `src/constants/kana.ts`（无任何 import，且与主数据矛盾）。
- 新增 `getQuizKana()` / `KANA_POOL` / `isRomajiMatch()` / `normalizeRomaji()`，四种题型统一取池。

反馈闸门（`useQuiz.ts` + `QuizQuestion` + `QuizPanel`）：
- `submitAnswer` 只记录不推进，写入的是带 `userAnswer`/`isCorrect` 的**新对象**（修掉结果页「你的答案」永远空的 bug）。
- 新增 `nextQuestion()`；答完原地显示「✅/❌ + 正确答案（假名 + romaji）」+ Next 按钮，`aria-live` 播报，Enter 继续，1–4 选项快捷键，焦点自动落到 Next。
- 进度改为 `(index+1)/10`。

四种题型：
- **听写**：不再显示假名，只播音频 + 4 个假名选项；可无限重听；TTS 不可用时显示明确降级提示并切「看字打 romaji」；完成后进入结果页（不再被踢回配置页）。
- **匹配**：分数从 0 起、每对 +10、满分 100；Fisher–Yates 洗牌；完成后进结果页。
- **拼写**：`trim + lowercase + 去长音变体`，接受 aliases；答错展示正确拼写。
- **结果页**：四种题型统一；按题型正确标注（kanaToRomaji→romaji、romajiToKana→假名）；「Your Answer」必显示；加 `<SignupCTA>`、「换片假名」。

### P0-6 quiz a11y 阻断 ✅

- 配置卡片由 `<div onClick>` 改为 `<button role="radio" aria-checked>` + `role="radiogroup" aria-labelledby`，键盘可用、有 focus ring。
- 假名输出全部加 `lang="ja"`（题干、选项、结果页、听写选项、图表单元格）。
- quiz 标题渐变文字（对比度 2.5:1）改为 `text-blue-700 dark:text-blue-300`。
- 五十音图单元格改为真 `<button>`（`aria-label` 带发音描述），移动端 romaji 常显（原来靠 hover，触屏永远看不到）。

### P0-7 漏斗与追踪合规 ✅

- 首页/导航未登录态出现 **Sign in + Sign up** 两个入口（原来只有一个指向不存在 `/auth?mode=login` 的按钮，首页 SSR 里 0 个 `/register` 链接）；首页首屏加「Already learning? Login · Register」。
- 结果页加 `SignupCTA` → 全站终于有「学完 → 注册」的路径。
- 埋点：`quiz_start / quiz_answer / quiz_complete / signup_click / login_click / signup_cta_click`（`src/lib/tracking.ts`，gtag 未加载时 no-op）。
- **AdSense 广告脚本全部移除**（全站 0 个广告位，纯负收益），只保留 ownership 验证 meta。
- 追踪降到 2 套常驻（Vercel Analytics + Umami，无 Cookie）+ 2 套同意后加载（GA4 + Clarity），并有 Cookie 同意横幅（`src/components/consent/CookieConsent.tsx`）。
- 页脚删除 Friend Links 9 条 + Support 6 条站外链接。
- Cookie Policy 18 词占位 → 648 词实内容（列全 4 个服务、Cookie 名、撤回方式）；Privacy Policy 按实际重写（Firebase/Google 登录、MongoDB、DeepSeek 聊天外发提示、分析服务），删掉 AdSense 描述。

## 三、回归验证清单（浏览器手测，5 分钟）

1. `http://127.0.0.1:3100/` → 首页正常；右上角有 Sign in / Sign up。
2. 首屏底部出现 Cookie 横幅；点 **Essential only** 后刷新不再出现；Network 里没有 `gtag/js`、没有 `clarity.ms`；点 **Accept all** 后才出现。
3. `/hiragana-katakana-quiz` → 用 Tab 键可在「假名类型 / 题型」卡片间移动并选中（radiogroup 生效）；开始后答一题：**停住**显示对错 + 正确答案 + Next；按 Enter 进入下一题。
4. 选 Dictation：**看不到假名**，只有播放按钮 + 4 个假名选项；答完显示正确答案；10 题后进入结果页。
5. 选 Matching：分数从 0 开始、每对 +10；10 对后显示 100/100。
6. 结果页：错题里「Your Answer」有值；底部有「Create free account」。
7. `/de` → `<html lang="de">`；`/de/hiragana-katakana-chart` 单元格可 Tab 聚焦、有 aria-label。
8. `/en` → 跳回 `/`。
9. `/cookie-policy`、`/privacy-policy` → 有实内容。

## 四、上线步骤（本机无有效 Vercel token，需你执行）

```bash
# 1) 先本地确认（已通过，可跳过）
npm run type-check && npm run build && npm run smoke   # smoke 需先 npx next start -p 3100

# 2) 部署
npx vercel login          # 或直接在 Vercel 控制台 Redeploy 最新 commit
npx vercel --prod

# 3) 上线后自证
curl -s https://learnkana.pro/api/version        # 应返回 commit
BASE_URL=https://learnkana.pro node scripts/smoke.mjs
```

若用 Vercel 控制台：确认 Git 集成已连到本仓库的 `main` 分支，然后 **Redeploy**；部署后看 `/api/version` 的 commit 是否等于本地 `git rev-parse --short HEAD`。

## 五、已知未修（属 P1，不在本次 P0 范围）

1. **Quiz 交互区文案仍硬编码英文**（`QuizPanel/QuizResult/QuizQuestion` 内字面量），de/fr/pt/es 用户看到的配置区还是英文 —— 需接 `messages/*.json` 的 `QuizPage.*`（键已存在）。
2. 五十音图仍是数组平铺而非真正的「行 × 段」网格（教学法 P0-6，属内容改造）。
3. 无 SRS / 进度持久化 / 错题本（P0-5 的「复习闭环」部分只做了结果页回顾）。
4. 文章 24 条事实纠错 + 罗马字统一规范未做；文章正文仍只有英文。
5. `sitemap.ts` 的 lastmod 仍写死 2025 年；`/en` 是 307 而非 301。
6. CSP 仍被注释；无 error.tsx / not-found.tsx；无 E2E 测试。
7. 促销文案（FAQ 里的 SRS/自适应/笔顺动画）仍未与实现对齐 —— 在补齐功能前建议先改写文案。
