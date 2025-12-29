'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n, t } = useTranslation('common');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    if (i18n) {
      // If the current language is not supported, default to English
      const currentLang = i18n.language || 'en';
      if (!['en', 'hi', 'ur'].includes(currentLang)) {
        i18n.changeLanguage('en');
        setCurrentLanguage('en');
      } else {
        setCurrentLanguage(currentLang);
      }
    }
  }, [i18n]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-toggle-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const changeLanguage = async (language: string) => {
    if (i18n) {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 language-toggle-container">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            id="language-menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {currentLanguage === 'en' && 'English'}
            {currentLanguage === 'hi' && 'हिंदी'}
            {currentLanguage === 'ur' && 'اردو'}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700 focus:outline-none z-10`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => changeLanguage('en')}
              className={`${currentLanguage === 'en' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={`${currentLanguage === 'hi' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
              role="menuitem"
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage('ur')}
              className={`${currentLanguage === 'ur' ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
              role="menuitem"
            >
              اردو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;