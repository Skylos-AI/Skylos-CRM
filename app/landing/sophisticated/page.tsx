'use client';

import React, { useState } from 'react';
import { SophisticatedHero } from '@/components/landing/sophisticated-hero';
import { SophisticatedAIChallenge } from '@/components/landing/sophisticated-ai-challenge';
import { SophisticatedAISolutions } from '@/components/landing/sophisticated-ai-solutions';
import { SophisticatedProcessVisualization } from '@/components/landing/sophisticated-process-visualization';
import { SophisticatedResultsSection } from '@/components/landing/sophisticated-results-section';
import { SophisticatedFinalCTA } from '@/components/landing/sophisticated-final-cta';
import { SophisticatedNavigation } from '@/components/navigation/sophisticated-navigation';
import { SophisticatedIntegration, SectionTransitionManager, BrandConsistencyWrapper } from '@/components/landing/sophisticated-integration';
import { AnimationPerformanceMonitor } from '@/components/animations/sophisticated-scroll-trigger';
import { 
  Home, 
  Target, 
  Lightbulb, 
  Settings, 
  BarChart3,
  MessageSquare 
} from 'lucide-react';

export default function SophisticatedLandingPage() {
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);

  const handleWhitelistClick = () => {
    setShowWhitelistModal(true);
  };

  const handleLearnMoreClick = () => {
    // Smooth scroll to next section
    const nextSection = document.getElementById('ai-challenge');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigationSections = [
    {
      id: 'hero',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      href: '#hero'
    },
    {
      id: 'ai-challenge',
      label: 'Challenge',
      icon: <Target className="w-5 h-5" />,
      href: '#ai-challenge'
    },
    {
      id: 'ai-solutions',
      label: 'Solutions',
      icon: <Lightbulb className="w-5 h-5" />,
      href: '#ai-solutions'
    },
    {
      id: 'ai-process',
      label: 'Process',
      icon: <Settings className="w-5 h-5" />,
      href: '#ai-process'
    },
    {
      id: 'results',
      label: 'Results',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '#results'
    },
    {
      id: 'final-cta',
      label: 'Get Started',
      icon: <MessageSquare className="w-5 h-5" />,
      href: '#final-cta'
    }
  ];

  return (
    <SophisticatedIntegration
      enablePerformanceMonitoring={true}
      enableAccessibilityEnhancements={true}
      enableMobileOptimizations={true}
    >
      <BrandConsistencyWrapper>
        <SectionTransitionManager>
          <div className="min-h-screen">
            {/* Performance Monitor (development only) */}
            <AnimationPerformanceMonitor />

            {/* Sophisticated Navigation */}
            <SophisticatedNavigation
              sections={navigationSections}
              position="right"
              showProgress={true}
              exitIntentEnabled={true}
            />

      {/* Sophisticated Hero Section */}
      <section id="hero">
        <SophisticatedHero
          titlePosition="left"
          headline="Stop Losing to Competitors Who Already Use AI"
          subheadline="Get custom conversational agents tailored to your business needs - deployed in days, not months. Transform your business with AI implementation that actually works."
          badge={{
            text: "AI TRANSFORMATION",
            variant: "professional"
          }}
          ctaButtons={[
            {
              text: "Join Exclusive Whitelist",
              variant: "primary",
              href: "#whitelist",
              onClick: handleWhitelistClick
            },
            {
              text: "Discover AI Solutions",
              variant: "secondary",
              href: "#ai-challenge",
              onClick: handleLearnMoreClick
            }
          ]}
        />
      </section>

      {/* AI Business Challenge Section */}
      <section id="ai-challenge">
        <SophisticatedAIChallenge />
      </section>

      {/* Custom AI Solutions Showcase */}
      <section id="ai-solutions">
        <SophisticatedAISolutions />
      </section>

      {/* AI Implementation Process Visualization */}
      <section id="ai-process">
        <SophisticatedProcessVisualization />
      </section>

      {/* Results and Transformation Section */}
      <section id="results">
        <SophisticatedResultsSection />
      </section>

            {/* Final CTA Section */}
            <section id="final-cta">
              <SophisticatedFinalCTA />
            </section>
          </div>
        </SectionTransitionManager>
      </BrandConsistencyWrapper>
    </SophisticatedIntegration>
  );
}