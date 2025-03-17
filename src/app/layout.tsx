import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { NavigationProvider } from '@/features/kana/components/navigation-provider'
import { metadata } from './metadata'
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import PageViewTracker from '@/components/PageViewTracker'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

export { metadata }

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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.variable} font-sans min-h-screen antialiased bg-gradient-to-br from-background to-secondary/20`}>
        <AuthProvider>
          <NavigationProvider>
            {children}
            <Analytics />
            <GoogleAnalytics />
            <PageViewTracker />
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}