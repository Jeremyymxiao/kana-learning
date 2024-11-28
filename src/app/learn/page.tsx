'use client';

import MainLayout from '@/components/layouts/main-layout';
import { articles } from '@/data/articles';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <MainLayout>
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
                <Link href={`/learn/${article.slug}`} className="hover:text-indigo-600">
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <Link
                href={`/learn/${article.slug}`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Read More →
              </Link>
            </article>
          ))}
        </section>
      </main>
    </MainLayout>
  );
}