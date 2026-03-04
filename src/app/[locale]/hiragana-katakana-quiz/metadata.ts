import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-quiz');

  return {
    title: t('quizTitle'),
    description: t('quizDescription'),
    keywords: [
      "hiragana quiz", "katakana quiz", "japanese kana test", "hiragana practice",
      "katakana practice", "japanese quiz", "kana test", "hiragana characters",
      "katakana characters", "japanese learning quiz"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/hiragana-katakana-quiz'),
    },
    openGraph: {
      title: t('quizTitle'),
      description: t('quizDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('quizTitle'))}&type=quiz&locale=${locale}`, width: 1200, height: 630, alt: t('quizTitle') }]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('quizTitle'),
      description: t('quizDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('quizTitle'))}&type=quiz&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-quiz');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Hiragana & Katakana Quiz",
        "description": "Interactive quiz for learning Japanese Hiragana and Katakana",
        "url": canonicalUrl,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "educationalLevel": "Beginner",
        "inLanguage": locale,
        "learningResourceType": "Assessment",
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
          { "@type": "ListItem", "position": 2, "name": "Kana Quiz", "item": canonicalUrl }
        ]
      }
    ]
  };
}
