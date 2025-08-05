"use client"

import { AsymmetricalHero } from "@/components/landing/asymmetrical-hero"
import { ConsolidatedProblemSection } from "@/components/landing/consolidated-problem-section"
import { UnifiedSolutionShowcase } from "@/components/landing/unified-solution-showcase"
import { StreamlinedProcessSection } from "@/components/landing/streamlined-process-section"
import { SingleCTASection } from "@/components/landing/single-cta-section"
import { ProfessionalWhitelistModal } from "@/components/landing/professional-whitelist-modal"
import { FloatingNavigation, SectionProgressIndicator } from "@/components/landing/floating-navigation"

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
    <div className="min-h-screen bg-white">
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
      <section id="hero" className="bg-black">
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
      </section>

      {/* Consolidated Problem/Urgency Section */}
      <section id="problem" className="bg-slate-50 py-24">
        <ConsolidatedProblemSection />
      </section>

      {/* Unified Solution Section */}
      <section id="solution" className="bg-slate-50 py-24">
        <UnifiedSolutionShowcase />
      </section>

      {/* Streamlined Process Section */}
      <section id="process" className="bg-white py-24">
        <StreamlinedProcessSection />
      </section>

      {/* Single CTA Section */}
      <section id="whitelist" className="bg-blue-600">
        <SingleCTASection />
      </section>

      {/* Professional Whitelist Modal */}
      <ProfessionalWhitelistModal
        isOpen={showWhitelistModal}
        onClose={() => setShowWhitelistModal(false)}
        onSubmit={handleWhitelistSubmit}
      />
    </div>
  )
}