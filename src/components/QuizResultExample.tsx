'use client';

import { useState } from 'react';
import QuizResult from './QuizResult';

const QuizResultExample = () => {
  const [showResults, setShowResults] = useState(false);
  const [quizScores, setQuizScores] = useState({
    Medical: 10,
    "Non-Medical": 9,
    Commerce: 7,
    Arts: 8,
    Vocational: 12
  });

  const handleSubmitQuiz = () => {
    // In a real application, you would calculate these scores based on user answers
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!showResults ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quiz Example
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            This is a simple example to demonstrate the QuizResult component.
            In a real application, you would collect user answers and calculate scores.
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Sample Quiz Scores (for demonstration):
            </h3>
            <div className="space-y-4">
              {Object.entries(quizScores).map(([stream, score]) => (
                <div key={stream} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 w-32">{stream}</span>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      value={score}
                      onChange={(e) => setQuizScores({
                        ...quizScores,
                        [stream]: parseInt(e.target.value)
                      })}
                      className="w-48 mr-4"
                    />
                    <span className="text-gray-700 dark:text-gray-300 font-medium w-8 text-right">
                      {score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 shadow-md flex items-center"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <QuizResult 
          scores={quizScores} 
          onRetake={handleRetakeQuiz} 
        />
      )}
    </div>
  );
};

export default QuizResultExample;