import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/terms-of-service`;
  
  return {
    title: "Terms of Service | LearnKana",
    description: "Terms of Service for LearnKana - Japanese learning platform. Read our terms and conditions for using our educational services and tools.",
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Terms of Service | LearnKana",
      description: "Terms and conditions for using LearnKana's Japanese learning platform and educational tools.",
      type: "website",
      locale: "en_US",
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/terms-of-service`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "Terms and conditions for using LearnKana",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    }
  };
}