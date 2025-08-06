'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sophisticatedAnimationVariants } from '@/lib/animations/sophisticated-animations';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Sophisticated button with micro-interactions
interface SophisticatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function SophisticatedButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
}: SophisticatedButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const buttonVariants = {
    primary: 'bg-sophisticated-white border-2 border-sophisticated-professional-blue text-sophisticated-black',
    secondary: 'bg-sophisticated-black border-2 border-sophisticated-sky-blue text-sophisticated-white',
    accent: 'bg-transparent border-2 border-sophisticated-rich-purple text-sophisticated-rich-purple',
  };

  const sizeVariants = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const hoverVariants = shouldReduceMotion 
    ? {}
    : sophisticatedAnimationVariants.sophisticatedHover.button;

  return (
    <motion.button
      className={`
        ${buttonVariants[variant]}
        ${sizeVariants[size]}
        ${className}
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-sophisticated-professional-blue/50
      `}
      variants={hoverVariants}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={disabled ? "rest" : "tap"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// Interactive card with sophisticated hover effects
interface SophisticatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'glow';
  onClick?: () => void;
}

export function SophisticatedCard({
  children,
  className = '',
  hoverEffect = 'lift',
  onClick,
}: SophisticatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const hoverVariants = {
    lift: shouldReduceMotion ? {} : {
      rest: { y: 0, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
      hover: { 
        y: -8, 
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }
    },
    scale: shouldReduceMotion ? {} : {
      rest: { scale: 1 },
      hover: { scale: 1.02, transition: { duration: 0.2 } }
    },
    glow: shouldReduceMotion ? {} : {
      rest: { boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
      hover: { 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 20px rgba(69, 103, 183, 0.3)",
        transition: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.div
      className={`
        bg-white rounded-xl p-6 cursor-pointer
        ${className}
      `}
      variants={hoverVariants[hoverEffect]}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Typing effect for dynamic text
interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypingEffect({
  text,
  speed = 50,
  className = '',
  onComplete,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      onComplete?.();
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete, shouldReduceMotion]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-current ml-1"
        />
      )}
    </span>
  );
}

// Morphing shape component
interface MorphingShapeProps {
  shapes: string[];
  duration?: number;
  className?: string;
  size?: number;
}

export function MorphingShape({
  shapes,
  duration = 3000,
  className = '',
  size = 100,
}: MorphingShapeProps) {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion || shapes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentShapeIndex(prev => (prev + 1) % shapes.length);
    }, duration);

    return () => clearInterval(interval);
  }, [shapes.length, duration, shouldReduceMotion]);

  return (
    <motion.div
      className={`${className}`}
      style={{ width: size, height: size }}
      animate={{
        clipPath: shouldReduceMotion ? shapes[0] : shapes[currentShapeIndex],
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
}

// Interactive cursor follower
interface CursorFollowerProps {
  children: React.ReactNode;
  className?: string;
}

export function CursorFollower({ children, className = '' }: CursorFollowerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Sophisticated loading spinner
interface SophisticatedSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function SophisticatedSpinner({
  size = 40,
  color = '#4567b7',
  className = '',
}: SophisticatedSpinnerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`inline-block ${className}`}>
      <motion.div
        style={{
          width: size,
          height: size,
          border: `3px solid transparent`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={shouldReduceMotion ? {} : {
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

// Feedback system for user interactions
interface FeedbackSystemProps {
  children: React.ReactNode;
  feedbackType?: 'success' | 'error' | 'info';
  message?: string;
  showFeedback?: boolean;
  onFeedbackComplete?: () => void;
}

export function FeedbackSystem({
  children,
  feedbackType = 'success',
  message = '',
  showFeedback = false,
  onFeedbackComplete,
}: FeedbackSystemProps) {
  const shouldReduceMotion = useReducedMotion();

  const feedbackColors = {
    success: '#10B981',
    error: '#EF4444',
    info: '#3B82F6',
  };

  return (
    <div className="relative">
      {children}
      
      {showFeedback && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
          onAnimationComplete={onFeedbackComplete}
        >
          <div className="text-center">
            <motion.div
              className="w-12 h-12 rounded-full mx-auto mb-2"
              style={{ backgroundColor: feedbackColors[feedbackType] }}
              animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            />
            {message && (
              <p className="text-sm font-medium text-gray-700">{message}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}