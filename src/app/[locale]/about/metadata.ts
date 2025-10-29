import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/about`;
  
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    keywords: [
      "hiragana",
      "katakana", 
      "hiragana converter",
      "katakana converter",
      "japanese kana",
      "gojuon chart",
      "learn hiragana",
      "learn katakana",
      "japanese alphabet",
      "japanese writing",
      "平假名",
      "片假名",
      "五十音图",
      "假名转换",
      "日语学习"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/about`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LearnKana",
    "alternateName": ["Learn Kana", "かな学習", "假名学习"],
    "description": "Interactive platform for learning Japanese Hiragana and Katakana",
    "keywords": "hiragana, katakana, japanese learning, ひらがな, カタカナ, japanese alphabet",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    },
    "educationalLevel": "Beginner",
    "inLanguage": ["en", "ja", "zh-CN"],
    "learningResourceType": "Interactive Resource",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "Student",
      "educationalField": "Japanese Language Learning",
      "audienceType": "Child",
      "audienceEducationLevel": "Elementary School",
      "audienceGeographicArea": "Worldwide"
    }
  };
}