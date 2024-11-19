'use client';

import MainLayout from '@/components/layouts/main-layout';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ClientPageProps {
  article: {
    title: string;
    description: string;
    tags: string[];
    content: string;
  };
}

export default function ClientPage({ article }: ClientPageProps) {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    if (tab === 'test') {
      router.push('/test');
    } else if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'learn') {
      return;
    }
  };

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
