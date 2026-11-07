import { Suspense } from 'react';
import { getArticleBySlug, articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import ClientPage from './client-page';
import fs from 'fs/promises';
import path from 'path';
import { routing } from '../../../../../i18n.config';
import { generateStructuredData } from './metadata';

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

export { generateMetadata } from './metadata';

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

    // Generate structured data for SEO
    const structuredData = await generateStructuredData({ params: Promise.resolve({ locale, slug }) });

    return (
      <>
        {/* Add structured data to page */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <ClientPage
            article={{
              ...article,
              content
            }}
            locale={locale}
            slug={slug}
          />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
