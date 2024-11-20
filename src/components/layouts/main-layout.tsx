'use client';

import { ReactNode } from 'react';
import NavBar from "@/components/japanese/nav-bar";
import Footer from './footer';
import { SakuraDecoration, WavePattern } from "@/components/decorative/japanese-patterns";

interface MainLayoutProps {
  children: ReactNode;
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function MainLayout({
  children,
  currentTab,
  onTabChange,
}: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SakuraDecoration />
      <WavePattern />
      <NavBar currentTab={currentTab} onTabChange={onTabChange} />
      <main className="flex-grow pt-16 pb-8 px-2 sm:px-4 relative z-10">
        <div className="max-w-9xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}