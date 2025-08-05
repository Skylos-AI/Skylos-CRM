/**
 * Hover Effects Library
 * 
 * Centralized hover effects and micro-interactions for consistent
 * user experience across the landing page components.
 */

import { Variants } from 'framer-motion'

// Button hover effects
export const buttonHoverEffects = {
  primary: {
    scale: 1.02,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  secondary: {
    scale: 1.02,
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  outline: {
    scale: 1.02,
    borderColor: 'rgba(var(--primary), 0.8)',
    backgroundColor: 'rgba(var(--primary), 0.05)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  ghost: {
    scale: 1.02,
    backgroundColor: 'rgba(var(--primary), 0.1)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

// Card hover effects
export const cardHoverEffects = {
  lift: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  glow: {
    boxShadow: '0 0 30px rgba(var(--primary), 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  scale: {
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  tilt: {
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  subtle: {
    y: -2,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

// Icon hover effects
export const iconHoverEffects = {
  bounce: {
    y: [-2, 0, -2],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  },
  rotate: {
    rotate: [0, 15, -15, 0],
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.6, ease: 'easeInOut' }
  },
  shake: {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  spin: {
    rotate: 360,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  float: {
    y: [0, -4, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
  }
}

// Link hover effects
export const linkHoverEffects = {
  underline: {
    scaleX: [0, 1],
    originX: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  arrow: {
    x: [0, 4],
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  external: {
    x: [0, 2],
    y: [0, -2],
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  fade: {
    opacity: [1, 0.7],
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

// Text hover effects
export const textHoverEffects = {
  slideUp: {
    y: [0, -2],
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  slideRight: {
    x: [0, 4],
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  glow: {
    textShadow: '0 0 8px rgba(var(--primary), 0.5)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  scale: {
    scale: [1, 1.02],
    transition: { duration: 0.2, ease: 'easeOut' }
  }
}

// Loading state animations
export const loadingAnimations: Variants = {
  spinner: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' }
  },
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
  },
  dots: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  },
  wave: {
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  }
}

// Success state animations
export const successAnimations: Variants = {
  checkmark: {
    scale: [0, 1.2, 1],
    rotate: [0, 10, 0],
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  bounce: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  fadeIn: {
    opacity: [0, 1],
    scale: [0.8, 1],
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

// Error state animations
export const errorAnimations: Variants = {
  shake: {
    x: [-4, 4, -4, 4, 0],
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  bounce: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3, ease: 'easeOut' }
  }
}

// Ripple effect configuration
export const rippleConfig = {
  initial: { scale: 0, opacity: 1 },
  animate: { scale: 4, opacity: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Magnetic effect configuration
export const magneticConfig = {
  strength: 0.1, // How strong the magnetic effect is
  damping: 25,
  stiffness: 700,
  restDelta: 0.001
}

// Shimmer effect keyframes
export const shimmerEffect = {
  initial: { x: '-200%' },
  animate: { x: '200%' },
  transition: { duration: 1.5, ease: 'easeInOut' }
}

// Glow effect configuration
export const glowConfig = {
  primary: '0 0 20px rgba(var(--primary), 0.4)',
  secondary: '0 0 20px rgba(var(--secondary), 0.4)',
  success: '0 0 20px rgba(34, 197, 94, 0.4)',
  warning: '0 0 20px rgba(245, 158, 11, 0.4)',
  error: '0 0 20px rgba(239, 68, 68, 0.4)',
}

// Stagger animation configurations
export const staggerConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }
}

// Utility functions for creating custom hover effects
export const createHoverEffect = (
  scale = 1.02,
  shadow = '0 10px 25px rgba(0, 0, 0, 0.15)',
  duration = 0.2
) => ({
  scale,
  boxShadow: shadow,
  transition: { duration, ease: 'easeOut' }
})

export const createGlowEffect = (
  color = 'var(--primary)',
  intensity = 0.3,
  blur = 20
) => ({
  boxShadow: `0 0 ${blur}px rgba(${color}, ${intensity})`,
  transition: { duration: 0.3, ease: 'easeOut' }
})

export const createMagneticEffect = (strength = 0.1) => ({
  strength,
  damping: 25,
  stiffness: 700
})

// Preset combinations for common use cases
export const presetEffects = {
  primaryButton: {
    hover: buttonHoverEffects.primary,
    tap: { scale: 0.98 },
    loading: loadingAnimations.spinner,
    success: successAnimations.checkmark
  },
  featureCard: {
    hover: cardHoverEffects.lift,
    tap: { scale: 0.98 },
    icon: iconHoverEffects.float
  },
  navigationLink: {
    hover: textHoverEffects.slideRight,
    underline: linkHoverEffects.underline
  },
  ctaSection: {
    hover: cardHoverEffects.glow,
    button: buttonHoverEffects.primary,
    magnetic: magneticConfig
  }
}

// Animation variants for different states
export const stateVariants: Variants = {
  idle: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 }
  },
  hover: {
    scale: 1.02,
    opacity: 0.9,
    transition: { duration: 0.2 }
  },
  active: {
    scale: 0.98,
    opacity: 0.8,
    transition: { duration: 0.1 }
  },
  loading: {
    opacity: 0.7,
    transition: { duration: 0.2 }
  },
  success: {
    scale: 1.05,
    opacity: 1,
    transition: { duration: 0.3, type: 'spring' }
  },
  error: {
    x: [-4, 4, -4, 4, 0],
    transition: { duration: 0.4 }
  }
}

// Export all effects as a single object for easy importing
export const hoverEffects = {
  button: buttonHoverEffects,
  card: cardHoverEffects,
  icon: iconHoverEffects,
  link: linkHoverEffects,
  text: textHoverEffects,
  loading: loadingAnimations,
  success: successAnimations,
  error: errorAnimations,
  presets: presetEffects,
  states: stateVariants,
  config: {
    ripple: rippleConfig,
    magnetic: magneticConfig,
    shimmer: shimmerEffect,
    glow: glowConfig,
    stagger: staggerConfig
  },
  utils: {
    createHoverEffect,
    createGlowEffect,
    createMagneticEffect
  }
}