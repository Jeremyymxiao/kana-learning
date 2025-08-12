import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | LearnKana",
  description: "LearnKana's privacy policy. Learn how we collect, use, and protect your data while using our Japanese language learning platform.",
  alternates: {
    canonical: 'https://learnkana.pro/privacy-policy'
  },
  openGraph: {
    title: "Privacy Policy | LearnKana",
    description: "Our commitment to protecting your privacy while learning Japanese.",
    type: "website",
    locale: "en_US",
    url: "https://learnkana.pro/privacy-policy"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "LearnKana's privacy policy and data protection guidelines",
  "url": "https://learnkana.pro/privacy-policy",
  "publisher": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  }
};