"use client";

import { AnimatedHeroHeader } from "./animated-hero-header";
import { CRM_CONTENT_OPTIONS } from "./constants";

interface AIHeroConfigProps {
  variant?: 'transform' | 'supercharge' | 'grow' | 'success';
  onCtaClick?: () => void;
  className?: string;
}

export function AIHeroConfig({ 
  variant = 'transform', 
  onCtaClick,
  className = "" 
}: AIHeroConfigProps) {
  
  const contentMap = {
    transform: {
      title: "Ready to Deploy AI in Your Business?",
      subtitle: "Build, manage, and scale your AI workforce. Deploy custom conversational agents tailored to your business needs - in days, not months",
      ctaText: "Join Exclusive Whitelist"
    },
    supercharge: {
      title: "Stop Losing to AI-Powered Competitors",
      subtitle: "Get custom AI agents that automate processes, handle customer interactions, and scale your operations while you focus on growth",
      ctaText: "Get Early Access"
    },
    grow: {
      title: "Build Your AI Team Today", 
      subtitle: "Create intelligent agents that work 24/7, handle complex tasks, and integrate seamlessly with your existing business processes",
      ctaText: "Deploy AI Now"
    },
    success: {
      title: "The Future of Business is AI-First",
      subtitle: "Join forward-thinking companies already using AI to automate workflows, boost productivity, and stay ahead of the competition",
      ctaText: "Start Building"
    }
  };

  const content = contentMap[variant];

  const handleCtaClick = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: 'hero_cta',
        value: 1
      });
    }

    // Custom analytics tracking
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('Hero CTA Clicked', {
        variant,
        ctaText: content.ctaText,
        timestamp: new Date().toISOString()
      });
    }

    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <AnimatedHeroHeader
      title={content.title}
      subtitle={content.subtitle}
      ctaText={content.ctaText}
      ctaHref="/dashboard"
      onCtaClick={handleCtaClick}
      className={className}
    />
  );
}

// Conversion tracking utilities
export const trackHeroConversion = (variant: string, action: string) => {
  // Google Analytics 4 tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'ai_hero_section',
      event_label: `${variant}_${action}`,
      value: 1
    });
  }

  // Custom analytics
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track('AI Hero Conversion', {
      variant,
      action,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
  }
};

// A/B testing configuration for AI-focused messaging
export const AI_HERO_AB_VARIANTS = {
  control: 'transform',        // "Ready to Deploy AI in Your Business?"
  variant_a: 'supercharge',    // "Stop Losing to AI-Powered Competitors"
  variant_b: 'grow',          // "Build Your AI Team Today"
  variant_c: 'success'        // "The Future of Business is AI-First"
} as const;

export type AIHeroVariant = keyof typeof AI_HERO_AB_VARIANTS;

// Keep the old exports for backward compatibility
export const CRMHeroConfig = AIHeroConfig;
export const HERO_AB_VARIANTS = AI_HERO_AB_VARIANTS;
export type HeroVariant = AIHeroVariant;