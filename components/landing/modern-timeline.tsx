"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { motion } from "framer-motion"
import { 
  Search, 
  Code, 
  Rocket, 
  Users, 
  Shield, 
  Settings, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Zap,
  Target
} from "lucide-react"

interface TimelinePhase {
  phase: string
  title: string
  duration: string
  description: string
  activities: Array<{
    title: string
    description: string
    icon: React.ReactNode
  }>
  color: {
    primary: string
    secondary: string
    accent: string
    bg: string
  }
}

const timelineData: TimelinePhase[] = [
  {
    phase: "01",
    title: "Discovery",
    duration: "Week 1",
    description: "Understanding your business needs and mapping the perfect solution",
    activities: [
      {
        title: "Initial consultation and requirements gathering",
        description: "Deep dive into your business processes and pain points",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Business process analysis and pain point identification", 
        description: "Comprehensive audit of current workflows and bottlenecks",
        icon: <Search className="w-5 h-5" />
      },
      {
        title: "Solution architecture and integration planning",
        description: "Custom blueprint tailored to your specific requirements",
        icon: <Target className="w-5 h-5" />
      }
    ],
    color: {
      primary: "from-emerald-500 to-teal-600",
      secondary: "emerald-500",
      accent: "emerald-100",
      bg: "emerald-50"
    }
  },
  {
    phase: "02", 
    title: "Development",
    duration: "Week 2-3",
    description: "Building your custom AI agents with precision and expertise",
    activities: [
      {
        title: "Custom AI agent development and training",
        description: "Crafting intelligent agents specific to your business logic",
        icon: <Code className="w-5 h-5" />
      },
      {
        title: "System integrations and security implementation",
        description: "Seamless connection with your existing tools and infrastructure", 
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Internal testing and quality assurance",
        description: "Rigorous testing to ensure flawless performance",
        icon: <Settings className="w-5 h-5" />
      }
    ],
    color: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "blue-500", 
      accent: "blue-100",
      bg: "blue-50"
    }
  },
  {
    phase: "03",
    title: "Deployment", 
    duration: "Week 4",
    description: "Going live with comprehensive support and training",
    activities: [
      {
        title: "Production deployment and configuration",
        description: "Smooth rollout to your live environment",
        icon: <Rocket className="w-5 h-5" />
      },
      {
        title: "Team training and documentation delivery",
        description: "Empowering your team with knowledge and resources",
        icon: <Users className="w-5 h-5" />
      },
      {
        title: "Go-live support and monitoring setup",
        description: "Ongoing support to ensure optimal performance",
        icon: <Zap className="w-5 h-5" />
      }
    ],
    color: {
      primary: "from-purple-500 to-violet-600",
      secondary: "purple-500",
      accent: "purple-100", 
      bg: "purple-50"
    }
  }
]

// Style 1: Minimalist & Modern
export function MinimalistTimeline() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white py-16 px-8 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-light text-slate-800 mb-4 tracking-tight">
            Implementation Timeline
          </h3>
          <div className="w-16 h-0.5 bg-slate-800 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Minimalist connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200"></div>
          
          <div className="space-y-16">
            {timelineData.map((phase, index) => (
              <ScrollTriggeredSection key={index} animationType="fadeInUp" delay={index * 0.2}>
                <div className="relative flex items-start">
                  {/* Minimalist phase indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-sm font-medium text-slate-600">{phase.phase}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-grow">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-2xl font-light text-slate-800">{phase.title}</h4>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 mb-8 leading-relaxed">{phase.description}</p>
                      
                      <div className="space-y-4">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start space-x-4 group">
                            <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors duration-200">
                              <div className="text-slate-600">{activity.icon}</div>
                            </div>
                            <div>
                              <h5 className="font-medium text-slate-800 mb-1">{activity.title}</h5>
                              <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollTriggeredSection>
            ))}
          </div>
        </div>

        {/* Minimalist summary */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-slate-800 text-white px-6 py-3 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Total Implementation: 3-4 Weeks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Style 2: Infographic Style
export function InfographicTimeline() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 px-8 rounded-3xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-800 mb-4">
            Implementation Timeline
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From concept to deployment in just 3-4 weeks with our streamlined process
          </p>
        </div>

        <div className="relative">
          <div className="grid gap-12">
            {timelineData.map((phase, index) => (
              <ScrollTriggeredSection key={index} animationType="slideInLeft" delay={index * 0.3}>
                <div className={`relative ${index % 2 === 1 ? 'ml-auto' : ''} max-w-2xl`}>
                  {/* Infographic card */}
                  <div className={`bg-gradient-to-br ${phase.color.primary} p-1 rounded-3xl shadow-xl`}>
                    <div className="bg-white rounded-3xl p-8">
                      {/* Header with phase indicator */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${phase.color.primary} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {phase.phase}
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-slate-800">{phase.title}</h4>
                            <p className={`text-${phase.color.secondary} font-medium`}>{phase.duration}</p>
                          </div>
                        </div>
                        <ArrowRight className={`w-6 h-6 text-${phase.color.secondary}`} />
                      </div>

                      <p className="text-slate-600 mb-8 text-lg leading-relaxed">{phase.description}</p>

                      {/* Activities with enhanced styling */}
                      <div className="grid gap-4">
                        {phase.activities.map((activity, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index * 0.3) + (idx * 0.1) }}
                            className={`flex items-start space-x-4 p-4 bg-${phase.color.bg} rounded-2xl border border-${phase.color.accent} hover:shadow-md transition-all duration-300`}
                          >
                            <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${phase.color.primary} rounded-xl flex items-center justify-center text-white shadow-md`}>
                              {activity.icon}
                            </div>
                            <div>
                              <h5 className="font-semibold text-slate-800 mb-2">{activity.title}</h5>
                              <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollTriggeredSection>
            ))}
          </div>
        </div>

        {/* Infographic summary */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-4 rounded-2xl shadow-xl">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold">Complete Implementation: 3-4 Weeks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Style 3: Soft & Approachable
export function SoftTimeline() {
  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-blue-50 py-16 px-8 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-semibold text-slate-700 mb-4">
            Your Journey to AI Success
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We'll guide you through every step with care and expertise
          </p>
        </div>

        <div className="relative">
          {/* Soft curved connecting line */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-200 via-blue-200 to-purple-200 rounded-full shadow-sm"></div>
          
          <div className="space-y-12">
            {timelineData.map((phase, index) => (
              <ScrollTriggeredSection key={index} animationType="fadeInUp" delay={index * 0.2}>
                <div className="relative flex items-start">
                  {/* Soft phase indicator */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-24 h-24 bg-gradient-to-br ${phase.color.primary} rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                      <span className="text-white font-bold text-lg">{phase.phase}</span>
                    </div>
                    {/* Soft glow effect */}
                    <div className={`absolute inset-0 w-24 h-24 bg-gradient-to-br ${phase.color.primary} rounded-3xl blur-xl opacity-30 -z-10`}></div>
                  </div>

                  {/* Content with soft styling */}
                  <div className="ml-8 flex-grow">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-500">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-3xl font-semibold text-slate-700">{phase.title}</h4>
                        <div className={`px-4 py-2 bg-${phase.color.bg} text-${phase.color.secondary} rounded-full font-medium shadow-sm`}>
                          {phase.duration}
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-8 text-lg leading-relaxed">{phase.description}</p>
                      
                      <div className="space-y-6">
                        {phase.activities.map((activity, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                            className="group"
                          >
                            <div className={`flex items-start space-x-4 p-6 bg-gradient-to-r from-${phase.color.bg} to-white rounded-2xl border border-${phase.color.accent} hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]`}>
                              <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${phase.color.primary} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                                {activity.icon}
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-800 mb-2 text-lg">{activity.title}</h5>
                                <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollTriggeredSection>
            ))}
          </div>
        </div>

        {/* Soft summary */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white px-8 py-4 rounded-3xl shadow-xl">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg">Ready in 3-4 Weeks</div>
              <div className="text-sm text-white/80">From start to success</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}