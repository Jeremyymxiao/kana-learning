import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'pt', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/learn': '/learn',
    '/learn/[slug]': '/learn/[slug]',
    '/contact-us': '/contact-us',
    '/chat': '/chat',
    '/hiragana-katakana-chart': '/hiragana-katakana-chart',
    '/hiragana-katakana-converter': '/hiragana-katakana-converter',
    '/hiragana-katakana-quiz': '/hiragana-katakana-quiz',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service'
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);