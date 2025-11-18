import { Suspense } from 'react';
import { getArticleBySlug, articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';
import fs from 'fs/promises';
import path from 'path';
import { routing } from '../../../../../i18n.config';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  routing.locales.forEach(locale => {
    articles.forEach(article => {
      params.push({
        locale,
        slug: article.slug
      });
    });
  });
  
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  try {
    const article = await getArticleBySlug(slug);
    if (!article) {
      notFound();
    }

    const filePath = path.join(process.cwd(), 'public', 'articles', `${slug}.md`);
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
