import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/privacy-policy`;
  
  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
    keywords: [
      "privacy policy",
      "data protection",
      "GDPR",
      "user privacy",
      "data security",
      "LearnKana privacy"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/privacy-policy`,
        'de': `${baseUrl}/de/privacy-policy`,
        'fr': `${baseUrl}/fr/privacy-policy`,
        'pt': `${baseUrl}/pt/privacy-policy`,
        'es': `${baseUrl}/es/privacy-policy`
      }
    },
    openGraph: {
      title: t('privacyTitle'),
      description: t('privacyDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/privacy-policy`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "LearnKana's privacy policy and data protection guidelines",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    }
  };
}