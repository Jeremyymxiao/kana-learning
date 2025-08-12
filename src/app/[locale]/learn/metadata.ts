import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/learn`;
  
  return {
    title: "Japanese Writing Guide | Learn Hiragana & Katakana",
    description: "深入学习日语书写系统。包含详细的平假名(ひらがな)和片假名(カタカナ)教程,发音指南以及实用练习材料。Master Japanese writing systems with comprehensive guides and practice materials.",
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
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Japanese Writing System Guide | LearnKana",
      description: "Complete guide to learning Japanese writing systems. Interactive tutorials and practice materials.",
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US", "ja_JP"],
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