import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/privacy-policy');

  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/privacy-policy'),
    },
    openGraph: {
      title: t('privacyTitle'),
      description: t('privacyDescription'),
      type: "website",
      locale: getOgLocale(locale),
      alternateLocale: getAlternateOgLocales(locale),
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}

export async function generateStructuredData({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const canonicalUrl = getCanonicalUrl(locale, '/privacy-policy');

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "LearnKana's privacy policy and data protection guidelines",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": BASE_URL
    }
  };
}
