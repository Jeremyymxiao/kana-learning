import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'pt', 'es'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'as-needed',
    prefixes: {
      // English doesn't need prefix, others do
    }
  }
});

export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);