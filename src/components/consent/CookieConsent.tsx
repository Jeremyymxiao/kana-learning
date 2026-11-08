'use client';

/**
 * 底部 Cookie / 分析同意横幅。
 *
 * - 未选择前不加载 GA4 / Clarity（见 AnalyticsScripts）。
 * - 选择写入 `learnkana.consent.v1` 并广播 CONSENT_EVENT。
 * - 文案保持英文（其余语言先复用英文，避免一次性引入 5 套法律文案）。
 */
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getConsent, setConsent } from '@/lib/consent';

const LOCALES = ['de', 'fr', 'pt', 'es'];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 只有「还没做过选择」才显示。
    setVisible(getConsent() === null);
  }, []);

  // 弹出时把焦点交给「Accept all」，键盘用户可直接回车。
  useEffect(() => {
    if (visible) acceptRef.current?.focus();
  }, [visible]);

  const decide = (value: 'granted' | 'denied') => {
    setConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  const segment = (pathname ?? '').split('/')[1] ?? '';
  const policyHref = LOCALES.includes(segment) ? `/${segment}/cookie-policy` : '/cookie-policy';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie and analytics consent"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-900/95"
      onKeyDown={(event) => {
        if (event.key === 'Escape') decide('denied');
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="cookie-consent-description" className="text-sm text-gray-700 dark:text-gray-300">
          We use privacy-friendly analytics to understand how the site is used. Google
          Analytics and Microsoft Clarity only run if you accept. No advertising cookies are
          used. See our{' '}
          <a href={policyHref} className="underline hover:no-underline">
            Cookie Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Essential only
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => decide('granted')}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
