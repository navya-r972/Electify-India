'use client';

import Link from 'next/link';

export default function LevelNav({ nextHref, prevHref }: { nextHref?: string; prevHref?: string }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <div>
        {prevHref && (
          <Link href={prevHref} className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
            ← Previous
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Link href="/learn" className="px-4 py-2 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-dark-700 transition-all shadow-sm">
          Level Select
        </Link>
        {nextHref && (
          <Link href={nextHref} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-all shadow-md">
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}