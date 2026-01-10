"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

function LevelSelect() {
  const { lastVisitedRoute, completedLevels, xp } = useProgress();
  const levels = [
    { id: "level-1", title: "Election Basics" },
    { id: "level-2", title: "How Elections Work" },
    { id: "level-3", title: "ONOE Explained" },
    { id: "level-4", title: "Pros & Cons" },
    { id: "level-5", title: "Reality Check" },
    { id: "level-6", title: "Simulation Mode" },
    { id: "level-7", title: "Knowledge Check" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-50">Voter Education Levels</h1>
            <div className="text-sm text-gray-600 dark:text-gray-300">XP {xp} • Completed {completedLevels.length}/7</div>
          </div>
          {lastVisitedRoute && (
            <Link href={lastVisitedRoute} className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors">Resume</Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((lvl) => {
            const done = completedLevels.includes(lvl.id);
            return (
              <motion.div key={lvl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-50">{lvl.title}</h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{lvl.id.replace('-', ' ').toUpperCase()}</div>
                  </div>
                  {done ? (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs border border-green-200 dark:border-green-800 font-medium">Completed</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs border border-gray-200 dark:border-dark-700 font-medium">Pending</span>
                  )}
                </div>
                <div className="mt-4">
                  <Link href={`/learn/${lvl.id}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors text-sm">Start →</Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return <LevelSelect />;
}