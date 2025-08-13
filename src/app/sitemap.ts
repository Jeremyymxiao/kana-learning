import { MetadataRoute } from 'next'
import { articles } from '@/data/articles'

const supportedLocales = ['en', 'de', 'fr', 'pt', 'es'] as const
const baseUrl = 'https://learnkana.pro'

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Main routes with locale variants
  const routes = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hiragana-katakana-quiz', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/hiragana-katakana-chart', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/hiragana-katakana-converter', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/learn', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact-us', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/terms-of-service', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/chat', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  // Add main routes with all locale variants
  routes.forEach(route => {
    supportedLocales.forEach(locale => {
      const url = locale === 'en' 
        ? `${baseUrl}${route.path || '/'}`
        : `${baseUrl}/${locale}${route.path || ''}`
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            supportedLocales.map(lang => [
              lang === 'en' ? 'en-US' : `${lang}-${lang.toUpperCase()}`,
              lang === 'en' 
                ? `${baseUrl}${route.path || '/'}`
                : `${baseUrl}/${lang}${route.path || ''}`
            ])
          )
        }
      })
    })
  })

  // Add article URLs with locale variants
  articles.forEach(article => {
    supportedLocales.forEach(locale => {
      const url = locale === 'en'
        ? `${baseUrl}/learn/${article.slug}`
        : `${baseUrl}/${locale}/learn/${article.slug}`
      
      sitemapEntries.push({
        url,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            supportedLocales.map(lang => [
              lang === 'en' ? 'en-US' : `${lang}-${lang.toUpperCase()}`,
              lang === 'en'
                ? `${baseUrl}/learn/${article.slug}`
                : `${baseUrl}/${lang}/learn/${article.slug}`
            ])
          )
        }
      })
    })
  })

  return sitemapEntries
}