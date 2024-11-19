import { Suspense } from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ClientPage from './client-page';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getArticle(slug: string) {
  // Simulate async behavior since we're using static data
  return articles.find(article => article.slug === slug);
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : undefined;
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
