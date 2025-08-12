import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/privacy-policy`;
  
  return {
    title: "Privacy Policy | LearnKana",
    description: "LearnKana's privacy policy. Learn how we collect, use, and protect your data while using our Japanese language learning platform.",
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Privacy Policy | LearnKana",
      description: "Our commitment to protecting your privacy while learning Japanese.",
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