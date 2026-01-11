'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElectoralReformQuestionEngine from './ElectoralReformQuestionEngine';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  completed: boolean;
}

const electoralReformModules: Module[] = [
  {
    id: 'electoral-process',
    title: 'Electoral Process',
    description: 'Understanding staggered vs synchronized elections',
    completed: false,
    questions: [
      {
        id: 'q1',
        question: 'How often does India currently hold an election at some level (State/National)?',
        options: ['Every year', 'Almost every 6 months', 'Every 2 years', 'Every 3 years'],
        correctAnswer: 1,
        explanation: 'India holds elections at various levels almost every 6 months due to the staggered nature of state assemblies and the Lok Sabha.'
      },
      {
        id: 'q2',
        question: 'What happens to new policy announcements during an election?',
        options: ['They continue normally', 'They are accelerated', 'They are paused due to the Model Code of Conduct (MCC)', 'They are announced at rallies'],
        correctAnswer: 2,
        explanation: 'The Model Code of Conduct (MCC) comes into effect during elections, pausing new policy announcements to ensure a level playing field.'
      },
      {
        id: 'q3',
        question: 'Who manages the National and State Assembly elections?',
        options: ['State Election Commissions', 'The Election Commission of India (ECI)', 'Central Government', 'State Governments'],
        correctAnswer: 1,
        explanation: 'The Election Commission of India (ECI) is the constitutional body responsible for conducting national and state assembly elections.'
      },
      {
        id: 'q4',
        question: 'What is the primary advantage of synchronized elections?',
        options: ['More frequent elections', 'Reduced election costs and administrative burden', 'Longer campaign periods', 'More political parties'],
        correctAnswer: 1,
        explanation: 'Synchronized elections can significantly reduce costs and administrative burden by combining multiple elections into one event.'
      },
      {
        id: 'q5',
        question: 'Which constitutional body recommends election reforms?',
        options: ['Law Commission', 'Election Commission', 'Finance Commission', 'Planning Commission'],
        correctAnswer: 1,
        explanation: 'The Election Commission of India has the authority to recommend electoral reforms to the government.'
      }
    ]
  },
  {
    id: 'constitutional-requirements',
    title: 'Constitutional Requirements',
    description: 'Legal framework for electoral reforms',
    completed: false,
    questions: [
      {
        id: 'q1',
        question: 'Which Article specifies the 5-year term for the Lok Sabha?',
        options: ['Article 74', 'Article 83', 'Article 352', 'Article 356'],
        correctAnswer: 1,
        explanation: 'Article 83 of the Indian Constitution specifies that the Lok Sabha shall continue for five years from the date appointed for its first meeting.'
      },
      {
        id: 'q2',
        question: 'What kind of majority is needed in Parliament to pass ONOE?',
        options: ['Simple majority', 'Special Majority (2/3 of members present and voting)', 'Absolute majority', 'Unanimous consent'],
        correctAnswer: 1,
        explanation: 'One Nation One Election (ONOE) would require a Special Majority - at least two-thirds of members present and voting in Parliament.'
      },
      {
        id: 'q3',
        question: 'Does ONOE require consent from state legislatures?',
        options: ['No, only Parliament approval', 'Yes, for provisions affecting local bodies and federal balance', 'Only from BJP-ruled states', 'Only from opposition states'],
        correctAnswer: 1,
        explanation: 'ONOE requires consent from state legislatures as it affects the federal structure and provisions related to local bodies.'
      },
      {
        id: 'q4',
        question: 'Which schedule of the Constitution deals with election of President?',
        options: ['First Schedule', 'Second Schedule', 'Third Schedule', 'Fourth Schedule'],
        correctAnswer: 3,
        explanation: 'The Fourth Schedule of the Indian Constitution deals with the allocation of seats in the Rajya Sabha and the election of the President.'
      },
      {
        id: 'q5',
        question: 'Can the Election Commission postpone elections in emergencies?',
        options: ['No, never', 'Yes, with Supreme Court approval', 'Yes, under constitutional provisions', 'Only during war'],
        correctAnswer: 2,
        explanation: 'The Election Commission can postpone elections under constitutional provisions, particularly in cases of national emergencies or force majeure.'
      }
    ]
  },
  {
    id: 'unexpired-term-rule',
    title: 'Unexpired Term Rule',
    description: 'Understanding government synchronization',
    completed: false,
    questions: [
      {
        id: 'q1',
        question: 'If a government falls in Year 1 of a 5-year cycle, what is the term of the next government under ONOE?',
        options: ['5 years', '4 years (The remaining "unexpired" portion)', '3 years', '2 years'],
        correctAnswer: 1,
        explanation: 'Under the unexpired term rule, the next government would serve for 4 years - the remaining portion of the original 5-year cycle.'
      },
      {
        id: 'q2',
        question: 'Why is this rule necessary?',
        options: ['To save money', 'To ensure all governments eventually sync back to the national 5-year clock', 'To allow more elections', 'To reduce voter fatigue'],
        correctAnswer: 1,
        explanation: 'The unexpired term rule ensures that all governments eventually synchronize back to the national 5-year election cycle.'
      },
      {
        id: 'q3',
        question: 'Can a mid-term assembly be dissolved at any time?',
        options: ['No, never', 'Yes, but the replacement\'s term remains capped to keep the cycle in sync', 'Only with President\'s consent', 'Only during national emergency'],
        correctAnswer: 1,
        explanation: 'A mid-term assembly can be dissolved, but the replacement government\'s term is capped to maintain synchronization with the national cycle.'
      },
      {
        id: 'q4',
        question: 'What happens if multiple states face mid-term elections?',
        options: ['They hold separate elections', 'They wait for national elections', 'They hold synchronized mid-term elections', 'President\'s rule is imposed'],
        correctAnswer: 2,
        explanation: 'Multiple states facing mid-term elections would hold synchronized elections to maintain the ONOE framework.'
      },
      {
        id: 'q5',
        question: 'Who decides the timing of mid-term elections?',
        options: ['Chief Minister', 'Governor on EC advice', 'Election Commission', 'Central Government'],
        correctAnswer: 2,
        explanation: 'The Election Commission decides the timing of mid-term elections to ensure proper synchronization with the national cycle.'
      }
    ]
  }
];

const ElectoralReformPortal: React.FC = () => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [modules, setModules] = useState<Module[]>(electoralReformModules);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);

  const currentModule = modules[activeModuleIndex];
  const nextModule = activeModuleIndex < modules.length - 1 ? modules[activeModuleIndex + 1] : null;

  const handleModuleComplete = () => {
    setModules(prev => prev.map((module, index) => 
      index === activeModuleIndex ? { ...module, completed: true } : module
    ));
    setShowCompletionBanner(true);
    
    setTimeout(() => {
      setShowCompletionBanner(false);
    }, 3000);
  };

  const handleNextModule = () => {
    if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    }
  };

  const handleAnswerSelect = (questionId: string, selectedAnswer: number, isCorrect: boolean) => {
    // Track answer analytics if needed
    console.log(`Question ${questionId}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar Progress Stepper */}
        <div className="w-80 bg-white border-r border-slate-200 min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Electoral Reform Learning Portal</h1>
            <p className="text-slate-600">Master the constitutional framework of electoral reforms</p>
          </div>

          <div className="space-y-4">
            {modules.map((module, index) => {
              const isActive = index === activeModuleIndex;
              const isCompleted = module.completed;
              const isUnlocked = index === 0 || modules[index - 1].completed;

              return (
                <motion.div
                  key={module.id}
                  onClick={() => isUnlocked && setActiveModuleIndex(index)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    isActive
                      ? 'border-blue-700 bg-blue-50'
                      : isCompleted
                      ? 'border-green-500 bg-green-50'
                      : isUnlocked
                      ? 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
                      : 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-60'
                  }`}
                  whileHover={isUnlocked ? { scale: 1.02 } : {}}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                        ? 'bg-blue-700 text-white'
                        : isUnlocked
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-slate-900'
                      }`}>
                        {module.title}
                      </h3>
                      <p className={`text-sm mt-1 ${
                        isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-slate-600'
                      }`}>
                        {module.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Overall Progress */}
          <div className="mt-8 p-4 bg-slate-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Overall Progress</span>
              <span className="text-sm text-slate-600">
                {modules.filter(m => m.completed).length} / {modules.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-blue-700 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(modules.filter(m => m.completed).length / modules.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Module Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{currentModule.title}</h2>
              <p className="text-lg text-slate-600">{currentModule.description}</p>
            </div>

            {/* Question Engine */}
            <ElectoralReformQuestionEngine
              moduleId={currentModule.id}
              questions={currentModule.questions}
              onComplete={handleModuleComplete}
              onAnswerSelect={handleAnswerSelect}
            />

            {/* Completion Banner */}
            <AnimatePresence>
              {showCompletionBanner && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-4 right-4 bg-green-100 border border-green-300 rounded-lg p-4 shadow-lg z-50"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-green-900">Module Completed!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Module Button */}
            {currentModule.completed && nextModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-8 right-8"
              >
                <button
                  onClick={handleNextModule}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium shadow-lg transition-colors flex items-center space-x-2"
                >
                  <span>Next Module: {nextModule.title}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* All Modules Complete */}
            {currentModule.completed && !nextModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-12 p-8 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Congratulations!</h3>
                <p className="text-green-800">You've completed all modules in the Electoral Reform Learning Portal.</p>
                <p className="text-green-700 mt-2">You now have a comprehensive understanding of electoral reform constitutional requirements.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectoralReformPortal;