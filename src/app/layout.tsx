import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { NavigationProvider } from '@/features/kana/components/navigation-provider'
import { metadata } from './metadata'
import dynamic from 'next/dynamic'

// 使用动态导入，确保分析组件只在客户端渲染
const AnalyticsProvider = dynamic(() => import('@/components/AnalyticsProvider'), { ssr: false })

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

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
            <AnalyticsProvider />
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export { metadata }