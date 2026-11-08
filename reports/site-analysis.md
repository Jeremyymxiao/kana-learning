# LearnKana.pro 网站审查报告（技术 SEO / 性能 / 国际化 / 风险 / 变现）

- **审计对象**：https://learnkana.pro （生产）＋ `/Users/jeremyx/Documents/GitHub/kana-learning`（仓库 HEAD `0a0f2f5`，2026-11-07）
- **审计时间**：2026-11-07（本地时区 Asia/Singapore）
- **审计方式**：全部结论来自实测（`curl -w` 计时、原始 HTML 解析、sitemap/robots 抓取、`next build` 产物、源码比对），附录给出可复现命令
- **约束**：本次只读，未修改任何源码；仅新增本报告

---

## 1. 总评：**3 / 10**

> **一句话诊断：这是一套「代码里已经写对了、但从来没上线；线上那版又在架构层把 canonical / hreflang / html lang 三件事同时做错」的站点。**
> 结果就是：100 条 sitemap URL 里，有 95 条在 Google 眼里等于首页的重复副本——**站点在技术上「存在」，在索引里「不存在」**。性能、变现、合规问题当然也重，但都排在「页面根本没被当成独立页面收录」之后。

### 分项评分

| 维度 | 得分 | 依据（详见后文） |
|---|---|---|
| 技术 SEO 地基（可索引性） | **1.5 / 10** | 95/100 URL 的 canonical 指向首页/语言根；全站 0 个 hreflang；100 条 URL 只有 5 个唯一 title |
| 页面级 SEO（内容/标题/结构） | **3 / 10** | 关键变现页 `/hiragana-katakana-quiz` SSR 正文仅 161 词、0 个 H1；首页关键词堆砌（689 词内「Hiragana & Katakana Quiz」出现 24 次） |
| 性能 / Core Web Vitals | **4 / 10** | TTFB 0.38–0.73s；首页动态渲染、`cache-control: no-store` + `x-vercel-cache: MISS`（完全不走 CDN）；首屏 CSS 365KB、首屏 JS ~774KB（未压缩） |
| 国际化（i18n） | **2.5 / 10** | 5 locale 的 UI 文案质量合格（非机翻），但 `<html lang>` 永远是 `en`、4 个 locale 的正文/文章 100% 英文 |
| 技术风险 / 合规 | **2 / 10** | 5 套追踪脚本 ×2 = 10 次加载，0 cookie 同意，Cookie Policy 是 25 词占位页；CSP 整段被注释；无任何测试 |
| 变现 / 增长 | **2 / 10** | 加载了 AdSense 但**全站 0 个广告单元**；首页 0 个注册 CTA、0 个邮件捕获、0 个转化事件 |
| 数据可观测性 | **2 / 10** | GA/Clarity/Umami/Vercel 四路重复采集、且因双 layout 每路各加载 2 次；`gtag.event()` 已封装但全站从未调用 |

---

## 2. 根因链：为什么「当时上线做的很差」

不是十个并列的毛病，是**一条因果链**：

```
[1] 双 root layout（src/app/layout.tsx + src/app/[locale]/layout.tsx 各渲染一次 <html>）
      ├─→ 嵌套 <html>/<head>/<body>（line 层非法）
      ├─→ <html lang="en"> 永远先出现 → de/fr/pt/es 的 lang 声明作废
      └─→ head 里两套追踪脚本都生效 → GA/AdSense/Clarity/Umami 各 ×2

[2] [locale]/layout.tsx `export { generateMetadata }` 把「语言首页」的 metadata 注入到该语言下所有子页
      └─→ 所有子页 canonical = 语言根，title/description = 语言首页的那一条
          └─→ Google 把 95 个子页判定为「5 个首页的重复版本」 → 只留 5 条索引
              └─→ 之后所有内容/外链/优化投入全部无效（投资回报 = 0）

[3] 生产部署停在 2025-11 前后，仓库 2026-03-04 起的 SEO 修复（per-page metadata、
    hreflang、structured data、服务端 SEO 正文、新页面）从未上线
      └─→ 修复已存在但用户看不到 →「做了很多、线上没变」的直接原因
```

**关键判断**：第 [3] 条是把 [1][2] 放大成灾难的乘数。仓库 HEAD 其实已经写了 per-page `generateMetadata` + `generateHreflangs()`（逻辑基本正确，见 §5.2），**但线上跑的是没有这些代码的旧构建**。所以第一优先级不是「写代码」，是「让代码上线」。

---

## 3. 实测数据表

### 3.1 页面级实测（`curl -sS -o /dev/null -w "%{http_code}|%{time_starttransfer}|%{time_total}|%{size_download}"`）

| URL | HTTP | TTFB | 总耗时 | HTML 体积 | SSR 正文字数 | H1 | 备注 |
|---|---|---|---|---|---|---|---|
| `/` | 200 | 0.397s | 0.435s | 76,789 B | 689 | 1 | 动态渲染（`ƒ`），`no-store` |
| `/hiragana-katakana-quiz` ⭐ | 200 | 0.387s | 0.620s | 55,230 B | **161** | **0** | 核心变现页几乎无正文 |
| `/hiragana-katakana-chart` | 200 | 0.399s | 0.655s | **109,318 B** | 666 | 1 | HTML 最重 |
| `/hiragana-katakana-converter` | 200 | 0.490s | 0.764s | 58,979 B | 406 | — | |
| `/learn` | 200 | 0.377s | 0.603s | 61,474 B | 257 | 1 | 栏目页偏薄 |
| `/learn/hiragana-basics` | 200 | — | — | 61,579 B | 676 | **2** | 两个 H1 |
| `/about` | 200 | 0.730s | 0.805s | 53,886 B | 179 | — | |
| `/chat` | 200 | 0.501s | 0.522s | 54,453 B | 104 | — | |
| `/de` | 200 | 0.398s | 0.637s | 69,311 B | 671 | 1 | `lang="en"` |
| `/fr` | 200 | **1.219s** | **1.532s** | 70,520 B | — | — | TTFB 异常尖峰 |
| `/es` | 200 | 0.435s | 0.511s | 69,557 B | — | — | |
| `/pt` | 200 | 0.446s | 0.481s | 69,326 B | — | — | |
| `/de/learn/hiragana-basics` | 200 | — | — | 62,893 B | 676 | 2 | **正文全英文** |
| `/de/hiragana-katakana-chart` | 200 | — | — | 111,263 B | — | 1 | H1 为英文 |
| `/en` | 200 | 0.383s | — | 67,525 B | — | — | **与 `/` 重复，未 301** |

### 3.2 URL / 状态码矩阵

| URL | 结果 | 判定 |
|---|---|---|
| `http://learnkana.pro/` | 308 → `https://learnkana.pro/` | ✅ |
| `https://www.learnkana.pro/` | 308 → 主域 | ✅ |
| `/hiragana-katakana-quiz/`（尾斜杠） | 308 → 无斜杠 | ✅ |
| `/de/` | 308 → `/de` | ✅ |
| **`/en`** | **200（67,525 B）** | ❌ 重复首页，应 301 → `/` |
| `/japanese-text-analyzer` | **404** | ❌ 仓库有该页面（rewrite + page.tsx），线上无 → 证生产落后仓库 |
| `/search?q=hiragana` | **404** | ❌ 但 JSON-LD 的 `SearchAction` 指向它 |
| `/chart` | 308 → `/hiragana-katakana-chart` | ✅ |
| `/learn/katakana-guide` | 308 → `/learn/hiragana-vs-katakana` | ✅ |
| `/api/og?title=...` | **404**（`content-type: text/html`） | ❌ OG 图片端点不存在 |
| `/api/chat` | 405（GET 不允许） | ✅ 预期 |
| `/de/api/chat` | 405 | ⚠️ 双份 API 路由，行为与英文版完全一致（`diff` 结果 IDENTICAL） |

### 3.3 索引信号清单

| 项目 | 实测 | 判定 |
|---|---|---|
| `robots.txt` | 200，1,077 B | ✅ 可访问 |
| `sitemap.xml` | 200，65,418 B，**100 条 URL**（20 × 5 locale），lastmod=`2025-11-18T03:13:13.517Z` | ⚠️ 数量对，**lastmod 停在 2025-11** |
| sitemap 内 hreflang | 有（每 URL 5 条 + 无 `x-default`） | ⚠️ 与 HTML 完全不一致 |
| HTML 内 hreflang | **0 条**（解析 9 个页面全部为空） | ❌ 致命 |
| canonical（`/`） | `https://learnkana.pro` | ✅ 自身 |
| canonical（`/hiragana-katakana-quiz`、`/hiragana-katakana-chart`、`/learn`、`/learn/hiragana-basics`、`/chat`） | **全部 = `https://learnkana.pro`** | ❌ 指向首页 |
| canonical（`/de/*`、`/fr/*`、`/es/*`） | **全部 = `https://learnkana.pro/<locale>`** | ❌ 指向语言根 |
| 唯一 `<title>` 数量 | **5 条**（100 条 URL） | ❌ 全站重复 |
| 唯一 `<meta description>` 数量 | **5 条**（100 条 URL） | ❌ 全站重复 |
| `<html lang>` | **`en`**（全部页面，包括 de/fr/pt/es） | ❌ |
| `og:image` | **0 个**（首页、子页都没有） | ❌ 社交分享无图 |
| `og:locale:alternate` | 只有 `es_ES`（其他 4 个 locale 丢失） | ❌ |
| `<meta name="keywords">` | 每页都有（hiragana/katakana/ひらがな…） | ⚠️ Google 已忽略，纯噪声 |
| `<img>` 标签 | **0 个**（首页、chart、quiz 全部 0） | ⚠️ 无图片搜索入口、无视觉内容 |
| JSON-LD | 2 个 `<script>` 块，**均为 `@type: WebSite`** | ❌ 同页重复实体 |
| JSON-LD `SearchAction` | `target: /search?q={...}` → **实测 404** | ❌ 无效动作 |
| JSON-LD `inLanguage` | `["en","ja","zh-CN"]` | ❌ 与 5 个 locale（无 ja/zh-CN、缺 de/fr/pt/es）不符 |
| GSC / Bing 验证标签 | **未发现**（`google-site-verification` / `msvalidate.01` 均无） | ⚠️ 需确认是否走 DNS 验证 |

### 3.4 性能实测

| 指标 | 实测值 | 参考阈值 |
|---|---|---|
| 首页 `cache-control` | `private, no-cache, no-store, max-age=0, must-revalidate` | ❌ 应为 `public, s-maxage=...` |
| 首页 `x-vercel-cache` | **MISS** | ❌ 每次回源 |
| HSTS | `max-age=63072000` | ✅ 唯一存在的安全头 |
| X-Frame-Options / Referrer-Policy / CSP | **全部缺失** | ❌ |
| 首屏 CSS（未压缩） | **283,045 B + 81,563 B = 364,608 B** | 建议 < 100KB |
| 首屏 JS（13 chunk，未压缩） | **792,409 B ≈ 774 KB** | build 报 `First Load JS` 共享 99.9KB、页面 205–211KB |
| 最重页面（JS） | `/learn/[slug]` = **310 KB** First Load JS；`/chat` = 256 KB | |
| 字体 @font-face 声明 | **124 个**（Noto Sans JP 按 unicode-range 切片） | 每个页面都要解析这 124 条规则 |
| 字体预加载 | 仅 1 个 woff2，25,012 B，`font-display: swap` | ⚠️ 只预载 latin 子集 |
| 第三方脚本（每页） | GA ×2、AdSense ×2、Clarity ×2、Umami ×2、Vercel Analytics ×2（客户端注入） | ❌ 共 10 次 |
| 首页 inline `<script>` | 26 个 | ⚠️ |

**`next build` 结果（本机，Next.js 15.4.10，exit 0）**：

```
✓ Compiled successfully in 14.0s
✓ Generating static pages (197/197)
Route (app)                               Size  First Load JS
┌ ƒ /                                    192 B         205 kB   ← 首页是动态！
├ ● /[locale]                          2.26 kB         207 kB   ← 但语言首页是 SSG
├ ● /[locale]/hiragana-katakana-quiz   2.19 kB         207 kB
├ ● /[locale]/hiragana-katakana-chart  5.82 kB         211 kB
├ ● /[locale]/learn/[slug]             61.3 kB         310 kB
├ ● /[locale]/chat                     7.04 kB         256 kB
+ First Load JS shared by all                        99.9 kB
```

> 说明：`/[locale]`（语言首页）是 `●` 静态预渲染，而根路径 `/`（`src/app/page.tsx`）是 `ƒ` 动态渲染——**同一个首页有两份实现、两套渲染模式**，这是 `no-store` + CDN MISS 的直接来源。构建期间还出现 7 次 `read ECONNRESET / Retrying`（`next/font/google` 拉字体），说明**构建依赖外网，存在构建失败风险**。

---

## 4. 生产 vs 仓库 对照表（发布纪律问题）

| 能力 | 仓库 HEAD | 生产线上 | 影响 |
|---|---|---|---|
| per-page `generateMetadata`（canonical/title/description 正确化） | ✅ `export { generateMetadata } from './metadata'`（各 page.tsx 都有） | ❌ 全部退化到语言首页 metadata | **P0** |
| hreflang（`src/lib/seo-utils.ts` + `generateHreflangs`） | ✅ 逻辑正确（en→根、其他→`/locale`、含 `x-default`） | ❌ 0 条 | **P0** |
| 服务端 SEO 正文（quiz 页 "How Our Kana Quiz Works"） | ✅ 已有 | ❌ 无（SSR 仅 161 词） | P0 |
| FAQPage 结构化数据 | ✅ `[locale]/metadata.ts` 内 | ❌ 线上只有 2 个 WebSite | P1 |
| `/japanese-text-analyzer` 页面 | ✅ page.tsx + rewrite | ❌ **404** | P1（已有页面丢失） |
| 全字符 quiz 模式 / 深色模式 / 假名补全 | ✅（2026-03-04 提交） | ❌ 无 | P2 |
| 友情链接 Img2ThreeJS / MarkItDown | ✅ | ❌ 无 | — |
| sitemap lastmod | 构建时刷新 | `2025-11-18` | 证据：构建产物停在 2025-11 |

**结论**：仓库 HEAD 是 `2026-11-07`，生产内容证据停在 `2025-11`，**约 8 个月的提交没有上线**。git 历史里 `5b56e43 feat: comprehensive SEO overhaul`、`1ff72b8 Merge remote updates and preserve locale-aware SEO fixes` 全部未生效。`.github/workflows/ci.yml` 只跑 `type-check` + `build`，**没有任何 deploy 步骤**；部署完全依赖 Vercel Git 集成且当前失效（或分支未触发）。

---

## 5. 问题清单（按严重度）

### 🔴 P0-1 全站 canonical 塌缩：95/100 条 URL 自我声明为「首页重复」

**证据**
```
$ curl -s https://learnkana.pro/hiragana-katakana-quiz | grep canonical
<link rel="canonical" href="https://learnkana.pro"/>
$ curl -s https://learnkana.pro/hiragana-katakana-chart | grep canonical
<link rel="canonical" href="https://learnkana.pro"/>
$ curl -s https://learnkana.pro/learn | grep canonical
<link rel="canonical" href="https://learnkana.pro"/>
$ curl -s https://learnkana.pro/de/learn/hiragana-basics | grep canonical
<link rel="canonical" href="https://learnkana.pro/de"/>
```
源码根因：`src/app/[locale]/layout.tsx` 第 21 行 `export { generateMetadata }`，而 `src/app/[locale]/metadata.ts` 里 `const canonicalUrl = getCanonicalUrl(locale, '')` —— **页路径被写死成空串**，于是这套 metadata 通过 layout 继承给该 locale 下每一个子页。

**影响**：Google 收到的是「这 95 页都是首页副本」的主动声明。这不是「排名差」，是**不收录**。所有内容、外链、内链优化投入归零。

**修复（2 行级）**
1. `src/app/[locale]/layout.tsx`：删除 `export { generateMetadata }`（layout 不应下发页级 canonical）。
2. 每个子页 `page.tsx` 保留 `export { generateMetadata } from './metadata'`（仓库已有），部署后即生效。
3. 部署后用脚本断言：每个 URL 的 canonical == 自身 URL（见附录 A6）。

---

### 🔴 P0-2 生产部署滞后仓库约 8 个月（修复写好了但没上线）

**证据**：`/japanese-text-analyzer` → 404；`/api/og` → 404；线上 sitemap `lastmod=2025-11-18`；线上缺 Img2ThreeJS / MarkItDown 友情链接；`.github/workflows/ci.yml` 无 deploy job。
**影响**：把 P0-1/P0-4 放大成长期灾难。过去 8 个月的 SEO/UX 修复、内容、功能对真实流量**贡献为 0**。
**修复**
1. 立刻在 Vercel 手动触发一次部署并核对 HEAD commit hash（先止血）。
2. CI 增加 `vercel deploy --prod`（或恢复 Vercel Git 集成 + 分支保护）。
3. 加**部署后冒烟测试**（关键：不通过就回滚）：
   - `curl /hiragana-katakana-quiz | grep canonical` 必须含该路径
   - `curl /de | grep 'hreflang'` 必须 ≥6 条
   - `curl /de | grep '<html'` 计数 == 1
   - `/japanese-text-analyzer` == 200
4. 站点加 `/api/version`（返回 commit sha + build time），线上可自证版本。

---

### 🔴 P0-3 双 root layout：嵌套 `<html>/<head>/<body>`，lang 永久 `en`，追踪脚本各加载 2 次

**证据**
```
$ curl -s https://learnkana.pro/de | python3 -c "import re,sys;h=sys.stdin.read();print([m.group(0) for m in re.finditer(r'<(html|head|body)[^>]*>',h)])"
['<html class="scroll-smooth" lang="en">', '<head>', '<body ...>',
 '<html lang="de" class="scroll-smooth">', '<head>', '<body ...>']
```
逐页计数（`<html` / `<head` / `<body`）：

| URL | html | head | body |
|---|---|---|---|
| `/` | **1** | 2 | 1 |
| `/hiragana-katakana-quiz` | 2 | 2 | 2 |
| `/hiragana-katakana-chart` | 2 | 3 | 2 |
| `/learn` | 2 | 3 | 2 |
| `/de` | 2 | 3 | 2 |
| `/fr/hiragana-katakana-chart` | 2 | 3 | 2 |
| `/es/about` | 2 | 2 | 2 |

脚本加载次数（`/de` 原始 HTML）：`adsbygoogle.js`=2、`googletagmanager.com/gtag`=2、`clarity.ms/tag`=2、`umami`=2。

源码：`src/app/layout.tsx` 第 24 行 `<html ... lang="en">` + `<head>`；`src/app/[locale]/layout.tsx` 第 41 行又 `<html lang={locale}>` + `<head>`。

**影响**
1. 浏览器/屏幕阅读器/Google 只认第一个 `<html lang="en">` → **4 个语言的 lang 声明全部作废**（i18n 的语义地基失效）。
2. HTML 结构非法，`<head>` 3 次、`<body>` 2 次，解析行为不可预测。
3. 5 套追踪 ×2 = **每页 10 次第三方脚本加载**：GA 会话/页面浏览翻倍、Clarity 采样翻倍、AdSense 请求翻倍（这也是第 3.4 节 JS 体积的一个来源）。
4. 字体与 CSS 重复引入。

**修复**
1. **只保留一个根 `<html>`**：`src/app/layout.tsx` 继续输出 `<html>/<body>`，但把 `lang` 改为动态：
   - 在 `src/middleware.ts` 里 `request.headers.set('x-locale', locale)`（或 `response.headers`），root layout 用 `headers()` 读取后 `lang={locale}`；
   - `src/app/[locale]/layout.tsx` **删掉 `<html>/<head>/<body>`**，只返回 `<>{children}</>`（Provider 照留）。
2. 追踪脚本全部从 layout 内联 `<script>` 迁移到 `next/script`（`strategy="afterInteractive"`），**且只在根 layout 放一次**。
3. 部署后断言：`<html` 计数 == 1，`lang` 随路径变化。

---

### 🔴 P0-4 零 hreflang：sitemap 声明了，HTML 没声明

**证据**：解析 `/`、`/hiragana-katakana-quiz`、`/hiragana-katakana-chart`、`/learn`、`/learn/hiragana-basics`、`/de`、`/de/*`、`/fr/*`、`/es/*` 共 9 个页面，`<link rel="alternate" hreflang>` = **0 条**；而 `sitemap.xml` 每个 URL 下有 5 条 `xhtml:link hreflang`，且**没有 `x-default`**。
**影响**：多语言站最核心的信号缺失。Google 无法把 5 个语言版本聚合为一个意图集群，只能当作重复内容各自竞争（叠加 P0-1 后直接消失）。
**修复**：仓库 `src/lib/seo-utils.ts::generateHreflangs()` 逻辑已基本正确（默认语言→根 URL、其他→`/locale`、含 `x-default`），**部署即修**。需额外确认两点：
- `languages['x-default']` 指向英文根 ✅；
- sitemap 侧补 `x-default`，与 HTML 保持一致（`src/app/[locale]/sitemap.ts`）。

---

### 🔴 P0-5 4 个 locale 的正文是英文：50 条文章 URL 是纯重复内容

**证据**
```
$ curl -s https://learnkana.pro/de/learn/hiragana-basics | 提取正文
"Hiragana Basics Guide ... Welcome to the comprehensive guide to Hiragana, the foundational
writing system of the Japanese language. ... What is Hiragana? Hiragana (ひらがな) is one of
Japan's three writing systems..."   ← 全英文
$ curl -s https://learnkana.pro/de/hiragana-katakana-chart | 提取正文
"Complete Hiragana & Katakana Chart ... Master Japanese hiragana and katakana with our
comprehensive reference chart ..."   ← H1/正文英文，只有导航是德语
```
源码佐证：`src/app/[locale]/hiragana-katakana-chart/page-content.tsx:56/117/153` 硬编码 `"Hiragana Chart Guide"`、`"Master Japanese Kana: Learning Tips"`、`"Hiragana & Katakana Chart FAQ"`；`src/app/[locale]/hiragana-katakana-quiz/page.tsx:27` 硬编码 `"How Our Kana Quiz Works"`；`public/articles/*.md` 只有英文（21 个 .md，无语言后缀）。
**影响**：sitemap 100 条中 **50 条是「英文正文 + 德语/法语/西语/葡语外壳」**。挂上 hreflang（P0-4 修复后）反而会形成 4 个语言的重复内容集群——Google 大概率只留英文版，其余 4 个 locale 不计入索引，等于**白做了 80% 的国际化工作**。
**修复（分两步，别一次上）**
1. **止血（今天）**：`/de|fr|pt|es/learn/*` 暂 `noindex`（或 canonical 指向英文原文），并从 sitemap 移除这 44 条，避免重复内容稀释。
2. **正解（2–4 周）**：正文层接入 i18n —— 把 `page-content.tsx` 里硬编码的英文 H2/段落搬进 `messages/*.json`（仓库已有 235 键 × 5 语言的 `Metadata`/`HomePage` 结构，照此扩）；文章按 `public/articles/<slug>.<locale>.md` 分语言，缺语言的 fallback 到英文并 `noindex`。

---

### 🔴 P0-6 5 套追踪 × 无任何 cookie 同意 + Cookie Policy 是占位页

**证据**
- 每页加载：GA4 `G-0M56J3EFEE`、AdSense `ca-pub-5334706525054343`、Clarity `qtqh6nav4v`、Umami `umami.jeremyym0612.work`、Vercel Analytics —— 各 2 次。
- `/cookie-policy` 正文（实测 25 词）：
  > `"Cookie Policy This is the cookie policy page content..."`
- `/privacy-policy` 正文 250 词，只提到 Google Analytics，**未提 AdSense / Clarity / Umami / Vercel / Firebase / DeepSeek**。
- 全站无 CMP、无 banner、无 `consent` 相关代码。
**影响**
1. **GDPR/EEA 合规**：GA、Clarity、AdSense 都在同意前加载，属明确违规（可被投诉，罚款风险）。
2. **AdSense 政策**：Google 要求面向 EEA/UK 流量使用认证 CMP；当前状态有账号受限风险。
3. 数据可信度：4 路重复采集 + 双 layout ×2，任何分析结论都不可信。
**修复**
1. 上 CMP（Google 认证 CMP 列表内的，如 Cookiebot/Usercentrics/CookieYes），默认拒绝，同意后再加载 GA/Clarity/AdSense。
2. 精简到 2 套：**GA4（业务分析）+ Vercel Analytics（性能/隐私友好）**；Umami 与 Vercel 功能重叠，Clarity 需单独同意且与 GA 行为分析重叠——先砍 Umami + Clarity。
3. 重写 `/cookie-policy`（≥600 词，逐一声明 5 个服务的 cookie/目的/保留期）与 `/privacy-policy`（补 AdSense、Clarity、Firebase Auth、MongoDB、DeepSeek API 数据传输）。
4. 若短期不做 CMP：至少在 EEA 关闭 GA/Clarity/AdSense 的自动加载。

---

### 🟠 P1-1 核心变现页 `/hiragana-katakana-quiz` 是「空壳」：SSR 161 词、0 个 H1

- 实测：`/hiragana-katakana-quiz` HTML 55,230 B，正文仅 **161 词**，`<h1>` 数量 **0**，`<h2>` 仅 1（"Kana Quiz"）。
- 内容只存在于 client component（`page-content.tsx`），SSR 不产出 → 对爬虫几乎为空。
- 仓库 HEAD 已加服务端 SEO 正文（"How Our Kana Quiz Works" + 4 个模式卡片），**部署后可达 ~700 词**——这是为什么 P0-2 应排第一。
- 修复：部署后，把这段正文**按 locale 做 i18n**，并补 1 个 H1（`Hiragana & Katakana Quiz`）+ FAQ（对应 JSON-LD `FAQPage`）。

---

### 🟠 P1-2 100 条 URL 只有 5 个唯一 title/description（等于全站无标题）

- 实测：所有英文页 title = `LearnKana | Free Hiragana & Katakana Quiz and Chatbot`；所有德语页 = `LearnKana | Kostenloses Hiragana & Katakana Quiz und Chatbot`；描述同理。
- 仓库已为每页写好唯一 title（`quizTitle` / `chartTitle` / `learnTitle`… 见 `messages/*.json`）——**又是未部署**。
- 部署后需检查：title 长度 53–60 字符（现有 en 版 53、de 版 60，合规）；唯一性 100/100。

---

### 🟠 P1-3 关键词堆砌：首页 689 词内同一词组 24 次

| 页面 | 正文字数 | 关键词出现 | 密度 |
|---|---|---|---|
| `/` | 689 | `Hiragana` 29、`Katakana` 29、`kana` 41、`quiz` 35 | quiz 5.1%、kana 6.0% |
| `/` | 689 | **`Hiragana & Katakana Quiz` 24 次** | **3.5%**（3 词长尾词组） |
| `/de` | 671 | `quiz` 37（德语正文里 5.5%）、`Hiragana`/`Katakana` 各 32 | 堆砌 |

典型样本（`src/app/page.tsx` FAQ 6 条答案，每条都重复该词组 3–5 次）：
> "How does the **Hiragana & Katakana Quiz** tool help beginners? Our **Hiragana & Katakana Quiz** platform offers … The quiz system adapts …"
**影响**：2024 年后 Google 对这类「同词组机械重复」已有明确降权倾向；也伤害可读性/转化。
**修复**：把该词组降到 6–8 次/页，用同义变体替代（"kana practice test"、"hiragana quiz"、"test your kana"），FAQ 答案改写为真实信息增量（时长、学习方法、错误率）而非埋词。

---

### 🟠 P1-4 零图片 + 零 og:image + OG 端点 404

- 实测：首页 / chart / quiz `<img>` = **0**；`og:image` = **0**；`/api/og?title=...` = **404**。
- 仓库 `metadata.ts` 已配 `/api/og`,但线上端点不存在（未部署），所以即便有 metadata 也产出坏图。
- 影响：社交分享无图（CTR 腰斩）、无图片搜索入口、页面零视觉锚点（停留时长低）。
- 修复：部署后立即验证 `/api/og` 返回 `image/png`；补 46 音图/假名笔顺图（WebP/AVIF + `next/image` + 描述性 alt），这也是 kana 类站点最强的长尾流量入口（"hiragana chart with stroke order"）。

---

### 🟠 P1-5 JSON-LD 重复实体 + 无效 SearchAction + inLanguage 错误

- 单页 2 个 JSON-LD 块，**都是 `@type: WebSite`**（重复实体，Google 可能丢弃其一或报冲突）。
- `SearchAction.target = https://learnkana.pro/search?q={search_term_string}` → 实测 **404**（站点无搜索页）。结构化数据声明不存在的能力属于欺骗性标记。
- `inLanguage: ["en","ja","zh-CN"]` → 与 5 locale 不符（无 ja/zh-CN，缺 de/fr/pt/es）。
- `src/app/[locale]/metadata.ts` 的 `FAQPage`（6 问答）**线上不存在**。
- 修复：合并为单一 `@graph`；删除 `SearchAction`（或先实现 `/search`）；`inLanguage` 改为 5 locale；首页补 `FAQPage`（内容需可见，现有 FAQ 区块满足）；按需加 `Course`/`LearningResource`。

---

### 🟠 P1-6 robots.txt 用 `*.xml` 通配符屏蔽了自己的 sitemap

```
$ curl -s https://learnkana.pro/robots.txt | grep -n "xml"
27:Disallow: *.xml
```
- `User-Agent: *` 段里 `Disallow: *.xml` 会让**所有非 Googlebot/Bingbot 的爬虫**（Yandex、DuckDuckBot、各类 AI 爬虫、SEO 工具）无法读取 `/sitemap.xml`；同时 `Disallow: *.json` 也会挡住 manifest 类资源。
- Googlebot 段没有该行，所以 Google 不受影响 —— 但 Bing/Yandex/社交抓取受影响，且这类通配是典型的「复制模板没删干净」。
- 另有 `Host: https://learnkana.pro`（Yandex 专用，其他引擎忽略/告警）。
- 修复：删除 `Disallow: *.xml`、`Disallow: *.json`；保留 `Sitemap:` 行；`Allow:` 逐条列举（当前写法）在多语言站容易漏（如 `/japanese-text-analyzer` 未列），建议改成 `Allow: /` + 仅 `Disallow:` 需保护路径。

---

### 🟠 P1-7 零测试 + 无错误页 + CI 不部署

- 无 jest/vitest/playwright/cypress 配置（`ls | grep -Ei "jest|vitest|playwright|cypress|test"` 无结果）。
- `src/app/` 下**没有 `error.tsx` / `not-found.tsx` / `global-error.tsx`** → 任何运行时错误落到 Next 默认英文错误页。
- `.github/workflows/ci.yml`：`actions/checkout@v2`、`actions/setup-node@v2`、Node 18 —— 只跑 `type-check` + `build`，**无 deploy**。
- 影响：SEO 回归（如本次 canonical 塌缩）无法被自动发现；这正是 P0-1/P0-2 能存活 8 个月的原因。
- 修复（按 ROI 排序）：① 部署后冒烟脚本进 CI；② 3 个 Playwright 用例（首页/<locale>/quiz 的 canonical+hreflang+lang 断言）；③ 升级 actions 到 v4、Node 20；④ 加 `error.tsx`（各 locale 本地化）+ `not-found.tsx`。

---

### 🟠 P1-8 首页 0 个动态渲染 → CDN 完全失效

- 证据：`cache-control: private, no-cache, no-store`、`x-vercel-cache: MISS`、`age: 0`；`next build` 显示 `ƒ /`。
- 对比：`● /[locale]` 是 SSG，却只有带前缀的路径享受静态化；主入口 `/` 反而每次 SSR（TTFB 0.40s，`/fr` 峰值 1.22s）。
- 根因：`src/app/page.tsx`（根首页）与 `src/app/[locale]/page.tsx`（语言首页）**是两份首页实现**，前者落在根 layout 下被标为动态。
- 修复：删除 `src/app/page.tsx`，让 `/` 由 middleware rewrite 到 `/[locale]`（en）的 SSG 版本承担；或给 `/` 单独设 `export const revalidate = 3600` 并移除动态依赖。目标是 `/` 变成 `●`/`○` + `s-maxage=3600, stale-while-revalidate`。

---

### 🟡 P2-1 五套追踪重复采集（除合规外的纯浪费）

| 工具 | 每页加载 | 与谁重叠 | 建议 |
|---|---|---|---|
| GA4 | ×2 | 与 Umami、Vercel 的 PV/UV 重叠 | 保留（业务分析） |
| Vercel Analytics | ×2 | 与 GA/Umami 重叠 | 保留（无 cookie、性能数据） |
| Umami | ×2 | 与 GA/Vercel 完全重叠，且自建域名 | **删**（省 1 个第三方域、1 次 DNS/TLS） |
| Microsoft Clarity | ×2 | 与 GA 行为分析重叠 | 需同意后再加载，或删 |
| AdSense | ×2 | — | **无广告位，见 P2-2** |

另：`src/lib/gtag.ts` 封装了 `event()`，但全站**从未调用**（`grep "gtag('event'" src` 仅命中定义处）→ 零转化事件。

### 🟡 P2-2 AdSense：加载了脚本，但全站 0 个广告单元 → 纯负收益

- 实测：`class="adsbygoogle"` / `data-ad-slot` 在线上 HTML 与全部源码中出现 **0 次**。
- 现状 = 付两份代价（2 次脚本请求 + 合规风险 + 页面速度），收 0 收入。
- 二选一：
  - **要变现**：在 `/learn/[slug]`（长文、676 词）、`/hiragana-katakana-chart` 内容区放 2–3 个 `ins.adsbygoogle`（避开首屏与 CTA 区），配合 CMP 后加载；`ads.txt` 已正确（`google.com, pub-5334706525054343, DIRECT, f08c47fec0942fa0`）。
  - **不变现**：立刻移除 AdSense 脚本，等有内容存量（≥30 篇高质量文章 + 稳定流量）再上。

### 🟡 P2-3 友情链接 / Support 外链：13 条站外链接全在 footer，疑似链接方案

实测 `/de` 页面外链：
```
grok-ani.com · ramen.tools/@JeremyXiao · ffs.com/changman · ramen.tools/docs/developer
rollr.io/profile/dashboard · ramen.tools/book/demo/ · jeremym.carrd.co · iuu.ai
magicbox.tools · aiwith.me · allinai.tools · SeekAIs.com · AIToolly.com
```
- 模式：AI 工具目录站 + 个人主页 + 工具站，**与日语学习主题无关**，全部集中 footer、全站每页出现。
- 风险：① Google 对「全站 footer 大量不相关外链」视为链接方案（Link Scheme）信号；② 稀释首页权重；③ AdSense 政策对「低质外链农场」也可能关联审查。
- 修复：删到 ≤5 条且**主题相关**（日语学习/日本文化资源）；无关的加 `rel="nofollow sponsored"`；从首页移除、只保留在 `/about`。

### 🟡 P2-4 重复 API 路由（5 组，内容完全一致）

- `src/app/api/{chat,analyze,convert,furigana,articles}` 与 `src/app/[locale]/api/...` 双份；`diff` 结果 **IDENTICAL**。
- 影响：维护时漏改一半即产生行为不一致；`/[locale]/api/*` 还进了 build 路由表（多 5 个 ƒ 路由），无 SEO 收益（robots 已 Disallow `/api/`，但 `/[locale]/api` 不在 disallow 里 → 可能被抓取）。
- 修复：删除 `[locale]/api` 一份；或改成同一 handler re-export（`export { GET, POST } from '@/app/api/chat/route'`），避免复制粘贴漂移。

### 🟡 P2-5 安全头缺失、CSP 整段注释、配置可用性风险

- 响应头只剩 `strict-transport-security`；`X-Frame-Options` / `Referrer-Policy` / `X-Content-Type-Options` / CSP 全缺（`next.config.js` 里 `headers()` 整段被 `/* */` 注释，注释里还带 `Cross-Origin-Embedder-Policy: require-corp`，与 AdSense/Firebase 冲突，恢复前必须改）。
- `src/lib/firebase.ts` 硬编码 Firebase 配置（Web SDK apiKey 公开属正常，但 `measurementId: G-NMM6EMFYER` 与站点实际使用的 `G-0M56J3EFEE` **是两个不同 GA 属性**，若将来启用 Firebase Analytics 会出现第三路采集）。
- `src/lib/mongodb.ts`：`MONGODB_URI` 默认回落 `mongodb://localhost:27017/kana-learning`（serverless 上必然失败，且会静默重试）；`bufferCommands: true` 无超时/无 `serverSelectionTimeoutMS` → 冷启动可能挂 10s+。
- `vercel.json` 用了已废弃的 `routes` 字段。
- 修复：恢复 headers（先去掉 COEP，CSP 用 Report-Only 灰度 2 周）；Firebase 配置改 `NEXT_PUBLIC_*` 环境变量并统一 measurementId；MongoDB 去掉 localhost 默认值、加超时与降级；删 `vercel.json` 的 `routes`。

### 🟡 P2-6 构建依赖外网（构建不稳定）

`next build` 期间出现 7 次 `read ECONNRESET / Retrying 1/3`、`Client network socket disconnected before secure TLS connection was established`（`next/font/google` 拉 Noto Sans JP）。CI 环境下若外网抖动，**构建直接失败 → 部署中断**（这可能就是 P0-2 的诱因之一）。
修复：`next/font/local` 自托管字体（顺带解决 §3.4 的 124 个 @font-face 与 25KB latin 子集问题），或用 `next/font/google` 的 `display:'swap'` + 构建缓存。

---

## 6. 国际化专项结论

### 6.1 好消息：翻译不是机翻

抽查 `messages/*.json`（各 235 键 / 13 命名空间，**键完整性 100%，无缺失键**）：

| 键 | de | fr | es |
|---|---|---|---|
| `Metadata.homeTitle` | LearnKana \| **Kostenloses** Hiragana & Katakana **Quiz und Chatbot** | LearnKana \| **Quiz** Hiragana & Katakana **gratuit et Chatbot** | LearnKana \| **Quiz Hiragana y Katakana Gratuito y Chatbot** |
| `Metadata.chartTitle` | Hiragana & Katakana **Tabelle** | **Tableau** Hiragana & Katakana | **Tabla** Hiragana y Katakana |
| `Metadata.learnTitle` | **Japanische Kana lernen** | **Apprendre le Kana Japonais** | **Aprender Kana Japonés** |
| `Metadata.homeDescription` | Lernen Sie japanische Kana einfach mit unseren interaktiven Tools. Üben Sie Hiragana und Katakana mit **KI-Unterstützung**, Quiz und Textkonverter. | Apprenez le kana japonais facilement avec nos outils interactifs. Pratiquez Hiragana et Katakana avec **assistance IA**, quiz et convertisseur de texte. | Aprende kana japonés fácilmente con nuestras herramientas interactivas. Practica Hiragana y Katakana con **asistencia de IA**, cuestionarios y convertidor de texto. |

- 语法、冠词、语序、专业术语（`KI-Unterstützung` / `assistance IA` / `asistencia de IA`）都对，**不是 MT 直译痕迹**。
- 与英文完全相同的残留：de 19/235 (8%)、fr 20/235 (9%)、es 12/235 (5%)、pt 16/235 (7%) —— 抽查后确认基本是**本来就该保留的专有名词/借词**（`hiragana`、`katakana`、`quiz`、`chat`、`Hiragana`/`Katakana` 标题），**不是未翻译残留**。

> 结论：**i18n 的问题不在 `messages/`，在「正文层完全没接 i18n」**（P0-5）。`app/` 下 39 个 tsx 只有 26 个用了 `useTranslations/getTranslations`，且都是导航/按钮级 UI；页面正文 H2/段落/FAQ/文章全部硬编码英文。

### 6.2 语言切换可用（唯一正常项）

`src/components/ui/language-switcher.tsx` 用 `window.location.pathname` 去掉旧 locale 前缀再拼新前缀 → **切换保留当前路径** ✅（`/de/learn/hiragana-basics` ↔ `/learn/hiragana-basics`）。小瑕疵：用 `router.replace` 不产生历史记录；`defaultValue` 而非受控 `value`，客户端切语言后 UI 可能不同步。

### 6.3 `<html lang>` 全错（见 P0-3）

de/fr/pt/es 全部 `lang="en"`。这会让 Google 的语言判定、屏幕阅读器发音、浏览器翻译提示全部错位——**即使正文将来翻译了，语言信号仍然是错的**。

---

## 7. 国际化 / 变现 / 数据三张表

### 7.1 各 locale 的「真实本地化度」

| locale | URL 数 | UI 文案 | 页面正文 | 文章正文 | `<html lang>` | hreflang |
|---|---|---|---|---|---|---|
| en | 20 | ✅ | ✅ 英文 | ✅ 英文 | ✅ en | ❌ |
| de | 20 | ✅ 德语 | ❌ 英文 | ❌ 英文 | ❌ en | ❌ |
| fr | 20 | ✅ 法语 | ❌ 英文 | ❌ 英文 | ❌ en | ❌ |
| pt | 20 | ✅ 葡语 | ❌ 英文 | ❌ 英文 | ❌ en | ❌ |
| es | 20 | ✅ 西语 | ❌ 英文 | ❌ 英文 | ❌ en | ❌ |

→ **80% 的 URL 是「壳翻译 + 英文正文 + 错误语言声明 + 无 hreflang」四重减分的组合。**

### 7.2 变现漏斗（现状 = 断的）

```
首页 (689 词)  ──[CTA: Start Hiragana & Katakana Quiz]──▶ /hiragana-katakana-quiz (161 词, 0 H1)
                                                                   │
                                                                   ├─ ✗ 无注册 CTA（grep href="/register" = 0）
                                                                   ├─ ✗ 无成绩留存/账号引导
                                                                   └─ ✗ 无邮件捕获（无 newsletter/subscribe 代码）
AdSense：脚本 ×2 / 广告位 ×0 → 收入 = 0
```

- 首页 `href="/register"` = **0**、`href="/login"` = **0**（虽然导航栏在客户端有登录按钮，但 SSR HTML 里没有；且首页正文没有任何注册激励）。
- quiz 页内链仅：`/`、`/about`、`/contact-us`、`/hiragana-katakana-chart`、`/privacy-policy`、`/terms-of-service` —— **无注册、无下一步课程、无分享**。
- 结果：Firebase Auth + MongoDB 用户体系（`src/models/user.ts`）存在，但**没有任何引导用户注册的路径**，等于建了收银台却把门封了。

### 7.3 数据可观测性

| 能力 | 状态 |
|---|---|
| 页面浏览 | GA4 ×2、Umami ×2、Vercel ×2（Vercel 客户端注入，HTML 中 grep 为 0） |
| 热图/录屏 | Clarity ×2，需同意但无同意 |
| 转化事件 | **0**（`gtag.event()` 封装存在，零调用） |
| 搜索性能 | 无 GSC 验证标签（可能走 DNS 验证，需人工确认） |
| 版本可观测 | 无 `/api/version`、无 commit 暴露 → 无法判断线上跑的是哪一版（本次靠 sitemap lastmod 反推） |
| 错误监控 | 无 Sentry/日志聚合；无 `error.tsx` |

---

## 8. SEO 优先级建议（按执行顺序）

**第 1 层（本周，全是「部署已有代码」，改 0 行业务逻辑）**
1. 修发布链路 + 部署 HEAD + 部署后冒烟断言（P0-2）。
2. 删 `[locale]/layout.tsx` 的 `export { generateMetadata }`（P0-1）。
3. 删 `[locale]/layout.tsx` 的 `<html>/<head>/<body>`，root layout 的 `lang` 改为动态（P0-3）。
4. 修 robots.txt 的 `Disallow: *.xml` / `*.json`（P1-6）。
5. `/en` → 301 `/`（消除重复首页）。

**第 2 层（2 周）**
6. sitemap 补 `x-default`，与 HTML hreflang 对齐；`lastmod` 改为真实内容更新时间（当前每天全量刷新等于噪声）。
7. 4 个 locale 的文章与正文去重（P0-5 止血方案：`noindex` + canonical 到英文）。
8. JSON-LD 合并 + 删 `SearchAction` + 修 `inLanguage` + 补 `FAQPage`（P1-5）。
9. 每页 title/description 唯一性验收（部署后应自动 100/100）。

**第 3 层（1–2 个月）**
10. 正文层 i18n：`ChartPage` / `QuizPage` / `HomePage` 正文文案进 `messages/*.json`；文章分语言。
11. quiz 页内容补到 800+ 词并加 H1（P1-1）。
12. 图文内容：46 音图/笔顺图 + `next/image` + alt（P1-4）。
13. 关键词堆砌清理（P1-3）。
14. 内链体系：`/learn` 文章 ↔ `/hiragana-katakana-chart` ↔ `/quiz` 的三角互链 + 面包屑（现在 `learn` 文章几乎不链向工具页）。

**第 4 层（持续）**
15. E-E-A-T：作者页/简介、更新时间戳、引用来源（Tofugu/Wikipedia 等），当前站点**无任何作者信息**。
16. 外链建设：kana 学习类目录、Reddit r/LearnJapanese 资源帖、日语学习博客。

---

## 9. 性能优先级建议（按收益/成本比）

| # | 动作 | 预期收益 | 成本 |
|---|---|---|---|
| 1 | 删 `src/app/page.tsx`，让 `/` 走 `[locale]` 的 SSG；给路由设 `revalidate` + CDN 缓存头 | TTFB 0.40s → <0.05s（命中 CDN），LCP 大幅改善 | 半天 |
| 2 | 追踪脚本 10 次 → 4 次（去重 + 删 Umami/Clarity），改 `next/script` | 首屏第三方阻塞减少 ~60% | 半天 |
| 3 | 字体：`next/font/local` 自托管，只保留 latin + 常用假名子集 | 消除 124 个 @font-face 规则、构建不再依赖外网 | 1 天 |
| 4 | CSS 365KB → 目标 <120KB（PurgeCSS 已开？检查 `tailwind.config.ts` 的 `content` 覆盖；`globals.css` 里若有全量引入需拆） | 首屏渲染阻塞减少 | 1–2 天 |
| 5 | `/learn/[slug]` 的 310KB First Load JS：Markdown 渲染拆到 RSC，`react-markdown` 客户端化部分移除 | 文章页 INP/LCP 改善 | 1–2 天 |
| 6 | 图片：补图并全部走 `next/image`（AVIF/WebP，已有 formats 配置） | LCP 元素可控 + 图片搜索流量 | 持续 |
| 7 | AdSense 脚本按同意后再加载 + 位置延后（`lazyOnload`） | 消掉首屏最重第三方 | 0.5 天 |

**当前 CWV 预期**：LCP 大概率 2.5–4s（动态渲染 + 365KB CSS + 774KB JS），INP 在 quiz 交互页有风险（`useQuiz` 每次作答重渲染全部选项），CLS 可能因图片缺失/字体 swap 可控。**建议上线后用 CrUX/GSC 实测验证，不要只看 Lab 数据。**

---

## 10. 竞品对标：定位差距在哪

| 维度 | LearnKana.pro | Tofugu | Real Kana | Dr. Moku | Duolingo |
|---|---|---|---|---|---|
| 核心内容深度 | 栏目页 161–689 词 | 单篇 3000–8000 词深度长文 | 功能极简但极致专注 | 助记法体系（视觉记忆） | 游戏化课程体系 |
| 图片/视觉 | **0 张图** | 大量原创插图 | 极简表格 | 强视觉助记卡 | 强视觉 |
| 品牌/信任 | 无作者、无 About 深度、隐私政策 250 词 | 强品牌 + 作者署名 | 长期口碑 | 应用商店评分 | 巨头 |
| 变现 | AdSense（0 广告位）/ 无订阅 | 内容+课程+周边 | 免费+捐赠 | App 内购 | 订阅 |
| 多语言 | 5 locale（但正文英文） | 英文为主 | 英文 | 多语言 App | 40+ |
| 差异化 | 「AI 导师 + 测验 + 图表 + 转换器」一站式 | 内容权威 | 极简练习 | 助记法 | 全栈课程 |

**结论**：LearnKana 的**功能广度其实是优势**（AI 对话 + quiz 4 种模式 + 图表 + 转换器 + 文章），但线上表现是一个「无图、无内容、无差异化文案」的工具壳。**最现实的定位**：不做 Tofugu 式的深度内容站，做 **"最快上手 kana 的免费练习工具"**（对标 Real Kana 的极简专注 + 更好的移动端体验 + 多语言），把 `/hiragana-katakana-quiz` 做成全网最好的 kana 测验页（含进度、错题本、发音），而不是现在这个 161 词的空壳。
**AI 导师是唯一真正的差异化**（`/chat` + DeepSeek），但目前 `/chat` 也是 104 词的壳，且无任何 SEO 落地页支撑（"AI japanese tutor" 这个关键词在 `keywords` meta 里埋了，但没内容）。

---

## 11. 最值得做的 10 件事（按 ROI 排序）

| # | 动作 | 为什么 ROI 最高 | 工作量 | 预期影响 |
|---|---|---|---|---|
| **1** | **修发布链路，把仓库 HEAD 部署上去**（含部署后冒烟断言） | 所有修复都已写好在仓库：per-page canonical/title、hreflang、服务端 SEO 正文、FAQPage、新页面。**这是唯一一件「零开发、纯运维」就能让 95 个页面重新符合收录条件**的事 | 0.5–1 天 | 🔥🔥🔥🔥🔥 |
| **2** | **删 `[locale]/layout.tsx` 的 `<html>/<head>/<body>` + `export { generateMetadata }`** | 一次改动同时修好：`lang` 语义（4 个 locale）、嵌套 HTML、脚本 ×2、canonical 塌缩的最后一环 | 0.5 天 | 🔥🔥🔥🔥🔥 |
| **3** | **加部署后 CI 冒烟测试**（canonical 自指、hreflang≥6、`<html`==1、lang 随路径、`/japanese-text-analyzer`==200） | 防回归。本次事故能存活 8 个月，就是因为没有任何自动化断言 | 0.5 天 | 🔥🔥🔥🔥 |
| **4** | **4 个 locale 的 `/learn/*` 去重**（先 `noindex` + canonical→英文，从 sitemap 剔除 44 条） | 立刻止血重复内容；避免 hreflang 上线后形成 4 个重复集群 | 0.5 天 | 🔥🔥🔥🔥 |
| **5** | **Cookie 同意 + 5 套追踪砍到 2 套**（GA4 + Vercel） | 同时解决：GDPR 罚款风险、AdSense 账号风险、数据可信度、首屏性能 | 1–2 天 | 🔥🔥🔥🔥 |
| **6** | **查清并修 AdSense**：决定「补广告位」还是「删脚本」 | 现状是纯成本零收益；若补 2–3 个位置在 676 词文章页，可能立刻产生第一笔收入 | 0.5 天（删）/ 1 天（补） | 🔥🔥🔥🔥 |
| **7** | **首页 `/` 从动态 SSR 改为 SSG + CDN 缓存** | TTFB 0.40s → <0.05s；顺带消灭双首页实现 | 0.5–1 天 | 🔥🔥🔥 |
| **8** | **补转化漏斗**：首页/quiz 结果页加注册 CTA + 邮件捕获 + `gtag.event` 埋点 | 现在从「学习完成」到「注册」的路径完全不存在；Firebase+MongoDB 白建 | 1–2 天 | 🔥🔥🔥 |
| **9** | **quiz 页内容化**：161 → 800+ 词、补 H1、正文 i18n、FAQ 结构数据 | 核心变现页是薄内容，是最该排名的页；仓库已有草稿，部署+本地化即可 | 1–2 天 | 🔥🔥🔥 |
| **10** | **图文内容 + og:image 修复**（`/api/og` 部署后验证 + 46 音笔顺图） | 打开图片搜索入口、提升社交 CTR、拉高停留时长；kana 站点最强长尾是「chart with stroke order」 | 2–3 天 | 🔥🔥 |

**如果只能做一件**：做 #1。因为 #2、#4 部分、#9 的正文、`/api/og`、`/japanese-text-analyzer` 全都卡在「代码没上线」。**现在最贵的不是写代码，是让代码生效。**

---

## 附录：复现命令

```bash
# A1 页面计时 + 体积
curl -sS -o /dev/null -w "%{http_code}|%{time_starttransfer}|%{time_total}|%{size_download}\n" \
  https://learnkana.pro/hiragana-katakana-quiz

# A2 嵌套 html/head/body 计数
for u in / /hiragana-katakana-quiz /learn /de /fr/hiragana-katakana-chart; do
  echo -n "$u : "
  curl -s "https://learnkana.pro$u" | python3 -c \
    "import sys;h=sys.stdin.read();print('html=%d head=%d body=%d'%(h.count('<html'),h.count('<head'),h.count('<body')))"
done

# A3 canonical / title / hreflang 全景
curl -s https://learnkana.pro/hiragana-katakana-quiz | python3 -c "
import sys,re,html
h=sys.stdin.read()
t=re.search(r'<title>(.*?)</title>',h,re.S); print('title:',html.unescape(t.group(1)) if t else None)
c=re.search(r'<link rel=\"canonical\" href=\"([^\"]+)\"',h); print('canonical:',c.group(1) if c else None)
print('hreflang:',re.findall(r'hreflang=\"([^\"]+)\"',h))
print('og:image count:',h.count('og:image'))
"

# A4 sitemap 统计
curl -s https://learnkana.pro/sitemap.xml -o /tmp/sm.xml
grep -o '<loc>' /tmp/sm.xml | wc -l                      # 100
grep -c 'x-default' /tmp/sm.xml                          # 0
grep -o '<lastmod>[^<]*' /tmp/sm.xml | sort -u           # 2025-11-18...

# A5 追踪脚本重复计数
curl -s https://learnkana.pro/de -o /tmp/de.html
for p in adsbygoogle.js googletagmanager.com/gtag clarity.ms/tag umami; do
  echo -n "$p: "; grep -o "$p" /tmp/de.html | wc -l
done

# A6 部署后必须通过的断言（建议进 CI）
for p in "" "/hiragana-katakana-quiz" "/hiragana-katakana-chart" "/learn" "/de" "/de/hiragana-katakana-quiz"; do
  expected="https://learnkana.pro${p}"
  actual=$(curl -s "https://learnkana.pro$p" | grep -o '<link rel="canonical" href="[^"]*"' | sed 's/.*href="//;s/"//')
  [ "$actual" = "$expected" ] && echo "PASS $p" || echo "FAIL $p (canonical=$actual)"
done

# A7 响应头 / 缓存
curl -sS -D - -o /dev/null https://learnkana.pro/ | grep -Ei "cache-control|x-vercel-cache|strict-transport|content-security|x-frame"

# A8 构建产物（首屏 JS / 路由静态性）
npm run build 2>&1 | tail -50

# A9 robots 自屏蔽
curl -s https://learnkana.pro/robots.txt | grep -n "xml\|json\|Host\|Sitemap"

# A10 首页关键词密度
curl -s https://learnkana.pro/ | python3 -c "
import sys,re
h=sys.stdin.read();b=h.split('<body')[-1];b=re.sub(r'<script.*?</script>','',b,flags=re.S)
t=re.sub('<[^>]+>',' ',b);t=re.sub(r'\s+',' ',t)
print('words:',len(t.split()),'| \"Hiragana & Katakana Quiz\":',len(re.findall('Hiragana & Katakana Quiz',t)))
"
```

---

*报告完。所有数据均为 2026-11-07 实测，命令可直接复现；未修改任何源码。*
