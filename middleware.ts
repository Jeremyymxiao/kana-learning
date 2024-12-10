import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('Middleware path:', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 完全排除 api 路径和静态资源
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)'
  ]
};