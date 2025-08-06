import React from 'react';
import { cn } from '@/lib/utils';
import { sophisticatedTypographyClasses } from '@/lib/design-system/sophisticated-typography';

interface SophisticatedTextProps {
  variant: keyof typeof sophisticatedTypographyClasses;
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  creative?: 'asymmetrical' | 'circular' | 'diagonal';
  spacing?: 'dramatic' | 'tight';
}

export function SophisticatedText({
  variant,
  children,
  className,
  as: Component = 'div',
  creative,
  spacing,
  ...props
}: SophisticatedTextProps) {
  const baseClass = sophisticatedTypographyClasses[variant];
  const creativeClass = creative ? sophisticatedTypographyClasses[`text-${creative}`] : '';
  const spacingClass = spacing ? sophisticatedTypographyClasses[`spacing-${spacing}`] : '';

  return (
    <Component
      className={cn(baseClass, creativeClass, spacingClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// Specialized components for common use cases
export function HeroHeading({ children, className, ...props }: Omit<SophisticatedTextProps, 'variant'>) {
  return (
    <SophisticatedText
      variant="heading-hero"
      as="h1"
      className={className}
      {...props}
    >
      {children}
    </SophisticatedText>
  );
}

export function SectionHeading({ children, className, ...props }: Omit<SophisticatedTextProps, 'variant'>) {
  return (
    <SophisticatedText
      variant="heading-section"
      as="h2"
      className={className}
      {...props}
    >
      {children}
    </SophisticatedText>
  );
}

export function CreativeQuote({ children, className, ...props }: Omit<SophisticatedTextProps, 'variant'>) {
  return (
    <SophisticatedText
      variant="text-quote"
      as="blockquote"
      className={className}
      {...props}
    >
      {children}
    </SophisticatedText>
  );
}

export function AccentText({ children, className, ...props }: Omit<SophisticatedTextProps, 'variant'>) {
  return (
    <SophisticatedText
      variant="text-accent"
      as="span"
      className={className}
      {...props}
    >
      {children}
    </SophisticatedText>
  );
}

// Creative text wrapper for flowing around visual elements
interface CreativeTextWrapperProps {
  children: React.ReactNode;
  wrapStyle: 'asymmetrical' | 'circular';
  className?: string;
}

export function CreativeTextWrapper({ children, wrapStyle, className }: CreativeTextWrapperProps) {
  return (
    <div className={cn(sophisticatedTypographyClasses[`text-${wrapStyle}`], className)}>
      {children}
    </div>
  );
}

// Staggered text container for visual interest
interface StaggeredTextProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggeredText({ children, className }: StaggeredTextProps) {
  return (
    <div className={cn(
      '[&>*:nth-child(odd)]:ml-8 [&>*:nth-child(even)]:mr-8',
      className
    )}>
      {children}
    </div>
  );
}

// Creative line break component
interface CreativeLineBreakProps {
  lines: string[];
  className?: string;
  variant?: 'hero' | 'section' | 'subsection';
}

export function CreativeLineBreak({ lines, className, variant = 'hero' }: CreativeLineBreakProps) {
  const variantClass = sophisticatedTypographyClasses[`heading-${variant}`];
  
  return (
    <div className={cn(variantClass, className)}>
      {lines.map((line, index) => (
        <div
          key={index}
          className={cn(
            'block',
            index % 2 === 0 ? 'text-left' : 'text-right',
            index > 0 && 'mt-2'
          )}
        >
          {line}
        </div>
      ))}
    </div>
  );
}