'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Creative Button Designs
interface SophisticatedCreativeButtonProps {
  children: React.ReactNode;
  variant?: 'outlined-accent' | 'white-colored-border' | 'black-white-text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function SophisticatedCreativeButton({
  children,
  variant = 'outlined-accent',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'left',
}: SophisticatedCreativeButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    'outlined-accent': {
      base: 'bg-transparent border-2 border-sophisticated-professional-blue text-sophisticated-professional-blue',
      hover: 'hover:bg-sophisticated-professional-blue hover:text-sophisticated-white',
      accent: 'hover:shadow-[0_0_20px_rgba(69,103,183,0.3)]'
    },
    'white-colored-border': {
      base: 'bg-sophisticated-white border-2 border-sophisticated-sky-blue text-sophisticated-black',
      hover: 'hover:bg-sophisticated-sky-blue/10 hover:border-sophisticated-professional-blue',
      accent: 'hover:shadow-[0_0_20px_rgba(135,206,235,0.3)]'
    },
    'black-white-text': {
      base: 'bg-sophisticated-black border-2 border-sophisticated-rich-purple text-sophisticated-white',
      hover: 'hover:bg-sophisticated-rich-purple hover:border-sophisticated-rich-purple',
      accent: 'hover:shadow-[0_0_20px_rgba(122,40,138,0.3)]'
    }
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const currentVariant = variantStyles[variant];

  return (
    <motion.button
      className={`
        ${currentVariant.base}
        ${currentVariant.hover}
        ${currentVariant.accent}
        ${sizeStyles[size]}
        ${className}
        rounded-lg font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-sophisticated-professional-blue/50
        relative overflow-hidden group
      `}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative flex items-center justify-center space-x-2">
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
    </motion.button>
  );
}

// Geometric Shapes with Strategic Placement
interface GeometricShapeProps {
  shape: 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon';
  size?: number;
  color: keyof typeof sophisticatedColors;
  opacity?: number;
  className?: string;
  animated?: boolean;
  animationType?: 'float' | 'rotate' | 'pulse' | 'morph';
}

export function GeometricShape({
  shape,
  size = 100,
  color,
  opacity = 0.15,
  className = '',
  animated = true,
  animationType = 'float'
}: GeometricShapeProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const getShapeStyles = () => {
    const baseColor = sophisticatedColors[color] as any;
    const shapeColor = typeof baseColor === 'string' ? baseColor : baseColor.DEFAULT;
    
    const shapeStyles = {
      circle: {
        borderRadius: '50%',
        backgroundColor: `rgba(${getRGBFromHex(shapeColor)}, ${opacity})`
      },
      square: {
        borderRadius: '12px',
        backgroundColor: `rgba(${getRGBFromHex(shapeColor)}, ${opacity})`
      },
      triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderBottom: `${size}px solid rgba(${getRGBFromHex(shapeColor)}, ${opacity})`
      },
      diamond: {
        transform: 'rotate(45deg)',
        borderRadius: '8px',
        backgroundColor: `rgba(${getRGBFromHex(shapeColor)}, ${opacity})`
      },
      hexagon: {
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        backgroundColor: `rgba(${getRGBFromHex(shapeColor)}, ${opacity})`
      }
    };
    
    return shapeStyles[shape];
  };

  const getAnimationVariants = () => {
    if (shouldReduceMotion || !animated) return {};
    
    const animations = {
      float: {
        y: [-10, 10, -10],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      },
      rotate: {
        rotate: [0, 360],
        transition: { duration: 20, repeat: Infinity, ease: "linear" }
      },
      pulse: {
        scale: [1, 1.1, 1],
        opacity: [opacity, opacity * 1.5, opacity],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      },
      morph: {
        borderRadius: ['50%', '25%', '50%'],
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }
    };
    
    return animations[animationType] || animations.float;
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: shape === 'triangle' ? size : size,
        height: shape === 'triangle' ? size : size,
        ...getShapeStyles()
      }}
      animate={getAnimationVariants()}
    />
  );
}

// Diagonal Sections and Angled Dividers
interface DiagonalSectionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  angle?: number;
  backgroundColor?: string;
  className?: string;
}

export function DiagonalSection({
  children,
  direction = 'right',
  angle = 3,
  backgroundColor = sophisticatedColors.white,
  className = ''
}: DiagonalSectionProps) {
  const skewValue = direction === 'right' ? angle : -angle;
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ backgroundColor }}
    >
      {/* Diagonal top edge */}
      <div 
        className="absolute top-0 left-0 w-full h-16 -mt-16"
        style={{
          backgroundColor,
          transform: `skewY(${skewValue}deg)`,
          transformOrigin: 'top left'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Diagonal bottom edge */}
      <div 
        className="absolute bottom-0 left-0 w-full h-16 -mb-16"
        style={{
          backgroundColor,
          transform: `skewY(${-skewValue}deg)`,
          transformOrigin: 'bottom left'
        }}
      />
    </div>
  );
}

// Floating Elements Container
interface FloatingElementsContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingElementsContainer({
  children,
  className = ''
}: FloatingElementsContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Floating geometric shapes */}
      <GeometricShape
        shape="circle"
        size={80}
        color="professionalBlue"
        opacity={0.1}
        className="top-10 left-10"
        animationType="float"
      />
      <GeometricShape
        shape="square"
        size={60}
        color="skyBlue"
        opacity={0.15}
        className="top-20 right-20"
        animationType="rotate"
      />
      <GeometricShape
        shape="triangle"
        size={70}
        color="richPurple"
        opacity={0.12}
        className="bottom-20 left-1/4"
        animationType="pulse"
      />
      <GeometricShape
        shape="diamond"
        size={50}
        color="deepPurple"
        opacity={0.1}
        className="bottom-10 right-10"
        animationType="morph"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Subtle Background Patterns
interface SubtleBackgroundPatternProps {
  pattern: 'dots' | 'grid' | 'diagonal-lines' | 'hexagons';
  color?: keyof typeof sophisticatedColors;
  opacity?: number;
  className?: string;
}

export function SubtleBackgroundPattern({
  pattern,
  color = 'professionalBlue',
  opacity = 0.05,
  className = ''
}: SubtleBackgroundPatternProps) {
  const baseColor = sophisticatedColors[color] as any;
  const patternColor = typeof baseColor === 'string' ? baseColor : baseColor.DEFAULT;
  
  const patterns = {
    dots: `radial-gradient(circle, rgba(${getRGBFromHex(patternColor)}, ${opacity}) 1px, transparent 1px)`,
    grid: `linear-gradient(rgba(${getRGBFromHex(patternColor)}, ${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(${getRGBFromHex(patternColor)}, ${opacity}) 1px, transparent 1px)`,
    'diagonal-lines': `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(${getRGBFromHex(patternColor)}, ${opacity}) 10px, rgba(${getRGBFromHex(patternColor)}, ${opacity}) 11px)`,
    hexagons: `radial-gradient(circle at 50% 50%, rgba(${getRGBFromHex(patternColor)}, ${opacity}) 2px, transparent 2px)`
  };
  
  const backgroundSizes = {
    dots: '20px 20px',
    grid: '20px 20px',
    'diagonal-lines': '20px 20px',
    hexagons: '30px 30px'
  };
  
  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: patterns[pattern],
        backgroundSize: backgroundSizes[pattern],
        backgroundRepeat: 'repeat'
      }}
    />
  );
}

// Utility function to convert hex to RGB
function getRGBFromHex(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}