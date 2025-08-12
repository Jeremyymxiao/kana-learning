import { Suspense } from 'react';
import { getArticleBySlug, articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';
import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug
  }));
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
      notFound();
    }

    const filePath = path.join(process.cwd(), 'public', 'articles', `${params.slug}.md`);
    const content = await fs.readFile(filePath, 'utf-8');

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ClientPage 
          article={{
            ...article,
            content
          }} 
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
