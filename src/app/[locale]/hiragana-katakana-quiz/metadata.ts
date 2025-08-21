import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-quiz`;
  
  return {
    title: "Hiragana & Katakana Quiz | Interactive Japanese Learning",
    description: "Test your knowledge of Japanese kana with our interactive quiz. Practice Hiragana and Katakana with AI-powered adaptive questions and instant feedback.",
    keywords: [
      "hiragana quiz",
      "katakana quiz", 
      "japanese kana test",
      "hiragana practice",
      "katakana practice",
      "japanese quiz",
      "kana test",
      "hiragana characters",
      "katakana characters",
      "japanese learning quiz"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Hiragana & Katakana Quiz | Interactive Practice",
      description: "Master Japanese kana with our smart quiz system. Get instant feedback and personalized practice.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-quiz`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Hiragana & Katakana Quiz",
    "description": "Interactive quiz for learning Japanese Hiragana and Katakana",
    "url": canonicalUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "educationalLevel": "Beginner",
    "inLanguage": locale,
    "learningResourceType": "Assessment",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "educationalField": "Japanese Language Learning"
    }
  };
}