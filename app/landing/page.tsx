"use client"

import { AsymmetricalHero } from "@/components/landing/asymmetrical-hero"
import { ConsolidatedProblemSection } from "@/components/landing/consolidated-problem-section"
import { UnifiedSolutionShowcase } from "@/components/landing/unified-solution-showcase"
import { StreamlinedProcessSection } from "@/components/landing/streamlined-process-section"
import { SingleCTASection } from "@/components/landing/single-cta-section"
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
      id: 'solution',
      label: 'Solution',
      icon: <Lightbulb className="w-4 h-4" />,
      href: '#solution'
    },
    {
      id: 'process',
      label: 'Process',
      icon: <Settings className="w-4 h-4" />,
      href: '#process'
    },
    {
      id: 'whitelist',
      label: 'Join Whitelist',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '#whitelist'
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
        <section id="hero" className="bg-black relative">
          <AsymmetricalHero 
            titlePosition="left"
            headline="Stop Losing to Competitors Who Already Use AI"
            subheadline="Get custom conversational agents tailored to your business needs - deployed in days, not months"
            badge={{
              text: "WELCOME",
              variant: "default"
            }}
            ctaButtons={[
              {
                text: "Join Exclusive Whitelist",
                variant: "default",
                href: "#whitelist"
              },
              {
                text: "Learn More", 
                variant: "outline",
                href: "#problem"
              }
            ]}
          />
          {/* Enhanced transition gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-black/50 to-slate-50"></div>
        </section>

        {/* Consolidated Problem/Urgency Section */}
        <section id="problem" className="bg-slate-50 py-24 relative">
          <ConsolidatedProblemSection />
        </section>

        {/* Enhanced Section Divider */}
        <SectionSeparator variant="gradient" className="bg-slate-50" />

        {/* Unified Solution Section */}
        <section id="solution" className="bg-slate-50 py-24 relative">
          <UnifiedSolutionShowcase />
          {/* Enhanced transition gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-slate-50/50 to-white"></div>
        </section>

        {/* Streamlined Process Section */}
        <section id="process" className="bg-white py-24 relative">
          <StreamlinedProcessSection />
          {/* Enhanced transition gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-white/50 to-black"></div>
        </section>

        {/* Single CTA Section */}
        <section id="whitelist" className="bg-black relative">
          <SingleCTASection />
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