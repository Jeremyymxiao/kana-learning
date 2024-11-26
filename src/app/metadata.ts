import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LearnKana | Learn Japanese Hiragana & Katakana",
  description: "Master Japanese kana with our comprehensive learning platform. Features include interactive lessons, AI-powered chat assistance, kana converter, practice quizzes, and visual learning charts. Perfect for beginners and intermediate learners seeking to master Japanese writing systems.",
  keywords: [
    "hiragana",
    "katakana", 
    "hiragana converter",
    "katakana converter",
    "japanese kana",
    "kana chart",
    "learn hiragana",
    "learn katakana",
    "japanese alphabet",
    "japanese writing system",
    "learn japanese",
    "japanese for beginners",
    "kana practice",
    "japanese characters",
    "japanese study",
    "AI japanese tutor",
    "japanese learning tools"
  ],
  openGraph: {
    title: "LearnKana | Japanese Kana Learning Platform",
    description: "Master Japanese kana through interactive lessons, AI tutoring, practice quizzes, and visual learning tools. Featuring instant kana conversion and personalized learning assistance.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP", "zh_CN"],
    siteName: "LearnKana",
    url: "https://learnkana.pro"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "LearnKana",
  "alternateName": ["Learn Kana", "Japanese Kana Learning"],
  "description": "Interactive platform for learning Japanese Hiragana and Katakana",
  "url": "https://learnkana.pro",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://learnkana.pro/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "hasPart": [
    {
      "@type": "WebApplication",
      "name": "Kana Quiz",
      "applicationCategory": "EducationalApplication"
    },
    {
      "@type": "WebApplication",
      "name": "Interactive Gojuon Chart",
      "applicationCategory": "EducationalApplication"
    }
  ],
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "educationalField": "Japanese Language Learning",
    "audienceType": ["Beginner", "Student", "Language Learner"],
    "educationalLevel": ["Beginner", "Intermediate"]
  }
};