import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-chart');

  return {
    title: t('chartTitle'),
    description: t('chartDescription'),
    keywords: [
      "gojuon chart", "japanese kana chart", "hiragana chart", "katakana chart",
      "japanese alphabet chart", "interactive kana table", "japanese syllabary",
      "learn japanese characters", "japanese writing system", "kana pronunciation"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/hiragana-katakana-chart'),
    },
    openGraph: {
      title: t('chartTitle'),
      description: t('chartDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('chartTitle'))}&type=chart&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('chartTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('chartTitle'),
      description: t('chartDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('chartTitle'))}&type=chart&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/hiragana-katakana-chart');

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "name": "Interactive Japanese Kana Chart",
        "description": "Comprehensive Japanese Kana chart with audio pronunciation",
        "url": canonicalUrl,
        "provider": {
          "@type": "Organization",
          "name": "LearnKana",
          "url": BASE_URL
        },
        "learningResourceType": "Interactive Resource",
        "interactivityType": "active",
        "educationalUse": ["Practice", "Self-Assessment"],
        "educationalAlignment": {
          "@type": "AlignmentObject",
          "alignmentType": "teaches",
          "educationalFramework": "Japanese Language Learning",
          "targetName": "Japanese Writing System",
          "targetUrl": `${getCanonicalUrl(locale, '/learn/hiragana-basics')}`
        },
        "isAccessibleForFree": true,
        "accessibilityFeature": [
          "audioDescription",
          "highContrast",
          "tableOfContents"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many characters are in the complete hiragana and katakana charts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each chart contains 46 basic characters, 25 voiced sounds (dakuten), 5 semi-voiced sounds (handakuten), and 33 combination sounds, totaling over 100 unique characters per script system."
            }
          },
          {
            "@type": "Question",
            "name": "Should I learn hiragana or katakana first?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Start with hiragana as it's more fundamental for basic Japanese grammar and vocabulary. Once comfortable with hiragana, progress to katakana for foreign loanwords and emphasis."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to master both hiragana and katakana charts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With consistent daily practice using our hiragana and katakana charts, most learners achieve basic recognition within 2-4 weeks and full mastery within 6-8 weeks."
            }
          },
          {
            "@type": "Question",
            "name": "Are these hiragana and katakana charts suitable for complete beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Our comprehensive hiragana and katakana charts are designed for all skill levels, from absolute beginners to advanced learners seeking reference materials."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
          { "@type": "ListItem", "position": 2, "name": "Kana Chart", "item": canonicalUrl }
        ]
      }
    ]
  };
}
