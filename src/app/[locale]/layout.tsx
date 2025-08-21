import { Noto_Sans_JP } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '../../../i18n.config';
import { notFound } from 'next/navigation';
import '../globals.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { NavigationProvider } from '@/features/kana/components/navigation-provider'
import { Analytics } from "@vercel/analytics/react"

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the specific locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${notoSansJP.variable} font-sans min-h-screen antialiased bg-gradient-to-br from-background to-secondary/20`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <NavigationProvider>
              {children}
              <Analytics />
            </NavigationProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}