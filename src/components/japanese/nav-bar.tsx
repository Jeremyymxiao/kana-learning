'use client';

import React, { useState } from 'react';
import { Book, TestTube, Info, Menu, X, GraduationCap, FileText } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface NavBarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

interface NavItem {
  name: string;
  icon?: React.ReactNode;
  key: string;
}

const NavBar: React.FC<NavBarProps> = ({ currentTab, onTabChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (key: string) => {
    if (key === 'gojuon') {
      router.push('/');
    } else {
      router.push(`/${key}`);
    }
    setIsMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { name: 'Gojuon', icon: <Book className="w-7 h-4" />, key: 'gojuon' },
    { name: 'Test', icon: <TestTube className="w-7 h-4" />, key: 'test' },
    { name: 'Learn', icon: <GraduationCap className="w-7 h-4" />, key: 'learn' },
    { name: 'Converter', icon: <FileText className="w-7 h-4" />, key: 'converter' },
    { name: 'About', icon: <Info className="w-7 h-4" />, key: 'about' }
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
            <div className="bg-indigo-600 dark:bg-indigo-500 text-white w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-lg">GO</span>
            </div>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Gojuon</span>
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