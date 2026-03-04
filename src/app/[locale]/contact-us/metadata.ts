import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/contact-us');

  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
    keywords: [
      "contact", "feedback", "support",
      "LearnKana contact", "Japanese learning platform", "get in touch"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/contact-us'),
    },
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(t('contactTitle'))}&type=contact&locale=${locale}`,
          width: 1200,
          height: 630,
          alt: t('contactTitle')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contactTitle'),
      description: t('contactDescription'),
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(t('contactTitle'))}&type=contact&locale=${locale}`],
      site: '@learnkana'
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const canonicalUrl = getCanonicalUrl(locale, '/contact-us');

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact LearnKana",
    "description": "Contact information and feedback channels for LearnKana",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "email": "xym0645@gmail.com"
    }
  };
}
