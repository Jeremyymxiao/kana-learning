import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-converter');

  return {
    title: t('converterTitle'),
    description: t('converterDescription'),
    keywords: [
      "japanese converter", "kanji to hiragana", "hiragana converter",
      "japanese text converter", "kanji reading", "furigana generator",
      "japanese learning tool", "kanji conversion", "japanese writing",
      "online japanese tools", "english to japanese converter",
      "english to kana converter", "to hiragana", "to katakana",
      "english to katakana", "romaji to hiragana", "romaji to katakana",
      "japanese writing converter"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/hiragana-katakana-converter'),
    },
    openGraph: {
      title: t('converterTitle'),
      description: t('converterDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('converterTitle'))}&type=converter&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('converterTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('converterTitle'),
      description: t('converterDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('converterTitle'))}&type=converter&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-converter');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Japanese Text Converter",
        "description": "Online tool for converting Japanese text between writing systems",
        "url": canonicalUrl,
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "provider": {
          "@type": "Organization",
          "name": "LearnKana",
          "url": BASE_URL
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
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is this hiragana katakana converter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our converter uses standard Hepburn romanization system for 100% accuracy. It handles all 46 basic characters, dakuten, handakuten, and combination sounds perfectly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert romaji to both hiragana and katakana simultaneously?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Simply type romaji in the romaji field and get instant conversion to both hiragana and katakana. Perfect for learning the differences between scripts."
            }
          },
          {
            "@type": "Question",
            "name": "Does this converter work with long vowels and special characters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Our converter properly handles long vowels, sokuon (small tsu), and yōon (contracted sounds) for complete accuracy."
            }
          },
          {
            "@type": "Question",
            "name": "Is this hiragana katakana converter free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our Japanese text converter is completely free with no limits on usage. Perfect for students, teachers, and professionals working with Japanese text."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "Kana Converter", "item": canonicalUrl }
        ]
      }
    ]
  };
}
