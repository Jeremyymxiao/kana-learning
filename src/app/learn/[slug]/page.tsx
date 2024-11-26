import { Suspense } from 'react';
import { getArticleBySlug, getArticleContent } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';

export async function generateStaticParams() {
  return [{ slug: 'hiragana' }, { slug: 'katakana' }];
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

    const content = await getArticleContent(params.slug);

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
