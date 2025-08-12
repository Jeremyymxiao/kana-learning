import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/about`;
  
  return {
    title: "LearnKana | 日语假名学习 | Hiragana & Katakana Converter",
    description: "免费的日语假名学习平台。包含平假名(ひらがな)、片假名(カタカナ)转换器,互动式五十音图,记忆游戏等功能。The best free Japanese kana learning platform with hiragana/katakana converter, interactive gojuon chart and memory games.",
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
      title: "LearnKana | Japanese Kana Learning & Converter",
      description: "Learn Japanese Hiragana & Katakana with interactive tools. Free online converter, practice games and study materials.",
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US", "ja_JP"],
      siteName: "LearnKana",
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