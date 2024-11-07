import React from 'react';
import { Book, TestTube, User, Info } from 'lucide-react';

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
  const navItems: NavItem[] = [
    { name: 'Gojuon', icon: <Book className="w-7 h-4" />, key: 'gojuon' },
    { name: 'Test', icon: <TestTube className="w-7 h-4" />, key: 'test' },
    { name: 'Profile', icon: <User className="w-7 h-4" />, key: 'profile' },
    { name: 'About', icon: <Info className="w-7 h-4" />, key: 'about' }
  ];
  
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-lg">あ</span>
            </div>
            <span className="text-lg font-bold text-indigo-600">KanaGo</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onTabChange?.(item.key)}
                className={`
                  flex items-center space-x-1.5 px-3 py-1.5 rounded-lg
                  transition-colors duration-200
                  ${currentTab === item.key 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                {item.icon && <span className="opacity-75">{item.icon}</span>}
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;