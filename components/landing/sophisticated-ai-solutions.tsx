'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SophisticatedScrollTrigger, SophisticatedStaggerContainer } from '@/components/animations/sophisticated-scroll-trigger';
import { SophisticatedCard } from '@/components/animations/sophisticated-interactions';
import { SectionHeading, AccentText } from '@/components/ui/sophisticated-typography';
import { sophisticatedColors } from '@/lib/design-system/sophisticated-tokens';
import { 
  MessageSquare, 
  Brain, 
  BarChart3, 
  Users, 
  Zap, 
  Target,
  Clock,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';

interface AISolution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: string[];
  industry: string;
  complexity: 'Simple' | 'Advanced' | 'Enterprise';
  demoAvailable: boolean;
  size: 'small' | 'medium' | 'large';
  color: keyof typeof sophisticatedColors;
}

const aiSolutions: AISolution[] = [
  {
    id: 'conversational-agents',
    title: 'Conversational AI Agents',
    description: 'Custom-trained AI agents that understand your business context and handle customer interactions with human-like intelligence.',
    icon: <MessageSquare className="w-8 h-8" />,
    features: ['Natural Language Processing', '24/7 Availability', 'Multi-channel Support', 'Custom Training'],
    benefits: ['85% reduction in response time', '3x higher customer satisfaction', '60% cost savings'],
    industry: 'Universal',
    complexity: 'Advanced',
    demoAvailable: true,
    size: 'large',
    color: 'professionalBlue'
  },
  {
    id: 'intelligent-analytics',
    title: 'Intelligent Business Analytics',
    description: 'AI-powered insights that transform your data into actionable business intelligence.',
    icon: <BarChart3 className="w-8 h-8" />,
    features: ['Predictive Analytics', 'Real-time Insights', 'Custom Dashboards', 'Automated Reports'],
    benefits: ['40% better decision making', '2x faster insights', 'Reduced analysis time'],
    industry: 'Data-driven',
    complexity: 'Enterprise',
    demoAvailable: true,
    size: 'medium',
    color: 'skyBlue'
  },
  {
    id: 'lead-qualification',
    title: 'Smart Lead Qualification',
    description: 'Automatically score and qualify leads using AI to focus your sales team on high-value prospects.',
    icon: <Target className="w-8 h-8" />,
    features: ['Behavioral Analysis', 'Scoring Algorithms', 'CRM Integration', 'Real-time Updates'],
    benefits: ['50% more qualified leads', '30% higher conversion', 'Sales team efficiency'],
    industry: 'Sales & Marketing',
    complexity: 'Simple',
    demoAvailable: true,
    size: 'small',
    color: 'richPurple'
  },
  {
    id: 'process-automation',
    title: 'Intelligent Process Automation',
    description: 'Streamline repetitive tasks and workflows with AI that learns and adapts to your business processes.',
    icon: <Zap className="w-8 h-8" />,
    features: ['Workflow Optimization', 'Task Automation', 'Error Reduction', 'Scalable Solutions'],
    benefits: ['70% time savings', '95% accuracy improvement', 'Cost reduction'],
    industry: 'Operations',
    complexity: 'Advanced',
    demoAvailable: false,
    size: 'medium',
    color: 'deepPurple'
  },
  {
    id: 'customer-insights',
    title: 'Customer Behavior AI',
    description: 'Deep customer insights and personalization powered by advanced machine learning algorithms.',
    icon: <Users className="w-8 h-8" />,
    features: ['Behavior Tracking', 'Personalization', 'Churn Prediction', 'Segment Analysis'],
    benefits: ['25% increase in retention', 'Personalized experiences', 'Predictive insights'],
    industry: 'E-commerce',
    complexity: 'Enterprise',
    demoAvailable: true,
    size: 'small',
    color: 'professionalBlue'
  },
  {
    id: 'security-ai',
    title: 'AI Security & Compliance',
    description: 'Protect your business with AI-powered security monitoring and automated compliance management.',
    icon: <Shield className="w-8 h-8" />,
    features: ['Threat Detection', 'Compliance Automation', 'Risk Assessment', 'Real-time Monitoring'],
    benefits: ['99.9% threat detection', 'Automated compliance', 'Risk mitigation'],
    industry: 'Security',
    complexity: 'Enterprise',
    demoAvailable: false,
    size: 'large',
    color: 'skyBlue'
  }
];

export function SophisticatedAISolutions() {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getColorClasses = (color: keyof typeof sophisticatedColors) => {
    const colorMap = {
      deepPurple: 'border-sophisticated-deep-purple/20 bg-sophisticated-deep-purple/5',
      professionalBlue: 'border-sophisticated-professional-blue/20 bg-sophisticated-professional-blue/5',
      skyBlue: 'border-sophisticated-sky-blue/20 bg-sophisticated-sky-blue/5',
      richPurple: 'border-sophisticated-rich-purple/20 bg-sophisticated-rich-purple/5',
      white: 'border-gray-200 bg-white',
      black: 'border-gray-800 bg-gray-900',
    };
    return colorMap[color] || colorMap.professionalBlue;
  };

  return (
    <div className="relative py-24 bg-gradient-to-br from-sophisticated-white to-sophisticated-deep-purple/5 overflow-hidden">
      
      {/* Background Geometric Shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 opacity-5">
        <motion.div
          className="w-full h-full bg-sophisticated-professional-blue rounded-full"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-5">
        <motion.div
          className="w-full h-full bg-sophisticated-rich-purple"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          animate={{ rotate: [0, 120, 240, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="text-center mb-16">
            <AccentText className="text-sophisticated-professional-blue mb-4">
              CUSTOM AI DEVELOPMENT
            </AccentText>
            <SectionHeading className="text-sophisticated-deep-purple mb-6">
              AI Solutions Tailored to Your Business
            </SectionHeading>
            <p className="body-large text-sophisticated-black/70 max-w-3xl mx-auto">
              Every business is unique. That's why we create custom AI solutions that integrate 
              seamlessly with your existing processes and deliver measurable results from day one.
            </p>
          </div>
        </SophisticatedScrollTrigger>

        {/* Creative Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {aiSolutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              className={`${getSizeClasses(solution.size)} relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SophisticatedCard
                className={`h-full p-6 border-2 ${getColorClasses(solution.color)} relative overflow-hidden cursor-pointer`}
                hoverEffect="glow"
                onClick={() => setSelectedSolution(solution.id)}
              >
                
                {/* Complexity Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    solution.complexity === 'Enterprise' 
                      ? 'bg-sophisticated-rich-purple/10 text-sophisticated-rich-purple'
                      : solution.complexity === 'Advanced'
                      ? 'bg-sophisticated-professional-blue/10 text-sophisticated-professional-blue'
                      : 'bg-sophisticated-sky-blue/10 text-sophisticated-sky-blue'
                  }`}>
                    {solution.complexity}
                  </span>
                </div>

                {/* Icon and Title */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    solution.color === 'deepPurple' ? 'bg-sophisticated-deep-purple/10 text-sophisticated-deep-purple' :
                    solution.color === 'professionalBlue' ? 'bg-sophisticated-professional-blue/10 text-sophisticated-professional-blue' :
                    solution.color === 'skyBlue' ? 'bg-sophisticated-sky-blue/10 text-sophisticated-sky-blue' :
                    'bg-sophisticated-rich-purple/10 text-sophisticated-rich-purple'
                  }`}>
                    {solution.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-card text-sophisticated-deep-purple mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-sophisticated-black/60 mb-2">
                      {solution.industry}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="body-medium text-sophisticated-black/70 mb-6">
                  {solution.description}
                </p>

                {/* Features (for larger cards) */}
                {solution.size !== 'small' && (
                  <div className="mb-6">
                    <h4 className="font-medium text-sophisticated-deep-purple mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {solution.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Sparkles className="w-3 h-3 text-sophisticated-professional-blue" />
                          <span className="text-sm text-sophisticated-black/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-medium text-sophisticated-deep-purple mb-3">Benefits:</h4>
                  <div className="space-y-2">
                    {solution.benefits.slice(0, solution.size === 'large' ? 3 : 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-sophisticated-rich-purple" />
                        <span className="text-sm text-sophisticated-black/70">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-sophisticated-black/10">
                  <button className="flex items-center space-x-2 text-sm font-medium text-sophisticated-professional-blue hover:text-sophisticated-deep-purple transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {solution.demoAvailable && (
                    <button className="flex items-center space-x-2 text-sm font-medium text-sophisticated-rich-purple hover:text-sophisticated-deep-purple transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Demo</span>
                    </button>
                  )}
                </div>

                {/* Hover Overlay for Additional Info */}
                <AnimatePresence>
                  {hoveredSolution === solution.id && (
                    <motion.div
                      className="absolute inset-0 bg-sophisticated-white/95 p-6 flex flex-col justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="heading-card text-sophisticated-deep-purple mb-4">
                        Custom Development Approach
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-sophisticated-professional-blue" />
                          <span className="text-sm">Deployed in 2-4 weeks</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Brain className="w-5 h-5 text-sophisticated-professional-blue" />
                          <span className="text-sm">Trained on your data</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-sophisticated-professional-blue" />
                          <span className="text-sm">Enterprise security</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SophisticatedCard>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <SophisticatedScrollTrigger variant="fadeIn">
          <div className="text-center bg-gradient-to-r from-sophisticated-deep-purple/10 to-sophisticated-professional-blue/10 rounded-2xl p-8">
            <h3 className="heading-subsection text-sophisticated-deep-purple mb-4">
              See AI Solutions in Action
            </h3>
            <p className="body-large text-sophisticated-black/70 mb-6">
              Experience how our custom AI solutions can transform your business processes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-sophisticated-professional-blue text-sophisticated-white rounded-lg font-medium hover:bg-sophisticated-deep-purple transition-colors">
                Schedule Live Demo
              </button>
              <button className="px-8 py-3 border-2 border-sophisticated-professional-blue text-sophisticated-professional-blue rounded-lg font-medium hover:bg-sophisticated-professional-blue hover:text-sophisticated-white transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </SophisticatedScrollTrigger>
      </div>
    </div>
  );
}