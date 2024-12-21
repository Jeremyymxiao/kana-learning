import { Suspense } from 'react';
import { getArticleBySlug, articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/articles/${params.slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article content for ${params.slug}`);
    }
    const content = await response.text();

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
