import { routing } from '../../i18n.config';

const BASE_URL = 'https://learnkana.pro';

/**
 * Generate hreflang alternates for a given page path, including x-default.
 * @param pagePath - The page path without locale prefix (e.g., '/hiragana-katakana-quiz' or '' for homepage)
 */
export function generateHreflangs(pagePath: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    if (locale === routing.defaultLocale) {
      languages[locale] = `${BASE_URL}${pagePath || '/'}`.replace(/\/$/, '') || BASE_URL;
    } else {
      languages[locale] = `${BASE_URL}/${locale}${pagePath}`;
    }
  }

  // x-default points to the default locale (English) URL
  languages['x-default'] = languages[routing.defaultLocale];

  return languages;
}

/**
 * Get the canonical URL for a page given locale and path.
 */
export function getCanonicalUrl(locale: string, pagePath: string): string {
  const localePath = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${BASE_URL}${localePath}${pagePath}`;
}

/**
 * Get alternate OG locale strings for all supported locales except the current one.
 */
export function getAlternateOgLocales(currentLocale: string): string[] {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    de: 'de_DE',
    fr: 'fr_FR',
    pt: 'pt_PT',
    es: 'es_ES',
  };

  return routing.locales
    .filter((l) => l !== currentLocale)
    .map((l) => localeMap[l] || `${l}_${l.toUpperCase()}`);
}

/**
 * Get the OG locale string for a given locale.
 */
export function getOgLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_US',
    de: 'de_DE',
    fr: 'fr_FR',
    pt: 'pt_PT',
    es: 'es_ES',
  };
  return localeMap[locale] || `${locale}_${locale.toUpperCase()}`;
}

export { BASE_URL };
