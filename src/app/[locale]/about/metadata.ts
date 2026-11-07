import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/about');

  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    keywords: [
      "hiragana", "katakana", "hiragana converter", "katakana converter",
      "japanese kana", "gojuon chart", "learn hiragana", "learn katakana",
      "japanese alphabet", "japanese writing",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/about'),
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('aboutTitle'))}&type=about&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('aboutTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('aboutTitle'))}&type=about&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/about');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "name": "About LearnKana",
        "description": "Interactive platform for learning Japanese Hiragana and Katakana",
        "url": canonicalUrl,
        "publisher": {
          "@type": "Organization",
          "name": "LearnKana",
          "url": BASE_URL
        },
        "isAccessibleForFree": true,
        "inLanguage": locale
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "About", "item": canonicalUrl }
        ]
      }
    ]
  };
}
