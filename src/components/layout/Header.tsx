'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../ui/LanguageToggle';

const Header = () => {
  const { t } = useTranslation('common');

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/images/logo.png" alt="Electify India Logo" className="h-16 w-auto" />
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/dashboard"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('nav.dashboard')}
              </Link>
              <Link
                href="/quiz"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('nav.quiz')}
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <LanguageToggle />
            <div className="ml-4">
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {t('auth.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;