import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | LearnKana",
  description: "Terms of Service for LearnKana - Japanese learning platform. Read our terms and conditions for using our educational services and tools.",
  alternates: {
    canonical: 'https://learnkana.pro/terms-of-service'
  },
  openGraph: {
    title: "Terms of Service | LearnKana",
    description: "Terms and conditions for using LearnKana's Japanese learning platform and educational tools.",
    type: "website",
    locale: "en_US",
    url: "https://learnkana.pro/terms-of-service"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "description": "Terms and conditions for using LearnKana",
  "url": "https://learnkana.pro/terms-of-service",
  "publisher": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  }
};