import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/cookie-policy`;
  
  return {
    title: t('cookieTitle'),
    description: t('cookieDescription'),
    keywords: [
      "cookie policy",
      "privacy",
      "data collection",
      "user tracking",
      "analytics",
      "GDPR",
      "privacy policy"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/cookie-policy`,
        'de': `${baseUrl}/de/cookie-policy`,
        'fr': `${baseUrl}/fr/cookie-policy`,
        'pt': `${baseUrl}/pt/cookie-policy`,
        'es': `${baseUrl}/es/cookie-policy`
      }
    },
    openGraph: {
      title: t('cookieTitle'),
      description: t('cookieDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}

export async function generateStructuredData({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/cookie-policy`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy",
    "description": "LearnKana's cookie usage and privacy policy",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    }
  };
}