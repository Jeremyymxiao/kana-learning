import type { Metadata } from 'next'
import { Archivo, Noto_Sans_JP } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ThemeProvider } from 'next-themes'
import { routing } from '../../../i18n.config'
import { BASE_URL } from '@/lib/seo-utils'
import { AuthProvider } from '@/providers/AuthProvider'
import { NavigationProvider } from '@/features/kana/components/navigation-provider'
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts'
import CookieConsent from '@/components/consent/CookieConsent'
import '../globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  // Two weights only: 400 (body) + 700 (headings). 500 was unused in practice
  // and cost ~1/3 of the @font-face rules emitted for this CJK family.
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

// 首页「Kana Line」世界的拉丁展示字体（仅 latin 子集，体积很小）
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-archivo',
})

/**
 * Root document metadata — the ONLY document root for the whole app.
 *
 * HARD RULE: never declare `canonical`, `alternates`, `title` or `description`
 * here. Next.js inherits layout metadata into every child page, so anything
 * declared here would leak onto every route (this is exactly the P0 bug where
 * every sub-page canonical pointed at the homepage). Page-level
 * `generateMetadata` owns those fields.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  // Load messages for the specific locale
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* AdSense site verification (meta only — no ad scripts: the site has 0 ad slots) */}
        <meta name="google-adsense-account" content="ca-pub-5334706525054343" />
      </head>
      <body className={`${notoSansJP.variable} ${archivo.variable} font-sans min-h-screen antialiased bg-gradient-to-br from-background to-secondary/20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <AuthProvider>
              <NavigationProvider>{children}</NavigationProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        {/* Analytics (Vercel Analytics + Umami always; GA4/Clarity only after consent) */}
        <AnalyticsScripts />
        {/* Cookie consent banner */}
        <CookieConsent />
      </body>
    </html>
  )
}
