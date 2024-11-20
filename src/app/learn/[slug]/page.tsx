import { Suspense } from 'react';
import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  // Simulate async behavior since we're using static data
  return articles.find(article => article.slug === slug);
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientPage article={article} />
    </Suspense>
  );
}
