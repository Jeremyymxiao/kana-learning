import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/settings`;
  
  return {
    title: "Settings | LearnKana Preferences",
    description: "Customize your LearnKana learning experience. Adjust language preferences, notification settings, and personalize your Japanese learning journey.",
    keywords: [
      "settings",
      "preferences",
      "customization",
      "language settings",
      "notification preferences",
      "learning options"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Settings | LearnKana",
      description: "Customize your Japanese learning experience with personalized settings and preferences.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}