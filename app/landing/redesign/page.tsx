"use client"

import { AsymmetricalHero } from "@/components/landing/asymmetrical-hero"
import { ProblemUrgencySection } from "@/components/landing/problem-urgency-section"
import { CompetitiveDifferentiationSection } from "@/components/landing/competitive-differentiation-section"
import { PainPointSolver } from "@/components/landing/pain-point-solver"
import { DiscoveryProcessSection } from "@/components/landing/discovery-process-section"
import { IndustryCaseStudies } from "@/components/landing/industry-case-studies"
import { FloatingNavigation, SectionProgressIndicator } from "@/components/landing/floating-navigation"
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

export default function LandingPageRedesign() {
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
      <section id="hero">
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
      </section>

      {/* Problem/Urgency Section */}
      <section id="problem">
        <ProblemUrgencySection />
      </section>

      {/* Solution Section */}
      <section id="solution">
        {/* This would be where solution content goes */}
        <div className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Conversational AI: The Next Evolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Move beyond basic automation with intelligent conversational agents 
              that understand context, learn from interactions, and provide 
              personalized experiences for your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Competitive Differentiation Section */}
      <section id="competitive">
        <CompetitiveDifferentiationSection />
      </section>

      {/* Pain Point Solver Section */}
      <PainPointSolver 
        industries={industries}
        painPoints={painPoints}
        solutions={solutions}
      />

      {/* Discovery Process Section */}
      <section id="process">
        <DiscoveryProcessSection />
      </section>

      {/* Industry Case Studies */}
      <section id="case-studies">
        <IndustryCaseStudies />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get started with a free consultation and discover how AI can 
            revolutionize your customer interactions and business processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Download Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}