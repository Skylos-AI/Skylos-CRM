"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FloatingPaths } from "./floating-paths";
import { AnimatedText, AnimatedSubtitle } from "./text-animation";
import { AnimatedCTAButton } from "./animated-cta-button";
import { AnimatedHeroHeaderProps } from "./types";
import { DEFAULT_CONTENT } from "./constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HERO_ARIA_LABELS } from "@/lib/accessibility/hero-accessibility";
import { AnimationOptimizer } from "@/lib/performance/animation-performance";
import { cn } from "@/lib/utils";

export function AnimatedHeroHeader({
  title = DEFAULT_CONTENT.title,
  subtitle = DEFAULT_CONTENT.subtitle,
  ctaText = DEFAULT_CONTENT.ctaText,
  ctaHref = DEFAULT_CONTENT.ctaHref,
  onCtaClick,
  theme = 'auto',
  className = "",
}: AnimatedHeroHeaderProps) {
  const { theme: systemTheme, setTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const [shouldOptimize, setShouldOptimize] = useState(false);

  // Performance optimization check
  useEffect(() => {
    AnimationOptimizer.shouldReduceAnimations().then(setShouldOptimize);
    AnimationOptimizer.optimizeForDevice();
  }, []);

  // Handle theme setting
  useEffect(() => {
    if (theme !== 'auto') {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  const currentTheme = theme === 'auto' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  const shouldReduceAnimations = reducedMotion || shouldOptimize;

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <section 
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
        isDark ? "bg-white" : "bg-neutral-950",
        className
      )}
      aria-label={HERO_ARIA_LABELS.heroSection}
      role="banner"
    >
      {/* Background Floating Paths */}
      <div aria-hidden="true" aria-label={HERO_ARIA_LABELS.backgroundAnimation}>
        <FloatingPaths 
          position={1} 
          reducedMotion={shouldReduceAnimations}
          className="opacity-60"
        />
        <FloatingPaths 
          position={-1} 
          reducedMotion={shouldReduceAnimations}
          className="opacity-40"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Title */}
        <h1 aria-label={HERO_ARIA_LABELS.heroTitle}>
          <AnimatedText
            text={title}
            reducedMotion={shouldReduceAnimations}
            className={cn(
              // Mobile-first responsive typography
              "text-5xl sm:text-7xl md:text-8xl font-bold",
              "leading-tight tracking-tighter mb-8",
              // Improved mobile spacing
              "px-2 sm:px-0",
              // Gradient text effect like the reference
              "text-transparent bg-clip-text bg-gradient-to-r",
              isDark 
                ? "from-neutral-900 to-neutral-700/80" 
                : "from-white to-white/80"
            )}
          />
        </h1>

        {/* Animated Subtitle */}
        <div aria-label={HERO_ARIA_LABELS.heroSubtitle}>
          <AnimatedSubtitle
            text={subtitle}
            reducedMotion={shouldReduceAnimations}
            delay={1}
            className={cn(
              // Mobile-optimized typography
              "text-base sm:text-lg md:text-xl lg:text-2xl",
              "max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto",
              "mb-8 sm:mb-10 md:mb-12",
              "leading-relaxed px-4 sm:px-0",
              isDark ? "text-neutral-600" : "text-white/80"
            )}
          />
        </div>

        {/* Animated CTA Button */}
        <div aria-label={HERO_ARIA_LABELS.ctaButton}>
          <AnimatedCTAButton
            text={ctaText}
            onClick={handleCtaClick}
            href={ctaHref}
            reducedMotion={shouldReduceAnimations}
            delay={1.5}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Gradient Overlay for Better Text Readability */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none",
          isDark 
            ? "bg-gradient-to-b from-white/5 via-transparent to-white/5"
            : "bg-gradient-to-b from-neutral-950/5 via-transparent to-neutral-950/5"
        )}
      />
    </section>
  );
}