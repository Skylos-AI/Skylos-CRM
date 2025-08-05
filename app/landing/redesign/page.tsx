"use client"

import { AsymmetricalHero } from "@/components/landing/asymmetrical-hero"
import { ProblemUrgencySection } from "@/components/landing/problem-urgency-section"
import { CompetitiveDifferentiationSection } from "@/components/landing/competitive-differentiation-section"
import { PainPointSolver } from "@/components/landing/pain-point-solver"
import { DiscoveryProcessSection } from "@/components/landing/discovery-process-section"
import { IndustryCaseStudies } from "@/components/landing/industry-case-studies"
import { FloatingNavigation, SectionProgressIndicator } from "@/components/landing/floating-navigation"
import { PerformanceProvider, usePerformanceFeatures } from "@/components/ui/performance-provider"
import { LazyLoad, LazySection } from "@/components/ui/lazy-load"
import { AccessibleHeading } from "@/components/ui/accessible-heading"
import { AccessibleButton } from "@/components/ui/accessible-button"
import { useAccessibility } from "@/components/ui/accessibility-provider"
import { AccessibilityDevOverlay } from "@/components/ui/accessibility-tester"
import { SectionWrapper } from "@/components/landing/section-wrapper"
import { PageFlowManager } from "@/components/landing/page-flow-manager"
import { MessageConsistency, BrandedCTA, BrandedSpacing } from "@/components/landing/brand-consistency"
import { FinalPolish } from "@/components/landing/final-polish"
import { industries, painPoints, solutions } from "@/lib/mock-data/pain-points"
import { 
  Home, 
  Target, 
  Trophy, 
  Lightbulb, 
  Settings, 
  Users, 
  MessageSquare 
} from "lucide-react"

// Critical images to preload
const criticalImages = [
  { src: '/hero-background.webp', options: { width: 1920, height: 1080, quality: 85 } },
  { src: '/ai-demo-preview.webp', options: { width: 800, height: 600, quality: 80 } },
]

export default function LandingPageRedesign() {
  return (
    <PerformanceProvider 
      enableWebVitals={true}
      preloadCriticalImages={criticalImages}
      enableResourceMonitoring={true}
    >
      <LandingPageContent />
    </PerformanceProvider>
  )
}

function LandingPageContent() {
  const performanceFeatures = usePerformanceFeatures()
  const { announceMessage, prefersReducedMotion } = useAccessibility()
  const navigationSections = [
    {
      id: 'hero',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      href: '#hero'
    },
    {
      id: 'problem',
      label: 'Problem',
      icon: <Target className="w-4 h-4" />,
      href: '#problem'
    },
    {
      id: 'solution',
      label: 'Solution',
      icon: <Lightbulb className="w-4 h-4" />,
      href: '#solution'
    },
    {
      id: 'competitive',
      label: 'Advantages',
      icon: <Trophy className="w-4 h-4" />,
      href: '#competitive'
    },
    {
      id: 'process',
      label: 'Process',
      icon: <Settings className="w-4 h-4" />,
      href: '#process'
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      icon: <Users className="w-4 h-4" />,
      href: '#case-studies'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '#contact'
    }
  ]

  const handleExitIntent = () => {
    // Track exit intent for analytics
    console.log('Exit intent detected')
  }

  return (
    <FinalPolish>
      <PageFlowManager 
        enableSmoothTransitions={true}
        enableProgressTracking={true}
        onSectionChange={(sectionId) => {
          console.log('Current section:', sectionId)
          // Track section views for analytics
        }}
      >
        <div className="min-h-screen bg-background">
        {/* Section Progress Indicator */}
        <SectionProgressIndicator sections={navigationSections} />

        {/* Floating Navigation */}
        <FloatingNavigation 
          sections={navigationSections}
          position="right"
          showProgress={true}
          showScrollToTop={true}
          exitIntentEnabled={true}
          onExitIntent={handleExitIntent}
        />

        {/* Hero Section */}
        <SectionWrapper 
          id="hero" 
          background="gradient" 
          padding="xl"
          enableAnimation={false}
          fullWidth={true}
        >
          <AsymmetricalHero 
            titlePosition="left"
            headline="Stop Losing to Competitors Who Already Use AI"
            subheadline="Get custom conversational agents tailored to your business needs - deployed in days, not months"
            ctaButtons={[
              {
                text: "Start Your AI Transformation",
                variant: "primary",
                href: "/signup"
              },
              {
                text: "See How It Works", 
                variant: "secondary",
                href: "#solution"
              }
            ]}
          />
        </SectionWrapper>

        {/* Problem/Urgency Section */}
        <SectionWrapper 
          id="problem" 
          background="white" 
          padding="lg"
          animationType="slideUp"
        >
          <MessageConsistency section="problem" />
          <LazyLoad rootMargin="100px">
            <ProblemUrgencySection />
          </LazyLoad>
        </SectionWrapper>

        <BrandedSpacing size="md" />

        {/* Solution Section */}
        <SectionWrapper 
          id="solution" 
          background="gray" 
          padding="lg"
          animationType="fadeIn"
        >
          <MessageConsistency section="solution">
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <BrandedCTA variant="primary" size="lg" href="#competitive">
                See Our Advantages
              </BrandedCTA>
              <BrandedCTA variant="outline" size="lg" href="#process">
                Learn Our Process
              </BrandedCTA>
            </div>
          </MessageConsistency>
        </SectionWrapper>

        <BrandedSpacing size="lg" />

        {/* Competitive Differentiation Section */}
        <SectionWrapper 
          id="competitive" 
          background="white" 
          padding="lg"
          animationType="slideLeft"
        >
          <MessageConsistency section="competitive" />
          <LazyLoad rootMargin="100px">
            <CompetitiveDifferentiationSection />
          </LazyLoad>
        </SectionWrapper>

        <BrandedSpacing size="md" />

        {/* Pain Point Solver Section */}
        <SectionWrapper 
          id="painpoints" 
          background="gradient" 
          padding="lg"
          animationType="slideRight"
        >
          <MessageConsistency section="painpoints" />
          <LazyLoad rootMargin="100px">
            <PainPointSolver 
              industries={industries}
              painPoints={painPoints}
              solutions={solutions}
            />
          </LazyLoad>
        </SectionWrapper>

        <BrandedSpacing size="lg" />

        {/* Discovery Process Section */}
        <SectionWrapper 
          id="process" 
          background="white" 
          padding="lg"
          animationType="fadeIn"
        >
          <MessageConsistency section="process" />
          <LazyLoad rootMargin="100px">
            <DiscoveryProcessSection />
          </LazyLoad>
        </SectionWrapper>

        <BrandedSpacing size="md" />

        {/* Industry Case Studies */}
        <SectionWrapper 
          id="case-studies" 
          background="gray" 
          padding="lg"
          animationType="slideUp"
        >
          <MessageConsistency section="social" />
          <LazyLoad rootMargin="100px">
            <IndustryCaseStudies />
          </LazyLoad>
        </SectionWrapper>

        <BrandedSpacing size="lg" />

        {/* Contact Section */}
        <SectionWrapper 
          id="contact" 
          background="primary" 
          padding="xl"
          animationType="fadeIn"
          fullWidth={true}
        >
          <MessageConsistency section="contact">
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <BrandedCTA 
                variant="secondary" 
                size="xl"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Schedule Free Consultation
              </BrandedCTA>
              <BrandedCTA 
                variant="outline" 
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
              >
                Download Case Studies
              </BrandedCTA>
            </div>
          </MessageConsistency>
        </SectionWrapper>

        {/* Development-only accessibility testing overlay */}
        <AccessibilityDevOverlay />
        </div>
      </PageFlowManager>
    </FinalPolish>
  )
}