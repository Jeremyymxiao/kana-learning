import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LearnKana | Learn Japanese Hiragana & Katakana",
  description: "Master Japanese writing systems with our interactive tools. Features include hiragana/katakana converter, interactive gojuon chart, and memory games. The best platform for learning Japanese kana.",
  keywords: [
    "hiragana",
    "katakana", 
    "hiragana converter",
    "katakana converter",
    "japanese kana",
    "gojuon chart",
    "learn hiragana",
    "learn katakana",
    "japanese alphabet",
    "japanese writing system",
    "learn japanese",
    "japanese for beginners",
    "kana practice",
    "japanese characters",
    "japanese study"
  ],
  openGraph: {
    title: "LearnKana | Japanese Kana Learning Platform",
    description: "Master Japanese Hiragana & Katakana with interactive tools. Free online converter, practice games and study materials.",
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