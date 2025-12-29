'use client';

import Link from 'next/link';
// Removed i18n for now to fix build errors
// import { useTranslation } from 'react-i18next';

export default function NotFound() {
  // Removed i18n for now to fix build errors
  // const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-extrabold text-primary-600">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}