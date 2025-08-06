'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SophisticatedScrollTrigger, SophisticatedStaggerContainer } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedCard } from '@/components/animations/sophisticated-interactions';
import { SectionHeading, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { 
  MessageSquare, 
  Search, 
  Settings, 
  Rocket, 
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Brain,
  Zap,
  ArrowRight,
  Calendar,
  FileText,
  Target
} from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  deliverables: string[];
  details: {
    methodology: string;
    expertise: string;
    outcome: string;
  };
  position: 'left' | 'right';
}

const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'AI Strategy & Discovery',
    description: 'Deep dive into your business processes, pain points, and AI implementation opportunities.',
    icon: <Search className="w-8 h-8" />,
    duration: '3-5 days',
    deliverables: ['Business Process Analysis', 'AI Opportunity Assessment', 'Technical Requirements', 'Implementation Roadmap'],
    details: {
      methodology: 'Comprehensive business analysis with stakeholder interviews and process mapping',
      expertise: 'Business analysts and AI strategists with industry-specific experience',
      outcome: 'Clear AI implementation strategy tailored to your business goals'
    },
    position: 'left'
  },
  {
    id: 'design',
    title: 'Custom AI Solution Design',
    description: 'Design and architect AI solutions specifically tailored to your business requirements.',
    icon: <Brain className="w-8 h-8" />,
    duration: '5-7 days',
    deliverables: ['Solution Architecture', 'AI Model Design', 'Integration Plan', 'User Experience Design'],
    details: {
      methodology: 'Agile design process with continuous stakeholder feedback and validation',
      expertise: 'AI architects and UX designers specializing in business applications',
      outcome: 'Detailed blueprint for your custom AI solution with clear specifications'
    },
    position: 'right'
  },
  {
    id: 'development',
    title: 'AI Development & Training',
    description: 'Build and train your custom AI agents using your specific data and business context.',
    icon: <Settings className="w-8 h-8" />,
    duration: '1-2 weeks',
    deliverables: ['Custom AI Models', 'Training Data Processing', 'Integration Components', 'Testing Framework'],
    details: {
      methodology: 'Iterative development with continuous testing and model refinement',
      expertise: 'Senior AI engineers and machine learning specialists',
      outcome: 'Fully trained AI solution ready for business integration'
    },
    position: 'left'
  },
  {
    id: 'deployment',
    title: 'Seamless Integration & Launch',
    description: 'Deploy your AI solution with minimal disruption to existing business operations.',
    icon: <Rocket className="w-8 h-8" />,
    duration: '3-5 days',
    deliverables: ['Production Deployment', 'System Integration', 'Staff Training', 'Go-Live Support'],
    details: {
      methodology: 'Phased deployment with rollback capabilities and real-time monitoring',
      expertise: 'DevOps engineers and implementation specialists',
      outcome: 'Live AI solution integrated with your existing systems'
    },
    position: 'right'
  },
  {
    id: 'optimization',
    title: 'Performance Monitoring & Optimization',
    description: 'Continuous monitoring and optimization to ensure maximum ROI and performance.',
    icon: <BarChart3 className="w-8 h-8" />,
    duration: 'Ongoing',
    deliverables: ['Performance Analytics', 'Optimization Reports', 'Model Updates', 'Success Metrics'],
    details: {
      methodology: 'Data-driven optimization with regular performance reviews and updates',
      expertise: 'AI performance specialists and business analysts',
      outcome: 'Continuously improving AI solution with measurable business impact'
    },
    position: 'left'
  }
];

const businessOutcomes = [
  {
    metric: '85%',
    description: 'Reduction in response time',
    icon: <Clock className="w-6 h-6" />
  },
  {
    metric: '3x',
    description: 'Increase in lead conversion',
    icon: <Target className="w-6 h-6" />
  },
  {
    metric: '60%',
    description: 'Cost savings in operations',
    icon: <BarChart3 className="w-6 h-6" />
  },
  {
    metric: '24/7',
    description: 'Availability without breaks',
    icon: <Zap className="w-6 h-6" />
  }
];

export function SophisticatedProcessVisualization() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  return (
    <div className="relative py-24 bg-gradient-to-br from-sophisticated-white to-sophisticated-professional-blue/5 overflow-hidden">
      
      {/* Diagonal Background Elements */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${sophisticatedColors.deepPurple.DEFAULT} 0%, transparent 25%, ${sophisticatedColors.professionalBlue.DEFAULT} 50%, transparent 75%, ${sophisticatedColors.skyBlue.DEFAULT} 100%)`
        }}
      />

      {/* Geometric Background Shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
        <motion.div
          className="w-full h-full bg-sophisticated-rich-purple"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="text-center mb-16">
            <AccentText className="text-sophisticated-professional-blue mb-4">
              STREAMLINED AI IMPLEMENTATION
            </AccentText>
            <SectionHeading className="text-sophisticated-deep-purple mb-6">
              From Strategy to Success in Weeks, Not Months
            </SectionHeading>
            <p className="body-large text-sophisticated-black/70 max-w-3xl mx-auto">
              Our proven methodology delivers custom AI solutions with minimal disruption to your business. 
              Experience the fastest path from AI strategy to measurable business transformation.
            </p>
          </div>
        </SophisticatedScrollTrigger>

        {/* Diagonal Process Flow */}
        <div className="relative mb-20">
          
          {/* Diagonal Connection Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={sophisticatedColors.professionalBlue.opacity[30]} />
                <stop offset="50%" stopColor={sophisticatedColors.skyBlue.opacity[20]} />
                <stop offset="100%" stopColor={sophisticatedColors.richPurple.opacity[25]} />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M 10% 20% Q 30% 40% 50% 50% T 90% 80%"
              stroke="url(#processGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </svg>

          {/* Process Steps */}
          <div className="space-y-16 relative z-10">
            {processSteps.map((step, index) => (
              <SophisticatedScrollTrigger
                key={step.id}
                variant={step.position === 'left' ? 'slideLeft' : 'slideRight'}
                staggerDelay={index * 0.2}
              >
                <div className={`flex items-center ${
                  step.position === 'right' ? 'flex-row-reverse' : ''
                } gap-8 lg:gap-16`}>
                  
                  {/* Step Content */}
                  <div className="flex-1 max-w-lg">
                    <SophisticatedCard
                      className="p-8 relative overflow-hidden cursor-pointer"
                      hoverEffect="lift"
                      onClick={() => setSelectedStep(step.id)}
                    >
                      
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-sophisticated-professional-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-sophisticated-professional-blue">
                          {index + 1}
                        </span>
                      </div>

                      {/* Icon and Title */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="p-3 rounded-lg bg-sophisticated-professional-blue/10 text-sophisticated-professional-blue">
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="heading-card text-sophisticated-deep-purple mb-2">
                            {step.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <Calendar className="w-4 h-4 text-sophisticated-rich-purple" />
                            <span className="text-sm font-medium text-sophisticated-rich-purple">
                              {step.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="body-medium text-sophisticated-black/70 mb-6">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="mb-6">
                        <h4 className="font-medium text-sophisticated-deep-purple mb-3 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Key Deliverables:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.deliverables.map((deliverable, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-sophisticated-professional-blue" />
                              <span className="text-sm text-sophisticated-black/70">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <button className="flex items-center space-x-2 text-sm font-medium text-sophisticated-professional-blue hover:text-sophisticated-deep-purple transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Hover Overlay with Details */}
                      <AnimatePresence>
                        {hoveredStep === step.id && (
                          <motion.div
                            className="absolute inset-0 bg-sophisticated-white/95 p-6 flex flex-col justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="heading-card text-sophisticated-deep-purple mb-4">
                              Implementation Details
                            </h4>
                            <div className="space-y-3">
                              <div>
                                <span className="font-medium text-sophisticated-professional-blue">Methodology: </span>
                                <span className="text-sm text-sophisticated-black/70">{step.details.methodology}</span>
                              </div>
                              <div>
                                <span className="font-medium text-sophisticated-professional-blue">Expertise: </span>
                                <span className="text-sm text-sophisticated-black/70">{step.details.expertise}</span>
                              </div>
                              <div>
                                <span className="font-medium text-sophisticated-professional-blue">Outcome: </span>
                                <span className="text-sm text-sophisticated-black/70">{step.details.outcome}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SophisticatedCard>
                  </div>

                  {/* Visual Connector */}
                  <div className="hidden lg:block">
                    <motion.div
                      className="w-16 h-16 rounded-full border-4 border-sophisticated-professional-blue/20 bg-sophisticated-professional-blue/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-sophisticated-professional-blue/30" />
                    </motion.div>
                  </div>
                </div>
              </SophisticatedScrollTrigger>
            ))}
          </div>
        </div>

        {/* Business Transformation Outcomes */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="bg-gradient-to-r from-sophisticated-deep-purple/10 to-sophisticated-professional-blue/10 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="heading-subsection text-sophisticated-deep-purple mb-4">
                Measurable Business Transformation
              </h3>
              <p className="body-large text-sophisticated-black/70">
                Our clients experience dramatic improvements within weeks of AI implementation
              </p>
            </div>

            <SophisticatedStaggerContainer staggerTiming="fast">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {businessOutcomes.map((outcome, index) => (
                  <div key={index} className="text-center p-6 bg-sophisticated-white rounded-xl">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-sophisticated-professional-blue/10 text-sophisticated-professional-blue">
                        {outcome.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-sophisticated-deep-purple mb-2">
                      {outcome.metric}
                    </div>
                    <p className="text-sm text-sophisticated-black/70">
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            </SophisticatedStaggerContainer>
          </div>
        </SophisticatedScrollTrigger>

        {/* Technical Expertise Highlight */}
        <SophisticatedScrollTrigger variant="slideUp">
          <div className="text-center bg-sophisticated-black rounded-2xl p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-sophisticated-professional-blue/20">
                <Users className="w-12 h-12 text-sophisticated-sky-blue" />
              </div>
            </div>
            <h3 className="heading-subsection text-sophisticated-white mb-4">
              Expert AI Implementation Team
            </h3>
            <p className="body-large text-sophisticated-white/80 mb-6 max-w-2xl mx-auto">
              Our team combines deep technical expertise with business acumen to deliver 
              AI solutions that drive real results. Every project is backed by our 
              commitment to your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-sophisticated-professional-blue text-sophisticated-white rounded-lg font-medium hover:bg-sophisticated-sky-blue transition-colors">
                Meet Our Team
              </button>
              <button className="px-8 py-3 border-2 border-sophisticated-sky-blue text-sophisticated-sky-blue rounded-lg font-medium hover:bg-sophisticated-sky-blue hover:text-sophisticated-black transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </SophisticatedScrollTrigger>
      </div>
    </div>
  );
}