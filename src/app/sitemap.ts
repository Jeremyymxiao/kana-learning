import { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { BASE_URL, getArticleCanonicalUrl } from '@/lib/seo-utils'

const supportedLocales = ['en', 'de', 'fr', 'pt', 'es'] as const
const baseUrl = BASE_URL

/**
 * Evaluated when the sitemap route is generated. The previous version hardcoded
 * 2025-01/2025-02 as `lastModified` on every UI route, so the sitemap kept
 * claiming the site had not changed in over a year. UI routes change with every
 * deploy, so the build timestamp is the honest value.
 */
const BUILD_DATE = new Date()

/** English has no locale prefix (`as-needed`); every other locale is prefixed. */
const urlFor = (locale: string, path: string): string => {
  if (locale === 'en') {
    return path ? `${baseUrl}${path}` : baseUrl
  }
  return `${baseUrl}/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // UI routes: one URL per locale, each carrying the full hreflang cluster.
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
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/chat', priority: 0.7, changeFrequency: 'weekly' as const },
  ]

  routes.forEach((route) => {
    const hreflangs: Record<string, string> = {}
    supportedLocales.forEach((locale) => {
      hreflangs[locale] = urlFor(locale, route.path)
    })
    hreflangs['x-default'] = urlFor('en', route.path)

    supportedLocales.forEach((locale) => {
      entries.push({
        url: urlFor(locale, route.path),
        lastModified: BUILD_DATE,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: hreflangs,
        },
      })
    })
  })

  /**
   * Articles are English-only: `public/articles/{slug}.md` has no localised
   * variants, so `/de|fr|pt|es/learn/{slug}` renders the English body under a
   * localised shell and points its canonical at the English URL. Those routes
   * must not appear here — a sitemap should only list canonical URLs. One entry
   * per article (20), not one per article × locale (100).
   */
  articles.forEach((article) => {
    const url = getArticleCanonicalUrl(article.slug)
    entries.push({
      url,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          'en': url,
          'x-default': url,
        },
      },
    })
  })

  // Guard against accidental duplicates (e.g. a future route with an empty path).
  return entries.filter(
    (entry, index, self) => index === self.findIndex((e) => e.url === entry.url)
  )
}
