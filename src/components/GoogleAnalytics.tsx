'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';

// 为 window.dataLayer 添加类型声明
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  // 确保只在客户端渲染
  useEffect(() => {
    // 这个空的 useEffect 确保组件只在客户端渲染
  }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              transport_type: 'beacon',
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}