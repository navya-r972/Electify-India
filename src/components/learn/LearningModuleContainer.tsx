'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import JourneyPath from './JourneyPath';
import Confetti from './Confetti';
import UnlockSound from './UnlockSound';
import InteractiveTimeline from './InteractiveTimeline';
import ToggleFutureSlider from './ToggleFutureSlider';
import InteractiveScale from './InteractiveScale';
import PremiumDashboard from './PremiumDashboard';
import RapidFireQuiz from './RapidFireQuiz';

interface Level {
  id: string;
  title: string;
  description: string;
  insight: string;
  component: React.ComponentType<any>;
  icon: string;
  color: string;
}

const LearningModuleContainer: React.FC = () => {
  const { completedLevels, awardXP } = useProgress();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playUnlockSound, setPlayUnlockSound] = useState(false);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);

  // Initialize unlocked levels from localStorage or default to level 1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('unlockedLevels');
      if (saved) {
        setUnlockedLevels(JSON.parse(saved));
      } else {
        // Default: only level 1 is unlocked
        setUnlockedLevels([1]);
      }
    }
  }, []);

  // Save unlocked levels to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && unlockedLevels.length > 0) {
      localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
    }
  }, [unlockedLevels]);

  const levels: Level[] = [
    {
      id: "level-1",
      title: "Election Basics",
      description: "Understanding the foundation of Indian democracy",
      insight: "Every vote shapes the future of our democracy",
      component: InteractiveTimeline,
      icon: "🗳️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "level-2",
      title: "How Elections Work",
      description: "The step-by-step process of casting your vote",
      insight: "Your vote is your voice in the world's largest democracy",
      component: InteractiveTimeline,
      icon: "⚙️",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "level-3",
      title: "ONOE Explained",
      description: "Understanding One Nation, One Election",
      insight: "Synchronized elections could transform Indian democracy",
      component: ToggleFutureSlider,
      icon: "🔄",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "level-4",
      title: "Pros & Cons",
      description: "Weighing the benefits and concerns of ONOE",
      insight: "Every major reform has trade-offs to consider",
      component: InteractiveScale,
      icon: "⚖️",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "level-5",
      title: "Reality Check",
      description: "Real-world implications and challenges",
      insight: "Understanding the practical aspects of implementation",
      component: InteractiveTimeline,
      icon: "🔍",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: "level-6",
      title: "Simulation Mode",
      description: "Experience the financial impact of ONOE",
      insight: "See how much money could be saved with synchronized elections",
      component: PremiumDashboard,
      icon: "💰",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "level-7",
      title: "Knowledge Check",
      description: "Test your understanding with a rapid-fire quiz",
      insight: "Knowledge is power - prove your expertise",
      component: RapidFireQuiz,
      icon: "🧠",
      color: "from-red-500 to-pink-500"
    }
  ];

  const completeLevel = (levelId: number) => {
    setUnlockedLevels(prev => {
      const nextLevel = levelId + 1;
      if (!prev.includes(nextLevel) && nextLevel <= 7) {
        return [...prev, nextLevel];
      }
      return prev;
    });
  };

  const handleLevelComplete = (levelId: string) => {
    const levelNumber = parseInt(levelId.split('-')[1]);
    awardXP(50);
    setShowConfetti(true);
    setPlayUnlockSound(true);
    completeLevel(levelNumber);
    setTimeout(() => {
      setShowConfetti(false);
      setPlayUnlockSound(false);
    }, 3000);
  };

  const handleLevelSelect = (levelId: string) => {
    const levelNumber = parseInt(levelId.split('-')[1]);
    if (unlockedLevels.includes(levelNumber)) {
      setSelectedLevel(levelId);
    }
  };

  const handleBackToPath = () => {
    setSelectedLevel(null);
  };

  const currentLevelIndex = levels.findIndex(level => level.id === selectedLevel);
  const progressPercentage = (completedLevels.length / levels.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>
      
      {/* Unlock Sound */}
      {playUnlockSound && <UnlockSound />}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Voter Education Journey
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-6">Master the essentials of Indian democracy through interactive learning</p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-full h-3 mb-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-blue-200 text-sm">{completedLevels.length} of {levels.length} levels completed</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedLevel ? (
            /* Journey Path View */
            <motion.div
              key="journey-path"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <JourneyPath 
                levels={levels}
                completedLevels={completedLevels}
                currentLevel={selectedLevel}
                unlockedLevels={unlockedLevels}
                onLevelSelect={handleLevelSelect}
              />
            </motion.div>
          ) : (
            /* Level Content View */
            <motion.div
              key={`level-${selectedLevel}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Back Button */}
              <motion.button
                onClick={handleBackToPath}
                className="absolute top-0 left-0 z-20 flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Journey</span>
              </motion.button>

              {/* Level Content */}
              <div className="mt-16">
                {(() => {
                  const LevelComponent = levels.find(l => l.id === selectedLevel)?.component;
                  const levelData = levels.find(l => l.id === selectedLevel);
                  
                  // Event data for InteractiveTimeline components
                  const getTimelineEvents = (levelId: string) => {
                    switch(levelId) {
                      case 'level-1':
                        return [
                          { id: '1', title: 'Voter Registration', description: 'Register to vote in your constituency', icon: '📝', position: 0 },
                          { id: '2', title: 'Voter ID Card', description: 'Receive your voter identification card', icon: '🆔', position: 1 },
                          { id: '3', title: 'Election Announcement', description: 'ECI announces election dates', icon: '📢', position: 2 },
                          { id: '4', title: 'Campaign Period', description: 'Candidates campaign for votes', icon: '🗣️', position: 3 },
                          { id: '5', title: 'Voting Day', description: 'Cast your vote at the polling booth', icon: '🗳️', position: 4 }
                        ];
                      case 'level-2':
                        return [
                          { id: '1', title: 'Enter Polling Booth', description: 'Show your voter ID at the entrance', icon: '🚪', position: 0 },
                          { id: '2', title: 'Identity Verification', description: 'Officer verifies your identity', icon: '🔍', position: 1 },
                          { id: '3', title: 'Get Ballot Paper', description: 'Receive your ballot paper', icon: '📄', position: 2 },
                          { id: '4', title: 'Cast Your Vote', description: 'Press the button for your chosen candidate', icon: '✅', position: 3 },
                          { id: '5', title: 'Ink Mark Applied', description: 'Indelible ink mark on your finger', icon: '🩸', position: 4 }
                        ];
                      case 'level-5':
                        return [
                          { id: '1', title: 'Logistical Challenges', description: 'Managing simultaneous elections across India', icon: '🚛', position: 0 },
                          { id: '2', title: 'Security Deployment', description: 'Coordinating security forces nationwide', icon: '🛡️', position: 1 },
                          { id: '3', title: 'Resource Management', description: 'Deploying EVMs and polling staff', icon: '⚙️', position: 2 },
                          { id: '4', title: 'Financial Impact', description: 'Cost savings from synchronized elections', icon: '💰', position: 3 },
                          { id: '5', title: 'Implementation Timeline', description: 'Phased rollout and constitutional amendments', icon: '⏰', position: 4 }
                        ];
                      default:
                        return [];
                    }
                  };
                  
                  return LevelComponent ? (
                    <LevelComponent 
                      events={getTimelineEvents(selectedLevel)}
                      onComplete={() => handleLevelComplete(selectedLevel)}
                    />
                  ) : null;
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default LearningModuleContainer;