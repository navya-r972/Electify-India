'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

interface RapidFireQuizProps {
  onComplete: () => void;
}

const RapidFireQuiz: React.FC<RapidFireQuizProps> = ({ onComplete }) => {
  const [questions] = useState<Question[]>([
    {
      id: '1',
      question: 'What does ONOE stand for?',
      options: ['One Nation, One Election', 'One Nation, One Economy', 'One Nation, One Education', 'One Nation, One Energy'],
      correct: 0,
      category: 'Basics'
    },
    {
      id: '2',
      question: 'How much money can ONOE potentially save annually?',
      options: ['₹5,000 Cr', '₹15,000 Cr', '₹25,000 Cr', '₹50,000 Cr'],
      correct: 2,
      category: 'Finance'
    },
    {
      id: '3',
      question: 'Which constitutional amendment is needed for ONOE?',
      options: ['Article 324', 'Article 356', 'Article 368', 'Article 370'],
      correct: 2,
      category: 'Constitution'
    },
    {
      id: '4',
      question: 'What is the main concern against ONOE?',
      options: ['Cost increase', 'Federalism issues', 'Voter fatigue', 'Security concerns'],
      correct: 1,
      category: 'Concerns'
    },
    {
      id: '5',
      question: 'How often would elections be held under ONOE?',
      options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'],
      correct: 3,
      category: 'Process'
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizState, setQuizState] = useState<'playing' | 'completed' | 'badge'>('playing');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userName, setUserName] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (quizState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizState === 'playing') {
      endQuiz();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, quizState]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const endQuiz = () => {
    setQuizState('completed');
    if (timerRef.current) clearTimeout(timerRef.current);
    
    if (score >= 3) {
      setTimeout(() => {
        setQuizState('badge');
        setUserName(prompt('Congratulations! Enter your name for your digital badge:') || 'Voter Champion');
      }, 2000);
    } else {
      setTimeout(onComplete, 2000);
    }
  };

  const generateBadge = () => {
    const badgeData = {
      name: userName,
      score: score,
      total: questions.length,
      date: new Date().toLocaleDateString(),
      qrData: 'https://electioncommission.gov.in/onoe-report'
    };

    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 border-4 border-yellow-300 shadow-2xl max-w-md mx-auto"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-white mb-2">Digital Voter Badge</h2>
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-white">{badgeData.name}</h3>
            <p className="text-white/80">ONOE Knowledge Champion</p>
            <div className="text-2xl font-bold text-white mt-2">
              {badgeData.score}/{badgeData.total}
            </div>
            <p className="text-white/60 text-sm">{badgeData.date}</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <QRCodeSVG value={badgeData.qrData} size={128} level="H" />
            <p className="text-xs text-gray-600 mt-2">Scan for ONOE Report</p>
          </div>
          
          <button
            onClick={onComplete}
            className="bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Complete Journey
          </button>
        </div>
      </motion.div>
    );
  };

  if (quizState === 'badge') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        {generateBadge()}
      </div>
    );
  }

  if (quizState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{score >= 3 ? '🎉' : '📚'}</div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {score >= 3 ? 'Excellent!' : 'Keep Learning!'}
          </h2>
          <p className="text-xl text-blue-200 mb-6">
            You scored {score} out of {questions.length}
          </p>
          {score < 3 && (
            <p className="text-blue-300 mb-8">Review the material and try again!</p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rapid Fire Quiz
            </span>
          </h1>
          <p className="text-xl text-blue-200">30 seconds, 5 questions - test your ONOE knowledge!</p>
        </motion.div>

        {/* Progress and Timer */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <motion.div
              className={`text-3xl font-bold ${
                timeLeft <= 10 ? 'text-red-400' : 'text-white'
              }`}
              animate={timeLeft <= 10 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
            >
              {timeLeft}s
            </motion.div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-3 mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Timer Progress */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div 
              className={`h-full rounded-full ${
                timeLeft <= 10 ? 'bg-red-500' : 'bg-green-500'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-4 py-2">
                <span className="text-white font-semibold text-sm">
                  {questions[currentQuestion].category}
                </span>
              </div>
              <div className="text-white font-bold">
                Score: {score}
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl font-medium transition-all duration-300 text-left ${
                    selectedAnswer === null
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : selectedAnswer === index
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : index === questions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : 'bg-white/10 text-white/50'
                  }`}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{score}</div>
              <div className="text-sm text-blue-200">Correct</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{questions.length - score}</div>
              <div className="text-sm text-blue-200">Remaining</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{Math.round((score / questions.length) * 100)}%</div>
              <div className="text-sm text-blue-200">Accuracy</div>
            </div>
          </div>
        </div>
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

export default RapidFireQuiz;