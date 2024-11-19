import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "关于我们 | About Gojuon",
  description: "了解Gojuon日语学习工具的特点和使用方法",
  openGraph: {
    title: "关于Gojuon日语学习工具",
    description: "交互式日语学习平台，让学习更简单有趣",
    type: "website",
    locale: "zh_CN",
  }
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "About Gojuon",
  "description": "Learn about our Japanese learning platform",
  "publisher": {
    "@type": "Organization",
    "name": "Gojuon"
  }
};