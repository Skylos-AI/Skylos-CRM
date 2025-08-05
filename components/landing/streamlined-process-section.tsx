"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { Clock, DollarSign, Users, CheckCircle } from "lucide-react"

interface ProcessStep {
  title: string
  description: string
  duration: string
  clientEffort: 'minimal' | 'moderate'
  deliverables: string[]
  icon: React.ReactNode
}

interface CostBenefit {
  category: string
  traditional: string
  ourSolution: string
  savings: string
}

interface TimelineData {
  phase: string
  duration: string
  activities: string[]
}

export function StreamlinedProcessSection() {
  const processSteps: ProcessStep[] = [
    {
      title: "Discovery & Analysis",
      description: "We analyze your business processes and identify automation opportunities through our proven methodology.",
      duration: "2-3 days",
      clientEffort: 'minimal',
      deliverables: [
        "Business process audit",
        "Pain point identification",
        "Custom solution blueprint",
        "ROI projections"
      ],
      icon: <Users className="w-8 h-8" />
    },
    {
      title: "Custom Development",
      description: "Our team builds your conversational AI agents tailored to your specific requirements and integrations.",
      duration: "1-2 weeks",
      clientEffort: 'minimal',
      deliverables: [
        "Custom AI agent development",
        "System integrations",
        "Security implementation",
        "Testing and validation"
      ],
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: "Deployment & Training",
      description: "We deploy your solution and provide comprehensive training to ensure smooth adoption.",
      duration: "2-3 days",
      clientEffort: 'moderate',
      deliverables: [
        "Production deployment",
        "Team training sessions",
        "Documentation package",
        "Ongoing support setup"
      ],
      icon: <Clock className="w-8 h-8" />
    }
  ]

  const costBenefits: CostBenefit[] = [
    {
      category: "Implementation",
      traditional: "$50K - $200K",
      ourSolution: "$15K - $50K",
      savings: "Up to 75% savings"
    },
    {
      category: "Monthly Maintenance",
      traditional: "$5K - $15K/month",
      ourSolution: "$2K - $6K/month",
      savings: "60% lower costs"
    },
    {
      category: "Time to Value",
      traditional: "6-18 months",
      ourSolution: "2-4 weeks",
      savings: "10x faster deployment"
    },
    {
      category: "Customization Level",
      traditional: "Limited templates",
      ourSolution: "Fully customized",
      savings: "Perfect business fit"
    }
  ]

  const timeline: TimelineData[] = [
    {
      phase: "Week 1",
      duration: "Discovery",
      activities: [
        "Initial consultation and requirements gathering",
        "Business process analysis and pain point identification",
        "Solution architecture and integration planning"
      ]
    },
    {
      phase: "Week 2-3",
      duration: "Development",
      activities: [
        "Custom AI agent development and training",
        "System integrations and security implementation",
        "Internal testing and quality assurance"
      ]
    },
    {
      phase: "Week 4",
      duration: "Deployment",
      activities: [
        "Production deployment and configuration",
        "Team training and documentation delivery",
        "Go-live support and monitoring setup"
      ]
    }
  ]

  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              From Idea to Implementation in 3 Simple Steps
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our streamlined process gets you up and running with custom conversational AI 
              in weeks, not months, with minimal effort required from your team.
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Process Steps */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.2}>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <div key={index} className="group bg-white p-8 rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-blue-600 group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300">{step.icon}</div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-600">Duration</div>
                    <div className="text-lg font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">{step.duration}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-800 mb-3 transition-colors duration-300">{step.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-slate-700">Client Effort:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      step.clientEffort === 'minimal' 
                        ? 'bg-blue-100 text-blue-800 group-hover:bg-blue-200' 
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}>
                      {step.clientEffort.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Deliverables:</h4>
                  <ul className="space-y-1">
                    {step.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step connector */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-1 bg-blue-600 rounded-full group-hover:bg-blue-700 transition-colors duration-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-blue-600 group-hover:border-l-blue-700 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute right-0 top-1/2 transform -translate-y-1/2 transition-colors duration-300"></div>
                  </div>
                )}
              </div>
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Cost Comparison */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.4}>
          <div className="bg-white p-8 rounded-xl border-2 border-slate-200 shadow-lg mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Competitive Cost Advantages
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50">
                    <th className="text-left p-6 font-semibold text-slate-800">Category</th>
                    <th className="text-left p-6 font-semibold text-slate-600">Traditional Solutions</th>
                    <th className="text-left p-6 font-semibold text-blue-600">Our Solution</th>
                    <th className="text-left p-6 font-semibold text-slate-800">Your Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {costBenefits.map((cost, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-blue-50 transition-colors duration-300 group">
                      <td className="p-6 font-medium text-slate-800 group-hover:text-blue-800 transition-colors duration-300">{cost.category}</td>
                      <td className="p-6 text-slate-600">{cost.traditional}</td>
                      <td className="p-6 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">{cost.ourSolution}</td>
                      <td className="p-6 text-slate-800 font-semibold group-hover:text-blue-800 transition-colors duration-300">{cost.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Timeline */}
        <ScrollTriggeredSection animationType="slideUp" delay={0.6}>
          <div className="bg-white p-8 rounded-xl border-2 border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Implementation Timeline
            </h3>
            <div className="space-y-8">
              {timeline.map((phase, index) => (
                <div key={index} className="group flex items-start space-x-6 p-6 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 group-hover:bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 group-hover:scale-110 shadow-lg">
                      {phase.phase}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-slate-800 group-hover:text-blue-800 mb-3 transition-colors duration-300">{phase.duration}</h4>
                    <ul className="space-y-3">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="text-slate-600 flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 group-hover:text-blue-700 flex-shrink-0 mt-0.5 transition-colors duration-300" />
                          <span className="leading-relaxed">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Key Benefits Summary */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.8}>
          <div className="text-center mt-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-8 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                <DollarSign className="w-16 h-16 text-blue-600 group-hover:text-blue-700 mx-auto mb-6 group-hover:scale-110 transition-all duration-300" />
                <h4 className="text-xl font-semibold text-slate-800 group-hover:text-blue-800 mb-3 transition-colors duration-300">60% Lower Costs</h4>
                <p className="text-slate-600 leading-relaxed">Competitive maintenance pricing with transparent costs</p>
              </div>
              <div className="group text-center p-8 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                <Clock className="w-16 h-16 text-blue-600 group-hover:text-blue-700 mx-auto mb-6 group-hover:scale-110 transition-all duration-300" />
                <h4 className="text-xl font-semibold text-slate-800 group-hover:text-blue-800 mb-3 transition-colors duration-300">10x Faster</h4>
                <p className="text-slate-600 leading-relaxed">Deploy in weeks, not months with minimal client effort</p>
              </div>
              <div className="group text-center p-8 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                <Users className="w-16 h-16 text-blue-600 group-hover:text-blue-700 mx-auto mb-6 group-hover:scale-110 transition-all duration-300" />
                <h4 className="text-xl font-semibold text-slate-800 group-hover:text-blue-800 mb-3 transition-colors duration-300">Fully Customized</h4>
                <p className="text-slate-600 leading-relaxed">Tailored to your specific business needs and processes</p>
              </div>
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}