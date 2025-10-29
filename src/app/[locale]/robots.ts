import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/chat',
          '/hiragana-katakana-quiz',
          '/hiragana-katakana-chart',
          '/hiragana-katakana-converter',
          '/learn',
          '/contact-us',
          '/privacy-policy',
          '/terms-of-service',
          '/cookie-policy'
        ],
        disallow: [
          '/api/',
          '/auth',
          '/login',
          '/register',
          '/profile',
          '/settings',
          '/_next/',
          '/admin/',
          '/private/',
          '*.json',
          '*.xml',
          '/*?utm_*',
          '/*?ref=*'
        ]
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth',
          '/login',
          '/register',
          '/profile',
          '/settings',
          '/_next/',
          '/admin/',
          '/private/',
          '/*?utm_*',
          '/*?ref=*'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/auth',
          '/login',
          '/register',
          '/profile',
          '/settings',
          '/_next/',
          '/admin/',
          '/private/',
          '/*?utm_*',
          '/*?ref=*'
        ]
      }
    ],
    sitemap: 'https://learnkana.pro/sitemap.xml',
    host: 'https://learnkana.pro'
  }
}