import { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://learnkana.pro'),
  title: {
    template: '%s | LearnKana',
    default: 'LearnKana | Japanese Kana Learning & Converter'
  },
  description: 'Learn Japanese Hiragana & Katakana with interactive tools. Free online converter and study materials.',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ja-JP': '/ja',
      'zh-CN': '/zh'
    }
  }
};

// 添加结构化数据
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LearnKana',
  description: 'Japanese Kana Learning Platform with Hiragana/Katakana Converter',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${notoSansJP.variable}`}>
        {children}
      </body>
    </html>
  )
}