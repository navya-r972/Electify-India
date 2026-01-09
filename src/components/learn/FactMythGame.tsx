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

export default function FactMythGame() {
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
    <div className="w-full max-w-2xl mx-auto p-4 my-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-charcoal-900 dark:text-white">Fact vs Myth Challenge</h2>
      
      <div className="relative min-h-[400px]">
        <AnimatePresence mode='wait'>
            <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-card dark:shadow-dark-card overflow-hidden border border-slate-200 dark:border-dark-700 p-8 flex flex-col items-center text-center h-full"
            >
                <div className="mb-8 w-full">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full text-sm font-semibold mb-4">
                        Statement {currentIndex + 1} / {items.length}
                    </span>
                    <h3 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-2 min-h-[80px] flex items-center justify-center">
                        "{currentItem.statement}"
                    </h3>
                </div>

                {!selectedOption ? (
                    <div className="grid grid-cols-2 gap-6 w-full mt-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelection('Fact')}
                            className="p-6 rounded-xl bg-green-100 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-bold text-xl hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors"
                        >
                            FACT
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelection('Myth')}
                            className="p-6 rounded-xl bg-red-100 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-bold text-xl hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                            MYTH
                        </motion.button>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mt-auto"
                    >
                        <div className={`p-4 rounded-lg mb-6 border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'}`}>
                            <div className="text-xl font-bold mb-2">
                                {isCorrect ? 'Correct!' : 'Incorrect'}
                            </div>
                            <p className="text-lg">
                                {currentItem.explanation}
                            </p>
                        </div>
                        <button
                            onClick={nextCard}
                            className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-md"
                        >
                            Next Statement
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
