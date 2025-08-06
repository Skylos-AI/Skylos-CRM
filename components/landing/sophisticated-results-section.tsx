'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SophisticatedScrollTrigger, SophisticatedStaggerContainer } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedCard } from '@/components/animations/sophisticated-interactions';
import { SectionHeading, CreativeQuote, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Star,
  Quote,
  ArrowRight,
  Building,
  BarChart3,
  Zap,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  industry: string;
  results: {
    metric: string;
    improvement: string;
    timeframe: string;
  }[];
  beforeAfter: {
    before: string;
    after: string;
    impact: string;
  };
  avatar?: string;
  companyLogo?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    roi: string;
    efficiency: string;
    satisfaction: string;
    timeToValue: string;
  };
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

const testimonials: Testimonial[] = [
  {
    id: 'tech-startup',
    quote: "The AI implementation transformed our customer support from a cost center into a competitive advantage. We're now handling 10x more inquiries with the same team size.",
    author: "Sarah Chen",
    position: "CEO",
    company: "TechFlow Solutions",
    industry: "SaaS",
    results: [
      { metric: "Response Time", improvement: "95% faster", timeframe: "Within 2 weeks" },
      { metric: "Customer Satisfaction", improvement: "40% increase", timeframe: "First month" },
      { metric: "Support Costs", improvement: "60% reduction", timeframe: "3 months" }
    ],
    beforeAfter: {
      before: "Manual ticket routing, 4-hour average response time, overwhelmed support team",
      after: "AI-powered instant responses, intelligent routing, 24/7 availability",
      impact: "Transformed from reactive support to proactive customer success"
    }
  },
  {
    id: 'manufacturing',
    quote: "We went from losing leads to competitors to becoming the fastest responder in our industry. The AI qualification system identified our best prospects automatically.",
    author: "Michael Rodriguez",
    position: "VP of Sales",
    company: "Industrial Dynamics",
    industry: "Manufacturing",
    results: [
      { metric: "Lead Conversion", improvement: "3x higher", timeframe: "6 weeks" },
      { metric: "Sales Cycle", improvement: "50% shorter", timeframe: "2 months" },
      { metric: "Revenue Growth", improvement: "85% increase", timeframe: "Quarter 1" }
    ],
    beforeAfter: {
      before: "Manual lead qualification, slow response times, missed opportunities",
      after: "Intelligent lead scoring, instant engagement, automated follow-ups",
      impact: "Became market leader in response speed and conversion rates"
    }
  },
  {
    id: 'ecommerce',
    quote: "The personalization AI increased our conversion rates beyond our wildest expectations. Every customer now gets a tailored experience that drives purchases.",
    author: "Emma Thompson",
    position: "CMO",
    company: "StyleHub Commerce",
    industry: "E-commerce",
    results: [
      { metric: "Conversion Rate", improvement: "120% increase", timeframe: "8 weeks" },
      { metric: "Average Order Value", improvement: "45% higher", timeframe: "1 month" },
      { metric: "Customer Retention", improvement: "65% improvement", timeframe: "3 months" }
    ],
    beforeAfter: {
      before: "Generic product recommendations, one-size-fits-all experience",
      after: "AI-powered personalization, dynamic content, predictive recommendations",
      impact: "Transformed from commodity retailer to personalized shopping destination"
    }
  }
];

const caseStudies: CaseStudy[] = [
  {
    id: 'financial-services',
    title: 'AI-Powered Risk Assessment Revolution',
    industry: 'Financial Services',
    challenge: 'Manual risk assessment processes taking weeks, high error rates, regulatory compliance issues',
    solution: 'Custom AI models for automated risk scoring, compliance monitoring, and decision support',
    results: {
      roi: '340% ROI in 6 months',
      efficiency: '90% faster processing',
      satisfaction: '95% accuracy rate',
      timeToValue: '3 weeks to deployment'
    },
    metrics: [
      { label: 'Processing Time', value: '2 hours vs 2 weeks', icon: <Clock className="w-5 h-5" /> },
      { label: 'Accuracy Rate', value: '95% vs 78%', icon: <CheckCircle className="w-5 h-5" /> },
      { label: 'Cost Reduction', value: '70% savings', icon: <DollarSign className="w-5 h-5" /> },
      { label: 'Compliance Score', value: '100% automated', icon: <BarChart3 className="w-5 h-5" /> }
    ]
  },
  {
    id: 'healthcare',
    title: 'Patient Engagement AI Transformation',
    industry: 'Healthcare',
    challenge: 'Poor patient communication, missed appointments, low engagement rates',
    solution: 'Intelligent patient communication system with personalized health insights',
    results: {
      roi: '280% ROI in 4 months',
      efficiency: '75% reduction in no-shows',
      satisfaction: '88% patient satisfaction',
      timeToValue: '2 weeks to launch'
    },
    metrics: [
      { label: 'No-show Rate', value: '8% vs 32%', icon: <Users className="w-5 h-5" /> },
      { label: 'Engagement', value: '3x higher', icon: <TrendingUp className="w-5 h-5" /> },
      { label: 'Staff Efficiency', value: '60% improvement', icon: <Zap className="w-5 h-5" /> },
      { label: 'Patient Satisfaction', value: '88% score', icon: <Star className="w-5 h-5" /> }
    ]
  }
];

export function SophisticatedResultsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<string>(testimonials[0].id);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const selectedTestimonialData = testimonials.find(t => t.id === selectedTestimonial);

  return (
    <div className="relative py-24 bg-sophisticated-white overflow-hidden">
      
      {/* Subtle Gradient Overlays */}
      <div 
        className="absolute top-0 left-0 w-full h-1/3 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${sophisticatedColors.richPurple.DEFAULT} 0%, transparent 100%)`
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-full h-1/3 opacity-5"
        style={{
          background: `linear-gradient(315deg, ${sophisticatedColors.skyBlue.DEFAULT} 0%, transparent 100%)`
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="text-center mb-16">
            <AccentText className="text-sophisticated-professional-blue mb-4">
              PROVEN BUSINESS TRANSFORMATION
            </AccentText>
            <SectionHeading className="text-sophisticated-deep-purple mb-6">
              Real Results from Real Businesses
            </SectionHeading>
            <p className="body-large text-sophisticated-black/70 max-w-3xl mx-auto">
              See how businesses like yours achieved dramatic improvements with our custom AI solutions. 
              These aren't just numbers—they're transformations that changed entire companies.
            </p>
          </div>
        </SophisticatedScrollTrigger>

        {/* Asymmetrical Testimonials Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Main Testimonial - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SophisticatedScrollTrigger variant="slideLeft">
              <SophisticatedCard className="h-full p-8 bg-gradient-to-br from-sophisticated-deep-purple/5 to-sophisticated-professional-blue/5">
                
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-sophisticated-professional-blue/10">
                    <Quote className="w-8 h-8 text-sophisticated-professional-blue" />
                  </div>
                </div>

                {/* Main Quote */}
                <CreativeQuote className="text-sophisticated-deep-purple text-center mb-8">
                  "{selectedTestimonialData?.quote}"
                </CreativeQuote>

                {/* Author Info */}
                <div className="text-center mb-8">
                  <div className="font-semibold text-sophisticated-deep-purple text-lg">
                    {selectedTestimonialData?.author}
                  </div>
                  <div className="text-sophisticated-professional-blue">
                    {selectedTestimonialData?.position}
                  </div>
                  <div className="text-sophisticated-black/60">
                    {selectedTestimonialData?.company} • {selectedTestimonialData?.industry}
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {selectedTestimonialData?.results.map((result, index) => (
                    <div key={index} className="text-center p-4 bg-sophisticated-white rounded-lg">
                      <div className="text-2xl font-bold text-sophisticated-professional-blue mb-1">
                        {result.improvement}
                      </div>
                      <div className="text-sm font-medium text-sophisticated-deep-purple mb-1">
                        {result.metric}
                      </div>
                      <div className="text-xs text-sophisticated-black/60">
                        {result.timeframe}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Before/After Visualization */}
                <div className="bg-sophisticated-white rounded-xl p-6">
                  <h4 className="font-semibold text-sophisticated-deep-purple mb-4 text-center">
                    Business Process Transformation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-red-600 mb-2">Before AI:</div>
                      <p className="text-sm text-sophisticated-black/70 mb-4">
                        {selectedTestimonialData?.beforeAfter.before}
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-600 mb-2">After AI:</div>
                      <p className="text-sm text-sophisticated-black/70 mb-4">
                        {selectedTestimonialData?.beforeAfter.after}
                      </p>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-sophisticated-black/10">
                    <div className="text-sm font-medium text-sophisticated-rich-purple">
                      Impact: {selectedTestimonialData?.beforeAfter.impact}
                    </div>
                  </div>
                </div>
              </SophisticatedCard>
            </SophisticatedScrollTrigger>
          </div>

          {/* Testimonial Selector */}
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <SophisticatedScrollTrigger
                key={testimonial.id}
                variant="slideRight"
                staggerDelay={index * 0.1}
              >
                <button
                  onClick={() => setSelectedTestimonial(testimonial.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedTestimonial === testimonial.id
                      ? 'bg-sophisticated-professional-blue/10 border-2 border-sophisticated-professional-blue'
                      : 'bg-sophisticated-white border-2 border-sophisticated-black/10 hover:border-sophisticated-professional-blue/30'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Building className="w-5 h-5 text-sophisticated-professional-blue" />
                    <div>
                      <div className="font-medium text-sophisticated-deep-purple">
                        {testimonial.company}
                      </div>
                      <div className="text-sm text-sophisticated-black/60">
                        {testimonial.industry}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-sophisticated-black/70 line-clamp-2">
                    "{testimonial.quote.substring(0, 80)}..."
                  </div>
                </button>
              </SophisticatedScrollTrigger>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="heading-subsection text-sophisticated-deep-purple mb-4">
                Detailed Implementation Case Studies
              </h3>
              <p className="body-large text-sophisticated-black/70">
                Deep dive into specific AI implementations and their measurable business impact
              </p>
            </div>

            <SophisticatedStaggerContainer staggerTiming="normal">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {caseStudies.map((caseStudy, index) => (
                  <SophisticatedCard
                    key={caseStudy.id}
                    className="p-6 cursor-pointer"
                    hoverEffect="lift"
                    onClick={() => setSelectedCaseStudy(caseStudy.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="heading-card text-sophisticated-deep-purple mb-2">
                          {caseStudy.title}
                        </h4>
                        <AccentText className="text-sophisticated-professional-blue">
                          {caseStudy.industry}
                        </AccentText>
                      </div>
                      <PlayCircle className="w-6 h-6 text-sophisticated-rich-purple" />
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="font-medium text-sophisticated-deep-purple">Challenge: </span>
                        <span className="text-sm text-sophisticated-black/70">{caseStudy.challenge}</span>
                      </div>
                      <div>
                        <span className="font-medium text-sophisticated-deep-purple">Solution: </span>
                        <span className="text-sm text-sophisticated-black/70">{caseStudy.solution}</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {caseStudy.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-3 bg-sophisticated-professional-blue/5 rounded-lg">
                          <div className="text-sophisticated-professional-blue">
                            {metric.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-sophisticated-deep-purple">
                              {metric.value}
                            </div>
                            <div className="text-xs text-sophisticated-black/60">
                              {metric.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Results Summary */}
                    <div className="bg-gradient-to-r from-sophisticated-deep-purple/5 to-sophisticated-professional-blue/5 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-sophisticated-professional-blue">
                            {caseStudy.results.roi}
                          </div>
                          <div className="text-xs text-sophisticated-black/60">Return on Investment</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-sophisticated-rich-purple">
                            {caseStudy.results.timeToValue}
                          </div>
                          <div className="text-xs text-sophisticated-black/60">Time to Value</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-sophisticated-black/10 mt-4">
                      <span className="text-sm font-medium text-sophisticated-professional-blue">
                        View Full Case Study
                      </span>
                      <ArrowRight className="w-4 h-4 text-sophisticated-professional-blue" />
                    </div>
                  </SophisticatedCard>
                ))}
              </div>
            </SophisticatedStaggerContainer>
          </div>
        </SophisticatedScrollTrigger>

        {/* ROI Calculator CTA */}
        <SophisticatedScrollTrigger variant="slideUp">
          <div className="text-center bg-gradient-to-r from-sophisticated-deep-purple/10 to-sophisticated-professional-blue/10 rounded-2xl p-8">
            <h3 className="heading-subsection text-sophisticated-deep-purple mb-4">
              Calculate Your AI ROI Potential
            </h3>
            <p className="body-large text-sophisticated-black/70 mb-6 max-w-2xl mx-auto">
              See how much your business could save and earn with custom AI implementation. 
              Get a personalized ROI projection based on your industry and business size.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-sophisticated-professional-blue text-sophisticated-white rounded-lg font-medium hover:bg-sophisticated-deep-purple transition-colors">
                Calculate My ROI
              </button>
              <button className="px-8 py-3 border-2 border-sophisticated-professional-blue text-sophisticated-professional-blue rounded-lg font-medium hover:bg-sophisticated-professional-blue hover:text-sophisticated-white transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </SophisticatedScrollTrigger>
      </div>
    </div>
  );
}