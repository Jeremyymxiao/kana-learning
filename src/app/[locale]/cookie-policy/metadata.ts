import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateHreflangs, getCanonicalUrl, getOgLocale, getAlternateOgLocales, BASE_URL } from '@/lib/seo-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalUrl = getCanonicalUrl(locale, '/cookie-policy');

  return {
    title: t('cookieTitle'),
    description: t('cookieDescription'),
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangs('/cookie-policy'),
    },
    openGraph: {
      title: t('cookieTitle'),
      description: t('cookieDescription'),
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
  const canonicalUrl = getCanonicalUrl(locale, '/cookie-policy');

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy",
    "description": "LearnKana's cookie usage and privacy policy",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": BASE_URL
    }
  };
}
