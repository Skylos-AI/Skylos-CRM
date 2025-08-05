/**
 * Design System Tokens
 * 
 * Centralized design tokens for consistent spacing, colors, typography,
 * and animations across the CRM application.
 */

// Spacing system based on 4px grid
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const

// Semantic color system with accessibility-compliant contrast ratios
export const colors = {
  // Primary brand colors
  primary: {
    25: '#fafbff',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // SIMPLIFIED COLOR SYSTEM - Only primary blue variations allowed
  // Removed semantic colors (success, warning, error, info) to maintain visual consistency
  
  // Neutral colors for backgrounds and text - optimized for dark theme readability
  neutral: {
    0: '#ffffff',
    25: '#fdfdfd',
    50: '#f9fafb',
    75: '#f6f7f8',
    100: '#f3f4f6',
    150: '#eef0f2',
    200: '#e5e7eb',
    250: '#dde0e4',
    300: '#d1d5db',
    350: '#c4c9d0',
    400: '#9ca3af',
    450: '#8b92a5',
    500: '#6b7280',
    550: '#5d6370',
    600: '#4b5563',
    650: '#424954',
    700: '#374151',
    750: '#2f3441',
    800: '#1f2937',
    825: '#1c2532',
    850: '#18212e',
    875: '#151d2a',
    900: '#111827',
    925: '#0f1419',
    950: '#030712',
    975: '#020509',
  },
  
  // SIMPLIFIED PRIORITY SYSTEM - Using only primary blue and neutral variations
  priority: {
    low: {
      bg: '#f8fafc',    // slate-50
      text: '#64748b',  // slate-500
      border: '#e2e8f0', // slate-200
    },
    medium: {
      bg: '#f1f5f9',    // slate-100
      text: '#475569',  // slate-600
      border: '#cbd5e1', // slate-300
    },
    high: {
      bg: '#dbeafe',    // blue-100
      text: '#1e40af',  // blue-800
      border: '#93c5fd', // blue-300
    },
    urgent: {
      bg: '#bfdbfe',    // blue-200
      text: '#1e3a8a',  // blue-900
      border: '#60a5fa', // blue-400
    },
  },
  
  // SIMPLIFIED STAGE COLORS - Using only primary blue variations
  stage: {
    incoming: {
      light: { bg: '#f8fafc', border: '#cbd5e1', text: '#475569' }, // slate variations
      dark: { bg: '#1e293b', border: '#475569', text: '#cbd5e1' },
    },
    decision: {
      light: { bg: '#f1f5f9', border: '#94a3b8', text: '#334155' }, // slate variations
      dark: { bg: '#334155', border: '#64748b', text: '#e2e8f0' },
    },
    negotiation: {
      light: { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af' }, // blue variations
      dark: { bg: '#1e40af', border: '#3b82f6', text: '#dbeafe' },
    },
    final: {
      light: { bg: '#bfdbfe', border: '#60a5fa', text: '#1e3a8a' }, // blue variations
      dark: { bg: '#1e3a8a', border: '#2563eb', text: '#bfdbfe' },
    },
  },
  
  // Dark theme optimized colors
  darkTheme: {
    // Softer backgrounds that are easier on the eyes
    background: {
      primary: '#0a0e1a',      // Very dark blue-gray
      secondary: '#111827',     // Dark gray
      tertiary: '#1f2937',     // Medium dark gray
      elevated: '#374151',     // Lighter gray for cards
    },
    // Better text colors with proper contrast
    text: {
      primary: '#f8fafc',      // Almost white, but softer
      secondary: '#cbd5e1',    // Light gray
      tertiary: '#94a3b8',     // Medium gray
      muted: '#64748b',        // Darker gray for less important text
    },
    // SIMPLIFIED ACCENT - Only blue variations allowed
    accent: {
      blue: '#60a5fa',  // Only blue accent color allowed
    },
    // Border colors that provide subtle separation
    border: {
      subtle: '#1e293b',
      default: '#334155',
      emphasis: '#475569',
    },
  },
} as const

// Typography system
export const typography = {
  fontFamily: {
    primary: ['Winner Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    secondary: ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'], // Keep for backward compatibility
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
} as const

// Animation and transition values
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  scale: {
    hover: '1.02',
    press: '0.98',
    drag: '1.05',
  },
} as const

// Border radius values
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const

// Shadow system
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Component-specific tokens
export const components = {
  card: {
    padding: spacing[6],
    borderRadius: borderRadius.lg,
    shadow: shadows.base,
    hoverShadow: shadows.md,
  },
  button: {
    paddingX: spacing[4],
    paddingY: spacing[2],
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: `all ${animation.duration.fast} ${animation.easing.easeInOut}`,
  },
  input: {
    padding: spacing[3],
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.sm,
    borderWidth: '1px',
  },
  badge: {
    paddingX: spacing[2],
    paddingY: spacing[1],
    borderRadius: borderRadius.base,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
} as const

// Export all tokens as a single object for easy access
export const designTokens = {
  spacing,
  colors,
  typography,
  animation,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  components,
} as const

// Type definitions for better TypeScript support
export type Spacing = keyof typeof spacing
export type Color = keyof typeof colors
export type FontSize = keyof typeof typography.fontSize
export type FontWeight = keyof typeof typography.fontWeight
export type BorderRadius = keyof typeof borderRadius
export type Shadow = keyof typeof shadows
export type ZIndex = keyof typeof zIndex
export type Breakpoint = keyof typeof breakpoints