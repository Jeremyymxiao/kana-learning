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
        ? `${baseUrl}${route.path || ''}`.replace(/^\/$/, '') || baseUrl
        : `${baseUrl}/${locale}${route.path || ''}`.replace(/\/$/, '')
      
      // Create proper hreflang entries including self-reference
      const hreflangs = {
        'en': `${baseUrl}${route.path || ''}`.replace(/^\/$/, '') || baseUrl,
        'de': `${baseUrl}/de${route.path || ''}`.replace(/\/$/, ''),
        'fr': `${baseUrl}/fr${route.path || ''}`.replace(/\/$/, ''),
        'pt': `${baseUrl}/pt${route.path || ''}`.replace(/\/$/, ''),
        'es': `${baseUrl}/es${route.path || ''}`.replace(/\/$/, '')
      }

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: hreflangs
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
      
      // Create proper hreflang entries including self-reference
      const hreflangs = {
        'en': `${baseUrl}/learn/${article.slug}`,
        'de': `${baseUrl}/de/learn/${article.slug}`,
        'fr': `${baseUrl}/fr/learn/${article.slug}`,
        'pt': `${baseUrl}/pt/learn/${article.slug}`,
        'es': `${baseUrl}/es/learn/${article.slug}`
      }

      sitemapEntries.push({
        url,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: hreflangs
        }
      })
    })
  })

  // Remove duplicate URLs and ensure unique entries
  const uniqueEntries = sitemapEntries.filter((entry, index, self) =>
    index === self.findIndex(e => e.url === entry.url)
  )

  return uniqueEntries
}