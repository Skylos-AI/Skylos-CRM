'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

// Mobile-optimized asymmetrical layout wrapper
interface ResponsiveAsymmetricalLayoutProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  mobileStack?: boolean;
  className?: string;
}

export function ResponsiveAsymmetricalLayout({
  children,
  direction = 'left',
  mobileStack = true,
  className = ''
}: ResponsiveAsymmetricalLayoutProps) {
  return (
    <div className={`
      ${mobileStack ? 'flex flex-col lg:flex-row' : 'grid grid-cols-1 lg:grid-cols-2'}
      ${direction === 'right' ? 'lg:flex-row-reverse' : ''}
      gap-6 lg:gap-12 items-center
      ${className}
    `}>
      {children}
    </div>
  );
}

// Touch-friendly interactive elements
interface TouchFriendlyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'touch' | 'large-touch';
  className?: string;
  disabled?: boolean;
}

export function TouchFriendlyButton({
  children,
  onClick,
  variant = 'primary',
  size = 'touch',
  className = '',
  disabled = false
}: TouchFriendlyButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantStyles = {
    primary: 'bg-sophisticated-professional-blue text-sophisticated-white border-sophisticated-professional-blue',
    secondary: 'bg-sophisticated-white text-sophisticated-professional-blue border-sophisticated-professional-blue',
    accent: 'bg-transparent text-sophisticated-rich-purple border-sophisticated-rich-purple'
  };

  const sizeStyles = {
    touch: 'min-h-[48px] px-6 py-3 text-base', // 48px minimum for touch targets
    'large-touch': 'min-h-[56px] px-8 py-4 text-lg' // 56px for better accessibility
  };

  return (
    <motion.button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
        border-2 rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-sophisticated-professional-blue/30
        active:scale-95 touch-manipulation
      `}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// Responsive typography that scales appropriately
interface ResponsiveTypographyProps {
  children: React.ReactNode;
  variant: 'hero' | 'section' | 'subsection' | 'body';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function ResponsiveTypography({
  children,
  variant,
  className = '',
  as: Component = 'div'
}: ResponsiveTypographyProps) {
  const responsiveClasses = {
    hero: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight',
    section: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    subsection: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight',
    body: 'text-base sm:text-lg md:text-xl leading-relaxed'
  };

  return (
    <Component className={`${responsiveClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}

// Mobile-optimized card layout
interface ResponsiveCardGridProps {
  children: React.ReactNode;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ResponsiveCardGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = ''
}: ResponsiveCardGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const gridClasses = `
    grid
    grid-cols-${columns.mobile}
    md:grid-cols-${columns.tablet}
    lg:grid-cols-${columns.desktop}
    ${gapClasses[gap]}
  `;

  return (
    <div className={`${gridClasses} ${className}`}>
      {children}
    </div>
  );
}

// Tablet-optimized layout component
interface TabletOptimizedLayoutProps {
  children: React.ReactNode;
  layout: 'stacked' | 'side-by-side' | 'asymmetrical';
  className?: string;
}

export function TabletOptimizedLayout({
  children,
  layout,
  className = ''
}: TabletOptimizedLayoutProps) {
  const layoutClasses = {
    stacked: 'flex flex-col space-y-8',
    'side-by-side': 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center',
    asymmetrical: 'grid grid-cols-1 md:grid-cols-3 gap-6 items-start'
  };

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {children}
    </div>
  );
}

// Cross-device consistency wrapper
interface CrossDeviceWrapperProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CrossDeviceWrapper({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = ''
}: CrossDeviceWrapperProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    sm: 'px-4 py-8',
    md: 'px-6 py-12',
    lg: 'px-8 py-16'
  };

  return (
    <div className={`
      ${maxWidthClasses[maxWidth]}
      ${paddingClasses[padding]}
      mx-auto w-full
      ${className}
    `}>
      {children}
    </div>
  );
}

// Mobile navigation optimized for sophisticated design
interface MobileNavigationProps {
  sections: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  currentSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

export function MobileNavigation({
  sections,
  currentSection,
  onSectionClick
}: MobileNavigationProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-sophisticated-white/90 backdrop-blur-sm border border-sophisticated-black/10 rounded-2xl p-2 shadow-lg">
        <div className="flex justify-between space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick?.(section.id)}
              className={`
                flex-1 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200
                ${currentSection === section.id
                  ? 'bg-sophisticated-professional-blue text-sophisticated-white'
                  : 'text-sophisticated-black/70 hover:bg-sophisticated-professional-blue/10'
                }
              `}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Responsive image component with sophisticated styling
interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
  objectFit?: 'cover' | 'contain' | 'fill';
  className?: string;
  priority?: boolean;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio = 'video',
  objectFit = 'cover',
  className = '',
  priority = false
}: ResponsiveImageProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div className={`${aspectRatioClasses[aspectRatio]} overflow-hidden rounded-xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-${objectFit} transition-transform duration-300 hover:scale-105`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

// Mobile-optimized form components
interface MobileOptimizedFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function MobileOptimizedForm({
  children,
  onSubmit,
  className = ''
}: MobileOptimizedFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 ${className}`}
    >
      {children}
    </form>
  );
}

interface MobileOptimizedInputProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export function MobileOptimizedInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = ''
}: MobileOptimizedInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`
        w-full min-h-[48px] px-4 py-3 text-base
        bg-sophisticated-white border-2 border-sophisticated-black/20
        rounded-lg transition-all duration-200
        focus:outline-none focus:border-sophisticated-professional-blue
        focus:ring-4 focus:ring-sophisticated-professional-blue/20
        placeholder:text-sophisticated-black/50
        ${className}
      `}
    />
  );
}

// Responsive spacing utility
interface ResponsiveSpacingProps {
  children: React.ReactNode;
  spacing?: {
    mobile: 'sm' | 'md' | 'lg';
    tablet: 'sm' | 'md' | 'lg';
    desktop: 'sm' | 'md' | 'lg';
  };
  className?: string;
}

export function ResponsiveSpacing({
  children,
  spacing = { mobile: 'md', tablet: 'lg', desktop: 'lg' },
  className = ''
}: ResponsiveSpacingProps) {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-8',
    lg: 'space-y-12'
  };

  return (
    <div className={`
      ${spacingClasses[spacing.mobile]}
      md:${spacingClasses[spacing.tablet]}
      lg:${spacingClasses[spacing.desktop]}
      ${className}
    `}>
      {children}
    </div>
  );
}