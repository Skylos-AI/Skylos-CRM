import { Lead } from "@/lib/types/lead"

export type TimePeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export interface PerformanceDataPoint {
  period: string
  leads: number
  deals: number
  conversion: number
  revenue: number
}

export function processPerformanceData(leads: Lead[], timePeriod: TimePeriod): PerformanceDataPoint[] {
  const now = new Date()
  
  switch (timePeriod) {
    case 'weekly':
      return generateWeeklyData(leads, now)
    case 'monthly':
      return generateMonthlyData(leads, now)
    case 'quarterly':
      return generateQuarterlyData(leads, now)
    case 'yearly':
      return generateYearlyData(leads, now)
    default:
      return generateMonthlyData(leads, now)
  }
}

function generateWeeklyData(leads: Lead[], now: Date): PerformanceDataPoint[] {
  const weeks = []
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - (i * 7))
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    const weekLeads = leads.filter(lead => {
      const leadDate = new Date(lead.createdAt)
      return leadDate >= weekStart && leadDate <= weekEnd
    })
    
    const weekDeals = weekLeads.filter(lead => lead.stage === 'final')
    const conversion = weekLeads.length > 0 ? (weekDeals.length / weekLeads.length) * 100 : 0
    const revenue = weekDeals.reduce((sum, lead) => sum + lead.dealAmount, 0)
    
    weeks.push({
      period: `W${Math.ceil((weekStart.getDate()) / 7)}`,
      leads: weekLeads.length,
      deals: weekDeals.length,
      conversion: Math.round(conversion * 10) / 10,
      revenue
    })
  }
  return weeks
}

function generateMonthlyData(leads: Lead[], now: Date): PerformanceDataPoint[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const data = []
  
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = months[monthDate.getMonth()]
    
    // Simulate data based on current leads for demonstration
    const baseLeads = Math.max(8, leads.length - (i * 3))
    const baseDeals = Math.max(3, Math.floor(baseLeads * 0.6))
    const conversion = baseLeads > 0 ? (baseDeals / baseLeads) * 100 : 0
    const revenue = baseDeals * (15000 + (i * 2000))
    
    data.push({
      period: monthName,
      leads: baseLeads + Math.floor(Math.random() * 5),
      deals: baseDeals + Math.floor(Math.random() * 3),
      conversion: Math.round(conversion * 10) / 10,
      revenue: revenue + Math.floor(Math.random() * 10000)
    })
  }
  
  return data
}

function generateQuarterlyData(leads: Lead[], now: Date): PerformanceDataPoint[] {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
  const data = []
  
  for (let i = 3; i >= 0; i--) {
    const quarterIndex = (Math.floor(now.getMonth() / 3) - i + 4) % 4
    const quarterName = quarters[quarterIndex]
    
    // Simulate quarterly data
    const baseLeads = Math.max(25, leads.length * 3 - (i * 10))
    const baseDeals = Math.max(15, Math.floor(baseLeads * 0.65))
    const conversion = baseLeads > 0 ? (baseDeals / baseLeads) * 100 : 0
    const revenue = baseDeals * (45000 + (i * 5000))
    
    data.push({
      period: quarterName,
      leads: baseLeads + Math.floor(Math.random() * 15),
      deals: baseDeals + Math.floor(Math.random() * 8),
      conversion: Math.round(conversion * 10) / 10,
      revenue: revenue + Math.floor(Math.random() * 25000)
    })
  }
  
  return data
}

function generateYearlyData(leads: Lead[], now: Date): PerformanceDataPoint[] {
  const data = []
  
  for (let i = 4; i >= 0; i--) {
    const year = now.getFullYear() - i
    
    // Simulate yearly data
    const baseLeads = Math.max(100, leads.length * 12 - (i * 50))
    const baseDeals = Math.max(60, Math.floor(baseLeads * 0.7))
    const conversion = baseLeads > 0 ? (baseDeals / baseLeads) * 100 : 0
    const revenue = baseDeals * (180000 + (i * 20000))
    
    data.push({
      period: year.toString(),
      leads: baseLeads + Math.floor(Math.random() * 50),
      deals: baseDeals + Math.floor(Math.random() * 30),
      conversion: Math.round(conversion * 10) / 10,
      revenue: revenue + Math.floor(Math.random() * 100000)
    })
  }
  
  return data
}

export function formatValue(value: number, type: 'currency' | 'number' | 'percentage'): string {
  switch (type) {
    case 'currency':
      return `$${value.toLocaleString()}`
    case 'percentage':
      return `${value.toFixed(1)}%`
    case 'number':
    default:
      return value.toLocaleString()
  }
}