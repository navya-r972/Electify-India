'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    id: 1,
    statement: "You can vote without a Voter ID card if you have other valid ID.",
    isFact: true,
    explanation: "Fact! If your name is in the electoral roll, you can vote using other specified IDs like Aadhaar, Passport, Driving License, etc."
  },
  {
    id: 2,
    statement: "EVMs can be hacked via Bluetooth or Wi-Fi.",
    isFact: false,
    explanation: "Myth! EVMs are standalone machines with no wireless communication capabilities. They are not connected to any network."
  },
  {
    id: 3,
    statement: "One Nation One Election requires a constitutional amendment.",
    isFact: true,
    explanation: "Fact! Implementing simultaneous elections would require amendments to Articles 83, 172, 85, 174, 356, and the Tenth Schedule of the Constitution."
  },
  {
    id: 4,
    statement: "NRI voters can vote online from abroad.",
    isFact: false,
    explanation: "Myth! Currently, NRIs must be physically present at their polling station in India to vote. Proposals for proxy voting or ETPBS are under discussion but not fully implemented for all."
  }
];

export default function FactVsMythPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'Fact' | 'Myth' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelection = (option: 'Fact' | 'Myth') => {
    if (selectedOption) return; // Prevent multiple clicks

    const currentItem = items[currentIndex];
    const correct = (option === 'Fact' && currentItem.isFact) || (option === 'Myth' && !currentItem.isFact);
    
    setSelectedOption(option);
    setIsCorrect(correct);
  };

  const nextCard = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-charcoal-900 dark:text-white mb-4">Fact vs Myth</h1>
          <p className="text-lg text-charcoal-600 dark:text-gray-300">
            Clear up common misconceptions about the Indian election process.
          </p>
        </div>
        
        <div className="relative min-h-[500px]">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-8 flex flex-col items-center text-center h-full border border-gray-100 dark:border-dark-700"
            >
              <div className="mb-8 w-full">
                <div className="flex justify-center mb-6">
                  <span className="inline-block px-4 py-1 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 rounded-full text-sm font-semibold tracking-wide border border-primary-100 dark:border-primary-800">
                    Topic {currentIndex + 1} of {items.length}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal-900 dark:text-white mb-6 min-h-[100px] flex items-center justify-center">
                  "{currentItem.statement}"
                </h3>
              </div>

              {!selectedOption ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelection('Fact')}
                    className="p-8 rounded-xl bg-white border border-green-200 text-green-700 dark:bg-dark-800 dark:border-green-800 dark:text-green-300 font-bold text-2xl shadow-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                  >
                    FACT
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelection('Myth')}
                    className="p-8 rounded-xl bg-white border border-red-200 text-red-700 dark:bg-dark-800 dark:border-red-800 dark:text-red-300 font-bold text-2xl shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    MYTH
                  </motion.button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-3xl mt-auto"
                >
                  <div className={`p-6 rounded-xl mb-8 shadow-sm ${
                    isCorrect 
                      ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                      : 'bg-accent-50 border border-accent-200 dark:bg-accent-900/20 dark:border-accent-800'
                  }`}>
                    <div className="flex items-center justify-center mb-4">
                      {isCorrect ? (
                        <span className="text-green-700 dark:text-green-400 font-bold text-xl flex items-center">
                          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          Correct!
                        </span>
                      ) : (
                        <span className="text-accent-700 dark:text-accent-400 font-bold text-xl flex items-center">
                           <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          Not quite right.
                        </span>
                      )}
                    </div>
                    
                    <p className="text-lg text-charcoal-700 dark:text-gray-200 leading-relaxed">
                      {currentItem.explanation}
                    </p>
                  </div>

                  <button
                    onClick={nextCard}
                    className="px-8 py-3 rounded-lg font-semibold bg-primary-600 hover:bg-primary-700 text-white transition-colors shadow-md"
                  >
                    Next Topic
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
