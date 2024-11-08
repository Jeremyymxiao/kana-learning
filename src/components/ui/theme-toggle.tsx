// app/components/ui/theme-toggle.tsx
'use client';

import { useTheme } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <span className="text-yellow-500">🌞</span>
      ) : (
        <span className="text-gray-700">🌙</span>
      )}
    </button>
  );
}