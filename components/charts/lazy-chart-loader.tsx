/**
 * Lazy Chart Loader with smooth loading transitions
 * Optimizes bundle size by lazy loading chart components
 */

"use client"

import { lazy, Suspense, ComponentType } from 'react'
import { ChartLoadingSkeletonCard } from './chart-loading-skeleton'
import { Lead } from '@/lib/types/lead'
import { TimePeriod } from '@/lib/charts/chart-utils'

// Lazy load chart components for bundle optimization
const LazyOptimizedRevenueChart = lazy(() => 
  import('./optimized-chart-components').then(module => ({
    default: module.OptimizedRevenueChart
  }))
)

const LazyOptimizedPerformanceChart = lazy(() => 
  import('./optimized-chart-components').then(module => ({
    default: module.OptimizedPerformanceChart
  }))
)

const LazyOptimizedPipelineChart = lazy(() => 
  import('./optimized-chart-components').then(module => ({
    default: module.OptimizedPipelineChart
  }))
)

const LazyOptimizedPriorityChart = lazy(() => 
  import('./optimized-chart-components').then(module => ({
    default: module.OptimizedPriorityChart
  }))
)

// Smooth loading wrapper for lazy components
interface LazyChartWrapperProps {
  children: React.ReactNode
  fallbackHeight?: number
  className?: string
}

function LazyChartWrapper({ children, fallbackHeight = 300, className = "" }: LazyChartWrapperProps) {
  return (
    <Suspense 
      fallback={
        <ChartLoadingSkeletonCard
          height={fallbackHeight}
          showHeader={true}
          showStats={true}
          className={className}
        />
      }
    >
      {children}
    </Suspense>
  )
}

// Lazy Revenue Chart with smooth loading
interface LazyRevenueChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export function LazyRevenueChart({ leads, loading, className }: LazyRevenueChartProps) {
  return (
    <LazyChartWrapper fallbackHeight={320} className={className}>
      <LazyOptimizedRevenueChart 
        leads={leads} 
        loading={loading} 
        className={className}
      />
    </LazyChartWrapper>
  )
}

// Lazy Performance Chart with smooth loading
interface LazyPerformanceChartProps {
  leads: Lead[]
  selectedTimePeriod: TimePeriod
  onTimePeriodChange: (period: TimePeriod) => void
  loading?: boolean
  className?: string
}

export function LazyPerformanceChart({ 
  leads, 
  selectedTimePeriod, 
  onTimePeriodChange, 
  loading, 
  className 
}: LazyPerformanceChartProps) {
  return (
    <LazyChartWrapper fallbackHeight={300} className={className}>
      <LazyOptimizedPerformanceChart 
        leads={leads}
        selectedTimePeriod={selectedTimePeriod}
        onTimePeriodChange={onTimePeriodChange}
        loading={loading}
        className={className}
      />
    </LazyChartWrapper>
  )
}

// Lazy Pipeline Chart with smooth loading
interface LazyPipelineChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export function LazyPipelineChart({ leads, loading, className }: LazyPipelineChartProps) {
  return (
    <LazyChartWrapper fallbackHeight={300} className={className}>
      <LazyOptimizedPipelineChart 
        leads={leads} 
        loading={loading} 
        className={className}
      />
    </LazyChartWrapper>
  )
}

// Lazy Priority Chart with smooth loading
interface LazyPriorityChartProps {
  leads: Lead[]
  loading?: boolean
  className?: string
}

export function LazyPriorityChart({ leads, loading, className }: LazyPriorityChartProps) {
  return (
    <LazyChartWrapper fallbackHeight={350} className={className}>
      <LazyOptimizedPriorityChart 
        leads={leads} 
        loading={loading} 
        className={className}
      />
    </LazyChartWrapper>
  )
}

// Preload chart components for better UX
export function preloadChartComponents() {
  // Preload components when user is likely to need them
  const preloadPromises = [
    import('./optimized-chart-components'),
  ]
  
  return Promise.all(preloadPromises)
}

// Hook to preload charts on user interaction
export function useChartPreloader() {
  const preloadCharts = () => {
    // Preload on first user interaction (hover, click, etc.)
    preloadChartComponents().catch(console.error)
  }

  return { preloadCharts }
}