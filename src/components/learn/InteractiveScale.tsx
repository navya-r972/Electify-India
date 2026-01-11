'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScaleItem {
  id: string;
  title: string;
  description: string;
  weight: number;
  type: 'benefit' | 'concern';
  icon: string;
  color: string;
}

interface InteractiveScaleProps {
  onComplete: () => void;
}

const InteractiveScale: React.FC<InteractiveScaleProps> = ({ onComplete }) => {
  const [availableItems, setAvailableItems] = useState<ScaleItem[]>([
    {
      id: '1',
      title: 'Cost Savings',
      description: '₹25,000 Cr saved through synchronized elections',
      weight: 3,
      type: 'benefit',
      icon: '💰',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '2',
      title: 'Federalism Concerns',
      description: 'States may lose flexibility in election timing',
      weight: -2,
      type: 'concern',
      icon: '🏛️',
      color: 'from-red-500 to-rose-600'
    },
    {
      id: '3',
      title: 'Policy Continuity',
      description: 'Uninterrupted governance for 5 years',
      weight: 2,
      type: 'benefit',
      icon: '📈',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '4',
      title: 'Implementation Challenges',
      description: 'Complex logistics and constitutional amendments',
      weight: -3,
      type: 'concern',
      icon: '⚙️',
      color: 'from-red-500 to-rose-600'
    },
    {
      id: '5',
      title: 'Voter Convenience',
      description: 'One election instead of multiple',
      weight: 1,
      type: 'benefit',
      icon: '🗳️',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '6',
      title: 'Regional Issues',
      description: 'Local concerns may get overshadowed',
      weight: -1,
      type: 'concern',
      icon: '🗺️',
      color: 'from-red-500 to-rose-600'
    }
  ]);

  const [scaleItems, setScaleItems] = useState<ScaleItem[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const total = scaleItems.reduce((sum, item) => sum + item.weight, 0);
    setTotalWeight(total);
    
    if (scaleItems.length === 6 && !isCompleted) {
      setIsCompleted(true);
      setTimeout(onComplete, 2000);
    }
  }, [scaleItems, onComplete, isCompleted]);

  const addToScale = (item: ScaleItem) => {
    setScaleItems([...scaleItems, item]);
    setAvailableItems(availableItems.filter(i => i.id !== item.id));
  };

  const removeFromScale = (item: ScaleItem) => {
    setAvailableItems([...availableItems, item]);
    setScaleItems(scaleItems.filter(i => i.id !== item.id));
  };

  const getScaleColor = () => {
    if (totalWeight > 2) return 'from-green-500 to-emerald-600';
    if (totalWeight > 0) return 'from-yellow-500 to-amber-600';
    if (totalWeight > -2) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-rose-600';
  };

  const getScaleMessage = () => {
    if (totalWeight > 2) return 'Strongly Positive - Benefits outweigh concerns!';
    if (totalWeight > 0) return 'Slightly Positive - More benefits than concerns';
    if (totalWeight > -2) return 'Slightly Negative - More concerns than benefits';
    return 'Strongly Negative - Significant concerns identified';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Balance the Scale
            </span>
          </h1>
          <p className="text-xl text-blue-200">Drag items to weigh ONOE benefits against concerns</p>
        </motion.div>

        {/* Available Items */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Available Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableItems.map((item) => (
              <motion.div
                key={item.id}
                className={`bg-gradient-to-r ${item.color} rounded-xl p-4 cursor-pointer hover:scale-105 transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToScale(item)}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/80 text-sm">{item.description}</p>
                <div className="mt-2 text-xs text-white/60">
                  Weight: {item.weight > 0 ? '+' : ''}{item.weight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Scale */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Scale Beam */}
            <motion.div
              className="h-2 bg-gradient-to-r from-gray-600 to-gray-600 rounded-full mx-8"
              animate={{ 
                rotate: totalWeight * 2,
                background: totalWeight >= 0 
                  ? 'linear-gradient(to right, #10B981, #059669)' 
                  : 'linear-gradient(to right, #EF4444, #DC2626)'
              }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ transformOrigin: 'center' }}
            />
            
            {/* Scale Fulcrum */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full shadow-lg" />
            </div>

            {/* Left Scale Pan */}
            <motion.div
              className="absolute left-0 top-8"
              animate={{ y: totalWeight * 3 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 flex flex-col items-center justify-center">
                <div className="text-white font-bold mb-2">Benefits</div>
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-xs text-white/60">
                  {scaleItems.filter(item => item.type === 'benefit').length} items
                </div>
              </div>
            </motion.div>

            {/* Right Scale Pan */}
            <motion.div
              className="absolute right-0 top-8"
              animate={{ y: -totalWeight * 3 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 flex flex-col items-center justify-center">
                <div className="text-white font-bold mb-2">Concerns</div>
                <div className="text-2xl mb-2">⚖️</div>
                <div className="text-xs text-white/60">
                  {scaleItems.filter(item => item.type === 'concern').length} items
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scale Items Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits Side */}
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">Benefits on Scale</h3>
              <div className="space-y-2">
                {scaleItems.filter(item => item.type === 'benefit').map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-gradient-to-r ${item.color} rounded-lg p-3 cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => removeFromScale(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{item.icon}</span>
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                      <span className="text-white/80 text-sm">+{item.weight}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Concerns Side */}
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4 text-center">Concerns on Scale</h3>
              <div className="space-y-2">
                {scaleItems.filter(item => item.type === 'concern').map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-gradient-to-r ${item.color} rounded-lg p-3 cursor-pointer`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => removeFromScale(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{item.icon}</span>
                        <span className="text-white font-medium">{item.title}</span>
                      </div>
                      <span className="text-white/80 text-sm">{item.weight}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {scaleItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className={`inline-block bg-gradient-to-r ${getScaleColor()} rounded-2xl p-6 border border-white/20`}>
                <h3 className="text-2xl font-bold text-white mb-2">Scale Result</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {totalWeight > 0 ? '+' : ''}{totalWeight}
                </div>
                <p className="text-white/80">{getScaleMessage()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Message */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Analysis Complete!</h2>
              <p className="text-green-200">You've weighed all the pros and cons of ONOE</p>
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

export default InteractiveScale;