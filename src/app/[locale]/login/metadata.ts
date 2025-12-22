import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/login`;
  
  return {
    title: t('loginTitle'),
    description: t('loginDescription'),
    keywords: [
      "login",
      "sign in",
      "LearnKana login",
      "Japanese learning account",
      "user login",
      "progress tracking"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/login`,
        'de': `${baseUrl}/de/login`,
        'fr': `${baseUrl}/fr/login`,
        'pt': `${baseUrl}/pt/login`,
        'es': `${baseUrl}/es/login`
      }
    },
    openGraph: {
      title: t('loginTitle'),
      description: t('loginDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/login`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Login",
    "description": "Login page for LearnKana Japanese learning platform",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    }
  };
}