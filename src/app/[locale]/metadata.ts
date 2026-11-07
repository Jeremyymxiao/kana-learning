import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '');

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: [
      "AI japanese tutor",
      "AI language learning",
      "personalized japanese learning",
      "adaptive learning japanese",
      "hiragana",
      "katakana",
      "ひらがな",
      "カタカナ",
      "平仮名",
      "片仮名",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs(''),
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png' }
      ],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ]
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('homeTitle'))}&type=home&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('homeTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('homeTitle'))}&type=home&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export async function generateStructuredData({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const canonicalUrl = getCanonicalUrl(locale, '');
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "LearnKana",
        "description": "Free AI-Powered Hiragana & Katakana Quiz Tool",
        "url": canonicalUrl,
        "publisher": {
          "@type": "Organization",
          "name": "LearnKana",
          "url": BASE_URL
        },
        "inLanguage": locale,
        "availableLanguage": ["en", "de", "fr", "pt", "es"]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": t('faq1Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq1Answer')
            }
          },
          {
            "@type": "Question",
            "name": t('faq2Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq2Answer')
            }
          },
          {
            "@type": "Question",
            "name": t('faq3Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq3Answer')
            }
          },
          {
            "@type": "Question",
            "name": t('faq4Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq4Answer')
            }
          },
          {
            "@type": "Question",
            "name": t('faq5Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq5Answer')
            }
          },
          {
            "@type": "Question",
            "name": t('faq6Question'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": t('faq6Answer')
            }
          }
        ]
      }
    ]
  };
}
