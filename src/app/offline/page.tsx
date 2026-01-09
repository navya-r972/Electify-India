'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

// Import I18nClientInit with SSR disabled
const I18nClientInit = dynamic(() => import('@/components/layout/I18nClientInit'), { ssr: false });

export default function OfflinePage() {
  // Use translation with suspense disabled to prevent SSR issues
  const { t } = useTranslation('common', { useSuspense: false });
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  
  // Simple helper function to handle translations with fallbacks
  const tSafe = (key: string, defaultValue: string): string => {
    try {
      return t(key, defaultValue);
    } catch (e) {
      return defaultValue;
    }
  };

  // Check network status and update state
  useEffect(() => {
    // Initial check
    setIsOnline(navigator.onLine);

    // Set up event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Redirect to home if online
  useEffect(() => {
    if (isOnline) {
      // Add a small delay before redirecting to avoid flickering
      const redirectTimer = setTimeout(() => {
        router.push('/');
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isOnline, router]);

  return (
    <>
      <I18nClientInit />
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-card rounded-lg p-8 text-center">
        {isOnline ? (
          // Online state - show reconnected message
          <div className="py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {tSafe('offline.reconnected', 'You are back online!')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {tSafe('offline.redirecting', 'Redirecting you to the home page...')}
            </p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          </div>
        ) : (
          // Offline state
          <>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-6">
              <svg
                className="h-8 w-8 text-yellow-600 dark:text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {tSafe('offline.title', 'You are offline')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {tSafe('offline.description', 'Your internet connection is currently unavailable. Some features may be limited.')}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tSafe('offline.available_features', 'Available features:')}
              </p>
              <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {tSafe('offline.feature_profile', 'View Profile')}
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {tSafe('offline.feature_quiz', 'Take Quiz')}
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-600 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {tSafe('offline.feature_colleges', 'View Saved Colleges')}
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {tSafe('offline.try_again', 'Try Again')}
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}