'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BudgetData {
  state: string;
  currentCost: number;
  onoeCost: number;
  voters: number;
  costPerVoterCurrent: number;
  costPerVoterONOE: number;
  savings: number;
}

interface PremiumDashboardProps {
  onComplete: () => void;
}

const PremiumDashboard: React.FC<PremiumDashboardProps> = ({ onComplete }) => {
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMoneyRain, setShowMoneyRain] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const states: BudgetData[] = [
    {
      state: 'Maharashtra',
      currentCost: 8500,
      onoeCost: 4200,
      voters: 90000000,
      costPerVoterCurrent: 94.44,
      costPerVoterONOE: 46.67,
      savings: 4300
    },
    {
      state: 'Uttar Pradesh',
      currentCost: 12000,
      onoeCost: 5800,
      voters: 150000000,
      costPerVoterCurrent: 80.00,
      costPerVoterONOE: 38.67,
      savings: 6200
    },
    {
      state: 'Tamil Nadu',
      currentCost: 4200,
      onoeCost: 2100,
      voters: 60000000,
      costPerVoterCurrent: 70.00,
      costPerVoterONOE: 35.00,
      savings: 2100
    },
    {
      state: 'West Bengal',
      currentCost: 5100,
      onoeCost: 2500,
      voters: 72000000,
      costPerVoterCurrent: 70.83,
      costPerVoterONOE: 34.72,
      savings: 2600
    }
  ];

  const currentData = states.find(s => s.state === selectedState) || states[0];

  const handleStateChange = (state: string) => {
    setIsAnimating(true);
    setSelectedState(state);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const triggerMoneyRain = () => {
    setShowMoneyRain(true);
    setTimeout(() => setShowMoneyRain(false), 3000);
  };

  useEffect(() => {
    if (!hasCompleted && selectedState === 'Uttar Pradesh') {
      setHasCompleted(true);
      setTimeout(onComplete, 2000);
    }
  }, [selectedState, onComplete, hasCompleted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Money Rain Effect */}
      <AnimatePresence>
        {showMoneyRain && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0
                }}
                animate={{ 
                  y: window.innerHeight + 50,
                  rotate: 360
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.1,
                  ease: "linear"
                }}
              >
                💰
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Budget Simulator
            </span>
          </h1>
          <p className="text-xl text-blue-200">See the financial impact of ONOE in real-time</p>
        </motion.div>

        {/* State Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            {states.map((state) => (
              <button
                key={state.state}
                onClick={() => handleStateChange(state.state)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedState === state.state
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {state.state}
              </button>
            ))}
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current System Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-400">Current System</h3>
              <div className="text-2xl">📊</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  ₹{currentData.currentCost.toLocaleString()} Cr
                </div>
                <div className="text-sm text-blue-200">Total Election Cost</div>
              </div>
              
              <div className="bg-blue-500/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-300 mb-1">
                  ₹{currentData.costPerVoterCurrent.toFixed(2)}
                </div>
                <div className="text-xs text-blue-200">Cost per Voter</div>
              </div>
            </div>
          </motion.div>

          {/* ONOE System Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-purple-400">ONOE System</h3>
              <div className="text-2xl">🚀</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-white mb-1">
                  ₹{currentData.onoeCost.toLocaleString()} Cr
                </div>
                <div className="text-sm text-purple-200">Projected Cost</div>
              </div>
              
              <div className="bg-purple-500/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-300 mb-1">
                  ₹{currentData.costPerVoterONOE.toFixed(2)}
                </div>
                <div className="text-xs text-purple-200">Cost per Voter</div>
              </div>
            </div>
          </motion.div>

          {/* Savings Card */}
          <motion.div
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30"
            animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-400">Total Savings</h3>
              <button
                onClick={triggerMoneyRain}
                className="text-2xl hover:scale-110 transition-transform cursor-pointer"
              >
                💰
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <motion.div 
                  className="text-4xl font-bold text-white mb-1"
                  key={selectedState}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  ₹{currentData.savings.toLocaleString()} Cr
                </motion.div>
                <div className="text-sm text-green-200">Money Saved</div>
              </div>
              
              <div className="bg-green-500/30 rounded-lg p-3">
                <motion.div 
                  className="text-2xl font-bold text-green-300 mb-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {((currentData.savings / currentData.currentCost) * 100).toFixed(1)}%
                </motion.div>
                <div className="text-xs text-green-200">Cost Reduction</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Budget Ticker */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Live Budget Impact</h3>
          
          <div className="relative h-20 bg-black/30 rounded-lg overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-red-500/20"
              animate={{ x: [-100, 100] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl font-mono font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ₹{(currentData.savings * 10000000).toLocaleString()}
              </motion.div>
            </div>
            
            <div className="absolute bottom-2 left-4 text-xs text-green-400">
              SAVINGS PER MINUTE
            </div>
          </div>
        </div>

        {/* Voter Impact Visualization */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Voter Impact: {selectedState}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-4">Current System</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-200">Cost per Voter:</span>
                  <span className="text-white font-mono">₹{currentData.costPerVoterCurrent.toFixed(2)}</span>
                </div>
                <div className="w-full bg-blue-500/20 rounded-full h-4">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-4">ONOE System</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Cost per Voter:</span>
                  <span className="text-white font-mono">₹{currentData.costPerVoterONOE.toFixed(2)}</span>
                </div>
                <div className="w-full bg-purple-500/20 rounded-full h-4">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentData.costPerVoterONOE / currentData.costPerVoterCurrent) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              You save ₹{(currentData.costPerVoterCurrent - currentData.costPerVoterONOE).toFixed(2)} per voter!
            </div>
            <div className="text-sm text-green-200">
              With {currentData.voters.toLocaleString()} voters in {selectedState}, that's massive savings!
            </div>
          </div>
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {hasCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-8 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Simulation Complete!</h2>
              <p className="text-green-200">You've mastered the financial impact of ONOE</p>
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

export default PremiumDashboard;