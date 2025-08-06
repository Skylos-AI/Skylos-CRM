'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { sophisticatedAnimationVariants, animationConfig, animationUtils } from '@/lib/animations/sophisticated-animations';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface SophisticatedScrollTriggerProps {
  children: React.ReactNode;
  variant?: 'fadeIn' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'scaleIn';
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function SophisticatedScrollTrigger({
  children,
  variant = 'fadeIn',
  stagger = false,
  staggerDelay = 0,
  className,
  threshold = 0.1,
  rootMargin = '-10% 0px -10% 0px',
  once = true,
}: SophisticatedScrollTriggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold, 
    rootMargin, 
    once 
  });
  const shouldReduceMotion = useReducedMotion();

  // Get animation variant
  const getVariant = () => {
    if (shouldReduceMotion) return animationConfig.reducedMotion;
    
    switch (variant) {
      case 'slideLeft':
        return sophisticatedAnimationVariants.slideIn.left;
      case 'slideRight':
        return sophisticatedAnimationVariants.slideIn.right;
      case 'slideUp':
        return sophisticatedAnimationVariants.slideIn.up;
      case 'slideDown':
        return sophisticatedAnimationVariants.slideIn.down;
      case 'scaleIn':
        return sophisticatedAnimationVariants.scaleIn;
      default:
        return sophisticatedAnimationVariants.fadeIn;
    }
  };

  const animationVariant = getVariant();

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sophisticatedAnimationVariants.staggerContainer}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={animationVariant}
            transition={{
              ...animationVariant.visible.transition,
              delay: animationUtils.getStaggerDelay(index) + staggerDelay,
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant}
      transition={{
        ...animationVariant.visible.transition,
        delay: staggerDelay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll component for depth and visual interest
interface SophisticatedParallaxProps {
  children: React.ReactNode;
  intensity?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function SophisticatedParallax({
  children,
  intensity = 'medium',
  className,
}: SophisticatedParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const shouldReduceMotion = useReducedMotion();
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, animationUtils.getParallaxTransform(1, intensity)]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating geometric shapes with sophisticated animations
interface FloatingGeometricShapeProps {
  shape: 'circle' | 'square' | 'triangle';
  size?: number;
  color: string;
  opacity?: number;
  className?: string;
  floatIntensity?: 'subtle' | 'normal' | 'dramatic';
}

export function FloatingGeometricShape({
  shape,
  size = 100,
  color,
  opacity = 0.2,
  className,
  floatIntensity = 'normal',
}: FloatingGeometricShapeProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const floatVariants = {
    subtle: { y: [-5, 5, -5], rotate: [0, 2, -2, 0] },
    normal: { y: [-10, 10, -10], rotate: [0, 5, -5, 0] },
    dramatic: { y: [-20, 20, -20], rotate: [0, 10, -10, 0] },
  };

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'clip-path-triangle',
  };

  return (
    <motion.div
      className={`absolute ${shapeStyles[shape]} ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity,
      }}
      animate={shouldReduceMotion ? {} : floatVariants[floatIntensity]}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Sophisticated stagger container for cohesive flow
interface SophisticatedStaggerContainerProps {
  children: React.ReactNode;
  staggerTiming?: 'fast' | 'normal' | 'slow' | 'dramatic';
  className?: string;
  variant?: 'fadeIn' | 'slideUp' | 'scaleIn';
}

export function SophisticatedStaggerContainer({
  children,
  staggerTiming = 'normal',
  className,
  variant = 'fadeIn',
}: SophisticatedStaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, animationConfig.intersectionOptions);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : animationConfig.staggerTiming[staggerTiming],
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  };

  const itemVariants = shouldReduceMotion 
    ? animationConfig.reducedMotion 
    : sophisticatedAnimationVariants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Performance monitor for 60fps maintenance
export function AnimationPerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    const animationId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm z-50">
      FPS: {fps}
    </div>
  );
}