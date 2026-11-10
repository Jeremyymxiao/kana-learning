# Phase 3-4 交付：7 单元课程路径

> 提交：`d4f8b43`（已推 `origin/main`，**自动部署上线**）
> 验证：`tsc` exit 0 · `next build` exit 0 · 本地/线上 smoke **32/32** · 生产 `/api/version` = `d4f8b43`

## 一、学习路径

| # | 单元 | 假名 | 练习池 |
|---|---|---|---|
| 1 | 清音① あ・か・さ行 | 15 | `?rows=a,ka,sa` |
| 2 | 清音② た・な・は行 | 15 | `?rows=ta,na,ha` |
| 3 | 清音③ ま・や・ら・わ＋ん | 16 | `?rows=ma,ya,ra,wa,n` |
| 4 | 浊音・半浊音 | 23 | `?rows=ga,za,da,ba,pa` |
| 5 | 拗音 | 33 | `?rows=kya,sha,cha,nya,hya,mya,rya,gya,ja,bya,pya` |
| 6 | 特殊拍（っ・ー・ん） | — | 综合池 + 文章 `hiragana-pronunciation` |
| 7 | 片假名与外来音 | 46（平假名对照） | `katakana` 池 + 文章 `katakana-loanwords` |

- 每单元 3–4 课时：图表（行/段定位）→ 选择题 → 一种变体（听写/拼写/匹配）→（u6/u7）文章。
- 单元卡按进度显示 `Start / Continue / Review unit N`，总进度按假名去重（102 个唯一 key，不是 149）。
- 末尾「综合测试」→ `?start=all`。

## 二、代码改动

- **`src/data/curriculum.ts`（新）**：7 单元 / 23 课时，只存 id，不存文案；每个假名逐字校验存在于 `gojuon.ts`。
- **`src/app/[locale]/course/*`（新）**：server 页面出 metadata + JSON-LD（`ItemList` 7×`LearningResource` + `BreadcrumbList`），client 内容页在 `useEffect` 读 localStorage（无 hydration mismatch）。
- **quiz 行过滤**：`gojuon.ts` 新增 `KanaRow` / `getKanaRow` / `parseKanaRows`，`getQuizKana(group, rows?)` 支持按行取池；行 id 覆盖清音 11 + 浊音 5 + 拗音 11。
- **`?rows=` 与 `?type=`**：`useKanaRows()` 读 URL；`QuizPanel` 把 rows 传到 choice/dictation/matching/spelling 四种题型；`type` 参数优先于 `start=` 后缀。
- **导航与首页**：Learn 项指向 `/course`（`/learn` 仍激活 Learn），首页 Learning Guides 上方加入口卡。
- **i18n**：`Course` 命名空间 79 键 × 5 语言，键集合一致；`Navigation.course` 已补。
- **sitemap**：75 → **80**（+5 个 `/course`）。
- **顺带修复**：`src/components/ui/progress.tsx` 没把 `value` 传给 Radix Root（全站进度条一直是 indeterminate、无 `aria-valuenow`），现已修复——quiz 答题页进度条也同时恢复。

## 三、线上验收

```
/api/version            → d4f8b43 (production)
smoke                   → 32/32 PASS
/course, /de/course     → 200；canonical 各语言自指
sitemap                 → 80 条
u4 主按钮               → ?start=special&rows=ga,za,da,ba,pa&type=choice
?start=...&rows=...     → 200
导航 Learn              → /course
```

## 四、已知取舍

1. **u6 单元进度显示 “0 of 1”**：っ/ー 不是独立音节（P0 已定为不参与考核），该单元只有 ん 可统计，教学由文章承担。
2. **u7 与 u1–u3 共用平假名进度 key**：片假名与平假名共享掌握度，所以 u7 进度会随清音一起涨；课程总进度已按假名去重避免虚高。若要做片假名独立进度，需要 `progress.ts` 增加脚本维度（后续）。
3. **u4/u5 的 quiz 池是 `special` + rows 子集**：不再互相串题；但 `dakuon/youon` 仍是同一个 `special` 大池，靠 rows 区分。
4. `final-quiz` 未写入 curriculum 数据结构，页面用页面级文案 + `?start=all` 实现。

## 五、浏览器手测（5 分钟）

1. `/course`：7 张单元卡 + 综合测试 + 文章库；未练习时进度显示 “—”。
2. 点 u1「Start unit 1」→ 直接进第 1 题，题目只出 あ〜そ。
3. 做完 10 题回 `/course`：u1 进度变化、按钮变 Continue/Review，刷新后仍在。
4. 点 u4 → 只出 浊音/半浊音；点 u2 的听写课时 → 听写模式且只出 た・な・は 行。
5. 切 `/de/course`：全德语，导航 Learn active。
6. 键盘 Tab：单元卡、课时链接、进度条均可聚焦；进度条有 `aria-valuenow`。
