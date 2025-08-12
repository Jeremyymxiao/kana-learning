import { Metadata } from 'next';

export const metadata: Metadata = {
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
    canonical: 'https://learnkana.pro/register'
  },
  openGraph: {
    title: "Register | LearnKana",
    description: "Create your free account and start learning Japanese today.",
    type: "website",
    locale: "en_US",
    url: "https://learnkana.pro/register"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Register",
  "description": "Registration page for LearnKana Japanese learning platform",
  "url": "https://learnkana.pro/register",
  "provider": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  }
};