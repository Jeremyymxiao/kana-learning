import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n.config';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … explicitly exclude well-known root files like ads.txt/robots.txt/sitemap.xml
    '/((?!api|_next|_vercel|ads\\.txt|robots\\.txt|sitemap\\.xml|site\\.webmanifest|favicon\\.ico|.*\\..*).*)',
  ]
};