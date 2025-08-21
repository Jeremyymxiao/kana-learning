import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/auth`;
  
  return {
    title: "Authentication | LearnKana Account Access",
    description: "Sign in to your LearnKana account to access personalized Japanese learning features, track your progress, and sync across devices.",
    keywords: [
      "login",
      "sign in",
      "account",
      "authentication",
      "user access",
      "japanese learning account"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Sign In | LearnKana",
      description: "Access your personalized Japanese learning experience with LearnKana account.",
      type: "website",
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      siteName: "LearnKana",
      url: canonicalUrl
    }
  };
}