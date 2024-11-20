'use client';

import MainLayout from '@/components/layouts/main-layout';
import { articles } from '@/data/articles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const router = useRouter();
  
  const handleTabChange = (tab: string) => {
    if (tab === 'gojuon') {
      router.push('/');
    } else if (tab === 'test') {
      router.push('/test');
    }
  };

  return (
    <MainLayout 
      currentTab="learn"
      onTabChange={handleTabChange}
    >
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Learn Japanese Writing Systems</h1>
        <section 
          className="grid gap-6"
          aria-label="Articles list"
        >
          {articles.map(article => (
            <article 
              key={article.id} 
              className="border rounded-lg p-6"
              aria-labelledby={`article-title-${article.id}`}
            >
              <h2 
                id={`article-title-${article.id}`}
                className="text-xl font-semibold mb-2"
              >
                <Link href={`/learn/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div 
                className="flex gap-2"
                role="list"
                aria-label="Article tags"
              >
                {article.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </MainLayout>
  );
}