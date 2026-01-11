'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ProgressState = {
  completedLevels: string[];
  xp: number;
  streak: number;
  lastVisitedRoute?: string;
  mythFactStats: { correct: number; total: number };
};

type ProgressContextType = ProgressState & {
  saveProgress: (partial: Partial<ProgressState>) => void;
  awardXP: (points: number) => void;
  markLevelComplete: (levelId: string) => void;
  setLastVisited: (route: string) => void;
  recordMythFactResult: (correct: boolean) => void;
};

const defaultState: ProgressState = {
  completedLevels: [],
  xp: 0,
  streak: 0,
  lastVisitedRoute: undefined,
  mythFactStats: { correct: 0, total: 0 },
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    // Fetch from API on mount
    async function fetchProgress() {
      try {
        const res = await fetch('/api/user/progress');
        if (res.ok) {
          const data = await res.json();
          setState(prev => ({
            ...prev,
            completedLevels: data.completedModules || [],
            xp: data.xp || 0,
            streak: data.streak || 0,
            // Keep other local state
          }));
        }
      } catch (error) {
        console.error('Failed to fetch progress', error);
      }
    }
    fetchProgress();
  }, []);

  // Sync to localStorage as backup
  useEffect(() => {
    try {
      localStorage.setItem('electify_progress', JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<ProgressContextType>(() => ({
    ...state,
    saveProgress: (partial) => setState((prev) => ({ ...prev, ...partial })),
    awardXP: async (points) => {
      setState((prev) => ({ ...prev, xp: prev.xp + points, streak: prev.streak + 1 }));
      try {
        await fetch('/api/user/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update_xp', xpEarned: points })
        });
      } catch (e) { console.error(e); }
    },
    markLevelComplete: async (levelId) => {
      setState((prev) => ({
        ...prev,
        completedLevels: prev.completedLevels.includes(levelId)
          ? prev.completedLevels
          : [...prev.completedLevels, levelId],
      }));
      try {
        await fetch('/api/user/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'complete_module', moduleId: levelId, xpEarned: 50 })
        });
      } catch (e) { console.error(e); }
    },
    setLastVisited: (route) => setState((prev) => ({ ...prev, lastVisitedRoute: route })),
    recordMythFactResult: (correct) => setState((prev) => ({
      ...prev,
      mythFactStats: {
        correct: prev.mythFactStats.correct + (correct ? 1 : 0),
        total: prev.mythFactStats.total + 1,
      },
      streak: correct ? prev.streak + 1 : 0,
    })),
  }), [state]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}