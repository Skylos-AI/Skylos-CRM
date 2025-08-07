"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCTAButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  reducedMotion?: boolean;
  delay?: number;
}

export function AnimatedCTAButton({ 
  text, 
  onClick, 
  href, 
  className = "", 
  reducedMotion = false,
  delay = 1.5 
}: AnimatedCTAButtonProps) {
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: { 
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const shadowVariants = {
    initial: { 
      boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)" 
    },
    hover: { 
      boxShadow: "0 8px 25px 0 rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const baseClasses = cn(
    // Outer container with gradient border effect
    "inline-block group relative bg-gradient-to-b from-white/10 to-black/10 dark:from-black/10 dark:to-white/10",
    "p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300",
    className
  );

  const buttonClasses = cn(
    "rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md",
    "bg-black/95 hover:bg-black/100 dark:bg-white/95 dark:hover:bg-white/100",
    "text-white dark:text-black transition-all duration-300",
    "group-hover:-translate-y-0.5 border border-white/10 dark:border-black/10",
    "hover:shadow-md dark:hover:shadow-neutral-800/50",
    "focus:outline-none focus:ring-4 focus:ring-blue-500/50",
    "cursor-pointer select-none touch-manipulation",
    "flex items-center justify-center gap-3"
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.location.href = href;
    }
  };

  if (reducedMotion) {
    return (
      <div className={baseClasses}>
        <button onClick={handleClick} className={buttonClasses}>
          <span className="opacity-90 group-hover:opacity-100 transition-opacity">
            {text}
          </span>
          <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <button onClick={handleClick} className={buttonClasses}>
        <span className="opacity-90 group-hover:opacity-100 transition-opacity">
          {text}
        </span>
        <motion.span
          variants={arrowVariants}
          initial="initial"
          whileHover="hover"
          className="opacity-70 group-hover:opacity-100 transition-all duration-300"
        >
          →
        </motion.span>
      </button>
    </motion.div>
  );
}