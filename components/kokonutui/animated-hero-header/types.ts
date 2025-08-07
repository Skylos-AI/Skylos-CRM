// TypeScript interfaces for animated hero header components

export interface FloatingPathsProps {
  position: number; // 1 or -1 for directional variation
  reducedMotion?: boolean; // Accessibility consideration
  className?: string;
}

export interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: () => void;
  className?: string;
}

export interface AnimatedHeroHeaderProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

export interface AnimationConfig {
  letterDelay: number; // 0.03s between letters
  wordDelay: number; // 0.1s between words
  springConfig: {
    stiffness: number;
    damping: number;
  };
  pathAnimationDuration: number; // 20-30s randomized
}

export interface HeroContent {
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
}