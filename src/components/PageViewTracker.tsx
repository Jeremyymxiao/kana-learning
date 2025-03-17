'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/gtag';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // 构建完整的 URL
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // 发送页面浏览事件
      pageview(url);
      
      console.log(`[Google Analytics] Pageview tracked: ${url}`);
    }
  }, [pathname, searchParams]);

  return null; // 这个组件不渲染任何内容
} 