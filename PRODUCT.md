# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

English-speaking Japanese beginners, mostly on a phone in short 5–15 minute sessions (commute, lunch break, before class). They cannot yet read kana, are self-directed, and usually will not create an account before they have seen themselves improve.

## Product Purpose

LearnKana is a free kana course: seven units take a learner from the first row of hiragana to dakuten, yōon, special sounds and katakana. Success means a returning learner finishes a unit, sees weak kana named honestly, and can read kana they could not read last week.

## Positioning

A path, not a toy. Row-by-row curriculum plus weak-kana-weighted practice plus immediate corrective feedback, free and without signup. Neighboring kana sites ship a chart and a random quiz; LearnKana's mechanism is the ordered unit sequence tied to the learner's own accuracy record.

## Operating Context

- Sessions are short and interrupted; progress must survive without an account (localStorage today).
- Learners often cannot hear native audio at first (silent commute) — reading-based practice must stand alone.
- Five UI locales (en, de, fr, pt, es); article bodies are currently English and are marked as such.
- The product is discovered through search and shared links; the homepage is usually the first and often the only page a visitor reads before deciding.

## Capabilities and Constraints

- Seven curriculum units (seion rows ①–③, dakuon/handakuten, yōon, special sounds, katakana) with 23 lessons, four quiz modes (choice, dictation, spelling, matching), chart, converter, text analyzer, AI chat, and 20 learning articles.
- 102 kana in the practice pool; sokuon っ and the homophones ぢ/づ are deliberately excluded from scoring.
- Pronunciation is browser speech synthesis only; there is no recorded native audio. Stroke-order animation does not exist yet.
- Progress, mastery (0–3) and weak-kana weighting live in the browser; there is no cloud sync.
- No login wall, no ads, no payment. Analytics are cookieless by default, with GA4/Clarity only after consent.
- Stack: Next.js 15 App Router, static generation, next-intl, Tailwind.

## Brand Commitments

- Name: LearnKana. Free is a permanent commitment, not a promotion.
- Claims must match the shipped product; no capability may be advertised before it exists (FAQ copy was rewritten for this reason).

## Evidence on Hand

- Real curriculum data and real progress mechanics in the codebase (`src/data/curriculum.ts`, `src/lib/progress.ts`).
- Real chart data for 102 kana, four real quiz modes, five real UI locales.
- Absences future work must not fabricate: no testimonials, no customer logos, no benchmarks, no press, no native-audio assets, no stroke-order data.

## Product Principles

1. Teach the next correct thing, not the most impressive thing.
2. A learner should be able to act within one viewport, without an account.
3. Name weaknesses plainly; praise only what the learner actually did.
4. Every claim on the page must be demonstrably true in the product today.
5. Short sessions are the normal case: state must survive interruption.

## Accessibility & Inclusion

WCAG 2.2 AA target. Kana must carry `lang="ja"` for screen readers, keyboard paths must exist for every practice control, and contrast failures found in the audit are treated as defects rather than stylistic choices.
