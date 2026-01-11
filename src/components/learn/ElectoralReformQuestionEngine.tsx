'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ElectoralReformQuestionEngineProps {
  moduleId: string;
  questions: Question[];
  onComplete: () => void;
  onAnswerSelect: (questionId: string, selectedAnswer: number, isCorrect: boolean) => void;
}

const ElectoralReformQuestionEngine: React.FC<ElectoralReformQuestionEngineProps> = ({
  moduleId,
  questions,
  onComplete,
  onAnswerSelect
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;
  const isCurrentCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnsweredCurrent) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
    setShowExplanation(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    onAnswerSelect(currentQuestion.id, answerIndex, isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const progressPercentage = ((currentQuestionIndex + (hasAnsweredCurrent ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Module Assessment</h2>
          <span className="text-sm text-slate-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <motion.div
            className="bg-blue-700 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          {currentQuestion.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion.id] === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showResult = hasAnsweredCurrent;

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={hasAnsweredCurrent}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : isSelected
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                    : isSelected
                    ? 'border-blue-700 bg-blue-50 text-blue-900'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                } ${!hasAnsweredCurrent ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                whileHover={!hasAnsweredCurrent ? { scale: 1.01 } : {}}
                whileTap={!hasAnsweredCurrent ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <span className="ml-2 text-green-600">✓</span>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <span className="ml-2 text-red-600">✗</span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation[currentQuestion.id] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <h4 className="font-semibold text-blue-900 mb-2">Constitutional Fact:</h4>
              <p className="text-blue-800">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {hasAnsweredCurrent && (
              <span className={isCurrentCorrect ? 'text-green-600' : 'text-red-600'}>
                {isCurrentCorrect ? '✓ Correct' : '✗ Incorrect'}
              </span>
            )}
          </div>
          
          {hasAnsweredCurrent && (
            <motion.button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Module'}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Completion Banner */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center"
          >
            <h4 className="text-lg font-semibold text-green-900 mb-2">🎉 Module Completed!</h4>
            <p className="text-green-800">You've successfully completed all questions in this module.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectoralReformQuestionEngine;