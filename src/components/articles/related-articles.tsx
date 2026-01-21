'use client';

import Link from 'next/link';
import { articles } from '@/data/articles';
import { useTranslations } from 'next-intl';

interface RelatedArticlesProps {
  currentSlug: string;
  currentTags: string[];
  locale: string;
}

export function RelatedArticles({ currentSlug, currentTags, locale }: RelatedArticlesProps) {
  const t = useTranslations('Articles');

  // Find related articles based on shared tags
  const relatedArticles = articles
    .filter(article => {
      // Exclude current article
      if (article.slug === currentSlug) return false;

      // Check if article has any shared tags
      return article.tags.some(tag => currentTags.includes(tag));
    })
    // Sort by number of shared tags (most relevant first)
    .sort((a, b) => {
      const aSharedTags = a.tags.filter(tag => currentTags.includes(tag)).length;
      const bSharedTags = b.tags.filter(tag => currentTags.includes(tag)).length;
      return bSharedTags - aSharedTags;
    })
    // Take top 3
    .slice(0, 3);

  // Don't show section if no related articles found
  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {t('relatedArticles') || 'Related Articles'}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <Link
            key={article.slug}
            href={`/${locale}/learn/${article.slug}`}
            className="group block p-6 rounded-lg border border-gray-200 dark:border-gray-800
                       hover:border-[#FF7E67] dark:hover:border-[#FF7E67]
                       transition-all duration-300 hover:shadow-lg
                       bg-white dark:bg-[#1A1B2F]"
          >
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white
                          group-hover:text-[#FF7E67] transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {article.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
