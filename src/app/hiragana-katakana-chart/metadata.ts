import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Japanese Kana Chart | Interactive Gojuon Table",
    description: "Learn Japanese Hiragana and Katakana with our interactive Gojuon chart. Features clear visuals, audio pronunciation, and practice tools for mastering Japanese writing systems.",
    keywords: [
      "gojuon chart",
      "japanese kana chart",
      "hiragana chart",
      "katakana chart",
      "japanese alphabet chart",
      "interactive kana table",
      "japanese syllabary",
      "learn japanese characters",
      "japanese writing system",
      "kana pronunciation"
    ],
    openGraph: {
      title: "Interactive Japanese Kana Chart | LearnKana",
      description: "Master Japanese Hiragana and Katakana with our interactive Gojuon chart. Clear visuals and audio pronunciation.",
      type: "website",
      locale: "en_US",
      url: "https://learnkana.pro/chart"
    }
  };
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Interactive Japanese Kana Chart",
  "description": "Comprehensive Japanese Kana chart with audio pronunciation",
  "url": "https://learnkana.pro/chart",
  "provider": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  },
  "learningResourceType": "Interactive Resource",
  "interactivityType": "active",
  "educationalUse": ["Practice", "Self-Assessment"],
  "educationalAlignment": {
    "@type": "AlignmentObject",
    "alignmentType": "teaches",
    "educationalFramework": "Japanese Language Learning",
    "targetName": "Japanese Writing System",
    "targetUrl": "https://learnkana.pro/learn/writing-system"
  },
  "isAccessibleForFree": true,
  "accessibilityFeature": [
    "audioDescription",
    "highContrast",
    "tableOfContents"
  ]
};