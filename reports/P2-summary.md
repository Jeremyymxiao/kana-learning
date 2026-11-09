# Phase 2 交付与验收

> 提交：`faa3659`（已推 `origin/main`）· 本地：`tsc` exit 0 · `next build` exit 0 · `smoke 32/32 PASS`
> 生产：**待 promotion**（第三次同样现象，见文末）

## 一、内容正确性（P2-A）

18 篇文章 + `articles.ts`，共 22 条事实纠错：

- **音高重音整节重写**：按东京标准语，平板（やま/さくら/飴）、头高（箸/雨/ねこ）、中高（こころ/たまご）、尾高（いぬ/橋/花），并加同音词说明
- **っ**：从 "glottal stop" 改为「促音 sokuon，用停顿表示，不单独发音」；数据层 romaji 也从 `tsu` 改为 `—`（不会再被 TTS/图表误读）
- **假名正文**：もすこし→もうすこし、すみます/Shimizu desu→しみずです、chokorēto、シーズン 释义、コンセント/ジャーロ→シャボン/ズボン 语源
- **快捷键实录**：macOS（⌃J/K/L、⌃;、⌃:、⌃⇧J/K/L）与 Windows MS-IME（Ctrl/Alt/Shift/CapsLock、F6–F10）按真实行为重写
- **笔画描述**：お 第 3 笔改为右侧点，あ/う/え/か/さ 同步修正
- **虚构对立修正**：あめ vs アメ 不是 rain/candy 的文字区分（雨/飴 都写 あめ，靠汉字与音高重音；アメ 常指 America）
- **标题如实化**：`how-to-write-hiragana` 从 "Complete / all 46" 改为 "Stroke Order Basics (7 Characters)"，5 语言 metadata 同步
- 额外修掉：typing-katakana 的 F7 流程（三处错）、`fittoNesu`、`su-pōn`→`supūn`、`(too)`→`(tō)`、カフェオレ 假长音、假音变例子换成真实 300/600/800

**罗马字规范（全站统一）**：Hepburn；长音 macron `ō/ū/ē`（えい→ei）；ん+元音用撇号（sen'en）；促音双写辅音（gakkō）；typing 文章的「按键序列」保留可键入形式（有意例外）。规则说明按首次出现插入 16 篇文章。

## 二、SEO 与诚实性（P2-B）

- **正文语言真相**：de/fr/pt/es 的 80 条文章 URL 原本自指 canonical（正文却是英文）；现统一 canonical → `https://learnkana.pro/learn/{slug}`，页面加「本文正文为英文」提示 + `<article lang="en">`；英文版保持自指。
- **hreflang**：文章从「宣称 5 个语言版」收敛为 `en + x-default`（与 canonical 一致）。
- **sitemap**：155 → **75 条**（删掉 80 条重复文章 URL）；栏目 `lastModified` 从写死 2025 改为构建日期。
- **去关键词堆砌**：首页词组密度 en 3.92% → **0.46%**，de 4.13% → 0.51%，fr/pt/es 同幅度；5 语言同步。
- **删除未实现能力声称**：完整 SRS/专家合作/笔顺动画/手写识别/自适应路径/分析仪表盘；进度改为「浏览器本地存储、不跨设备同步」；AI Tutor 标注「AI 生成，请核实」。
- **JSON-LD**：首页单 `@graph`（Organization → WebSite → FAQPage 6 问 → BreadcrumbList），删除不存在的 SearchAction，`inLanguage` = 真实 5 locale，去掉重复 WebSite。
- 顺带修：`articleTranslations` 补 10 篇 × 5 语言（现 20 slug × 5 = 100 条）；英文面包屑不再生成 `/en/...`。

## 三、性能（P2-C）

| 指标 | 改前 | 改后 |
|---|---|---|
| CSS 总体积 | 373 KB | **279 KB（−25%）** |
| `@font-face` 规则 | 373 | **249** |
| Quiz 页挂载 JS | 161 KB | **41.7 KB（−74%）** |
| 首屏 `First Load JS` | 208/207 KB | 不变（markdown 本就未计入） |
| 缓存头 | `no-store` | `immutable`（静态）/ `no-store`（API）/ `s-maxage=86400`（HTML） |
| 首页渲染 | `●` SSG | `●` SSG（无需改动） |

> AI 分析（ReactMarkdown + streaming）改为 `next/dynamic` 懒加载，119 KB markdown 解析器推迟到点击「AI 分析」后。

## 四、上线步骤（同前两次）

部署对象已生成但生产别名未移动。需要：
- **控制台**：Deployments → 最新 → ⋯ → **Promote to Production**
- 或 `npx vercel login` 后在浏览器完成授权，我来自动 promote + 验收

**根因建议**：`Settings → Git → Production Branch` 很可能不是 `main`（或为空），所以每次 push 只生成 preview 部署。改一次以后就不用手动 promote。

promotion 后我会验证：`/api/version` = `faa3659`、sitemap 75 条、`/de/learn/*` canonical、首页 FAQPage、缓存头 `HIT`、smoke 32/32。

## 五、未做（Phase 3 / 后续）

1. **笔顺动画**（46+46）——需要引入 KanjiVG 类笔画数据与许可说明。
2. **真人音频**替换浏览器 TTS——需要录音资产。
3. **正文真翻译**（10 篇核心文章 × 4 语言）——当前策略是 canonical 归英文，翻译后只需撤掉 `ARTICLE_CONTENT_LOCALE` 覆盖。
4. **7 单元课程路径**（清音分单元 → 浊音 → 拗音 → 特殊拍 → 片假名 → 外来音 → 综合）。
5. `/learn` 列表页 `ItemList` schema、`/en` 301 归一、CSP、E2E 测试。
6. 字体降到 2 字重后 `font-medium` 无 500 字面（视觉略细），需真机确认是否接受（回退代价 +94 KB）。

## 六、线上验收（2026-11-09）

- 生产 `/api/version` → **`6cd995c`**（env=production）；自动部署已生效（用户开启 Settings → Environments → Production → Auto-assign Custom Production Domains 后，main 推送约 1 分钟自动上线）
- `BASE_URL=https://learnkana.pro node scripts/smoke.mjs` → **32/32 PASS**
- sitemap **75** 条 ✅；`/de/learn/hiragana-basics` canonical → `https://learnkana.pro/learn/hiragana-basics` ✅；首页 FAQPage ✅；`<html>` 每页 1 个 ✅
- 缓存实测：
  - `/_next/static/*` → `cache-control: public,max-age=31536000,immutable`，`x-vercel-cache: HIT` ✅
  - HTML（`/`、`/de`）仍是 `private, no-cache, no-store` + `MISS` ⚠️ —— 已排除 cookie 因素（`localeCookie:false` 后无 Set-Cookie），原因是 next-intl middleware 的 rewrite 让 Vercel 按动态路由处理（`x-matched-path: /[locale]`）
  - TTFB 实测：`/` 0.84s、`/quiz` 0.45s、`/de` 0.51s（区域 `iad1`，跨区延迟）
- 后续优化（Phase 3）：① 把默认语言 rewrite 从 middleware 移到 `next.config` beforeFiles，让 `/` 直接命中预渲染文档；② 或给页面设 `preferredRegion`（如 `sin1`）降低亚洲 TTFB；③ `/learn` 列表页 ItemList schema
