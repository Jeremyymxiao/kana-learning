import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Japanese Learning Chat | AI Language Assistant",
  description: "通过AI助手学习日语假名。支持实时对话、发音指导和写法练习。Chat with AI to learn Japanese kana, get pronunciation guidance and writing practice.",
  keywords: [
    "japanese chat",
    "ai language tutor",
    "japanese learning",
    "kana practice",
    "japanese conversation",
    "ai language assistant",
    "日语学习",
    "AI对话",
    "假名练习",
    "日语会话"
  ],
  alternates: {
    canonical: 'https://learnkana.pro/chat'
  },
  openGraph: {
    title: "Japanese Learning Chat Assistant | LearnKana",
    description: "Learn Japanese with AI chat assistant. Real-time conversation and practice.",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "ja_JP"],
    url: "https://learnkana.pro/chat"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Japanese Learning Chat Assistant",
  "description": "AI-powered Japanese language learning chat assistant",
  "url": "https://learnkana.pro/chat",
  "applicationCategory": "EducationalApplication",
  "educationalUse": ["Language Learning", "Practice"],
  "inLanguage": ["en", "ja", "zh-CN"],
  "learningResourceType": "Interactive Resource"
};