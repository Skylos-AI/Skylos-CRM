"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { FloatingPathsProps } from "./types";

export function FloatingPaths({ position, reducedMotion = false, className = "" }: FloatingPathsProps) {
  const { theme } = useTheme();
  
  // Generate flowing wave-like paths similar to the reference
  const paths = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      // Create flowing wave paths that move across the screen
      const baseY = -189 + i * 6;
      const startX = -380 - i * 5 * position;
      const midX = -312 - i * 5 * position;
      const endX = 152 - i * 5 * position;
      const midY = 216 - i * 6;
      const endY = 343 - i * 6;
      const finalX = 616 - i * 5 * position;
      const finalY = 470 - i * 6;
      const lastX = 684 - i * 5 * position;
      const lastY = 875 - i * 6;
      
      return {
        id: i,
        d: `M${startX} ${baseY}C${startX} ${baseY} ${midX} ${midY} ${endX} ${endY}C${finalX} ${finalY} ${lastX} ${lastY} ${lastX} ${lastY}`,
        opacity: 0.1 + i * 0.03,
        strokeWidth: 0.5 + i * 0.03,
        animationDelay: i * 0.1,
        duration: 20 + Math.random() * 10,
      };
    });
  }, [position]);

  // Use proper color scheme based on theme
  const isDark = theme === 'dark';
  
  if (reducedMotion) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg
          viewBox="0 0 696 316"
          className={`w-full h-full ${isDark ? 'text-slate-950' : 'text-white'}`}
          fill="none"
        >
          <title>Background Paths</title>
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.strokeWidth}
              strokeOpacity={path.opacity}
              fill="none"
            />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 696 316"
        className={`w-full h-full ${isDark ? 'text-slate-950' : 'text-white'}`}
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.strokeWidth}
            strokeOpacity={0.1 + path.id * 0.03}
            fill="none"
            initial={{ 
              pathLength: 0.3, 
              opacity: 0.6 
            }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.animationDelay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}