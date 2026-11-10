'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter, usePathname, Link } from '../../../../../i18n.config';
import { useLocale, useTranslations } from 'next-intl';

interface NavBarProps {
  authButtons?: React.ReactNode;
}

const ROUTE_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/chat': 'chat',
  '/hiragana-katakana-quiz': 'quiz',
  '/hiragana-katakana-chart': 'chart',
  '/hiragana-katakana-converter': 'converter',
  '/japanese-text-analyzer': 'analyzer',
  '/learn': 'learn',
  '/course': 'learn',
};

const TAB_TO_ROUTE: Record<string, string> = {
  home: '/',
  chat: '/chat',
  quiz: '/hiragana-katakana-quiz',
  chart: '/hiragana-katakana-chart',
  converter: '/hiragana-katakana-converter',
  analyzer: '/japanese-text-analyzer',
  learn: '/course',
};

interface NavItem {
  name: string;
  key: string;
}

export function NavBar({ authButtons }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const getActiveTab = () => {
    const pathParts = pathname.split('/');
    let baseRoute = '/';
    if (pathParts.length > 2 && pathParts[1].match(/^(de|fr|pt|es)$/)) {
      baseRoute = '/' + (pathParts[2] || '');
    } else if (pathParts.length > 1 && !pathParts[1].match(/^(de|fr|pt|es)$/)) {
      baseRoute = '/' + (pathParts[1] || '');
    }
    return ROUTE_TO_TAB[baseRoute] || 'home';
  };

  const activeTab = getActiveTab();

  const navItems: NavItem[] = [
    { name: t('home'), key: 'home' },
    { name: t('quiz'), key: 'quiz' },
    { name: t('chart'), key: 'chart' },
    { name: t('converter'), key: 'converter' },
    { name: t('analyzer'), key: 'analyzer' },
    { name: t('learn'), key: 'learn' },
    { name: t('chat'), key: 'chat' },
  ];

  return (
    <nav className="kl-nav fixed top-0 left-0 right-0 z-50" aria-label="Main">
      <div className="kl-wrap kl-nav-inner">
        <Link href="/" className="kl-logo" aria-label="LearnKana home">
          LearnKana
          <span className="kl-logo-kana" lang="ja">
            かな
          </span>
        </Link>

        <ul className="kl-nav-links">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={TAB_TO_ROUTE[item.key] as never}
                className={`kl-nav-link${item.key === activeTab ? ' is-active' : ''}`}
                aria-current={item.key === activeTab ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="kl-nav-right">
          {authButtons && <div className="kl-nav-auth">{authButtons}</div>}
          <div className="kl-nav-mobile-actions">
            {!authButtons && (
              <Link href="/register" className="kl-nav-register">
                {t('register')}
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="kl-nav-burger"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-nav" className="kl-nav-drawer">
          <ul className="kl-wrap kl-nav-drawer-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={TAB_TO_ROUTE[item.key] as never}
                  onClick={() => setIsMenuOpen(false)}
                  className={`kl-nav-drawer-link${item.key === activeTab ? ' is-active' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!authButtons && (
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="kl-nav-drawer-link"
                >
                  {t('login')}
                </Link>
              </li>
            )}
            {authButtons && <li className="kl-nav-drawer-auth">{authButtons}</li>}
          </ul>
        </div>
      )}
      {/* locale is consumed by LanguageSwitcher upstream; kept for future use */}
      <span hidden data-locale={locale} />
    </nav>
  );
}
