"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { ANIMATION_CONFIG } from "./constants";

interface TextAnimationProps {
  text: string;
  className?: string;
  reducedMotion?: boolean;
}

export function AnimatedText({ text, className = "", reducedMotion = false }: TextAnimationProps) {
  // Split text into words and letters for animation
  const textElements = useMemo(() => {
    const words = text.split(" ");
    let letterIndex = 0;
    
    return words.map((word, wordIndex) => {
      const letters = word.split("").map((letter, letterIndexInWord) => {
        const currentLetterIndex = letterIndex++;
        return {
          letter,
          letterIndex: currentLetterIndex,
          wordIndex,
          letterIndexInWord,
        };
      });
      
      return {
        word,
        wordIndex,
        letters,
      };
    });
  }, [text]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.wordDelay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.letterDelay,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: ANIMATION_CONFIG.springConfig.stiffness,
        damping: ANIMATION_CONFIG.springConfig.damping,
      },
    },
  };

  if (reducedMotion) {
    return (
      <div className={className}>
        {textElements.map((wordData, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-4 last:mr-0">
            {wordData.letters.map((letterData, letterIndex) => (
              <span key={`${wordIndex}-${letterIndex}`} className="inline-block">
                {letterData.letter}
              </span>
            ))}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {textElements.map((wordData, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={wordVariants}
          className="inline-block mr-4 last:mr-0"
        >
          {wordData.letters.map((letterData, letterIndex) => (
            <motion.span
              key={`${wordIndex}-${letterIndex}`}
              variants={letterVariants}
              className="inline-block"
            >
              {letterData.letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface SubtitleAnimationProps {
  text: string;
  className?: string;
  reducedMotion?: boolean;
  delay?: number;
}

export function AnimatedSubtitle({ 
  text, 
  className = "", 
  reducedMotion = false, 
  delay = 1 
}: SubtitleAnimationProps) {
  if (reducedMotion) {
    return (
      <div className={className}>
        {text}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.div>
  );
}