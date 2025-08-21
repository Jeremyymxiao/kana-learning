import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/profile`;
  
  return {
    title: "User Profile | LearnKana Dashboard",
    description: "View and manage your LearnKana profile, track your Japanese learning progress, and customize your learning experience.",
    keywords: [
      "user profile",
      "learning progress",
      "account settings",
      "personal dashboard",
      "japanese learning stats"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Profile | LearnKana",
      description: "Your personalized Japanese learning dashboard with progress tracking and settings.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}