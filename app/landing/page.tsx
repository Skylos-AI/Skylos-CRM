"use client"

import { AIHeroConfig } from "@/components/kokonutui/animated-hero-header/crm-content-config"
import { ConsolidatedProblemSection } from "@/components/landing/consolidated-problem-section"
import { SolutionBridge } from "@/components/landing/solution-bridge"
import { StreamlinedProcessSection } from "@/components/landing/streamlined-process-section"
import { UnifiedSolutionShowcase } from "@/components/landing/unified-solution-showcase"
import { EnhancedUrgencyCTA } from "@/components/landing/enhanced-urgency-cta"
import { ProfessionalWhitelistModal } from "@/components/landing/professional-whitelist-modal"
import { FloatingNavigation, SectionProgressIndicator } from "@/components/landing/floating-navigation"
import { VisualPolish, SectionSeparator } from "@/components/landing/visual-polish"

import { 
  Home, 
  Target, 
  Lightbulb, 
  Settings, 
  MessageSquare
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [showWhitelistModal, setShowWhitelistModal] = useState(false)

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
      id: 'bridge',
      label: 'Solution',
      icon: <Lightbulb className="w-4 h-4" />,
      href: '#bridge'
    },
    {
      id: 'process',
      label: 'Process',
      icon: <Settings className="w-4 h-4" />,
      href: '#process'
    },
    {
      id: 'benefits',
      label: 'Benefits',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '#benefits'
    },
    {
      id: 'cta',
      label: 'Get Started',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '#cta'
    }
  ]

  const handleExitIntent = () => {
    setShowWhitelistModal(true)
  }

  const handleWhitelistSubmit = (email: string, company?: string) => {
    // Handle whitelist submission
    console.log('Whitelist signup:', { email, company })
    setShowWhitelistModal(false)
  }

  return (
    <VisualPolish>
      <div className="min-h-screen bg-white overflow-x-hidden">
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
        <section id="hero" className="relative">
          <AIHeroConfig 
            variant="transform"
            onCtaClick={() => setShowWhitelistModal(true)}
          />
          {/* Enhanced transition gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-neutral-950/50 to-slate-50"></div>
        </section>

        {/* Consolidated Problem/Urgency Section */}
        <section id="problem" className="bg-slate-50 py-24 relative">
          <ConsolidatedProblemSection />
        </section>

        {/* Solution Bridge Section */}
        <section id="bridge" className="relative">
          <SolutionBridge />
        </section>

        {/* Streamlined Process Section */}
        <section id="process" className="bg-white py-24 relative">
          <StreamlinedProcessSection />
        </section>

        {/* Enhanced Section Divider */}
        <SectionSeparator variant="gradient" className="bg-white" />

        {/* Unified Solution Benefits Section */}
        <section id="benefits" className="bg-slate-50 py-24 relative">
          <UnifiedSolutionShowcase />
        </section>

        {/* Enhanced Urgency CTA Section */}
        <section id="cta" className="relative">
          <EnhancedUrgencyCTA />
        </section>

        {/* Professional Whitelist Modal */}
        <ProfessionalWhitelistModal
          isOpen={showWhitelistModal}
          onClose={() => setShowWhitelistModal(false)}
          onSubmit={handleWhitelistSubmit}
        />
      </div>
    </VisualPolish>
  )
}