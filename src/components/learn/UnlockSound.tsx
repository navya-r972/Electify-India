'use client';

import React, { useEffect } from 'react';

const UnlockSound: React.FC = () => {
  useEffect(() => {
    // Create a simple unlock sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playUnlockSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a pleasant ascending arpeggio
      const now = audioContext.currentTime;
      
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
      oscillator.frequency.setValueAtTime(1046.50, now + 0.3); // C6
      
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      oscillator.start(now);
      oscillator.stop(now + 0.5);
    };

    playUnlockSound();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default UnlockSound;