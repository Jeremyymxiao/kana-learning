import { Suspense } from 'react';
import { getArticleBySlug, getArticleContent } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: PageProps) {
  try {
    const article = getArticleBySlug(params.slug);
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
