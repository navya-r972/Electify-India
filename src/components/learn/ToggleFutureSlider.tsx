'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToggleFutureSliderProps {
  onComplete: () => void;
}

const ToggleFutureSlider: React.FC<ToggleFutureSliderProps> = ({ onComplete }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleSliderChange = (value: number) => {
    setSliderPosition(value);
    
    // Check completion when slider reaches ONOE
    if (value === 100 && !hasCompleted) {
      setHasCompleted(true);
      setTimeout(onComplete, 1000);
    }
  };

  const currentSystem = sliderPosition < 50;

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
              Toggle the Future
            </span>
          </h1>
          <p className="text-xl text-blue-200">Slide to see how ONOE transforms elections</p>
        </motion.div>

        {/* Slider Control */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="flex justify-between mb-4">
              <span className={`text-lg font-semibold transition-all duration-300 ${
                currentSystem ? 'text-blue-400 scale-110' : 'text-gray-400'
              }`}>
                Current System
              </span>
              <span className={`text-lg font-semibold transition-all duration-300 ${
                !currentSystem ? 'text-purple-400 scale-110' : 'text-gray-400'
              }`}>
                ONOE Future
              </span>
            </div>
            
            <div className="relative h-12 bg-white/10 backdrop-blur-md rounded-full p-2">
              <motion.div
                className="absolute top-2 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${sliderPosition}%` }}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <motion.div
                  animate={{ rotate: sliderPosition * 3.6 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  🚀
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {currentSystem ? (
              /* Current System View */
              <motion.div
                key="current-system"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">📅 Scattered Elections</h3>
                  <p className="text-blue-200 mb-4">Different states hold elections at various times throughout the year</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-blue-300">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      Maharashtra - Oct 2024
                    </div>
                    <div className="flex items-center text-sm text-blue-300">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      Delhi - Feb 2025
                    </div>
                    <div className="flex items-center text-sm text-blue-300">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      UP - Apr 2025
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">💰 Repeated Costs</h3>
                  <p className="text-blue-200 mb-4">Separate campaigns, security arrangements, and administrative costs</p>
                  <div className="text-3xl font-bold text-red-400">₹50,000 Cr</div>
                  <div className="text-sm text-blue-300">Total annual election expenditure</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">🚨 Policy Disruption</h3>
                  <p className="text-blue-200 mb-4">Frequent elections lead to policy paralysis and populist decisions</p>
                  <div className="space-y-2">
                    <div className="text-sm text-blue-300">• Code of Conduct restrictions</div>
                    <div className="text-sm text-blue-300">• Short-term populist measures</div>
                    <div className="text-sm text-blue-300">• Governance disruptions</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ONOE Future View */
              <motion.div
                key="onoe-future"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">🎯 Synchronized Elections</h3>
                  <p className="text-purple-200 mb-4">All states and center hold elections together once every 5 years</p>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-300">2029</div>
                    <div className="text-sm text-purple-400">Next synchronized election</div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">💸 Massive Savings</h3>
                  <p className="text-purple-200 mb-4">Shared resources, reduced campaign costs, and efficient administration</p>
                  <div className="text-3xl font-bold text-green-400">₹25,000 Cr</div>
                  <div className="text-sm text-purple-300">50% cost reduction</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">📈 Policy Continuity</h3>
                  <p className="text-purple-200 mb-4">Uninterrupted governance and long-term policy implementation</p>
                  <div className="space-y-2">
                    <div className="text-sm text-purple-300">• Stable policy environment</div>
                    <div className="text-sm text-purple-300">• Long-term development focus</div>
                    <div className="text-sm text-purple-300">• Reduced populist pressures</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Completion Message */}
        {hasCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-12 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Future Vision Unlocked!</h2>
            <p className="text-green-200">You've seen how ONOE transforms Indian elections</p>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default ToggleFutureSlider;