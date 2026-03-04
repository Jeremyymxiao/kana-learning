import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/chat');

  return {
    title: t('chatTitle'),
    description: t('chatDescription'),
    keywords: [
      "japanese chat", "ai language tutor", "japanese learning",
      "kana practice", "japanese conversation", "ai language assistant",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/chat'),
    },
    openGraph: {
      title: t('chatTitle'),
      description: t('chatDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('chatTitle'))}&type=chat&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('chatTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('chatTitle'),
      description: t('chatDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('chatTitle'))}&type=chat&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/chat');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Japanese Learning Chat Assistant",
        "description": "AI-powered Japanese language learning chat assistant",
        "url": canonicalUrl,
        "applicationCategory": "EducationalApplication",
        "educationalUse": ["Language Learning", "Practice"],
        "inLanguage": locale,
        "learningResourceType": "Interactive Resource"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "AI Chat", "item": canonicalUrl }
        ]
      }
    ]
  };
}
