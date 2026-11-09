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
  },
  // 不写 NEXT_LOCALE cookie：语言由 URL 前缀决定。
  // 一旦中间件设置 Set-Cookie，Vercel CDN 会把整页判定为不可缓存
  // （cache-control: private, no-store, x-vercel-cache: MISS）。
  localeCookie: false
});

export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);