import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/student-hero.png', // Using existing image
    title: 'Understanding One Nation One Election',
    description: 'A neutral, educational platform to help citizens understand the concept and identify misinformation.',
    ctaText: 'Start Learning',
    ctaLink: '/learn',
    bgClass: 'bg-primary-900'
  },
  {
    id: 2,
    image: '/images/student-hero.png', // Placeholder reuse
    title: 'Your Vote, Your Voice',
    description: 'Empower yourself with knowledge about your voting rights and the electoral process.',
    ctaText: 'Check Facts',
    ctaLink: '/fact-vs-myth',
    bgClass: 'bg-secondary-800'
  },
  {
    id: 3,
    image: '/images/student-hero.png',
    title: 'Test Your Knowledge',
    description: 'Take our interactive quizzes to see how much you know about Indian elections.',
    ctaText: 'Start Quiz',
    ctaLink: '/knowledge-check',
    bgClass: 'bg-primary-800'
  },
  {
    id: 4,
    image: '/images/student-hero.png',
    title: 'Resources for Voters',
    description: 'Access official documents, PDFs, and guides to become an informed voter.',
    ctaText: 'View Resources',
    ctaLink: '/resources',
    bgClass: 'bg-charcoal-800'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 w-full h-full ${slides[current].bgClass}`}
        >
             {/* Background Image with Overlay */}
             <div className="absolute inset-0 z-0">
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  className="object-cover opacity-40"
                  priority
                />
                <div className="absolute inset-0 bg-black/60" />
             </div>

             <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl"
                >
                  {slides[current].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl mb-8 max-w-2xl text-gray-200"
                >
                  {slides[current].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link 
                    href={slides[current].ctaLink}
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md"
                  >
                    {slides[current].ctaText}
                  </Link>
                </motion.div>
             </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-all"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-primary-500 w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
