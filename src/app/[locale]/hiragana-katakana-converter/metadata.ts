import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-converter`;
  
  return {
    title: t('converterTitle'),
    description: t('converterDescription'),
    keywords: [
      "japanese converter",
      "kanji to hiragana",
      "hiragana converter",
      "japanese text converter",
      "kanji reading",
      "furigana generator",
      "japanese learning tool",
      "kanji conversion",
      "japanese writing",
      "online japanese tools",
      "english to japanese converter",
      "english to kana converter",
      "to hiragana",
      "to katakana",
      "english to katakana",
      "romaji to hiragana",
      "romaji to katakana",
      "japanese writing converter"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/hiragana-katakana-converter`,
        'de': `${baseUrl}/de/hiragana-katakana-converter`,
        'fr': `${baseUrl}/fr/hiragana-katakana-converter`,
        'pt': `${baseUrl}/pt/hiragana-katakana-converter`,
        'es': `${baseUrl}/es/hiragana-katakana-converter`
      }
    },
    openGraph: {
      title: t('converterTitle'),
      description: t('converterDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/hiragana-katakana-converter`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Japanese Text Converter",
    "description": "Online tool for converting Japanese text between writing systems",
    "url": canonicalUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Kanji to Hiragana conversion",
      "Instant results",
      "User-friendly interface",
      "Free to use"
    ],
    "browserRequirements": "Requires JavaScript. Works in all modern browsers.",
    "softwareVersion": "1.0.0"
  };
}