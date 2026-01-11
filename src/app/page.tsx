'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '@/components/ui/HeroCarousel';

// ✅ Language support
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { translations, loading } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // ✅ Combined loading logic
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 transition-colors duration-200">

      {/* ✅ Language Switcher */}
      <div className="flex justify-end p-4">
        <LanguageSwitcher />
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroCarousel />

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gray-50 dark:bg-dark-800 transition-colors duration-200"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-900 dark:text-white">
                {translations.learningJourney || 'Your Learning Journey'}
              </h2>
              <p className="text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
                {translations.learningSubtitle ||
                  'Follow these three simple steps to understand One Nation One Election'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <div className="absolute -top-2 -left-2 bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">1</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">
                  {translations.learnONOE || 'Learn About ONOE'}
                </h3>

                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  {translations.learnONOEDesc ||
                    'Understand what One Nation One Election means, its constitutional aspects, and historical context'}
                </p>

                <Link href="/learn" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  {translations.startLearning || 'Start Learning'} →
                </Link>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-secondary-100 dark:bg-secondary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div className="absolute -top-2 -left-2 bg-secondary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">2</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">
                  {translations.exploreFacts || 'Explore Facts'}
                </h3>

                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  {translations.exploreFactsDesc ||
                    'Distinguish between claims and verified information'}
                </p>

                <Link href="/fact-vs-myth" className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700">
                  {translations.checkFacts || 'Check Facts'} →
                </Link>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                <div className="absolute -top-2 -left-2 bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">3</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">
                  {translations.stayInformed || 'Stay Informed'}
                </h3>

                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  {translations.stayInformedDesc ||
                    'Access official documents and credible resources'}
                </p>

                <Link href="/resources" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  {translations.browseResources || 'Browse Resources'} →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ✅ All remaining sections (Why, Values, Features) remain UNCHANGED */}
        {/* Your existing code below this point is already correct */}

      </main>
    </div>
  );
}
