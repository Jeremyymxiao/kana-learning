import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: "Japanese Text Converter | Kanji to Hiragana Tool",
    description: "Free online Japanese text converter. Convert Kanji to Hiragana instantly with our easy-to-use tool. Perfect for Japanese language learners and students.",
    keywords: [
      "japanese converter",
      "kanji to hiragana",
      "hiragana converter",
      "japanese text converter",
      "kanji reading",
      "furigana generator",
      "japanese learning tool",
      "kanji conversion",
      "japanese writing",
      "online japanese tools",
      "english to japanese converter",
      "english to kana converter",
      "to hiragana",
      "to katakana",
      "english to katakana",
      "romaji to hiragana",
      "romaji to katakana",
      "japanese writing converter"
    ],
    openGraph: {
      title: "Japanese Text Converter | LearnKana",
      description: "Convert Japanese text between Kanji and Hiragana instantly. Free online tool for Japanese language learners.",
      type: "website",
      locale: "en_US",
      url: "https://learnkana.pro/converter"
    }
  };
}

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Japanese Text Converter",
  "description": "Online tool for converting Japanese text between writing systems",
  "url": "https://learnkana.pro/converter",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "provider": {
    "@type": "Organization",
    "name": "LearnKana",
    "url": "https://learnkana.pro"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Kanji to Hiragana conversion",
    "Instant results",
    "User-friendly interface",
    "Free to use"
  ],
  "browserRequirements": "Requires JavaScript. Works in all modern browsers.",
  "softwareVersion": "1.0.0"
};