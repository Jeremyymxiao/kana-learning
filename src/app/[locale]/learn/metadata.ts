import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { articles } from '@/data/articles';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/learn');

  return {
    title: t('learnTitle'),
    description: t('learnDescription'),
    keywords: [
      "japanese writing", "learn hiragana", "learn katakana",
      "japanese kana guide", "japanese characters", "japanese alphabet",
      "kana tutorial", "japanese pronunciation",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/learn'),
    },
    openGraph: {
      title: t('learnTitle'),
      description: t('learnDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('learnTitle'))}&type=learn&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('learnTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('learnTitle'),
      description: t('learnDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('learnTitle'))}&type=learn&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/learn');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Japanese Writing System Guides",
        "description": "Comprehensive guides for learning Japanese writing systems",
        "url": canonicalUrl,
        "provider": {
          "@type": "Organization",
          "name": "LearnKana",
          "url": BASE_URL
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": articles.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": article.title,
            "url": `${getCanonicalUrl(locale, `/learn/${article.slug}`)}`
          }))
        },
        "educationalLevel": "Beginner",
        "inLanguage": locale
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "Learn", "item": canonicalUrl }
        ]
      }
    ]
  };
}
