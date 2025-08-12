import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/login`;
  
  return {
    title: "Login | LearnKana",
    description: "Login to your LearnKana account to access personalized Japanese learning features and track your progress.",
    keywords: [
      "login",
      "sign in",
      "LearnKana login",
      "Japanese learning account",
      "user login",
      "progress tracking"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Login | LearnKana",
      description: "Access your personalized Japanese learning experience with LearnKana.",
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