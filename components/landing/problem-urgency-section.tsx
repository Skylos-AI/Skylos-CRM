"use client"

import { ScrollTriggeredSection } from "@/components/animations/scroll-triggered-section"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { AnimatedCounter } from "@/components/shared/animated-counter"
import { cn } from "@/lib/utils"
import { industryData, competitiveMetrics, urgencyFactors } from "@/lib/mock-data/market-trends"

interface StatisticProps {
  value: number
  suffix?: string
  label: string
  description: string
  trend?: "up" | "down"
  trendValue?: number
}

const Statistic = ({ value, suffix = "", label, description, trend, trendValue }: StatisticProps) => {
  return (
    <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AnimatedCounter 
          value={value} 
          className="text-3xl md:text-4xl font-bold text-white"
        />
        <span className="text-3xl md:text-4xl font-bold text-white">{suffix}</span>
        {trend && trendValue && (
          <div className={cn(
            "flex items-center text-sm font-medium",
            trend === "up" ? "text-red-400" : "text-green-400"
          )}>
            {trend === "up" ? "↗" : "↘"} {trendValue}%
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  )
}

interface CompetitiveDisadvantageProps {
  title: string
  impact: string
  timeframe: string
  severity: "critical" | "high" | "medium"
}

const CompetitiveDisadvantage = ({ title, impact, timeframe, severity }: CompetitiveDisadvantageProps) => {
  const severityColors = {
    critical: "border-red-500 bg-red-500/10 text-red-400",
    high: "border-orange-500 bg-orange-500/10 text-orange-400", 
    medium: "border-yellow-500 bg-yellow-500/10 text-yellow-400"
  }

  return (
    <div className={cn(
      "p-4 rounded-lg border-l-4",
      severityColors[severity]
    )}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-white">{title}</h4>
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
          {timeframe}
        </span>
      </div>
      <p className="text-sm text-gray-300">{impact}</p>
    </div>
  )
}

interface IndustryTrendProps {
  industry: string
  adoptionRate: number
  averageROI: number
  competitiveAdvantage: string
}

const IndustryTrend = ({ industry, adoptionRate, averageROI, competitiveAdvantage }: IndustryTrendProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">{industry}</h4>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">
            <AnimatedCounter value={adoptionRate} />%
          </div>
          <div className="text-xs text-gray-400">adoption rate</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-300">ROI</span>
          <span className="text-green-400 font-semibold">
            <AnimatedCounter value={averageROI} />%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(adoptionRate, 100)}%` }}
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-300">{competitiveAdvantage}</p>
    </div>
  )
}

interface CompetitiveMetricProps {
  metric: string
  withAI: number
  withoutAI: number
  unit: string
  impact: "positive" | "negative"
}

const CompetitiveMetric = ({ metric, withAI, withoutAI, unit, impact }: CompetitiveMetricProps) => {
  const improvement = impact === "positive" 
    ? ((withAI - withoutAI) / withoutAI * 100)
    : ((withoutAI - withAI) / withoutAI * 100)
  
  const isTimeMetric = unit.includes("minutes") || unit.includes("weeks")
  const betterValue = impact === "positive" ? withAI : withoutAI
  const worseValue = impact === "positive" ? withoutAI : withAI

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <h4 className="text-sm font-medium text-white mb-3">{metric}</h4>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-green-400">With AI</span>
          <span className="text-lg font-bold text-green-400">
            <AnimatedCounter value={withAI} />{unit.replace("% of baseline", "%")}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-red-400">Without AI</span>
          <span className="text-lg font-bold text-red-400">
            <AnimatedCounter value={withoutAI} />{unit.replace("% of baseline", "%")}
          </span>
        </div>
        
        <div className="pt-2 border-t border-white/10">
          <div className="text-center">
            <span className="text-xs text-gray-400">Improvement: </span>
            <span className="text-sm font-semibold text-blue-400">
              {improvement > 0 ? "+" : ""}{improvement.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProblemUrgencySection() {
  const statistics = [
    {
      value: 73,
      suffix: "%",
      label: "Businesses Using AI",
      description: "Companies already implementing AI automation solutions",
      trend: "up" as const,
      trendValue: 45
    },
    {
      value: 2.3,
      suffix: "x",
      label: "Productivity Increase",
      description: "Average efficiency gains from AI automation",
      trend: "up" as const,
      trendValue: 23
    },
    {
      value: 40,
      suffix: "%",
      label: "Cost Reduction",
      description: "Average operational cost savings with AI",
      trend: "down" as const,
      trendValue: 40
    },
    {
      value: 18,
      label: "Months Behind",
      description: "Time to catch up once competitors adopt AI",
      trend: "up" as const,
      trendValue: 67
    }
  ]

  const competitiveDisadvantages = [
    {
      title: "Customer Service Response Times",
      impact: "Competitors with AI respond 5x faster, leading to higher customer satisfaction and retention",
      timeframe: "Immediate",
      severity: "critical" as const
    },
    {
      title: "Lead Processing Efficiency", 
      impact: "Manual lead qualification means missing 60% of potential opportunities while competitors automate",
      timeframe: "Daily",
      severity: "critical" as const
    },
    {
      title: "Operational Cost Structure",
      impact: "Higher labor costs for routine tasks while competitors reduce overhead by 40% with automation",
      timeframe: "Monthly",
      severity: "high" as const
    },
    {
      title: "Market Intelligence Gathering",
      impact: "Slower market response and trend identification compared to AI-powered competitive analysis",
      timeframe: "Quarterly",
      severity: "high" as const
    },
    {
      title: "Scalability Limitations",
      impact: "Manual processes create bottlenecks that prevent rapid growth and market expansion",
      timeframe: "Annual",
      severity: "medium" as const
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.6),transparent)]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollTriggeredSection animationType="fadeIn" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            URGENT: Market Shift in Progress
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Competitors Are
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Already Ahead
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            While you&apos;re reading this, businesses in your industry are implementing AI automation 
            to gain competitive advantages. Every day without AI puts you further behind.
          </p>
        </ScrollTriggeredSection>

        {/* Industry Statistics */}
        <ScrollTriggeredSection animationType="slideUp" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The Numbers Don&apos;t Lie
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Industry data reveals the accelerating pace of AI adoption and the growing gap 
              between leaders and laggards.
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Statistic key={index} {...stat} />
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Industry Adoption Trends */}
        <ScrollTriggeredSection animationType="slideUp" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Industry Leaders Are Moving Fast
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See how different industries are adopting AI automation and the competitive 
              advantages they&apos;re gaining.
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industryData.slice(0, 5).map((industry, index) => (
              <IndustryTrend key={index} {...industry} />
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Competitive Metrics Comparison */}
        <ScrollTriggeredSection animationType="slideUp" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The Performance Gap Is Real
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Direct comparison of key business metrics between AI-enabled and traditional operations.
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {competitiveMetrics.map((metric, index) => (
              <CompetitiveMetric key={index} {...metric} />
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Competitive Disadvantages */}
        <ScrollTriggeredSection animationType="slideUp" className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              What You&apos;re Losing Every Day
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Without AI automation, your business faces mounting disadvantages across 
              critical operational areas.
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {urgencyFactors.map((factor, index) => (
              <CompetitiveDisadvantage 
                key={index} 
                title={factor.factor}
                impact={factor.description}
                timeframe={factor.timeframe}
                severity={factor.severity}
              />
            ))}
          </StaggerContainer>
        </ScrollTriggeredSection>

        {/* Urgency CTA */}
        <ScrollTriggeredSection animationType="fadeIn" className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The Cost of Waiting Is Exponential
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Every month you delay AI implementation, competitors pull further ahead. 
              The gap becomes harder and more expensive to close.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your AI Transformation Now
              </button>
              <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                See Competitive Analysis
              </button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              ⚡ Implementation starts in 48 hours • 🔒 Enterprise security included
            </p>
          </div>
        </ScrollTriggeredSection>
      </div>
    </section>
  )
}