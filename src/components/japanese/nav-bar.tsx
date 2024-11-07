import React from "react";

interface NavBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function NavBar({ currentTab, onTabChange }: NavBarProps) {
  const navItems = [
    { text: "KanaGo", key: "kanago", width: "w-20" },
    { text: "Gojuon", key: "gojuon", width: "w-32" },
    { text: "Test", key: "test", width: "w-32" },
    { text: "Tips", key: "blog", width: "w-32" },
    { text: "Me", key: "me", width: "w-32" },
    { text: "About", key: "about", width: "w-20" }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`
                ${item.width}
                h-10
                flex
                items-center
                justify-center
                border
                border-gray-200
                rounded-lg
                shadow-sm
                transition-all
                duration-200
                ${
                  currentTab === item.key
                    ? 'bg-gray-50 border-gray-300'
                    : 'hover:bg-gray-50 hover:border-gray-300'
                }
              `}
              onClick={() => onTabChange(item.key)}
            >
              <span className="text-sm font-medium text-gray-700">
                {item.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;