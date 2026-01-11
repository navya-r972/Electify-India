'use client';

// AppLayout is now provided globally via ConditionalLayout
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [learningProgress, setLearningProgress] = useState({
  completed: 0,
  inProgress: 0,
  total: 0,
  percentage: 0,
  lastModule: '',
  xp: 0,
  level: 1,
  streak: 0
});


  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [preferences, setPreferences] = useState({
    language: "English",
    audioEnabled: true,
    blindReadEnabled: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
           setLoading(false);
           return;
        }

        const res = await fetch('/api/dashboard', {
             headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          
          const completedCount = data.progress?.completedLevels?.length || 0;
          const totalModules = 7; 
          
          setLearningProgress({
  completed: completedCount,
  inProgress: 0,
  total: totalModules,
  percentage: (completedCount / totalModules) * 100,
  lastModule: data.progress.lastVisitedRoute,
  xp: data.progress.xp,
  level: data.progress.level,
  streak: data.progress.streak
});

          
          setRecentlyViewed(data.recentActivities || []);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal-900 dark:text-dark-50 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-700 dark:text-gray-300">
            Continue your journey to understanding One Nation One Election
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Learning Progress & Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-slate-100 dark:border-dark-700"
            >
              <h2 className="text-2xl font-bold text-charcoal-900 dark:text-dark-50 mb-6">
                Your Learning Progress
              </h2>

              {/* Gamification Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {learningProgress.streak} 🔥
                  </div>
                  <div className="text-sm text-slate-700 dark:text-gray-300 mt-1">
                    Day Streak
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {learningProgress.xp} ⚡
                  </div>
                  <div className="text-sm text-slate-700 dark:text-gray-300 mt-1">
                    Total XP
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    Lvl {learningProgress.level} 🏆
                  </div>
                  <div className="text-sm text-slate-700 dark:text-gray-300 mt-1">
                    Current Level
                  </div>
                </div>
              </div>

              {/* Module Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xl font-bold text-slate-800 dark:text-gray-300">
                    {learningProgress.completed}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                    Completed
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xl font-bold text-slate-800 dark:text-gray-300">
                    {learningProgress.inProgress}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                    In Progress
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="text-xl font-bold text-slate-800 dark:text-gray-300">
                    {learningProgress.total}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                    Total Modules
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-700 dark:text-gray-300 mb-2">
                  <span>Overall Progress</span>
                  <span className="font-semibold">{Math.round(learningProgress.percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${learningProgress.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-primary-600 h-3 rounded-full"
                  />
                </div>
              </div>

              <Link
                href="/learn"
                className="block w-full text-center py-3 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
              >
                Continue Learning →
              </Link>
            </motion.div>

            {/* Continue Learning Section */}
            {learningProgress.lastModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-primary-100 dark:border-primary-900/20"
              >
                <h3 className="text-xl font-bold text-charcoal-900 dark:text-dark-50 mb-3">
                  📖 Resume Where You Left Off
                </h3>
                <p className="text-slate-700 dark:text-gray-300 mb-4">
                  Current Module: <span className="font-semibold capitalize">{learningProgress.lastModule.replace('-', ' ')}</span>
                </p>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/learn/${learningProgress.lastModule}`}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Resume
                  </Link>
                  <Link
                    href="/knowledge-check"
                    className="px-6 py-2 bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-lg font-medium hover:bg-primary-50 dark:hover:bg-dark-600 transition-colors"
                  >
                    Knowledge Check
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Recently Viewed Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-slate-100 dark:border-dark-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-charcoal-900 dark:text-dark-50">
                  Recently Viewed
                </h2>
                <Link
                  href="/saved"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  View All →
                </Link>
              </div>

              {recentlyViewed.length > 0 ? (
                <div className="space-y-3">
                  {recentlyViewed.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 bg-white dark:bg-dark-700 rounded-lg border border-slate-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-colors cursor-pointer"
                    >
                      <Link href={item.url || '#'}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-charcoal-900 dark:text-dark-50 mb-1">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-gray-400">
                              <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded">
                                {item.type}
                              </span>
                              <span>•</span>
                              <span>{formatTime(item.createdAt)}</span>
                            </div>
                          </div>
                          <svg className="h-5 w-5 text-slate-600 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-slate-600">
                  No recently viewed items.
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Quick Actions & Preferences */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-slate-100 dark:border-dark-700"
            >
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-dark-50 mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <Link
                  href="/fact-vs-myth"
                  className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-medium text-primary-800 dark:text-primary-300">Fact vs Myth</span>
                </Link>

                <Link
                  href="/fact-check"
                  className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-primary-800 dark:text-primary-300">Check a Fact</span>
                </Link>

                <Link
                  href="/blind-read"
                  className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg border border-secondary-200 dark:border-secondary-800 hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors"
                >
                  <svg className="h-6 w-6 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <span className="font-medium text-secondary-800 dark:text-secondary-300">Use Blind Read</span>
                </Link>

                <Link
                  href="/chatbot"
                  className="flex items-center space-x-3 p-3 bg-accent-50 dark:bg-accent-900/20 rounded-lg border border-accent-200 dark:border-accent-800 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors"
                >
                  <svg className="h-6 w-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="font-medium text-accent-800 dark:text-accent-300">Ask Chatbot</span>
                </Link>
              </div>
            </motion.div>
            {/* Preferences Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-6 border border-slate-100 dark:border-dark-700"
            >
              <h2 className="text-xl font-bold text-charcoal-900 dark:text-dark-50 mb-4">
                Your Preferences
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-slate-700 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <span className="text-slate-800 dark:text-gray-300">Language</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-dark-50">
                    {preferences.language}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-slate-700 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span className="text-slate-800 dark:text-gray-300">Audio</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${preferences.audioEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-slate-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {preferences.audioEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="h-5 w-5 text-slate-700 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <span className="text-slate-800 dark:text-gray-300">Blind Read</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${preferences.blindReadEnabled ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300' : 'bg-gray-100 text-slate-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                    {preferences.blindReadEnabled ? 'On' : 'Off'}
                  </span>
                </div>
              </div>

              <Link
                href="/settings"
                className="block w-full text-center mt-4 py-2 px-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Manage Settings
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
