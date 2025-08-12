'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
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
    if (!pathname) return 'home';
    
    // Handle locale paths by removing the locale prefix
    const parts = pathname.split('/').filter(Boolean);
    const route = parts.length > 1 ? '/' + parts.slice(1).join('/') : '/';
    
    if (route === '/') return 'home';
    if (route === '/hiragana-katakana-chart') return 'chart';
    if (route === '/hiragana-katakana-quiz') return 'quiz';
    if (route === '/hiragana-katakana-converter') return 'converter';
    if (route === '/learn') return 'learn';
    if (route === '/about') return 'about';
    if (route === '/contact-us') return 'contact';
    
    return parts[1] || 'home';
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
    // Return a default context instead of throwing during SSR
    if (typeof window === 'undefined') {
      return { currentTab: 'home', setCurrentTab: () => {} };
    }
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
} 