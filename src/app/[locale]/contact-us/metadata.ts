import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/contact-us`;
  
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
    keywords: [
      "contact",
      "feedback",
      "support",
      "LearnKana contact",
      "Japanese learning platform",
      "get in touch"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/contact-us`;
  
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