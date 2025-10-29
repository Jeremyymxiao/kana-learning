import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-chart`;
  
  return {
    title: t('chartTitle'),
    description: t('chartDescription'),
    keywords: [
      "gojuon chart",
      "japanese kana chart",
      "hiragana chart",
      "katakana chart",
      "japanese alphabet chart",
      "interactive kana table",
      "japanese syllabary",
      "learn japanese characters",
      "japanese writing system",
      "kana pronunciation"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: t('chartTitle'),
      description: t('chartDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-chart`;
  
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Interactive Japanese Kana Chart",
    "description": "Comprehensive Japanese Kana chart with audio pronunciation",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    },
    "learningResourceType": "Interactive Resource",
    "interactivityType": "active",
    "educationalUse": ["Practice", "Self-Assessment"],
    "educationalAlignment": {
      "@type": "AlignmentObject",
      "alignmentType": "teaches",
      "educationalFramework": "Japanese Language Learning",
      "targetName": "Japanese Writing System",
      "targetUrl": `${baseUrl}${localePath}/learn/writing-system`
    },
    "isAccessibleForFree": true,
    "accessibilityFeature": [
      "audioDescription",
      "highContrast",
      "tableOfContents"
    ]
  };
}