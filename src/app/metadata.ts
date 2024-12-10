import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LearnKana | AI-Powered Japanese Hiragana (ひらがな) & Katakana (カタカナ) Learning",
  description: "Revolutionary AI-powered platform for mastering Japanese writing systems. Our advanced AI tutor provides personalized guidance for Hiragana (平仮名) and Katakana (片仮名), with real-time feedback, intelligent practice suggestions, and adaptive learning paths. Features include AI chat assistance, smart kana converter, interactive quizzes, and visual learning tools with the gojuon chart (五十音図).",
  keywords: [
    "AI japanese tutor",
    "AI language learning",
    "personalized japanese learning",
    "adaptive learning japanese",
    "hiragana",
    "katakana", 
    "ひらがな",
    "カタカナ",
    "平仮名",
    "片仮名",
    "gojuon",
    "五十音図",
    "dakuten",
    "濁点",
    "handakuten",
    "半濁点",
    "japanese kana",
    "kana chart",
    "learn hiragana",
    "learn katakana",
    "hiragana converter",
    "katakana converter",
    "japanese alphabet",
    "japanese writing system",
    "learn japanese",
    "japanese for beginners",
    "kana practice",
    "japanese characters",
    "japanese study",
    "japanese learning tools",
    "romaji to hiragana",
    "romaji to katakana",
    "japanese pronunciation",
    "japanese writing practice"
  ],
  openGraph: {
    title: "LearnKana | AI-Powered Japanese Writing System Learning Platform",
    description: "Experience the future of Japanese language learning with our AI-powered platform. Get personalized tutoring, instant feedback, and adaptive learning for Hiragana (ひらがな) and Katakana (カタカナ) mastery.",
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
  "name": "LearnKana - AI-Powered Japanese Writing System Learning Platform",
  "alternateName": ["Learn Kana", "AI Japanese Learning", "ひらがな・カタカナ学習"],
  "description": "Revolutionary AI-powered platform for learning Japanese Hiragana and Katakana writing systems with personalized tutoring",
  "url": "https://learnkana.pro",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://learnkana.pro/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "hasPart": [
    {
      "@type": "WebApplication",
      "name": "AI Japanese Tutor",
      "applicationCategory": "EducationalApplication",
      "description": "Advanced AI-powered personalized Japanese learning assistance with real-time feedback"
    },
    {
      "@type": "WebApplication",
      "name": "Smart Kana Converter",
      "applicationCategory": "EducationalApplication",
      "description": "Intelligent conversion between Hiragana, Katakana, and Romaji with context awareness"
    },
    {
      "@type": "WebApplication",
      "name": "Interactive Gojuon Chart",
      "applicationCategory": "EducationalApplication",
      "description": "Visual chart for learning Japanese kana with AI-assisted pronunciation guidance"
    },
    {
      "@type": "WebApplication",
      "name": "Adaptive Practice Quizzes",
      "applicationCategory": "EducationalApplication",
      "description": "AI-driven quizzes that adapt to your learning progress and needs"
    }
  ],
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "educationalField": "Japanese Language Learning",
    "audienceType": ["Beginner", "Student", "Language Learner"],
    "educationalLevel": ["Beginner", "Intermediate"]
  },
  "teaches": [
    "AI-assisted Hiragana writing",
    "AI-assisted Katakana writing",
    "Personalized Japanese pronunciation",
    "Intelligent character recognition",
    "Adaptive writing practice"
  ],
  "inLanguage": ["en", "ja", "zh-CN"]
};