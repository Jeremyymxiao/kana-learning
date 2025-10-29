import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-quiz`;
  
  return {
    title: t('quizTitle'),
    description: t('quizDescription'),
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
      title: t('quizTitle'),
      description: t('quizDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: t('siteName'),
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