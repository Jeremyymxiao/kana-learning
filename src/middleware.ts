import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n.config';

/**
 * 注意：本项目页面位于 `src/app`，Next.js 只会在 `src/` 下查找 middleware。
 * 之前放在仓库根的 middleware.ts 从未被打包（.next/server/middleware-manifest.json
 * 里 middleware 为空），导致 `/` 没有路由、`/en` 不归一、as-needed 前缀策略失效。
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … explicitly exclude well-known root files like ads.txt/robots.txt/sitemap.xml
    '/((?!api|_next|_vercel|ads\\.txt|robots\\.txt|sitemap\\.xml|site\\.webmanifest|favicon\\.ico|.*\\..*).*)',
  ],
};
