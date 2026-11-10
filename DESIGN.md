---
name: LearnKana
description: Free kana course — a transit-signage typographic world for learning hiragana and katakana.
colors:
  paper: "#FFFFFF"
  ink: "#14140F"
  muted-ink: "#5B5B53"
  route-green: "#0B7A45"
  seal-vermilion: "#C4342B"
  seal-vermilion-deep: "#A82A23"
  dark-rule: "#24261F"
  dark-muted-ink: "#A3A39A"
  rule: "#E2E0D6"
  night: "#14140F"
  dark-paper: "#0D0E0B"
  dark-ink: "#F1F0E7"
  dark-route: "#46B87E"
  dark-seal: "#E0574C"
typography:
  display:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(2.4rem, 5.4vw, 4.7rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.7rem, 3.4vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  kana-glyph:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(9rem, 25vw, 19rem)"
    fontWeight: 700
    lineHeight: 0.74
    letterSpacing: "-0.05em"
  station-number:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.2rem, 2vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  caption:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  meta:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
  lede:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  kana-cell:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "normal"
  kana-outline:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(6rem, 16vw, 13rem)"
    fontWeight: 700
    lineHeight: 0.72
    letterSpacing: "normal"
  closing-title:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.9rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  micro-label:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.5em"
  caption-sm:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-lg:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(1rem, 1.35vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  h3:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.15rem, 1.9vw, 1.55rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h2-compact:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "clamp(1.45rem, 2.5vw, 2.1rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  row-title:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  nav-link:
    fontFamily: "Archivo, Noto Sans JP, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
  micro-tag:
    fontFamily: "Noto Sans JP, sans-serif"
    fontSize: "0.6rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  seal: "2px"
  dot: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "clamp(56px, 8vw, 108px)"
  wrap-inline: "clamp(20px, 5vw, 48px)"
components:
  seal-button:
    backgroundColor: "{colors.seal-vermilion}"
    textColor: "#FFFFFF"
    rounded: "{rounded.seal}"
    padding: "14px 22px"
  station-row:
    textColor: "{colors.ink}"
    padding: "clamp(16px, 2.4vw, 24px) 0"
  index-row:
    textColor: "{colors.ink}"
    padding: "clamp(14px, 2vw, 20px) 0"
---

# LearnKana design system

## Overview

LearnKana's homepage is a transit-signage typographic world: paper ground, sumi ink, one green route line carrying seven numbered stations that are the real curriculum units, oversized kana as the focal artifact, and a vermilion seal reserved for the primary action. The surrounding product surfaces (chart, quiz, course, articles) keep the established light UI system; this document records the homepage world plus the shared rules it must not break.

The page's job is persuasion, not operation: a beginner must recognise a kana, understand there is an ordered route, and start station 01 in one click without an account.

## Colors

Paper white is the ground; ink carries text. Route green is structural (line, station numbers, station dots, hover ink) and never used as body text on paper at small sizes. Seal vermilion appears only for the primary action, focus rings, and text selection — its scarcity is the emphasis mechanism. Muted ink carries secondary copy and captions.

Dark theme inverts paper/ink and lifts green and vermilion so both keep ≥4.5:1 against the dark ground; the closing section inverts again (ink ground, paper text) in the light theme.

## Typography

Archivo (latin, 600/700/800) is the display voice: uppercase, tight tracking, line-height under 1. Noto Sans JP is the body voice and the only face for kana — kana are never set in the Latin display face. Oversized kana are the page's loudest element, at up to 19rem, with a green baseline rule instead of a gradient. Station numbers use Archivo with tabular numerals because their order is information. Body copy stays at 46–62ch; ledes cap at 58ch.

## Layout

A 1180px wrap with fluid inline padding. The hero is a two-column composition (copy / kana artifact) that stacks with the kana first on narrow screens. Stations are full-width rows on a continuous vertical line, not a card grid. Later sections alternate between two-column index layouts (heading rail + list) and full-width rows, with every section separated by a hairline rule and generous vertical rhythm (`clamp(56px, 8vw, 108px)`).

## Elevation & Depth

No shadows and no cards. Depth comes from the single route line, hairline rules, and type scale. The only raised surface is the seal button, which uses a 2px translate on hover rather than a shadow.

## Shapes

Circles belong to the route (station nodes, platform disc). The seal button is a squared 2px-radius plate: transit signage, not a pill. Everything else is a rule or a line. No rounded cards, no nested containers.

## Components

- **Seal button** — vermilion plate, white 700 text, arrow that translates diagonally on hover; the only primary action per viewport.
- **Station row** — `01` number in green, localized unit title, one-line goal, kana preview, diagonal arrow; whole row is a link to `/course`.
- **Kana row** — five cells separated by hairlines; oversized kana, tracked romaji caption, green tint on hover; the whole row starts practice on that row.
- **Index row** — tool/article links as ruled rows with a diagonal arrow; hover shifts ink to green and indents 6px.
- **FAQ** — native `<details>` with custom `+/−` marker in green, so answers stay in the document for crawlers and screen readers.
- **Closing band** — inverted ink ground, outline kana at 1px stroke, repeat of the seal action.

## Do's and Don'ts

- Do keep one primary action per viewport; the seal colour is not a decorative accent.
- Do use real curriculum data for stations, counts, and kana previews — never invented numbers.
- Do keep `lang="ja"` on every kana and Japanese label.
- Don't use gradients, glass, card shadows, kickers, or section numbers that carry no information.
- Don't set kana in a Latin face or use the seal colour for anything but action and focus.
- Don't exceed the station metaphor beyond the homepage without a recorded system change.
