"use client";

import dynamic from 'next/dynamic';

const LearningModuleContainer = dynamic(
  () => import('@/components/learn/LearningModuleContainer'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Learning Path...</p>
        </div>
      </div>
    )
  }
);

export default function LearnPage() {
  return <LearningModuleContainer />;
}