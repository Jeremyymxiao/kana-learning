import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/japanese-text-analyzer');

  return {
    title: t('analyzerTitle'),
    description: t('analyzerDescription'),
    keywords: [
      "furigana generator", "add furigana to text", "japanese text analyzer",
      "kanji reading aid", "japanese furigana tool", "kanji to hiragana",
      "japanese reading helper", "furigana converter"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/japanese-text-analyzer'),
    },
    openGraph: {
      title: t('analyzerTitle'),
      description: t('analyzerDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('analyzerTitle'))}&type=tool&locale=${locale}`, width: 1200, height: 630, alt: t('analyzerTitle') }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('analyzerTitle'),
      description: t('analyzerDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('analyzerTitle'))}&type=tool&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/japanese-text-analyzer');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Japanese Text Analyzer - Furigana Generator",
        "description": "Add furigana reading aids above kanji in any Japanese text",
        "url": canonicalUrl,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "educationalLevel": "Beginner",
        "inLanguage": locale,
        "learningResourceType": "Tool",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student",
          "educationalField": "Japanese Language Learning"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "Japanese Text Analyzer", "item": canonicalUrl }
        ]
      }
    ]
  };
}
