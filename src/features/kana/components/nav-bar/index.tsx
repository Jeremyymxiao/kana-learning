'use client';

import React, { useState } from 'react';
import { Book, Info, Menu, X, FileText, Table, PenTool, MessageSquare } from 'lucide-react';
import { useRouter, usePathname, Link } from '../../../../../i18n.config';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

interface NavBarProps {
  authButtons?: React.ReactNode;
}

const ROUTE_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/chat': 'chat',
  '/hiragana-katakana-quiz': 'quiz',
  '/hiragana-katakana-chart': 'chart',
  '/hiragana-katakana-converter': 'converter',
  '/learn': 'learn'
};

const TAB_TO_ROUTE: Record<string, string> = {
  'home': '/',
  'chat': '/chat',
  'quiz': '/hiragana-katakana-quiz',
  'chart': '/hiragana-katakana-chart',
  'converter': '/hiragana-katakana-converter',
  'learn': '/learn'
};

interface NavItem {
  name: string;
  icon?: React.ReactNode;
  key: string;
}

export function NavBar({ authButtons }: NavBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (key: string) => {
    const route = TAB_TO_ROUTE[key];
    if (route) {
      router.push(route as any);
    }
    setIsMenuOpen(false);
  };

  // 根据当前路径判断活动标签
  const getActiveTab = () => {
    // 处理子路由，例如 /learn/hiragana 应该激活 learn 标签
    const pathParts = pathname.split('/');
    // 处理根路径和locale路径
    let baseRoute = '/';
    if (pathParts.length > 2 && pathParts[1].match(/^(de|fr|pt|es)$/)) {
      baseRoute = '/' + (pathParts[2] || '');
    } else if (pathParts.length > 1 && !pathParts[1].match(/^(de|fr|pt|es)$/)) {
      baseRoute = '/' + (pathParts[1] || '');
    }
    return ROUTE_TO_TAB[baseRoute] || 'home';
  };

  const activeTab = getActiveTab();

  const t = useTranslations('Navigation');
  const locale = useLocale();

  const navItems: NavItem[] = [
    { name: t('home'), icon: <Book className="w-7 h-4" />, key: 'home' },
    { name: t('chat'), icon: <MessageSquare className="w-7 h-4" />, key: 'chat' },
    { name: t('quiz'), icon: <PenTool className="w-7 h-4" />, key: 'quiz' },
    { name: t('chart'), icon: <Table className="w-7 h-4" />, key: 'chart' },
    { name: t('converter'), icon: <FileText className="w-7 h-4" />, key: 'converter' },
    { name: t('learn'), icon: <Info className="w-7 h-4" />, key: 'learn' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#1A1B2F]/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10">
      <div className="w-full px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 mr-8 cursor-pointer" 
            onClick={() => router.push('/')}
          >
            <div className="font-['Noto_Sans_JP','Poppins',sans-serif] text-xl font-bold">
              <span className="text-[#1A1B2F] dark:text-white">Learn</span>
              <span className="text-[#2B7FFF] dark:text-[#2B7FFF] relative">
                Kana
                <span className="absolute -top-3 -right-2 text-[10px] text-[#FFD600] dark:text-[#FFD600]">
                  かな
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl
                  transition-all duration-200 mx-2
                  ${item.key === activeTab
                    ? 'bg-[#2B7FFF]/10 dark:bg-[#2B7FFF]/20 text-[#2B7FFF] dark:text-[#2B7FFF] scale-105' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5'}
                `}
              >
                {item.icon && <span className="opacity-75">{item.icon}</span>}
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
            {authButtons && <div className="ml-4">{authButtons}</div>}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-400"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white/80 dark:bg-[#1A1B2F]/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={TAB_TO_ROUTE[item.key] as any}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 w-full px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${item.key === activeTab
                      ? 'bg-[#2B7FFF]/10 dark:bg-[#2B7FFF]/20 text-[#2B7FFF] dark:text-[#2B7FFF]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5'}
                  `}
                >
                  {item.icon && <span className="opacity-75">{item.icon}</span>}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
              {authButtons && <div className="px-4 py-3">{authButtons}</div>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 