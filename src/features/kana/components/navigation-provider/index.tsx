'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const ROUTE_TO_TAB = {
  '/': 'home',
  '/hiragana-katakana-chart': 'chart',
  '/hiragana-katakana-quiz': 'quiz',
  '/hiragana-katakana-converter': 'converter',
  // ... 其他路由
};

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(() => {
    if (pathname === '/') return 'home';
    if (pathname === '/hiragana-katakana-chart') return 'chart';
    if (pathname === '/hiragana-katakana-quiz') return 'quiz';
    if (pathname === '/hiragana-katakana-converter') return 'converter';
    const path = pathname.split('/')[1];
    return path || 'home';
  });

  const handleTabChange = useCallback((tab: string) => {
    setCurrentTab(tab);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentTab, setCurrentTab: handleTabChange }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 