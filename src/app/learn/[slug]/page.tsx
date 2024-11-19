'use client';

import MainLayout from '@/components/layouts/main-layout';
import { articles } from '@/data/articles';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  const [article, setArticle] = useState<typeof articles[0] | null>(null);

  useEffect(() => {
    const foundArticle = articles.find(article => article.slug === params.slug);
    if (!foundArticle) {
      notFound();
    }
    setArticle(foundArticle);
  }, [params.slug]);

  const handleTabChange = (tab: string) => {
    if (tab === 'test') {
      router.push('/test');
    } else if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'learn') {
      return;
    }
  };

  if (!article) {
    return null;
  }

  return (
    <MainLayout
      currentTab="learn"
      onTabChange={handleTabChange}
    >
      <div className="max-w-4xl mx-auto p-6">
        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <div className="flex gap-2 mb-6">
              {article.tags.map(tag => (
                <span key={tag} className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </article>
      </div>
    </MainLayout>
  );
}
