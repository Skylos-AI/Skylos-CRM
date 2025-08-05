/**
 * Animation Variants
 * 
 * Framer Motion animation variants for consistent scroll-triggered animations
 * with performance optimizations and accessibility support.
 */

import { Variants } from 'framer-motion'

// Basic fade animations
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1], // easeOut
    },
  },
}

// Slide up animations
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Slide down animations
export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Slide left animations
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Slide right animations
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Scale animations
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Zoom in animations
export const zoomInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Stagger container for multiple children
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

// Stagger items for use within stagger container
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Hero section specific animations
export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0, 0, 0.2, 1],
      delay: 0.2,
    },
  },
}

// Button hover animations
export const buttonHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0, 0, 0.2, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Card hover animations
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  hover: {
    y: -4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Text reveal animations (for typewriter effect)
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Progress bar animations
export const progressVariants: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Floating animations for background elements
export const floatingVariants: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Pulse animations for attention-grabbing elements
export const pulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Navigation menu animations
export const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
}

// Modal/Dialog animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
}

// Loading spinner animations
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Custom animation variants for specific use cases
export const customVariants = {
  // For elements that should slide in from different directions based on their position
  slideInFromDirection: (direction: 'left' | 'right' | 'up' | 'down') => ({
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
      },
    },
  }),

  // For staggered animations with custom delay
  staggerWithDelay: (delay: number) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }),

  // For elements that should animate based on scroll progress
  scrollProgress: (progress: number) => ({
    opacity: Math.min(progress * 2, 1),
    y: (1 - progress) * 50,
  }),
}

// Animation presets for common combinations
export const animationPresets = {
  fadeInUp: slideUpVariants,
  fadeInDown: slideDownVariants,
  fadeInLeft: slideLeftVariants,
  fadeInRight: slideRightVariants,
  fadeIn: fadeVariants,
  scaleIn: scaleVariants,
  zoomIn: zoomInVariants,
  stagger: staggerContainer,
  staggerItem: staggerItem,
  hero: heroVariants,
  buttonHover: buttonHoverVariants,
  cardHover: cardHoverVariants,
  textReveal: textRevealVariants,
  progress: progressVariants,
  floating: floatingVariants,
  pulse: pulseVariants,
  menu: menuVariants,
  modal: modalVariants,
  spinner: spinnerVariants,
}

// Type definitions for animation variants
export type AnimationType = keyof typeof animationPresets
export type CustomAnimationType = keyof typeof customVariants

// Helper function to get animation variants
export function getAnimationVariants(type: AnimationType): Variants {
  return animationPresets[type]
}

// Helper function to check if user prefers reduced motion
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Reduced motion variants (static versions)
export const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
}