import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/register`;
  
  return {
    title: "Register | LearnKana",
    description: "Create a free LearnKana account to start learning Japanese Hiragana and Katakana with personalized features and progress tracking.",
    keywords: [
      "register",
      "sign up",
      "create account",
      "LearnKana registration",
      "Japanese learning signup",
      "free account"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Register | LearnKana",
      description: "Create your free account and start learning Japanese today.",
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