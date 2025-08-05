export interface MarketTrend {
  year: number
  aiAdoption: number
  competitiveGap: number
  costSavings: number
  productivityGain: number
}

export interface IndustryData {
  industry: string
  adoptionRate: number
  averageROI: number
  implementationTime: number
  competitiveAdvantage: string
}

export interface CompetitiveMetric {
  metric: string
  withAI: number
  withoutAI: number
  unit: string
  impact: "positive" | "negative"
}

export const marketTrends: MarketTrend[] = [
  { year: 2020, aiAdoption: 23, competitiveGap: 15, costSavings: 12, productivityGain: 18 },
  { year: 2021, aiAdoption: 34, competitiveGap: 25, costSavings: 18, productivityGain: 28 },
  { year: 2022, aiAdoption: 48, competitiveGap: 38, costSavings: 25, productivityGain: 42 },
  { year: 2023, aiAdoption: 61, competitiveGap: 52, costSavings: 32, productivityGain: 58 },
  { year: 2024, aiAdoption: 73, competitiveGap: 67, costSavings: 40, productivityGain: 73 }
]

export const industryData: IndustryData[] = [
  {
    industry: "Customer Service",
    adoptionRate: 78,
    averageROI: 340,
    implementationTime: 6,
    competitiveAdvantage: "5x faster response times, 24/7 availability"
  },
  {
    industry: "Sales & Lead Generation", 
    adoptionRate: 71,
    averageROI: 280,
    implementationTime: 4,
    competitiveAdvantage: "60% more qualified leads, automated follow-up"
  },
  {
    industry: "Operations & Support",
    adoptionRate: 65,
    averageROI: 220,
    implementationTime: 8,
    competitiveAdvantage: "40% cost reduction, streamlined workflows"
  },
  {
    industry: "Marketing & Analytics",
    adoptionRate: 69,
    averageROI: 195,
    implementationTime: 5,
    competitiveAdvantage: "Real-time insights, personalized campaigns"
  },
  {
    industry: "HR & Recruitment",
    adoptionRate: 52,
    averageROI: 165,
    implementationTime: 7,
    competitiveAdvantage: "Automated screening, bias reduction"
  }
]

export const competitiveMetrics: CompetitiveMetric[] = [
  {
    metric: "Customer Response Time",
    withAI: 2,
    withoutAI: 24,
    unit: "minutes",
    impact: "positive"
  },
  {
    metric: "Lead Qualification Rate",
    withAI: 85,
    withoutAI: 35,
    unit: "%",
    impact: "positive"
  },
  {
    metric: "Operational Costs",
    withAI: 60,
    withoutAI: 100,
    unit: "% of baseline",
    impact: "negative"
  },
  {
    metric: "Employee Productivity",
    withAI: 230,
    withoutAI: 100,
    unit: "% of baseline",
    impact: "positive"
  },
  {
    metric: "Customer Satisfaction",
    withAI: 92,
    withoutAI: 67,
    unit: "%",
    impact: "positive"
  },
  {
    metric: "Time to Market",
    withAI: 3,
    withoutAI: 12,
    unit: "weeks",
    impact: "positive"
  }
]

export const urgencyFactors = [
  {
    factor: "Market Share Loss",
    description: "Companies without AI lose 15-25% market share annually to AI-enabled competitors",
    timeframe: "6-12 months",
    severity: "critical" as const
  },
  {
    factor: "Talent Acquisition",
    description: "Top talent increasingly chooses AI-forward companies, creating recruitment disadvantages",
    timeframe: "3-6 months", 
    severity: "high" as const
  },
  {
    factor: "Customer Expectations",
    description: "Customers expect AI-level service quality; manual processes appear outdated",
    timeframe: "1-3 months",
    severity: "high" as const
  },
  {
    factor: "Investment Requirements",
    description: "Catch-up costs increase exponentially as competitors establish AI infrastructure",
    timeframe: "12+ months",
    severity: "medium" as const
  }
]

export const industryBenchmarks = {
  averageImplementationTime: {
    withPartner: 6,
    inHouse: 18,
    unit: "weeks"
  },
  successRate: {
    withPartner: 94,
    inHouse: 67,
    unit: "%"
  },
  timeToROI: {
    withPartner: 3,
    inHouse: 12,
    unit: "months"
  },
  maintenanceCost: {
    withPartner: 15,
    inHouse: 45,
    unit: "% of implementation cost"
  }
}