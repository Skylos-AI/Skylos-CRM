/**
 * Chart Performance Optimization Utilities
 * Provides memoization, debouncing, and caching for smooth chart rendering
 */

import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Lead } from '@/lib/types/lead'
import { TimePeriod, PerformanceDataPoint, processPerformanceData } from '@/lib/charts/chart-utils'

// Debounce hook for smooth user interactions
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Smooth debounced hover state for chart interactions
export function useDebouncedHover(delay: number = 150) {
  const [isHovered, setIsHovered] = useState(false)
  const [debouncedHovered, setDebouncedHovered] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedHovered(true)
    }, delay)
  }, [delay])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedHovered(false)
    }, delay)
  }, [delay])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isHovered,
    debouncedHovered,
    handleMouseEnter,
    handleMouseLeave
  }
}

// Data cache for efficient time period calculations
class ChartDataCache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly TTL = 5 * 60 * 1000 // 5 minutes cache TTL

  private generateKey(leads: Lead[], timePeriod: TimePeriod, additionalParams?: any): string {
    const leadsHash = leads.length + leads.reduce((sum, lead) => sum + lead.id.length, 0)
    const paramsHash = additionalParams ? JSON.stringify(additionalParams) : ''
    return `${timePeriod}-${leadsHash}-${paramsHash}`
  }

  get<T>(leads: Lead[], timePeriod: TimePeriod, additionalParams?: any): T | null {
    const key = this.generateKey(leads, timePeriod, additionalParams)
    const cached = this.cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      // Record cache hit
      if (typeof window !== 'undefined') {
        import('./chart-performance-monitor').then(({ chartPerformanceMonitor }) => {
          chartPerformanceMonitor.recordCacheAccess(`${timePeriod}-${additionalParams || 'default'}`, true)
        })
      }
      return cached.data as T
    }
    
    // Record cache miss
    if (typeof window !== 'undefined') {
      import('./chart-performance-monitor').then(({ chartPerformanceMonitor }) => {
        chartPerformanceMonitor.recordCacheAccess(`${timePeriod}-${additionalParams || 'default'}`, false)
      })
    }
    
    // Clean expired entries
    if (cached) {
      this.cache.delete(key)
    }
    
    return null
  }

  set<T>(leads: Lead[], timePeriod: TimePeriod, data: T, additionalParams?: any): void {
    const key = this.generateKey(leads, timePeriod, additionalParams)
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean expired entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp >= this.TTL) {
        this.cache.delete(key)
      }
    }
  }
}

// Global cache instance
const chartDataCache = new ChartDataCache()

// Cleanup expired cache entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    chartDataCache.cleanup()
  }, 5 * 60 * 1000)
}

// Optimized performance data processing with caching
export function useOptimizedPerformanceData(leads: Lead[], timePeriod: TimePeriod) {
  return useMemo(() => {
    // Try to get from cache first
    const cached = chartDataCache.get<PerformanceDataPoint[]>(leads, timePeriod)
    if (cached) {
      return cached
    }

    // Process data if not cached
    const data = processPerformanceData(leads, timePeriod)
    
    // Cache the result
    chartDataCache.set(leads, timePeriod, data)
    
    return data
  }, [leads, timePeriod])
}

// Optimized pipeline data processing with memoization
export function useOptimizedPipelineData(leads: Lead[]) {
  return useMemo(() => {
    const cacheKey = 'pipeline'
    const cached = chartDataCache.get<any[]>(leads, 'monthly', cacheKey)
    if (cached) {
      return cached
    }

    const stages = ['incoming', 'decision', 'negotiation', 'final'] as const
    const colors = ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af']
    
    const data = stages.map((stage, index) => {
      const stageLeads = leads.filter(l => l.stage === stage)
      return {
        stage: stage.charAt(0).toUpperCase() + stage.slice(1),
        count: stageLeads.length,
        value: stageLeads.reduce((sum, l) => sum + l.dealAmount, 0),
        averageDealSize: stageLeads.length > 0 
          ? stageLeads.reduce((sum, l) => sum + l.dealAmount, 0) / stageLeads.length 
          : 0,
        conversionRate: index > 0 
          ? (stageLeads.length / leads.filter(l => stages.indexOf(l.stage) >= index - 1).length) * 100 
          : 100,
        fill: colors[index]
      }
    })

    chartDataCache.set(leads, 'monthly', data, cacheKey)
    return data
  }, [leads])
}

// Optimized priority data processing with memoization
export function useOptimizedPriorityData(leads: Lead[]) {
  return useMemo(() => {
    const cacheKey = 'priority'
    const cached = chartDataCache.get<any[]>(leads, 'monthly', cacheKey)
    if (cached) {
      return cached
    }

    const priorities = ['low', 'medium', 'high', 'urgent'] as const
    const colors = ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af']
    
    const data = priorities.map((priority, index) => {
      const priorityLeads = leads.filter(l => l.priority === priority)
      return {
        name: priority.charAt(0).toUpperCase() + priority.slice(1),
        value: priorityLeads.length,
        percentage: leads.length > 0 ? (priorityLeads.length / leads.length) * 100 : 0,
        color: colors[index]
      }
    }).filter(item => item.value > 0)

    chartDataCache.set(leads, 'monthly', data, cacheKey)
    return data
  }, [leads])
}

// Optimized revenue data processing with growth calculations
export function useOptimizedRevenueData(leads: Lead[]) {
  return useMemo(() => {
    const cacheKey = 'revenue'
    const cached = chartDataCache.get<any[]>(leads, 'monthly', cacheKey)
    if (cached) {
      return cached
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const baseRevenues = [45000, 52000, 61000, 73000, 85000]
    const currentRevenue = leads.reduce((sum, l) => sum + l.dealAmount, 0)
    
    const data = months.map((month, index) => {
      if (index < 5) {
        const revenue = baseRevenues[index]
        const growth = index === 0 ? 0 : ((revenue - baseRevenues[index - 1]) / baseRevenues[index - 1]) * 100
        return {
          month,
          leads: 12 + (index * 3),
          deals: 8 + (index * 2),
          revenue,
          growth: Math.round(growth * 10) / 10
        }
      } else {
        const previousRevenue = baseRevenues[4]
        const growth = currentRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : -5.2
        return {
          month,
          leads: leads.length,
          deals: leads.filter(l => l.stage === 'final').length,
          revenue: currentRevenue,
          growth: Math.round(growth * 10) / 10
        }
      }
    })

    chartDataCache.set(leads, 'monthly', data, cacheKey)
    return data
  }, [leads])
}

// Smooth transition animations configuration
export const smoothAnimationConfig = {
  duration: 800,
  easing: 'ease-out',
  stagger: 100,
  hover: {
    duration: 150,
    scale: 1.02,
    opacity: 0.8
  },
  loading: {
    duration: 1200,
    shimmer: true
  }
}

// Performance monitoring for chart renders
export function useChartPerformance(chartName: string) {
  const renderStartTime = useRef<number>()
  const renderCount = useRef<number>(0)

  useEffect(() => {
    renderStartTime.current = performance.now()
    renderCount.current += 1
  })

  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current
      
      // Record performance metrics
      if (typeof window !== 'undefined') {
        import('./chart-performance-monitor').then(({ chartPerformanceMonitor }) => {
          chartPerformanceMonitor.recordRender(chartName, renderTime)
        })
      }
    }
  })

  return {
    renderCount: renderCount.current
  }
}

// Clear cache utility for testing or manual cleanup
export function clearChartCache() {
  chartDataCache.clear()
}