import { sophisticatedColors, opacityLevels } from './sophisticated-tokens';

/**
 * Utility functions for sophisticated color system
 */

// Generate opacity variants for any color
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Get sophisticated color with opacity
export const getSophisticatedColor = (
  colorKey: keyof typeof sophisticatedColors,
  opacity?: keyof typeof opacityLevels
): string => {
  const baseColor = sophisticatedColors[colorKey];
  
  if (typeof baseColor === 'string') {
    return opacity ? withOpacity(baseColor, opacityLevels[opacity]) : baseColor;
  }
  
  return baseColor.DEFAULT;
};

// Generate CSS classes for sophisticated colors
export const sophisticatedClasses = {
  // Background classes
  bg: {
    deepPurple: 'bg-sophisticated-deep-purple',
    professionalBlue: 'bg-sophisticated-professional-blue',
    skyBlue: 'bg-sophisticated-sky-blue',
    richPurple: 'bg-sophisticated-rich-purple',
    white: 'bg-sophisticated-white',
    black: 'bg-sophisticated-black',
  },
  
  // Text classes
  text: {
    deepPurple: 'text-sophisticated-deep-purple',
    professionalBlue: 'text-sophisticated-professional-blue',
    skyBlue: 'text-sophisticated-sky-blue',
    richPurple: 'text-sophisticated-rich-purple',
    white: 'text-sophisticated-white',
    black: 'text-sophisticated-black',
  },
  
  // Border classes
  border: {
    deepPurple: 'border-sophisticated-deep-purple',
    professionalBlue: 'border-sophisticated-professional-blue',
    skyBlue: 'border-sophisticated-sky-blue',
    richPurple: 'border-sophisticated-rich-purple',
    white: 'border-sophisticated-white',
    black: 'border-sophisticated-black',
  },
} as const;

// Button style generators
export const generateButtonStyles = (variant: 'primary' | 'secondary' | 'accent') => {
  const styles = {
    primary: {
      base: 'bg-sophisticated-white border-sophisticated-professional-blue text-sophisticated-black',
      hover: 'hover:bg-sophisticated-professional-blue/10 hover:border-sophisticated-professional-blue',
      active: 'active:bg-sophisticated-professional-blue/20',
    },
    secondary: {
      base: 'bg-sophisticated-black border-sophisticated-sky-blue text-sophisticated-white',
      hover: 'hover:bg-sophisticated-sky-blue/10 hover:border-sophisticated-sky-blue',
      active: 'active:bg-sophisticated-sky-blue/20',
    },
    accent: {
      base: 'bg-transparent border-sophisticated-rich-purple text-sophisticated-rich-purple',
      hover: 'hover:bg-sophisticated-rich-purple/10 hover:border-sophisticated-rich-purple',
      active: 'active:bg-sophisticated-rich-purple/20',
    },
  };
  
  return `${styles[variant].base} ${styles[variant].hover} ${styles[variant].active}`;
};

// Geometric shape style generators
export const generateShapeStyles = (
  shape: 'circle' | 'square' | 'triangle',
  color: keyof typeof sophisticatedColors,
  opacity: keyof typeof opacityLevels = 'light'
) => {
  const baseColor = getSophisticatedColor(color, opacity);
  
  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'clip-path-triangle',
  };
  
  return {
    backgroundColor: baseColor,
    className: shapeStyles[shape],
  };
};

// Gradient generators using sophisticated colors
export const sophisticatedGradients = {
  hero: `linear-gradient(135deg, ${sophisticatedColors.black} 0%, ${sophisticatedColors.deepPurple.DEFAULT} 100%)`,
  accent: `linear-gradient(45deg, ${sophisticatedColors.professionalBlue.opacity[20]} 0%, ${sophisticatedColors.skyBlue.opacity[15]} 100%)`,
  subtle: `linear-gradient(180deg, ${sophisticatedColors.white} 0%, ${sophisticatedColors.deepPurple.opacity[10]} 100%)`,
  diagonal: `linear-gradient(45deg, ${sophisticatedColors.richPurple.opacity[10]} 0%, ${sophisticatedColors.professionalBlue.opacity[15]} 100%)`,
} as const;