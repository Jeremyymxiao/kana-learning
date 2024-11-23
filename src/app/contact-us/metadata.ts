import { Metadata } from 'next';

export const metadata: Metadata = {
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
  openGraph: {
    title: "Contact Us | LearnKana",
    description: "Get in touch with the LearnKana team and share your thoughts.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP", "zh_CN"],
    url: "https://learnkana.pro/contact-us"
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact LearnKana",
  "description": "Contact information and feedback channels for LearnKana",
  "url": "https://learnkana.pro/contact-us",
  "provider": {
    "@type": "Organization",
    "name": "LearnKana",
    "email": "xym0645@gmail.com"
  }
};