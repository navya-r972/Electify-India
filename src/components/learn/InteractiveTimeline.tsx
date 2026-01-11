'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: number;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  onComplete: () => void;
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ events = [], onComplete }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [revealedEvents, setRevealedEvents] = useState<Set<string>>(new Set());
  const [voterPosition, setVoterPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setCurrentPosition(Math.min(scrollPercentage * 100, 100));
      const eventCount = events?.length || 0;
      if (eventCount > 1) {
        setVoterPosition(Math.min(scrollPercentage * (eventCount - 1), eventCount - 1));
      } else {
        setVoterPosition(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [events?.length || 0]);

  useEffect(() => {
    // Reveal events as user scrolls
    const eventCount = events?.length || 0;
    if (eventCount > 0) {
      events.forEach((event, index) => {
        if (currentPosition >= (index / eventCount) * 100) {
          setRevealedEvents(prev => new Set(prev).add(event.id));
        }
      });

      // Check completion
      if (revealedEvents.size === eventCount) {
        setTimeout(onComplete, 1000);
      }
    }
  }, [currentPosition, events, revealedEvents.size, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${currentPosition}%` }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Voting Journey
            </span>
          </h1>
          <p className="text-xl text-blue-200">Scroll to guide your voter through the election process</p>
        </motion.div>

        {/* Voter Character */}
        <motion.div
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
          animate={{
            y: `${-50 + (voterPosition * 20)}vh`
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-yellow-500/50">
              <span className="text-2xl">🗳️</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-400/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Timeline Events */}
        <div className="space-y-32">
          {events && events.length > 0 ? events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ 
                opacity: revealedEvents.has(event.id) ? 1 : 0.3,
                x: revealedEvents.has(event.id) ? 0 : (index % 2 === 0 ? -50 : 50)
              }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Event Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 ${
                    revealedEvents.has(event.id) ? 'bg-white/20 shadow-xl' : ''
                  }`}
                  whileHover={revealedEvents.has(event.id) ? { scale: 1.05 } : {}}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl mr-4">
                      {event.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                  </div>
                  <p className="text-blue-200">{event.description}</p>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="relative z-20">
                <motion.div
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                    revealedEvents.has(event.id) 
                      ? 'bg-blue-500 border-white shadow-lg shadow-blue-500/50' 
                      : 'bg-gray-600 border-gray-400'
                  }`}
                  animate={revealedEvents.has(event.id) ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Empty Space */}
              <div className="w-5/12" />
            </motion.div>
          )) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">Loading Timeline...</h3>
              <p className="text-blue-200">Please wait while we prepare your learning experience</p>
            </div>
          )}
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {revealedEvents.size === (events?.length || 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-16 p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Journey Complete!</h2>
              <p className="text-green-200">You've mastered the election process</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveTimeline;