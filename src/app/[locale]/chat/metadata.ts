import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/chat`;
  
  return {
    title: t('chatTitle'),
    description: t('chatDescription'),
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
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/chat`,
        'de': `${baseUrl}/de/chat`,
        'fr': `${baseUrl}/fr/chat`,
        'pt': `${baseUrl}/pt/chat`,
        'es': `${baseUrl}/es/chat`
      }
    },
    openGraph: {
      title: t('chatTitle'),
      description: t('chatDescription'),
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      alternateLocale: ["en_US", "de_DE", "fr_FR", "pt_PT", "es_ES"],
      siteName: t('siteName'),
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/chat`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Japanese Learning Chat Assistant",
    "description": "AI-powered Japanese language learning chat assistant",
    "url": canonicalUrl,
    "applicationCategory": "EducationalApplication",
    "educationalUse": ["Language Learning", "Practice"],
    "inLanguage": ["en", "ja", "zh-CN"],
    "learningResourceType": "Interactive Resource"
  };
}