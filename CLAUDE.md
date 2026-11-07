# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kana Learning (LearnKana.pro) is a multilingual web application for learning Japanese Hiragana and Katakana characters. Built with Next.js 15, it features interactive learning tools, quizzes, character charts, and an AI-powered chat assistant.

## Development Commands

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript type checking
npm run format          # Format code with Prettier

# UI Components
npm run shadcn          # Add shadcn/ui components
```

**No test framework is configured.** There are no unit or integration tests. CI runs only `type-check` and `build`.

## Architecture

### Next.js App Router with Internationalization

The application uses Next.js App Router with dynamic locale routing (`[locale]`). All pages exist under `src/app/[locale]/*` and support 5 languages: English (en), German (de), French (fr), Portuguese (pt), and Spanish (es). English is the default locale.

**i18n routing behavior (`i18n.config.ts`):**
- Uses `localePrefix: "as-needed"` — English URLs have **no** `/en/` prefix, other locales do
- `i18n.config.ts` exports shared navigation helpers: `Link`, `redirect`, `usePathname`, `useRouter`
- URL rewrites in `next.config.js` map root paths (e.g., `/hiragana-katakana-quiz`) to `/en/...`
- Translation files live in `messages/*.json`

**Dual layout structure:**
- `src/app/layout.tsx` — Root layout (Google Analytics, AdSense, Microsoft Clarity, Noto Sans JP font)
- `src/app/[locale]/layout.tsx` — Locale layout (NextIntlClientProvider, Umami Analytics, structured data, `generateStaticParams`)

### Feature-Based Structure

Code is organized by feature domains under `src/features/`:

- **kana**: Core Kana learning features — character table (`gojuon-table/`), navigation bar, navigation context provider
  - Types: `KanaType: 'hiragana' | 'katakana' | 'mixed' | 'special'`

- **quiz**: Quiz system with multiple quiz types
  - `QuizPanel.tsx` — Main quiz container that delegates to type-specific components
  - `hooks/useQuiz.ts` — Centralized quiz state management (question generation, scoring)
  - Quiz types: `'choice' | 'dictation' | 'matching' | 'spelling'`
  - Each type has its own component directory under `components/`

### Data Layer

Character data is centralized in `src/data/` and `src/constants/`:

- `src/data/gojuon.ts` — Kana character data organized by `seion` (basic), `dakuon` (voiced), `youon` (compound). Each character has hiragana, katakana, and romaji fields.
- `src/constants/kana.ts` — HIRAGANA_TABLE and KATAKANA_TABLE lookup objects

### Authentication & Database

- **Firebase Auth** (primary): Google OAuth via `src/lib/firebase.ts`, context in `src/providers/AuthProvider.tsx`
  - Note: `@auth/core` is in package.json but Firebase is the active auth provider
- **MongoDB**: User data via Mongoose (`src/lib/mongodb.ts` uses singleton pattern, model in `src/models/user.ts`)

### API Routes

API routes exist in both `src/app/api/` (legacy) and `src/app/[locale]/api/` (localized). Both follow Next.js 15 Route Handler conventions.

- `/api/chat` — Streaming chat with DeepSeek API
- `/api/analyze` — Text analysis and furigana generation using kuroshiro
- `/api/convert` — Kana/romaji conversion
- `/api/articles/[slug]` — Learning articles from `public/articles/*.md`

### Styling

- **Tailwind CSS** with custom theme in `tailwind.config.ts` (darkMode: `"class"`)
- **shadcn/ui** components in `src/components/ui/`
- CSS variables for theming in `src/app/globals.css`
- Custom green/red color variants for quiz feedback
- `@tailwindcss/typography` plugin for prose styling

### Key Libraries

- **next-intl**: Internationalization with typed message hooks
- **kuroshiro + kuroshiro-analyzer-kuromoji**: Japanese text analysis and furigana (dictionary files in `public/dict/`)
- **firebase** (v11): Authentication
- **mongoose**: MongoDB ODM
- **shadcn/ui + Radix UI**: Component library
- **@vercel/og**: Open Graph image generation
- **react-markdown** with remark-gfm and rehype-raw: Markdown rendering

## Important Patterns

### Path Aliases

Use `@/*` to import from `src/`:
```typescript
import { HIRAGANA_TABLE } from '@/constants/kana'
import { useQuiz } from '@/features/quiz/hooks/useQuiz'
```

### Metadata Generation

Pages use functional metadata exports for SEO. Many pages have dedicated `metadata.ts` files exporting `generateMetadata` functions that handle locale-specific meta tags.

### Quiz State Management

The `useQuiz()` hook manages test state, question generation, and scoring. It generates 10 random questions from available Kana. Each quiz type implements its own component but shares the same state interface.

### Article System

Learning articles are Markdown files in `public/articles/` served via API routes. `src/data/articles.ts` maps article metadata (title, description, slug) for indexing.

## Environment Variables

Required (not tracked in git):
- `MONGODB_URI` — MongoDB connection string (defaults to `mongodb://localhost:27017/kana-learning`)
- `DEEPSEEK_API_KEY` — API key for AI chat feature
- Firebase config is hardcoded in `src/lib/firebase.ts` (public API keys)

No `.env.example` file exists.

## CI/CD & Deployment

- **CI**: GitHub Actions (`.github/workflows/ci.yml`) runs `npm ci`, `type-check`, and `build` on pushes/PRs to main
- **Deployment**: Vercel with `vercel.json` config (API functions have 60s maxDuration)
- **Image domains**: `lh3.googleusercontent.com`, `avatars.githubusercontent.com`, `images.unsplash.com`, `learnkana.pro`

## Special Notes

- **Next.js 15**: Uses updated async params API (`await params` in server components)
- **CSP disabled**: Content Security Policy is commented out in `next.config.js`
- **Duplicate API routes**: Both locale-prefixed and non-prefixed routes exist for backward compatibility
- **MDX support**: Configured via `@next/mdx` but primarily uses plain Markdown
- **TypeScript**: Strict mode enabled, custom `typeRoots` includes `./types` directory, incremental builds enabled
- **Webpack**: Custom raw-loader config in `next.config.js` for Markdown file loading

## Common Tasks

### Adding a New Quiz Type

1. Define the question type in `src/features/quiz/types.ts`
2. Add generation logic in `useQuiz.ts` generateQuestions function
3. Create component in `src/features/quiz/components/[quiz-type]/`
4. Update QuizPanel to handle the new type

### Adding a New Locale

1. Add locale code to `i18n.config.ts` routing.locales array
2. Create `messages/[locale].json` with translations
3. Add URL rewrites in `next.config.js` if needed
4. Update sitemap generation in `src/app/[locale]/sitemap.ts`

### Adding Learning Articles

1. Create Markdown file in `public/articles/[slug].md`
2. Add metadata entry to `src/data/articles.ts`
3. Article will be accessible via `/[locale]/learn/[slug]`
