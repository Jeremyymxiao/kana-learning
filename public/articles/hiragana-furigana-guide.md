# How to Add Hiragana Above Kanji (Furigana Guide)

If you have ever opened a Japanese children's book, a beginner manga, or a language-learner edition of a novel, you will have noticed small hiragana characters printed just above the kanji. Those tiny annotations are called **furigana** (振り仮名), and they are one of the most practical reading aids in the Japanese writing system. This guide explains what furigana is, how it works, when it appears, how to write it correctly, and how to add it digitally.

---

## What Is Furigana?

Furigana is a set of small kana characters — almost always hiragana — placed above a kanji (or kanji compound) in horizontal text, or to the right of a kanji in vertical text. Their sole purpose is to show the pronunciation of the kanji beneath them.

The technical name for this typographic device is **ruby annotation**, named after an old British unit of type size (approximately 5.5 pt) that was historically used for marginal glosses. In HTML, the `<ruby>` element still carries that name today.

Here are three simple examples written with HTML ruby markup:

<ruby>日本語<rt>にほんご</rt></ruby> — *Japanese language*

<ruby>東京<rt>とうきょう</rt></ruby> — *Tokyo*

<ruby>読<rt>よ</rt></ruby>む — *to read*

Notice that in the third example, furigana is placed only over the kanji <ruby>読<rt>よ</rt></ruby>, not over the hiragana む that follows it. That distinction becomes important when we discuss 送り仮名 below.

---

## Types of Furigana: 振り仮名 vs 送り仮名

### 振り仮名 (Furigana / Ruby Glosses)

振り仮名 (ふりがな) in the broad sense refers to any kana placed beside or above a character to indicate its reading. In everyday usage the word "furigana" covers:

- **Readings for standalone kanji**: <ruby>山<rt>やま</rt></ruby> (mountain)
- **Readings for compound kanji**: <ruby>図書館<rt>としょかん</rt></ruby> (library)
- **Readings for names (人名ふりがな)**: <ruby>田中<rt>たなか</rt></ruby>さん

Names are a particularly important case. Japanese personal and place names often use rare or non-standard readings that even native speakers cannot reliably guess. Furigana on name cards (名刺), official forms, and fiction eliminates ambiguity.

### 送り仮名 (Okurigana)

送り仮名 (おくりがな) are the hiragana characters that *follow* a kanji stem and are part of the word itself — they are not ruby glosses but rather full members of the word's spelling. For example:

- <ruby>食<rt>た</rt></ruby>**べる** — the furigana is た (over the kanji), while べる is okurigana written at regular size
- <ruby>書<rt>か</rt></ruby>**く** — ka is the kanji reading; ku is okurigana
- <ruby>美<rt>うつく</rt></ruby>**しい** — utsuku is the stem reading; shii is okurigana

When you write furigana, you must be careful not to place ruby annotations over okurigana — only over the kanji itself.

### Katakana Furigana

Less commonly, katakana is used as furigana to indicate the foreign-language or technical pronunciation of a kanji, often in scientific, medical, or specialized texts. This is uncommon in everyday material but worth knowing exists.

---

## When Furigana Is Used

Furigana appears in very different contexts depending on the intended audience and purpose.

### Children's Books and Educational Texts

Elementary-school readers in Japan always carry furigana on every kanji because children are still learning the characters. The Japanese Ministry of Education gradually removes furigana from officially prescribed textbooks as students progress through the grade levels — by the end of junior high school, most textbooks assume full kanji literacy.

### Manga

Manga (Japanese comics) almost universally include furigana on kanji, even in titles aimed at adults. This serves two purposes: it lowers the reading barrier for younger readers, and it lets publishers reach a wider market. Manga is therefore one of the best resources for learners encountering furigana in its natural context.

### Learner Editions and Graded Readers

Publishers produce special "learner editions" of classic literature and contemporary novels where furigana is added to every kanji above the JLPT N3 or N2 level. These are invaluable for intermediate students.

### Newspapers for Rare Kanji

Standard Japanese newspapers target adult, literate readers and therefore use no furigana for common kanji. However, when a rare or legally specified kanji appears — for instance in a proper noun or a specialized term — editors add furigana to prevent misreading. This selective use of furigana is called **難読語ふりがな** (furigana for difficult readings).

### Proper Names in Official Documents

Government forms, hospital intake sheets, and business contracts almost always include a dedicated field for **ふりがな** (or **フリガナ** in katakana) beside the name field. You write your name's pronunciation there so the institution knows how to address you correctly.

---

## How to Write Furigana Correctly

### Size and Proportion

The standard convention is that furigana should be approximately **half the height (and width) of the base kanji**. In typesetting this is expressed as a type size ratio: if your body text is 10 pt, furigana should be 5 pt. Digital environments often use `font-size: 0.5em` as a CSS starting point.

### Centering Above the Kanji

When the furigana reading is the **same width** as the kanji it annotates, alignment is straightforward — center the ruby above the kanji. The complexity arises when lengths differ:

- **Furigana shorter than kanji**: Center the furigana, leaving space on either side.
- **Furigana longer than kanji**: The furigana extends beyond the kanji's edges. Good typesetting adjusts spacing so the ruby does not collide with adjacent characters. Japanese typesetting standards (JIS X 4051) specify detailed rules for distributing the excess evenly on both sides, provided the ruby does not overlap adjacent base characters.

### Horizontal vs. Vertical Text

In horizontal text (横書き, *yokogaki*), furigana sits **above** the base characters. This is the orientation you encounter on almost every website, modern novel, and printed form today.

In vertical text (縦書き, *tategumi*) — traditional columns running top-to-bottom, right-to-left — furigana sits **to the right** of the base characters. Traditional literature, some manga page layouts, and calligraphy follow this convention. CSS supports vertical ruby with `writing-mode: vertical-rl`.

### Annotating Compound Kanji

For a two-kanji compound like <ruby>電車<rt>でんしゃ</rt></ruby> (train), the convention is to write the entire reading でんしゃ as a single ruby spanning both kanji, rather than splitting でん over 電 and しゃ over 車 separately. Both approaches exist, but the unified span is standard in most Japanese publishing.

---

## Reading Furigana: Common Kanji and Their Readings

The following table lists 25 high-frequency kanji you are likely to see furigana on in learner materials, along with their most common readings. Mastering hiragana is a prerequisite for reading furigana — if you need to review the characters, the [Hiragana and Katakana Chart](/hiragana-katakana-chart) covers every character with stroke order.

| Kanji | Furigana | Meaning |
|-------|----------|---------|
| 日 | <ruby>日<rt>ひ</rt></ruby> / <ruby>日<rt>にち</rt></ruby> | day / sun |
| 月 | <ruby>月<rt>つき</rt></ruby> / <ruby>月<rt>げつ</rt></ruby> | moon / month |
| 山 | <ruby>山<rt>やま</rt></ruby> | mountain |
| 川 | <ruby>川<rt>かわ</rt></ruby> | river |
| 人 | <ruby>人<rt>ひと</rt></ruby> / <ruby>人<rt>じん</rt></ruby> | person |
| 食べる | <ruby>食<rt>た</rt></ruby>べる | to eat |
| 飲む | <ruby>飲<rt>の</rt></ruby>む | to drink |
| 見る | <ruby>見<rt>み</rt></ruby>る | to see / watch |
| 聞く | <ruby>聞<rt>き</rt></ruby>く | to listen / ask |
| 書く | <ruby>書<rt>か</rt></ruby>く | to write |
| 学校 | <ruby>学校<rt>がっこう</rt></ruby> | school |
| 先生 | <ruby>先生<rt>せんせい</rt></ruby> | teacher |
| 電車 | <ruby>電車<rt>でんしゃ</rt></ruby> | train |
| 図書館 | <ruby>図書館<rt>としょかん</rt></ruby> | library |
| 東京 | <ruby>東京<rt>とうきょう</rt></ruby> | Tokyo |
| 日本語 | <ruby>日本語<rt>にほんご</rt></ruby> | Japanese language |
| 勉強 | <ruby>勉強<rt>べんきょう</rt></ruby> | study |
| 友達 | <ruby>友達<rt>ともだち</rt></ruby> | friend |
| 家族 | <ruby>家族<rt>かぞく</rt></ruby> | family |
| 仕事 | <ruby>仕事<rt>しごと</rt></ruby> | work / job |
| 時間 | <ruby>時間<rt>じかん</rt></ruby> | time |
| 音楽 | <ruby>音楽<rt>おんがく</rt></ruby> | music |
| 映画 | <ruby>映画<rt>えいが</rt></ruby> | movie |
| 病院 | <ruby>病院<rt>びょういん</rt></ruby> | hospital |
| 天気 | <ruby>天気<rt>てんき</rt></ruby> | weather |

Once you can read all the furigana in this table without hesitation, test yourself on a wider set of kana combinations with the [Hiragana and Katakana Quiz](/hiragana-katakana-quiz).

---

## Digital Furigana

### HTML Ruby Tags

The HTML `<ruby>` element is the standard way to add furigana on the web. The basic structure is:

```html
<ruby>漢字<rt>かんじ</rt></ruby>
```

The `<rt>` element (ruby text) holds the furigana annotation. For fallback in older browsers, `<rp>` (ruby parenthesis) can wrap parentheses that appear when ruby is not supported:

```html
<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>
```

Rendered with support: <ruby>漢字<rt>かんじ</rt></ruby>

Rendered without support: 漢字(かんじ)

CSS for styling ruby:

```css
ruby {
  ruby-align: center; /* center furigana over base text */
}
rt {
  font-size: 0.5em;
  line-height: 1;
  color: #555;
}
```

### Microsoft Word

In Word for Windows (Japanese language pack installed):

1. Select the kanji text you want to annotate.
2. Go to **Home → Font → Phonetic Guide** (ルビ button in the Japanese ribbon).
3. The dialog auto-suggests readings; correct them if needed.
4. Set the font size and alignment, then click OK.

Word for Mac has limited furigana support; LibreOffice Writer (with Japanese interface) offers a similar **Format → Ruby Text** dialog.

### Google Docs

Google Docs does not natively support ruby annotations. Workarounds include:

- Using a subscript/superscript hack (poor visual quality).
- Exporting to HTML and post-processing with ruby tags.
- Drafting furigana content in a dedicated Japanese word processor such as Ichitaro or Pages (Mac) with a Japanese text engine.

### Mobile Input (iOS / Android)

Neither iOS nor Android has a built-in furigana keyboard. To type ruby-annotated text on mobile, you typically need a dedicated app (e.g., 縦書きエディタ for vertical text) or you paste pre-formatted HTML into a web editor.

### Furigana Generators

Several online tools accept Japanese text and automatically add furigana using morphological analysis:

- **Furigana Injector** (browser extension): overlays furigana on any webpage.
- **jisho.org**: shows readings for individual words.
- **Yahoo! Japan's furigana converter**: pastes text and returns a ruby-annotated version.

These tools use the same underlying technology (MeCab or similar tokenizers) and are accurate for standard vocabulary but may struggle with rare names.

---

## Common Mistakes

### 1. Adding Furigana Over Okurigana

Incorrect: <ruby>食べる<rt>たべる</rt></ruby>

Correct: <ruby>食<rt>た</rt></ruby>べる

The hiragana べる is already readable; annotating it with furigana is redundant and signals a misunderstanding of the system.

### 2. Using the Wrong Reading for the Context

Kanji often have multiple readings. 日 can be ひ (standalone: the sun), にち (Sino-Japanese compounds: 日曜日), or び (in some compounds: 誕生日). Furigana must match the reading as the word is *actually pronounced* in context, not just the first reading listed in a dictionary.

### 3. Inconsistent Annotation Within a Document

If you add furigana to <ruby>私<rt>わたし</rt></ruby> on page 1, you should add it every time (or never after the first occurrence, depending on your style guide). Selective, inconsistent annotation confuses readers.

### 4. Overlapping Adjacent Text

When a long furigana string extends beyond its kanji, it can collide with neighboring characters. Always preview your layout at the intended font size and line height to catch overlaps before publishing.

### 5. Katakana When Hiragana Is Expected

Furigana is almost always hiragana. Using katakana furigana for a standard word (rather than a foreign loanword or a special stylistic effect in manga) is non-standard and will look incorrect to native readers.

---

## Summary

Furigana is a precisely defined typographic tool with clear rules:

- It is small hiragana (or occasionally katakana) placed above kanji in horizontal text, or to the right in vertical text.
- It annotates only the kanji, never the okurigana that follow it.
- Size should be roughly half the base character; alignment depends on relative widths of ruby and base text.
- HTML supports furigana natively with `<ruby>` and `<rt>` elements.
- Context determines whether furigana is appropriate — children's books always use it, adult literary fiction rarely does.

Understanding furigana is inseparable from knowing hiragana fluently. If you are still building confidence with the 46 basic hiragana characters, the [Hiragana and Katakana Chart](/hiragana-katakana-chart) is a good reference point before you start reading ruby-annotated texts.
