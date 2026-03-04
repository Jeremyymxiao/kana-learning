import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/terms-of-service');

  return {
    title: t('termsTitle'),
    description: t('termsDescription'),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/terms-of-service'),
    },
    openGraph: {
      title: t('termsTitle'),
      description: t('termsDescription'),
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
  const canonicalUrl = getCanonicalUrl(locale, '/terms-of-service');

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "Terms and conditions for using LearnKana",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": BASE_URL
    }
  };
}
