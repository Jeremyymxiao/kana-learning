import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}`;
  
  return {
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
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'pt': `${baseUrl}/pt`,
        'es': `${baseUrl}/es`
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
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}

export async function generateStructuredData({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LearnKana",
    "description": "Free AI-Powered Hiragana & Katakana Quiz Tool",
    "url": canonicalUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${canonicalUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LearnKana",
      "url": baseUrl
    },
    "inLanguage": locale === 'en' ? 'en' : locale,
    "availableLanguage": ["en", "de", "fr", "pt", "es"]
  };
}
