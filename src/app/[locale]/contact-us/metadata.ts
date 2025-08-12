import { Metadata } from 'next';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/contact-us`;
  
  return {
    title: "Contact Us | LearnKana",
    description: "Contact the LearnKana team. Share your feedback, suggestions, or report issues. We'd love to hear from you!",
    keywords: [
      "contact",
      "feedback",
      "support",
      "LearnKana contact",
      "Japanese learning platform",
      "get in touch"
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: "Contact Us | LearnKana",
      description: "Get in touch with the LearnKana team and share your thoughts.",
      type: "website",
      locale: "en_US",
      alternateLocale: ["ja_JP", "zh_CN"],
      url: canonicalUrl
    }
  };
}

export function generateStructuredData({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const baseUrl = 'https://learnkana.pro';
  const localePath = locale === 'en' ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${localePath}/contact-us`;
  
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact LearnKana",
    "description": "Contact information and feedback channels for LearnKana",
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "LearnKana",
      "email": "xym0645@gmail.com"
    }
  };
}