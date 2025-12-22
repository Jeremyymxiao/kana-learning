import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn`;
  
  return {
    title: t('learnTitle'),
    description: t('learnDescription'),
    keywords: [
      "japanese writing",
      "learn hiragana",
      "learn katakana",
      "japanese kana guide",
      "japanese characters",
      "japanese alphabet",
      "kana tutorial",
      "japanese pronunciation",
      "日语书写",
      "假名学习",
      "平假名教程",
      "片假名教程",
      "日语发音",
      "日语入门"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/learn`,
        'de': `${baseUrl}/de/learn`,
        'fr': `${baseUrl}/fr/learn`,
        'pt': `${baseUrl}/pt/learn`,
        'es': `${baseUrl}/es/learn`
      }
    },
    openGraph: {
      title: t('learnTitle'),
      description: t('learnDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "name": "Japanese Writing System Guide",
    "description": "Comprehensive guide to learning Japanese writing systems",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    },
    "articleBody": "Learn Japanese writing systems with our comprehensive guides",
    "articleSection": "Education",
    "educationalLevel": "Beginner",
    "inLanguage": ["en", "ja", "zh-CN"],
    "learningResourceType": "Guide",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "educationalField": "Japanese Language Learning"
    }
  };
}