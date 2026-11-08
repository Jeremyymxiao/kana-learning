'use client';

/**
 * 全站唯一的分析脚本挂载点。
 *
 * 分层：
 *  - 始终加载（无 Cookie 方案）：Vercel Analytics + Umami。
 *  - 仅在 analysis cookie 同意后加载：GA4 + Microsoft Clarity。
 *  - 本项目当前不投放任何广告，**不加载 AdSense**。
 *
 * 该组件应挂在唯一的 root layout 里，且只挂一次（旧的双 layout 会导致脚本重复）。
 */
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { CONSENT_EVENT, getConsent, type ConsentValue } from '@/lib/consent';

const GA_MEASUREMENT_ID = 'G-0M56J3EFEE';
const CLARITY_PROJECT_ID = 'qtqh6nav4v';
const UMAMI_SRC = 'https://umami.jeremyym0612.work/random-string.js';
const UMAMI_WEBSITE_ID = '6e68d4ad-8953-412c-8791-43d9c0021c61';

declare global {
  interface Window {
    dataLayer?: unknown[];
    clarity?: (...args: unknown[]) => void;
  }
}

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const [consent, setConsentState] = useState<ConsentValue | null>(null);
  const lastPath = useRef<string | null>(null);

  // 首帧之后再读 localStorage，避免 SSR/CSR 不一致。
  useEffect(() => {
    setConsentState(getConsent());

    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<ConsentValue>).detail;
      setConsentState(detail === 'granted' || detail === 'denied' ? detail : getConsent());
    };

    window.addEventListener(CONSENT_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, onConsentChange);
  }, []);

  // 撤回同意后立即停止 GA 收集（脚本无法卸载，但可以禁用）。
  useEffect(() => {
    if (consent === 'denied') {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      return;
    }
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  }, [consent]);

  // SPA 路由切换补发 page_view（首屏由 config 的 send_page_view 负责）。
  useEffect(() => {
    if (!pathname) return;
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (consent !== 'granted') return;
    window.gtag?.('event', 'page_view', { page_path: pathname });
  }, [pathname, consent]);

  const analyticsAllowed = consent === 'granted';

  return (
    <>
      {/* 无 Cookie 分析：始终启用 */}
      <Analytics />
      {/* Umami 用原生 script 标签以保留 data-website-id 属性 */}
      <script
        src={UMAMI_SRC}
        data-website-id={UMAMI_WEBSITE_ID}
        defer
      />

      {/* 需要同意：GA4 */}
      {analyticsAllowed && (
        <>
          <Script
            id="ga4-lib"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  send_page_view: true,
                  anonymize_ip: true
                });
              `,
            }}
          />
        </>
      )}

      {/* 需要同意：Microsoft Clarity */}
      {analyticsAllowed && (
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}
    </>
  );
}
