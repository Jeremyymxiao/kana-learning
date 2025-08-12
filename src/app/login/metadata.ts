import { Metadata } from 'next';

export const metadata: Metadata = {
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
    canonical: 'https://learnkana.pro/login'
  },
  openGraph: {
    title: "Login | LearnKana",
    description: "Access your personalized Japanese learning experience with LearnKana.",
    type: "website",
    locale: "en_US",
    url: "https://learnkana.pro/login"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Login",
  "description": "Login page for LearnKana Japanese learning platform",
  "url": "https://learnkana.pro/login",
  "provider": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  }
};