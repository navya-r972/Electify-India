'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Level {
  id: string;
  title: string;
  description: string;
  insight: string;
  icon: string;
  color: string;
}

interface JourneyPathProps {
  levels: Level[];
  completedLevels: string[];
  currentLevel: string | null;
  unlockedLevels: number[];
  onLevelSelect: (levelId: string) => void;
}

const JourneyPath: React.FC<JourneyPathProps> = ({ levels, completedLevels, currentLevel, unlockedLevels, onLevelSelect }) => {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const getLevelStatus = (levelId: string) => {
    const levelNumber = parseInt(levelId.split('-')[1]);
    if (completedLevels.includes(levelId)) return 'completed';
    if (currentLevel === levelId) return 'current';
    if (unlockedLevels.includes(levelNumber)) return 'unlocked';
    return 'locked';
  };

  const getLevelIcon = (level: Level, status: string) => {
    const baseClasses = "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-green-500/50`;
      case 'current':
        return `${baseClasses} bg-gradient-to-br from-blue-400 to-purple-600 text-white shadow-xl shadow-blue-500/50 animate-pulse`;
      case 'unlocked':
        return `${baseClasses} bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/50`;
      default:
        return `${baseClasses} bg-white/10 backdrop-blur-md text-gray-400 border border-white/20 grayscale pointer-events-none`;
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Journey Path Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent transform -translate-x-1/2" />
      
      {/* Glowing Path Effect */}
      <motion.div 
        className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 transform -translate-x-1/2 shadow-lg shadow-blue-400/50"
        initial={{ height: 0 }}
        animate={{ height: `${(completedLevels.length / levels.length) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <div className="space-y-24">
        {levels.map((level, index) => {
          const status = getLevelStatus(level.id);
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Level Card */}
              <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 ${
                    status === 'locked' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer hover:bg-white/20 hover:scale-105 hover:shadow-xl'
                  } ${
                    hoveredLevel === level.id && status !== 'locked' ? 'bg-white/20 scale-105 shadow-xl' : ''
                  }`}
                  onHoverStart={() => status !== 'locked' && setHoveredLevel(level.id)}
                  onHoverEnd={() => setHoveredLevel(null)}
                  onClick={() => status !== 'locked' && onLevelSelect(level.id)}
                  whileHover={status !== 'locked' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
                >
                  {/* Glassmorphism Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">{level.title}</h3>
                      {status === 'completed' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    
                    <p className="text-blue-200 text-sm mb-4">{level.insight}</p>
                    
                    {status === 'locked' && (
                      <div className="flex items-center text-gray-400 text-xs">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Complete previous levels to unlock
                      </div>
                    )}
                    
                    {status !== 'locked' && (
                      <motion.button
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium text-sm hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {status === 'completed' ? 'Review' : 'Start Learning'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Level Icon */}
              <div className="relative z-10">
                <motion.div
                  className={getLevelIcon(level, status)}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                >
                  <span className="text-2xl">{level.icon}</span>
                </motion.div>
                
                {/* Progress Ring for Current Level */}
                {status === 'current' && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-400"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 270 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyPath;