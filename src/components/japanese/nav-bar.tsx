import React from 'react';

interface NavBarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentTab, onTabChange }) => {
  const tabs = ['KanaGo', 'Gojuon', 'Test', 'Tips', 'Me', 'About'];
  
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="font-semibold text-lg">あ</span>
            </div>
            <span className="text-lg font-semibold text-indigo-600">KanaGo</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center">
            {tabs.map((tab) => (
              <a
                key={tab}
                href="#"
                onClick={() => onTabChange?.(tab.toLowerCase())}
                className={`
                  px-4 py-2 text-sm font-medium transition-colors duration-200
                  ${currentTab === tab.toLowerCase() 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;