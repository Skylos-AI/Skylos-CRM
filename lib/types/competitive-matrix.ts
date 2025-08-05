export interface ComparisonFeature {
  id: string
  name: string
  description: string
  ourSolution: string | boolean
  competitors: Record<string, string | boolean>
  isHighlight: boolean
  category: 'cost' | 'security' | 'features' | 'support' | 'integration'
}

export interface Competitor {
  id: string
  name: string
  logo?: string
  color: string
}

export interface CompetitiveMatrixProps {
  features: ComparisonFeature[]
  competitors: Competitor[]
  highlightedFeatures: string[]
  className?: string
}

export interface CostComparison {
  setup: Record<string, number>
  monthly: Record<string, number>
  maintenance: Record<string, number>
  scaling: Record<string, string>
}

export interface SecurityFeature {
  name: string
  description: string
  compliance: string[]
  ourImplementation: string
  competitorSupport: Record<string, boolean>
}

export interface ToolIntegration {
  category: string
  tools: string[]
  ourSupport: number
  competitorSupport: Record<string, number>
}