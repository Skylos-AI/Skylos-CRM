/**
 * Sophisticated Landing Page Design Tokens
 * Color palette: #241b50, #4567b7, #87ceeb, #7a288a, #ffffff, #000000
 */

export const sophisticatedColors = {
  // Primary brand colors
  deepPurple: {
    DEFAULT: '#241b50',
    rgb: '36, 27, 80',
    hsl: '250, 49%, 21%',
    opacity: {
      10: 'rgba(36, 27, 80, 0.1)',
      20: 'rgba(36, 27, 80, 0.2)',
      30: 'rgba(36, 27, 80, 0.3)',
      40: 'rgba(36, 27, 80, 0.4)',
      50: 'rgba(36, 27, 80, 0.5)',
    }
  },
  
  professionalBlue: {
    DEFAULT: '#4567b7',
    rgb: '69, 103, 183',
    hsl: '222, 45%, 49%',
    opacity: {
      10: 'rgba(69, 103, 183, 0.1)',
      20: 'rgba(69, 103, 183, 0.2)',
      30: 'rgba(69, 103, 183, 0.3)',
      40: 'rgba(69, 103, 183, 0.4)',
      50: 'rgba(69, 103, 183, 0.5)',
    }
  },
  
  skyBlue: {
    DEFAULT: '#87ceeb',
    rgb: '135, 206, 235',
    hsl: '197, 71%, 73%',
    opacity: {
      10: 'rgba(135, 206, 235, 0.1)',
      20: 'rgba(135, 206, 235, 0.2)',
      30: 'rgba(135, 206, 235, 0.3)',
      40: 'rgba(135, 206, 235, 0.4)',
      50: 'rgba(135, 206, 235, 0.5)',
    }
  },
  
  richPurple: {
    DEFAULT: '#7a288a',
    rgb: '122, 40, 138',
    hsl: '290, 55%, 35%',
    opacity: {
      10: 'rgba(122, 40, 138, 0.1)',
      20: 'rgba(122, 40, 138, 0.2)',
      30: 'rgba(122, 40, 138, 0.3)',
      40: 'rgba(122, 40, 138, 0.4)',
      50: 'rgba(122, 40, 138, 0.5)',
    }
  },
  
  // Pure colors
  white: '#ffffff',
  black: '#000000',
} as const;

// Color usage utilities
export const colorUsage = {
  // Background applications
  backgrounds: {
    hero: sophisticatedColors.black,
    section: sophisticatedColors.white,
    accent: sophisticatedColors.deepPurple.opacity[10],
    overlay: sophisticatedColors.deepPurple.opacity[20],
  },
  
  // Text applications
  text: {
    primary: sophisticatedColors.black,
    secondary: sophisticatedColors.deepPurple.DEFAULT,
    accent: sophisticatedColors.professionalBlue.DEFAULT,
    inverse: sophisticatedColors.white,
  },
  
  // Button applications
  buttons: {
    primary: {
      background: sophisticatedColors.white,
      border: sophisticatedColors.professionalBlue.DEFAULT,
      text: sophisticatedColors.black,
    },
    secondary: {
      background: sophisticatedColors.black,
      border: sophisticatedColors.skyBlue.DEFAULT,
      text: sophisticatedColors.white,
    },
    accent: {
      background: 'transparent',
      border: sophisticatedColors.richPurple.DEFAULT,
      text: sophisticatedColors.richPurple.DEFAULT,
    }
  },
  
  // Geometric shapes and accents
  shapes: {
    primary: sophisticatedColors.professionalBlue.opacity[20],
    secondary: sophisticatedColors.skyBlue.opacity[15],
    accent: sophisticatedColors.richPurple.opacity[10],
    subtle: sophisticatedColors.deepPurple.opacity[10],
  }
} as const;

// Opacity utilities for elegant accent implementation
export const opacityLevels = {
  subtle: 0.1,
  light: 0.15,
  medium: 0.2,
  strong: 0.3,
} as const;

// CSS custom properties for dynamic usage
export const cssVariables = {
  '--sophisticated-deep-purple': sophisticatedColors.deepPurple.DEFAULT,
  '--sophisticated-professional-blue': sophisticatedColors.professionalBlue.DEFAULT,
  '--sophisticated-sky-blue': sophisticatedColors.skyBlue.DEFAULT,
  '--sophisticated-rich-purple': sophisticatedColors.richPurple.DEFAULT,
  '--sophisticated-white': sophisticatedColors.white,
  '--sophisticated-black': sophisticatedColors.black,
} as const;