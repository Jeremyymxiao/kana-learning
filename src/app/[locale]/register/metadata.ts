import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/register`;
  
  return {
    title: t('registerTitle'),
    description: t('registerDescription'),
    keywords: [
      "register",
      "sign up",
      "create account",
      "LearnKana registration",
      "Japanese learning signup",
      "free account"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/register`,
        'de': `${baseUrl}/de/register`,
        'fr': `${baseUrl}/fr/register`,
        'pt': `${baseUrl}/pt/register`,
        'es': `${baseUrl}/es/register`
      }
    },
    openGraph: {
      title: t('registerTitle'),
      description: t('registerDescription'),
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
  const canonicalUrl = `${baseUrl}${localePath}/register`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Register",
    "description": "Registration page for LearnKana Japanese learning platform",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    }
  };
}