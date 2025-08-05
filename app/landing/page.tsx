"use client"

import { AsymmetricalHero } from "@/components/landing/asymmetrical-hero"
import { ProblemUrgencySection } from "@/components/landing/problem-urgency-section"
import { SolutionDifferentiation } from "@/components/landing/solution-differentiation"
import { InteractiveAIDemos } from "@/components/landing/interactive-ai-demos"
import { ProcessSection } from "@/components/landing/process-section"
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
  MessageSquare,
  Zap,
  Brain
} from "lucide-react"

export default function LandingPage() {
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
      id: 'pain-points',
      label: 'Solutions',
      icon: <Brain className="w-4 h-4" />,
      href: '#pain-points'
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      icon: <Users className="w-4 h-4" />,
      href: '#case-studies'
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      icon: <MessageSquare className="w-4 h-4" />,
      href: '#testimonials'
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
        <SolutionDifferentiation />
        <InteractiveAIDemos />
      </section>

      {/* Competitive Differentiation Section */}
      <section id="competitive">
        <CompetitiveDifferentiationSection />
      </section>

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Pain Point Solver Section */}
      <section id="pain-points">
        <PainPointSolver 
          industries={industries}
          painPoints={painPoints}
          solutions={solutions}
        />
      </section>

      {/* Discovery Process Section */}
      <DiscoveryProcessSection />

      {/* Industry Case Studies */}
      <section id="case-studies">
        <IndustryCaseStudies />
      </section>

      {/* Social Proof and Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how businesses across industries are transforming their operations with our conversational AI solutions.
            </p>
          </div>
          
          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Businesses Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-gray-600">Reduction in Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-gray-600">Increase in Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Automated Support Coverage</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Our customer service efficiency improved by 70% within the first month. The AI agents handle routine inquiries perfectly, letting our team focus on complex issues."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">VP Customer Success, TechFlow</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The ROI was immediate. We reduced operational costs by 40% while improving customer satisfaction scores. Best investment we've made."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Marcus Rodriguez</div>
                  <div className="text-gray-600 text-sm">CEO, RetailPlus</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "Implementation was seamless. Within 2 weeks, we had fully functional AI agents handling 80% of our customer inquiries with perfect accuracy."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold">Jennifer Park</div>
                  <div className="text-gray-600 text-sm">Operations Director, FinanceFirst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get started with a free consultation and discover how conversational AI can 
            revolutionize your customer interactions and business processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule Free Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Download AI Success Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}