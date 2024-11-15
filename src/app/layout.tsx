import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from '@/app/context/ThemeContext';
import ThemeToggle from '@/components/ui/theme-toggle';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kana Learning",
  description: "Learn Japanese Kana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-gradient-to-br 
          from-white 
          to-pink-50 
          dark:from-gray-900 
          dark:to-gray-800 
          text-gray-900 
          dark:text-gray-100
        `}
      >
        <ThemeProvider>
          <div className="min-h-screen transition-colors duration-200">
            <main className="max-w-6xl mx-auto px- sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}