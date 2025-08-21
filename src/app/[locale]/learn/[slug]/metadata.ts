import { Metadata } from 'next';
import { getArticleBySlug } from '@/data/articles';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string; slug: string } 
}): Promise<Metadata> {
  const { locale, slug } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn/${slug}`;
  
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: 'Article Not Found',
      alternates: { canonical: canonicalUrl }
    };
  }

  return {
    title: `${article.title} | Learn Japanese Kana`,
    description: article.description,
    keywords: [
      'japanese learning',
      'hiragana',
      'katakana',
      'japanese writing',
      'kana practice',
      article.slug.replace('-', ' ')
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${article.title} | LearnKana`,
      description: article.description,
      type: "article",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt
    }
  };
}

export async function generateStructuredData({ 
  params 
}: { 
  params: { locale: string; slug: string } 
}) {
  const { locale, slug } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn/${slug}`;
  
  const article = await getArticleBySlug(slug);
  if (!article) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    },
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "articleSection": "Education",
    "educationalLevel": "Beginner",
    "inLanguage": locale,
    "learningResourceType": "Article",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "educationalField": "Japanese Language Learning"
    }
  };
}