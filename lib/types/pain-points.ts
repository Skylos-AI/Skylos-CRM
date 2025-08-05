export interface PainPoint {
  id: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  frequency: number // percentage of businesses affected
  industry: string[]
  category: 'customer-service' | 'sales' | 'operations' | 'support'
}

export interface Solution {
  id: string
  painPointId: string
  approach: string
  outcome: string
  timeToValue: string
  features: string[]
  caseStudy?: {
    company: string
    industry: string
    challenge: string
    solution: string
    results: string[]
    metrics: {
      label: string
      value: string
      improvement: string
    }[]
  }
}

export interface Industry {
  id: string
  name: string
  icon: string
  description: string
  commonPainPoints: string[]
  agentTypes: string[]
}

export interface PainPointSolverProps {
  industries: Industry[]
  painPoints: PainPoint[]
  solutions: Solution[]
  selectedIndustry?: string
  onIndustryChange?: (industryId: string) => void
}