"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { SectionBadge } from "@/components/ui/section-badge"
import { SubtleBackgroundElements } from "@/components/ui/subtle-background-elements"

interface FOMAContent {
  headline: string
  statistics: Array<{
    value: string
    label: string
    description: string
  }>
  urgencyMessage: string
}

interface PainPoint {
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  frequency: number
}

interface CompetitiveThreats {
  threat: string
  consequence: string
  timeframe: string
}

export function ConsolidatedProblemSection() {
  const fomaContent: FOMAContent = {
    headline: "Your Competitors Are Already Ahead",
    statistics: [
      {
        value: "73%",
        label: "of businesses",
        description: "are already using AI to gain competitive advantages"
      },
      {
        value: "40%",
        label: "cost reduction",
        description: "achieved by early AI adopters in customer service"
      },
      {
        value: "6 months",
        label: "average delay",
        description: "puts you behind competitors who started AI implementation"
      }
    ],
    urgencyMessage: "Every day without AI automation means lost efficiency, higher costs, and falling behind competitors who are already transforming their operations."
  }

  const painPoints: PainPoint[] = [
    {
      title: "Overwhelmed Customer Service Teams",
      description: "Your team spends 80% of their time on repetitive inquiries instead of complex problem-solving",
      impact: 'high',
      frequency: 95
    },
    {
      title: "Inconsistent Response Times",
      description: "Customer satisfaction drops as response times vary wildly during peak hours",
      impact: 'high',
      frequency: 87
    },
    {
      title: "Scaling Bottlenecks",
      description: "Growth is limited by your ability to hire and train new support staff",
      impact: 'medium',
      frequency: 78
    },
    {
      title: "Lost Revenue from Delays",
      description: "Slow response times lead to abandoned purchases and customer churn",
      impact: 'high',
      frequency: 82
    }
  ]

  const competitiveThreats: CompetitiveThreats[] = [
    {
      threat: "Competitors offer 24/7 instant responses",
      consequence: "Your customers expect the same level of service",
      timeframe: "Happening now"
    },
    {
      threat: "AI-powered businesses operate at lower costs",
      consequence: "They can offer better pricing while maintaining margins",
      timeframe: "Next 6 months"
    },
    {
      threat: "Automated competitors scale without hiring",
      consequence: "They capture market share while you're still recruiting",
      timeframe: "Next 12 months"
    }
  ]

  return (
    <div className="relative bg-slate-50">
      {/* Subtle background elements */}
      <SubtleBackgroundElements 
        showGradientLines={true}
        showFloatingShapes={true}
        sectionType="slate"
      />
      
      <div className="container mx-auto px-4 relative py-24">
        <ScrollTriggeredSection animationType="fadeIn">
          <div className="text-center mb-16">
            <SectionBadge text="THE PROBLEM" />
            <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
              {fomaContent.headline}
            </h2>
            <p className="text-xl text-slate-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              {fomaContent.urgencyMessage}
            </p>
          </div>
        </ScrollTriggeredSection>

        {/* Enhanced Statistics with Bento-style Cards */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.2}>
          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
            {fomaContent.statistics.map((stat, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start"
                style={{
                  background: "rgba(231, 236, 235, 0.08)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
                
                {/* Content area */}
                <div className="self-stretch p-6 flex flex-col justify-start items-start gap-2 relative z-10">
                  <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
                    <p className="self-stretch text-foreground text-lg font-normal leading-7">
                      {stat.value} {stat.label} <br />
                      <span className="text-muted-foreground">{stat.description}</span>
                    </p>
                  </div>
                </div>

                {/* Visual component area */}
                <div className="self-stretch h-72 relative -mt-0.5 z-10 flex items-center justify-center">
                  {/* Enhanced visual based on statistic */}
                  {stat.value === "73%" && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg m-4">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-600 mb-2">{stat.value}</div>
                        <div className="text-sm text-blue-700 font-medium">AI Adoption Rate</div>
                        <div className="text-xs text-blue-600 mt-2">Industry Leading</div>
                      </div>
                    </div>
                  )}
                  {stat.value === "40%" && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg m-4">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-green-600 mb-2">{stat.value}</div>
                        <div className="text-sm text-green-700 font-medium">Cost Savings</div>
                        <div className="text-xs text-green-600 mt-2">Proven ROI</div>
                      </div>
                    </div>
                  )}
                  {stat.value === "6 months" && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-lg m-4">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-red-600 mb-2">{stat.value}</div>
                        <div className="text-sm text-red-700 font-medium">Delay Impact</div>
                        <div className="text-xs text-red-600 mt-2">Critical Gap</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Pain Points */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.4}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Common Business Pain Points We Solve
            </h3>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {painPoints.map((painPoint, index) => (
                <div key={index} className="group bg-white p-6 rounded-xl border-2 border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-600">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">{painPoint.title}</h4>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">{painPoint.frequency}% of businesses</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{painPoint.description}</p>
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      painPoint.impact === 'high' ? 'bg-blue-100 text-blue-800 group-hover:bg-blue-200' :
                      painPoint.impact === 'medium' ? 'bg-slate-100 text-slate-700 group-hover:bg-slate-200' :
                      'bg-slate-50 text-slate-600 group-hover:bg-slate-100'
                    }`}>
                      {painPoint.impact.toUpperCase()} IMPACT
                    </span>
                  </div>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </ScrollTriggeredSection>

        {/* Competitive Threats */}
        <ScrollTriggeredSection animationType="fadeInUp" delay={0.6}>
          <div className="bg-white p-8 rounded-xl border-2 border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              The Competitive Reality
            </h3>
            <div className="space-y-6">
              {competitiveThreats.map((threat, index) => (
                <div key={index} className="group flex items-start space-x-4 p-6 border-2 border-slate-100 hover:border-blue-200 bg-slate-50 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex-shrink-0">
                    <span className="inline-block w-10 h-10 bg-blue-600 group-hover:bg-blue-700 text-white rounded-full text-sm font-bold flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-800 mb-2 transition-colors duration-300">{threat.threat}</h4>
                    <p className="text-slate-600 mb-3 leading-relaxed">{threat.consequence}</p>
                    <span className="inline-block px-4 py-2 bg-blue-100 group-hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-all duration-300">
                      {threat.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollTriggeredSection>

        {/* Transition to Solution */}
        <ScrollTriggeredSection animationType="fadeIn" delay={0.8}>
          <div className="text-center mt-16">
            <div className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-600 hover:border-blue-700">
              The solution? Custom conversational AI that puts you ahead of the competition.
            </div>
          </div>
        </ScrollTriggeredSection>
      </div>
    </div>
  )
}