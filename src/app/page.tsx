'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '@/components/ui/HeroCarousel';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-900 transition-colors duration-200">

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroCarousel />

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-dark-800 transition-colors duration-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-900 dark:text-white">Your Learning Journey</h2>
              <p className="text-charcoal-600 dark:text-gray-300 max-w-2xl mx-auto">
                Follow these three simple steps to understand One Nation One Election
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -top-2 -left-2 bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">Learn About ONOE</h3>
                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  Understand what One Nation One Election means, its constitutional aspects, and historical context in simple language
                </p>
                <Link href="/learn" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  Start Learning →
                </Link>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-secondary-100 dark:bg-secondary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -left-2 bg-secondary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">Explore Facts</h3>
                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  Distinguish between claims and verified information with our neutral, source-based fact-checking section
                </p>
                <Link href="/fact-vs-myth" className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700">
                  Check Facts →
                </Link>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 text-center relative transition-colors duration-200 border border-gray-100 dark:border-dark-700"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="absolute -top-2 -left-2 bg-primary-600 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-900 dark:text-white">Stay Informed</h3>
                <p className="text-charcoal-600 dark:text-gray-300 mb-4">
                  Access official documents, committee reports, and credible resources to deepen your understanding
                </p>
                <Link href="/resources" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  Browse Resources →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Understanding Matters Section */}
        <section id="why" className="py-20 bg-white dark:bg-dark-900 transition-colors duration-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-900 dark:text-white">Why Understanding Matters</h2>
              <p className="text-charcoal-600 dark:text-gray-300 max-w-3xl mx-auto">
                The challenges citizens face when trying to understand One Nation One Election
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">
                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-charcoal-900 dark:text-white">Information Overload</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center text-sm">
                  Too much conflicting information makes it hard to understand the actual concept
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-dark-card rounded-xl shadow-sm p-6 border border-secondary-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-secondary-100 dark:bg-secondary-900/30 p-3">
                    <svg className="h-6 w-6 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-charcoal-900 dark:text-white">Misinformation</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center text-sm">
                  False claims and rumors spread quickly through social media and messaging apps
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-dark-card rounded-xl shadow-sm p-6 border border-primary-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3">
                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-charcoal-900 dark:text-white">Partisan Bias</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center text-sm">
                  Most sources have political leanings, making neutral information hard to find
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-dark-card rounded-xl shadow-sm p-6 border border-accent-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-accent-100 dark:bg-accent-900/30 p-3">
                    <svg className="h-6 w-6 text-accent-700 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center mb-2 text-charcoal-900 dark:text-white">Complex Language</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center text-sm">
                  Constitutional and legal jargon makes the topic inaccessible to many citizens
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Platform Values Section */}
        <section id="values" className="py-20 bg-gray-50 dark:bg-dark-800 transition-colors duration-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-900 dark:text-white">Our Commitment to You</h2>
              <p className="text-charcoal-600 dark:text-gray-300 max-w-3xl mx-auto">
                What makes Electify India different — neutrality, accessibility, and transparency
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 border border-gray-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800 dark:text-white">Neutral & Non-Partisan</h3>
                <p className="text-charcoal-600 dark:text-gray-300">
                  We don't endorse any political party or leader. Our goal is education, not advocacy.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 border border-gray-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="text-4xl mb-4 text-center">♿</div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800 dark:text-white">Accessibility First</h3>
                <p className="text-charcoal-600 dark:text-gray-300">
                  Multi-language support, audio explanations, and simple language make content accessible to all.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-card p-8 border border-gray-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="text-4xl mb-4 text-center">📚</div>
                <h3 className="text-xl font-bold mb-3 text-charcoal-800 dark:text-white">Source Transparency</h3>
                <p className="text-charcoal-600 dark:text-gray-300">
                  All information is backed by official documents, constitutional texts, and credible sources.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-dark-900 transition-colors duration-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal-900 dark:text-white">Key Features</h2>
            <p className="text-center text-charcoal-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Tools and resources to help you understand ONOE and identify misinformation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* ONOE Learning Modules */}
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-primary-50 dark:bg-dark-card rounded-xl shadow-card p-8 border border-primary-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary-200 dark:bg-primary-900/50 flex items-center justify-center shadow-sm">
                    <svg className="h-8 w-8 text-primary-700 dark:text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-charcoal-900 dark:text-white">ONOE Learning Modules</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center mb-6">
                  Progressive, structured content explaining One Nation One Election in simple language
                </p>
                <div className="text-center">
                  <Link href="/learn" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white font-medium shadow-sm hover:bg-primary-700 transition-all">
                    Start Learning →
                  </Link>
                </div>
              </motion.div>

              {/* Claim vs Fact Checker */}
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-secondary-50 dark:bg-dark-card rounded-xl shadow-card p-8 border border-secondary-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-secondary-200 dark:bg-secondary-900/50 flex items-center justify-center shadow-sm">
                    <svg className="h-8 w-8 text-secondary-700 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-charcoal-900 dark:text-white">Fact vs Myth</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center mb-6">
                  Identify misinformation with neutral, source-based fact-checking
                </p>
                <div className="text-center">
                  <Link href="/fact-vs-myth" className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary-600 text-white font-medium shadow-sm hover:bg-secondary-700 transition-all">
                    Check Facts →
                  </Link>
                </div>
              </motion.div>

              {/* Blind Reading Mode */}
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-accent-50 dark:bg-dark-card rounded-xl shadow-card p-8 border border-accent-100 dark:border-dark-700 transition-colors duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-accent-200 dark:bg-accent-900/50 flex items-center justify-center shadow-sm">
                    <svg className="h-8 w-8 text-accent-700 dark:text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-charcoal-900 dark:text-white">Blind Reading Mode 🕶️</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-center mb-6">
                  Mask party and leader names to focus on content without bias
                </p>
                <div className="text-center">
                  <Link href="/learn" className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-600 text-white font-medium shadow-sm hover:bg-accent-700 transition-all">
                    Try Mode →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
