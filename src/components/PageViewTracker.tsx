'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/gtag';

// 创建一个内部组件来使用 useSearchParams
function PageViewTrackerInner() {
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

  return null;
}

// 主组件使用 Suspense 包裹内部组件
export default function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
} 