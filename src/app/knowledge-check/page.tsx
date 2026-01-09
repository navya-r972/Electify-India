'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Level = 'beginner' | 'intermediate' | 'advanced';

const questions = {
  beginner: [
    {
      id: 1,
      question: "What is the minimum age to vote in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      correctAnswer: 1,
      explanation: "The voting age in India is 18 years. It was lowered from 21 to 18 by the 61st Amendment Act, 1988."
    },
    {
      id: 2,
      question: "What does ONOE stand for?",
      options: ["One Nation One Economy", "One Nation One Election", "One Nation One Education", "One Nation One Environment"],
      correctAnswer: 1,
      explanation: "ONOE stands for One Nation One Election, referring to the proposal to hold simultaneous elections."
    },
    {
      id: 3,
      question: "Who conducts elections in India?",
      options: ["The Parliament", "The Prime Minister", "The Election Commission of India", "The Supreme Court"],
      correctAnswer: 2,
      explanation: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
    }
  ],
  intermediate: [
    {
      id: 1,
      question: "During which period did India have simultaneous elections?",
      options: ["1947-1960", "1951-1967", "1970-1980", "Never"],
      correctAnswer: 1,
      explanation: "India had simultaneous elections from 1951 to 1967. The cycle broke due to premature dissolution of some state assemblies."
    },
    {
      id: 2,
      question: "What is the primary argument FOR ONOE?",
      options: ["Reduces election costs", "Increases number of politicians", "Reduces voting time", "Eliminates opposition"],
      correctAnswer: 0,
      explanation: "Proponents argue that ONOE could reduce election costs significantly and allow for more continuous governance."
    },
    {
      id: 3,
      question: "What happens if a state assembly is dissolved early under ONOE?",
      options: ["Re-election for full 5 years", "President's Rule until next cycle", "Re-election for remaining term", "No election held"],
      correctAnswer: 2,
      explanation: "Most proposals suggest that if an assembly is dissolved early, the new government would serve only the remainder of the term to sync with the Lok Sabha cycle."
    }
  ],
  advanced: [
    {
      id: 1,
      question: "Which Articles of the Constitution deal with the duration of Houses?",
      options: ["Articles 83 and 172", "Articles 100 and 101", "Articles 356 and 365", "Articles 14 and 19"],
      correctAnswer: 0,
      explanation: "Articles 83 and 172 specify the five-year term for Lok Sabha and State Legislative Assemblies respectively."
    },
    {
      id: 2,
      question: "Which committee recently submitted a report on ONOE?",
      options: ["Verma Committee", "Ram Nath Kovind Committee", "Sarkaria Commission", "Punchhi Commission"],
      correctAnswer: 1,
      explanation: "A high-level committee led by former President Ram Nath Kovind submitted a report on One Nation One Election."
    },
    {
      id: 3,
      question: "Which schedule of the Constitution might need amendment for ONOE?",
      options: ["First Schedule", "Seventh Schedule", "Tenth Schedule", "All of the above"],
      correctAnswer: 3,
      explanation: "Implementing ONOE comprehensively might require amendments touching upon various schedules including the Tenth Schedule (Anti-Defection Law) and ratification by states."
    }
  ]
};

export default function QuizPage() {
  const [level, setLevel] = useState<Level | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const startQuiz = (selectedLevel: Level) => {
    setLevel(selectedLevel);
    setCurrentQuestion(0);
    setScore(0);
    setIsCompleted(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowExplanation(true);
    if (selectedAnswer === questions[level!][currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions[level!].length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const resetQuiz = () => {
    setLevel(null);
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-charcoal-900 dark:text-white">Voter Awareness Quiz</h1>
          <p className="text-center text-charcoal-600 dark:text-gray-300 mb-12">Select a difficulty level to test your knowledge.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((l) => (
              <motion.button
                key={l}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => startQuiz(l)}
                className={`p-8 rounded-xl text-left border-2 transition-colors ${
                  l === 'beginner' ? 'bg-primary-50 border-primary-200 hover:bg-primary-100 dark:bg-primary-900/20 dark:border-primary-800' :
                  l === 'intermediate' ? 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100 dark:bg-secondary-900/20 dark:border-secondary-800' :
                  'bg-accent-50 border-accent-200 hover:bg-accent-100 dark:bg-accent-900/20 dark:border-accent-800'
                }`}
              >
                <h3 className="text-2xl font-bold capitalize mb-2 text-charcoal-900 dark:text-white">{l}</h3>
                <p className="text-charcoal-600 dark:text-gray-300 text-sm">
                  {l === 'beginner' ? 'Basics of voting and ONOE concepts.' :
                   l === 'intermediate' ? 'History and arguments surrounding ONOE.' :
                   'Constitutional and legal intricacies.'}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[level][currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {!isCompleted ? (
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-8 border border-gray-200 dark:border-dark-700">
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-charcoal-500 dark:text-gray-400">
                {level} Level
              </span>
              <span className="text-sm font-medium text-charcoal-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {questions[level].length}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-charcoal-900 dark:text-white">{currentQ.question}</h2>

            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showExplanation
                      ? index === currentQ.correctAnswer
                        ? 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-200'
                        : index === selectedAnswer
                        ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200'
                        : 'bg-gray-50 border-gray-200 text-charcoal-500 dark:bg-dark-700 dark:border-dark-600'
                      : selectedAnswer === index
                      ? 'bg-primary-50 border-primary-500 text-primary-800 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-dark-800 dark:border-dark-600 dark:hover:bg-dark-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-800 dark:text-primary-200"
              >
                <p className="font-semibold">Explanation:</p>
                <p>{currentQ.explanation}</p>
              </motion.div>
            )}

            <div className="flex justify-end">
              {!showExplanation ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                    selectedAnswer !== null ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-3 rounded-lg font-semibold bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                >
                  {currentQuestion < questions[level].length - 1 ? 'Next Question' : 'View Results'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-card p-8 border border-slate-100 dark:border-dark-700 text-center">
            <h2 className="text-3xl font-bold mb-4 text-charcoal-900 dark:text-white">Quiz Completed!</h2>
            <p className="text-xl mb-8 text-charcoal-600 dark:text-gray-300">
              You scored <span className="font-bold text-primary-600 dark:text-primary-400">{score}</span> out of {questions[level].length}
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => startQuiz(level)}
                className="px-6 py-3 rounded-lg font-semibold bg-primary-600 hover:bg-primary-700 text-white transition-colors shadow-sm"
              >
                Retry Level
              </button>
              <button
                onClick={resetQuiz}
                className="px-6 py-3 rounded-lg font-semibold bg-slate-100 hover:bg-slate-200 text-charcoal-800 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white transition-colors shadow-sm"
              >
                Choose Another Level
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
