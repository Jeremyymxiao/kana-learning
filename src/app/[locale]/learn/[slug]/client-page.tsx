'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { RelatedArticles } from '@/components/articles/related-articles';
import { useTranslations } from 'next-intl';

interface ClientPageProps {
  article: {
    title: string;
    description: string;
    tags: string[];
    content: string;
  };
  locale: string;
  slug: string;
}

export default function ClientPage({ article, locale, slug }: ClientPageProps) {
  const t = useTranslations('Navigation');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === 'test') {
      router.push('/quiz');
    } else if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'learn') {
      return;
    }
  };

  return (
    <MainLayout
      currentTab="learn"
    >
      <div className="max-w-4xl mx-auto p-6">
        <Breadcrumbs
          items={[
            { name: t('home') || 'Home', url: `/${locale}` },
            { name: t('learn') || 'Learn', url: `/${locale}/learn` },
            { name: article.title, url: `/${locale}/learn/${slug}` }
          ]}
        />
        <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold 
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:leading-relaxed
          prose-li:marker:text-gray-500
          prose-img:rounded-lg
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/50
          prose-code:text-blue-600 dark:prose-code:text-blue-400">
          <div className="mb-8">
            <h1 className="!mt-0 !mb-4">{article.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 !mt-0 !mb-4">{article.description}</p>
            <div className="flex gap-2 !mt-0 !mb-6">
              {article.tags.map(tag => (
                <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        <RelatedArticles
          currentSlug={slug}
          currentTags={article.tags}
          locale={locale}
        />
      </div>
    </MainLayout>
  );
}
