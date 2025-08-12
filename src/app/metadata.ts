import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "LearnKana | Free Hiragana & Katakana Quiz and Chatbot",
  description: "Learn Japanese kana easily with our interactive tools. Practice Hiragana and Katakana with AI assistance, quizzes, and a text converter.",
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
  ],
  alternates: {
    canonical: 'https://learnkana.pro/',
    languages: {
      'en': 'https://learnkana.pro/',
      'de': 'https://learnkana.pro/de',
      'fr': 'https://learnkana.pro/fr',
      'pt': 'https://learnkana.pro/pt',
      'es': 'https://learnkana.pro/es'
    }
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]
  },
  openGraph: {
    title: "LearnKana | Free AI-Powered Hiragana & Katakana Quiz Tool",
    description: "Learn Japanese kana easily with our interactive tools. Practice Hiragana and Katakana with AI assistance, quizzes, and a text converter.",
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
  "name": "LearnKana | Free Hiragana & Katakana Quiz and Chatbot",
  "alternateName": ["Learn Kana", "AI Japanese Learning", "ひらがな・カタカナ学習"],
  "description": "Learn Japanese kana easily with our interactive tools. Practice Hiragana and Katakana with AI assistance, quizzes, and a text converter.",
  "url": "https://learnkana.pro",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
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