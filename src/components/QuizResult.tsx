'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizResultProps {
  scores: {
    Medical: number;
    "Non-Medical": number;
    Commerce: number;
    Arts: number;
    Vocational: number;
  };
  onRetake?: () => void;
  onFinish?: () => void;
}

interface QuizResultResponse {
  recommended_streams: string[];
  scores: {
    Medical: number;
    "Non-Medical": number;
    Commerce: number;
    Arts: number;
    Vocational: number;
  };
}

const QuizResult: React.FC<QuizResultProps> = ({ scores, onRetake, onFinish }) => {
  const [showScores, setShowScores] = useState(false);
  
  // Create a result directly from the scores without API call
  const result: QuizResultResponse = {
    recommended_streams: getRecommendedStreams(scores),
    scores: scores
  };
  
  // Helper function to determine recommended streams based on scores
  function getRecommendedStreams(scores: {[key: string]: number}): string[] {
    // Convert scores to array of [stream, score] pairs
    const scoreEntries = Object.entries(scores);
    
    // Sort by score in descending order
    const sortedScores = scoreEntries.sort((a, b) => b[1] - a[1]);
    
    // Get top 2 streams (or all if less than 2)
    return sortedScores
      .slice(0, 2)
      .filter(([_, score]) => score > 0) // Only include streams with scores > 0
      .map(([stream]) => stream);
  }

  const toggleScores = () => {
    setShowScores(!showScores);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 md:p-8 transition-colors duration-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Results
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Based on your answers, we recommend the following streams
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Recommended Streams
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommended_streams.map((stream, index) => (
            <motion.div
              key={stream}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg p-4 flex items-center"
            >
              <div className="bg-teal-100 dark:bg-teal-800 rounded-full p-2 mr-4">
                <svg className="h-6 w-6 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-800 dark:text-white capitalize">
                {stream}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={toggleScores}
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <span className="text-lg font-medium text-gray-800 dark:text-white">
            View Detailed Scores
          </span>
          <svg 
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform ${showScores ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showScores && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-gray-50 dark:bg-dark-700 rounded-lg p-4"
          >
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Your Scores by Stream
            </h4>
            <div className="space-y-4">
              {Object.entries(result.scores).map(([stream, score]) => (
                <div key={stream} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{stream}</span>
                  <div className="flex items-center">
                    <div className="w-48 bg-gray-200 dark:bg-dark-600 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-teal-600 dark:bg-teal-500 h-2.5 rounded-full" 
                        style={{ width: `${(score / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        {onRetake && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetake}
            className="px-6 py-3 text-base font-medium text-teal-700 bg-teal-100 rounded-lg hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:hover:bg-teal-800 shadow-sm flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake Quiz
          </motion.button>
        )}
        {onFinish && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFinish}
            className="px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 shadow-md flex items-center"
            aria-label="Go to your personalized dashboard"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            View Dashboard
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizResult;