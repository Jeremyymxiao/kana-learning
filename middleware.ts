import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n.config';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|fr|pt|es)/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|.*\\.woff$|.*\\.woff2$).*)'
  ]
};