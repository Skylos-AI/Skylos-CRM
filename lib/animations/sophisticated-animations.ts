/**
 * Sophisticated Animation System
 * Contextual scroll-triggered animations with 60fps performance
 */

// Animation variants for different contexts
export const sophisticatedAnimationVariants = {
  // Fade animations with staggered timing
  fadeIn: {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for sophistication
      }
    }
  },

  // Slide animations with directional context
  slideIn: {
    left: {
      hidden: { opacity: 0, x: -60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    right: {
      hidden: { opacity: 0, x: 60 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    up: {
      hidden: { opacity: 0, y: 60 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    },
    down: {
      hidden: { opacity: 0, y: -60 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
      }
    }
  },

  // Scale animations for emphasis
  scaleIn: {
    hidden: { 
      opacity: 0,
      scale: 0.8,
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  // Staggered container animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  },

  // Parallax scroll effects
  parallax: {
    slow: {
      y: [0, -50],
      transition: {
        duration: 1,
        ease: "linear",
      }
    },
    medium: {
      y: [0, -100],
      transition: {
        duration: 1,
        ease: "linear",
      }
    },
    fast: {
      y: [0, -150],
      transition: {
        duration: 1,
        ease: "linear",
      }
    }
  },

  // Geometric shape animations
  geometricFloat: {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },

  // Sophisticated hover effects
  sophisticatedHover: {
    button: {
      rest: { 
        scale: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      hover: { 
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 }
      },
      tap: { 
        scale: 0.98,
        transition: { duration: 0.1 }
      }
    },
    card: {
      rest: { 
        y: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      hover: { 
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3 }
      }
    }
  }
} as const;

// Performance-optimized animation settings
export const animationConfig = {
  // Reduced motion preferences
  reducedMotion: {
    transition: { duration: 0.01 },
    animate: { transition: { duration: 0.01 } }
  },

  // 60fps optimization settings
  performance: {
    layoutId: undefined, // Avoid layout animations when possible
    transformTemplate: ({ x, y, rotate, scale }: any) => 
      `translate3d(${x}, ${y}, 0) rotate(${rotate}) scale(${scale})`,
  },

  // Intersection observer settings for scroll triggers
  intersectionOptions: {
    threshold: 0.1,
    rootMargin: '-10% 0px -10% 0px',
  },

  // Stagger timing configurations
  staggerTiming: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
    dramatic: 0.3,
  }
} as const;

// Animation utility functions
export const animationUtils = {
  // Create staggered delay based on index
  getStaggerDelay: (index: number, timing: keyof typeof animationConfig.staggerTiming = 'normal') => {
    return index * animationConfig.staggerTiming[timing];
  },

  // Get appropriate animation variant based on context
  getContextualVariant: (context: 'hero' | 'section' | 'card' | 'accent') => {
    const contextMap = {
      hero: sophisticatedAnimationVariants.fadeIn,
      section: sophisticatedAnimationVariants.slideIn.up,
      card: sophisticatedAnimationVariants.scaleIn,
      accent: sophisticatedAnimationVariants.slideIn.left,
    };
    return contextMap[context];
  },

  // Create parallax transform based on scroll progress
  getParallaxTransform: (scrollProgress: number, intensity: 'slow' | 'medium' | 'fast' = 'medium') => {
    const intensityMap = {
      slow: 0.3,
      medium: 0.5,
      fast: 0.8,
    };
    return scrollProgress * intensityMap[intensity] * 100;
  }
} as const;

// CSS-based animations for performance-critical scenarios
export const cssAnimations = {
  // Keyframe definitions
  keyframes: {
    sophisticatedFadeIn: `
      @keyframes sophisticatedFadeIn {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    sophisticatedSlideIn: `
      @keyframes sophisticatedSlideIn {
        from {
          opacity: 0;
          transform: translateX(-60px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
    geometricFloat: `
      @keyframes geometricFloat {
        0%, 100% {
          transform: translateY(-10px) rotate(0deg);
        }
        33% {
          transform: translateY(10px) rotate(5deg);
        }
        66% {
          transform: translateY(-5px) rotate(-5deg);
        }
      }
    `,
  },

  // Animation classes
  classes: {
    'sophisticated-fade-in': 'animate-[sophisticatedFadeIn_0.8s_cubic-bezier(0.25,0.46,0.45,0.94)]',
    'sophisticated-slide-in': 'animate-[sophisticatedSlideIn_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)]',
    'geometric-float': 'animate-[geometricFloat_6s_ease-in-out_infinite]',
  }
} as const;