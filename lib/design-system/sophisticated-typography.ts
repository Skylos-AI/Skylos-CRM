/**
 * Sophisticated Typography System
 * Creative positioning, varied weights, and sophisticated text arrangements
 */

// Typography scale for sophisticated design
export const sophisticatedTypography = {
  // Large, bold heading styles with creative line breaks
  headings: {
    hero: {
      fontSize: 'clamp(3rem, 8vw, 6rem)', // 48px - 96px
      fontWeight: '800',
      lineHeight: '0.9',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-primary)',
    },
    section: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)', // 40px - 64px
      fontWeight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.01em',
      fontFamily: 'var(--font-primary)',
    },
    subsection: {
      fontSize: 'clamp(2rem, 4vw, 3rem)', // 32px - 48px
      fontWeight: '600',
      lineHeight: '1.2',
      letterSpacing: '0',
      fontFamily: 'var(--font-primary)',
    },
    card: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)', // 24px - 32px
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0',
      fontFamily: 'var(--font-primary)',
    }
  },

  // Body text with varied weights and creative arrangements
  body: {
    large: {
      fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', // 18px - 20px
      fontWeight: '400',
      lineHeight: '1.6',
      letterSpacing: '0',
      fontFamily: 'var(--font-secondary)',
    },
    medium: {
      fontSize: '1rem', // 16px
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
      fontFamily: 'var(--font-secondary)',
    },
    small: {
      fontSize: '0.875rem', // 14px
      fontWeight: '400',
      lineHeight: '1.4',
      letterSpacing: '0',
      fontFamily: 'var(--font-secondary)',
    },
    emphasis: {
      fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', // 18px - 20px
      fontWeight: '500',
      lineHeight: '1.5',
      letterSpacing: '0',
      fontFamily: 'var(--font-secondary)',
    }
  },

  // Creative text arrangements
  creative: {
    quote: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // 24px - 40px
      fontWeight: '300',
      lineHeight: '1.4',
      letterSpacing: '0',
      fontFamily: 'var(--font-primary)',
      fontStyle: 'italic',
    },
    accent: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', // 14px - 16px
      fontWeight: '600',
      lineHeight: '1.3',
      letterSpacing: '0.05em',
      fontFamily: 'var(--font-secondary)',
      textTransform: 'uppercase' as const,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      fontWeight: '500',
      lineHeight: '1.3',
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-secondary)',
    }
  }
} as const;

// Text wrapping utilities for content that flows around visual elements
export const textWrappingStyles = {
  // Asymmetrical text wrapping
  asymmetrical: {
    shapeOutside: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)',
    float: 'left' as const,
    width: '60%',
    marginRight: '2rem',
  },
  
  // Circular text wrapping
  circular: {
    shapeOutside: 'circle(50%)',
    float: 'right' as const,
    width: '300px',
    height: '300px',
    marginLeft: '2rem',
  },
  
  // Diagonal text flow
  diagonal: {
    transform: 'skew(-5deg)',
    transformOrigin: 'top left',
  }
} as const;

// Creative line breaks and spacing utilities
export const creativeSpacing = {
  // Staggered line heights for visual interest
  staggered: {
    '& > *:nth-child(odd)': {
      marginLeft: '2rem',
    },
    '& > *:nth-child(even)': {
      marginRight: '2rem',
    }
  },
  
  // Dramatic spacing for emphasis
  dramatic: {
    marginTop: 'clamp(3rem, 8vw, 6rem)',
    marginBottom: 'clamp(2rem, 6vw, 4rem)',
  },
  
  // Tight spacing for cohesive grouping
  tight: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  }
} as const;

// CSS classes for sophisticated typography
export const sophisticatedTypographyClasses = {
  // Heading classes
  'heading-hero': 'text-[clamp(3rem,8vw,6rem)] font-[800] leading-[0.9] tracking-[-0.02em] font-primary',
  'heading-section': 'text-[clamp(2.5rem,6vw,4rem)] font-[700] leading-[1.1] tracking-[-0.01em] font-primary',
  'heading-subsection': 'text-[clamp(2rem,4vw,3rem)] font-[600] leading-[1.2] font-primary',
  'heading-card': 'text-[clamp(1.5rem,3vw,2rem)] font-[600] leading-[1.3] font-primary',
  
  // Body text classes
  'body-large': 'text-[clamp(1.125rem,2vw,1.25rem)] font-[400] leading-[1.6] font-secondary',
  'body-medium': 'text-base font-[400] leading-[1.5] font-secondary',
  'body-small': 'text-sm font-[400] leading-[1.4] font-secondary',
  'body-emphasis': 'text-[clamp(1.125rem,2vw,1.25rem)] font-[500] leading-[1.5] font-secondary',
  
  // Creative text classes
  'text-quote': 'text-[clamp(1.5rem,4vw,2.5rem)] font-[300] leading-[1.4] font-primary italic',
  'text-accent': 'text-[clamp(0.875rem,1.5vw,1rem)] font-[600] leading-[1.3] tracking-[0.05em] font-secondary uppercase',
  'text-caption': 'text-xs font-[500] leading-[1.3] tracking-[0.02em] font-secondary',
  
  // Creative positioning classes
  'text-asymmetrical': 'float-left w-3/5 mr-8 [shape-outside:polygon(0_0,70%_0,100%_100%,0_100%)]',
  'text-circular': 'float-right w-[300px] h-[300px] ml-8 [shape-outside:circle(50%)]',
  'text-diagonal': 'transform skew-y-[-5deg] origin-top-left',
  
  // Spacing classes
  'spacing-dramatic': 'mt-[clamp(3rem,8vw,6rem)] mb-[clamp(2rem,6vw,4rem)]',
  'spacing-tight': 'my-2',
} as const;

// Responsive typography utilities
export const responsiveTypography = {
  // Mobile-first approach
  mobile: {
    hero: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    section: 'text-3xl md:text-4xl lg:text-5xl',
    subsection: 'text-2xl md:text-3xl lg:text-4xl',
    body: 'text-base md:text-lg',
  },
  
  // Tablet optimizations
  tablet: {
    hero: 'text-5xl lg:text-6xl',
    section: 'text-4xl lg:text-5xl',
    body: 'text-lg',
  },
  
  // Desktop enhancements
  desktop: {
    hero: 'text-6xl xl:text-7xl 2xl:text-8xl',
    section: 'text-5xl xl:text-6xl',
    body: 'text-lg xl:text-xl',
  }
} as const;