'use client';

import { useTheme } from '@/context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-dark-50 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 shadow-sm dark:shadow-md"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}