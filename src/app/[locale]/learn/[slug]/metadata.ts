import { Metadata } from 'next';
import { getArticleBySlug } from '@/data/articles';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
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
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/learn/${slug}`,
        'de': `${baseUrl}/de/learn/${slug}`,
        'fr': `${baseUrl}/fr/learn/${slug}`,
        'pt': `${baseUrl}/pt/learn/${slug}`,
        'es': `${baseUrl}/es/learn/${slug}`
      }
    },
    openGraph: {
      title: `${article.title} | LearnKana`,
      description: article.description,
      type: "article",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
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
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
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