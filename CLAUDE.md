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

## Architecture

### Next.js App Router with Internationalization

The application uses Next.js App Router with dynamic locale routing (`[locale]`). All pages exist under `src/app/[locale]/*` and support 5 languages: English (en), German (de), French (fr), Portuguese (pt), and Spanish (es). English is the default locale.

**Key files:**
- `i18n.config.ts` - Locale configuration and routing setup using next-intl
- `messages/*.json` - Translation files for each locale
- `src/app/[locale]/layout.tsx` - Root locale layout with NextIntlClientProvider
- URL rewrites in `next.config.js` map root paths (e.g., `/hiragana-katakana-quiz`) to `/en/...`

### Feature-Based Structure

Code is organized by feature domains under `src/features/`:

- **kana**: Core Kana learning features
  - `components/gojuon-table/` - Interactive character table component
  - `components/nav-bar/` - Navigation bar
  - `components/navigation-provider/` - Navigation context provider
  - `types/index.ts` - Kana-related types (KanaType: 'hiragana' | 'katakana' | 'mixed' | 'special')

- **quiz**: Quiz system supporting multiple quiz types
  - `components/QuizPanel.tsx` - Main quiz container
  - `components/QuizQuestion/` - Question display logic
  - `components/QuizResult/` - Results screen
  - `components/dictation/` - Dictation quiz type (user types romaji)
  - `components/matching/` - Matching quiz type (memory card game)
  - `components/spelling/` - Spelling quiz type
  - `hooks/useQuiz.ts` - Core quiz state management hook
  - `types.ts` - Quiz types (QuizType: 'choice' | 'dictation' | 'matching' | 'spelling')

### Data Layer

Character data is centralized in `src/data/` and `src/constants/`:

- `src/data/gojuon.ts` - Comprehensive Kana character data organized by type:
  - `seion`: Basic Kana (vowels, consonants)
  - `dakuon`: Voiced/semi-voiced sounds
  - `youon`: Compound sounds (きゃ, しゃ, etc.)
  - Each character includes hiragana, katakana, and romaji fields

- `src/constants/kana.ts` - HIRAGANA_TABLE and KATAKANA_TABLE lookup objects

### Authentication & Database

- **Firebase Auth**: User authentication with Google OAuth
  - `src/lib/firebase.ts` - Firebase initialization and auth config
  - `src/providers/AuthProvider.tsx` - Auth context provider
  - `src/components/auth/AuthForm.tsx` - Login/register form component

- **MongoDB**: User data persistence
  - `src/lib/mongodb.ts` - MongoDB connection with global caching
  - `src/models/user.ts` - Mongoose User model
  - Connection uses singleton pattern to prevent multiple connections

### API Routes

API routes exist in both `src/app/api/` (legacy) and `src/app/[locale]/api/` (localized). They follow Next.js 15 Route Handler conventions.

**Available endpoints:**
- `/api/chat` - Streaming chat with DeepSeek API (requires DEEPSEEK_API_KEY env var)
- `/api/analyze` - Text analysis and furigana generation using kuroshiro
- `/api/convert` - Kana/romaji conversion
- `/api/articles/[slug]` - Fetch learning articles from `public/articles/*.md`

### Styling

- **Tailwind CSS** with custom theme configuration in `tailwind.config.ts`
- **shadcn/ui** components in `src/components/ui/`
- Dark mode support via class-based strategy
- CSS variables for theming defined in `src/app/globals.css`
- Custom color palette includes green/red variants for quiz feedback

### Key Libraries

- **next-intl**: Internationalization with typed message hooks
- **kuroshiro + kuroshiro-analyzer-kuromoji**: Japanese text analysis and furigana
  - Dictionary files in `public/dict/` (required for kuroshiro to work)
- **firebase**: Authentication (v11)
- **mongoose**: MongoDB ODM
- **shadcn/ui + Radix UI**: Component library
- **Vercel Analytics**: Built-in analytics tracking

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

The quiz system uses a centralized hook pattern:
- `useQuiz()` hook manages test state, question generation, and scoring
- Question generation logic in `useQuiz.ts` creates 10 random questions from available Kana
- Each quiz type implements its own component but shares the same state interface

### Article System

Learning articles are Markdown files in `public/articles/` served dynamically via API routes. The `src/data/articles.ts` file maps article metadata (title, description, slug) for indexing.

## Environment Variables

Required environment variables (not tracked in git):
- `MONGODB_URI` - MongoDB connection string (defaults to localhost)
- `DEEPSEEK_API_KEY` - API key for AI chat feature
- Firebase config is hardcoded in `src/lib/firebase.ts` (public API keys)

## Special Notes

- **Next.js 15**: Uses latest Next.js with updated async params API (await params in server components)
- **CSP disabled**: Content Security Policy configuration is commented out in `next.config.js`
- **Duplicate API routes**: Both locale-prefixed and non-prefixed API routes exist for backward compatibility
- **MDX support**: Configured via `@next/mdx` but primarily uses plain Markdown
- **TypeScript strict mode**: Enabled with path aliases and custom type roots

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
