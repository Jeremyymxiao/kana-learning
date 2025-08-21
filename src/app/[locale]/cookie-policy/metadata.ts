import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/cookie-policy`;
  
  return {
    title: "Cookie Policy | LearnKana Privacy",
    description: "Learn how LearnKana uses cookies and similar technologies to enhance your learning experience and improve our services.",
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
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Cookie Policy | LearnKana",
      description: "Our cookie policy explains how we use cookies to improve your experience on our Japanese learning platform.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
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