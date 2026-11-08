'use client';

import ReactMarkdown from 'react-markdown';

interface AiAnalysisProps {
  /** Markdown produced by /api/analyze (streamed in incrementally) */
  analysis: string;
  /** Localized heading text */
  title: string;
}

/**
 * AI analysis panel for the quiz result screen.
 *
 * Kept in its own module so `react-markdown` (a fairly large markdown parser)
 * can be lazy-loaded with `next/dynamic` — the quiz first paint no longer pays
 * for a parser that most users never trigger.
 */
export default function AiAnalysis({ analysis, title }: AiAnalysisProps) {
  return (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="prose prose-blue dark:prose-invert max-w-none">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>
    </div>
  );
}
