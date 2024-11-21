'use client';

import React, { useState } from 'react';
import { Book, Info, Menu, X,FileText, Table } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import type { Route } from 'next';

interface NavBarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

interface NavItem {
  name: string;
  icon?: React.ReactNode;
  key: string;
}

const NavBar: React.FC<NavBarProps> = ({ currentTab }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (key: string) => {
    if (key === 'home') {
      router.push('/');
    } else if (key === 'converter') {
      router.push('/converter' as Route);
    } else if (key === 'learn') {
      router.push('/learn');
    } else if (key === 'chart') {
      router.push('/chart');
    }
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { name: 'Home', icon: <Book className="w-7 h-4" />, key: 'home' },
    { name: 'KanaChart', icon: <Table className="w-7 h-4" />, key: 'chart' },
    { name: 'Kanji Converter', icon: <FileText className="w-7 h-4" />, key: 'converter' },
    { name: 'Blog', icon: <Info className="w-7 h-4" />, key: 'learn' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="w-full px-4">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 mr-8 cursor-pointer" 
            onClick={() => router.push('/')}
          >
            <div className="font-['Noto_Sans_JP','Poppins',sans-serif] text-lg font-bold">
              <span className="text-gray-800 dark:text-gray-200">Learn</span>
              <span className="text-indigo-600 dark:text-indigo-400 relative">
                Kana
                <span className="absolute -top-3 -right-2 text-[10px] opacity-60">
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
                  flex items-center space-x-2 px-4 py-2 rounded-lg
                  transition-colors duration-200 mx-2
                  ${(currentTab === item.key || (item.key === 'about' && pathname === '/about'))
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
                `}
              >
                {item.icon && <span className="opacity-75">{item.icon}</span>}
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`
                  flex items-center space-x-2 px-4 py-3 rounded-lg w-full
                  transition-colors duration-200
                  ${(currentTab === item.key || (item.key === 'about' && pathname === '/about'))
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}
                `}
              >
                {item.icon && <span className="opacity-75">{item.icon}</span>}
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;