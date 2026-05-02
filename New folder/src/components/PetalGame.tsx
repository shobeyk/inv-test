import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const PetalGame = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const target = 10;

  const handleClick = (e: React.MouseEvent) => {
    if (count >= target) return;
    
    setCount(prev => prev + 1);
    
    confetti({
      particleCount: 15,
      spread: 70,
      origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
      colors: ['#FFD700', '#FFA500', '#FF4500'], // Marigold colors
      shapes: ['circle'],
      gravity: 0.5,
      scalar: 0.7
    });

    if (count + 1 === target) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div 
      className="relative h-[400px] w-full max-w-2xl mx-auto glass rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-6"
      >
        <Heart className="w-16 h-16 text-accent fill-accent" />
      </motion.div>

      <h3 className="text-2xl font-serif mb-2 text-center px-4">Shower the Couple with Blessings</h3>
      <p className="text-textSecondary mb-8">Tap to shower marigold petals</p>

      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${(count / target) * 100}%` }}
        />
      </div>
      
      <p className="mt-4 font-mono text-sm text-primary">{count} / {target} Blessings</p>

      {count >= target && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-surface/90 flex items-center justify-center z-10"
        >
          <p className="text-2xl font-serif text-gradient">Blessings Received!</p>
        </motion.div>
      )}
    </div>
  );
};
