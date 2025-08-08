/**
 * Optimized Dashboard Charts with Performance Enhancements
 * Implements React.memo, useMemo, debounced updates, caching, and lazy loading
 */

"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { Lead } from "@/lib/types/lead"
import { TimePeriod } from "@/lib/charts/chart-utils"
import { useDebounce, useChartPerformance } from "@/lib/performance/chart-performance"
import { 
  LazyRevenueChart,
  LazyPerformanceChart,
  LazyPipelineChart,
  LazyPriorityChart,
  useChartPreloader
} from "@/components/charts/lazy-chart-loader"
import { AccessibleChartWrapper } from "@/components/charts/accessible-chart-wrapper"
import { 
  HighContrastIndicator, 
  ReducedMotionIndicator, 
  SkipToChart,
  KeyboardNavigationHelp
} from "@/components/ui/accessible-focus-indicators"
import { useChartAccessibility } from "@/lib/accessibility/chart-accessibility"

interface OptimizedChartsProps {
  leads: Lead[]
}

const OptimizedDashboardCharts = memo<OptimizedChartsProps>(({ leads }) => {
  useChartPerformance('DashboardCharts')
  
  // State for time period selection with debounced updates
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('monthly')
  const [performanceLoading, setPerformanceLoading] = useState(false)
  const [chartsLoading, setChartsLoading] = useState(true)
  
  // Debounce time period changes for smooth interactions
  const debouncedTimePeriod = useDebounce(selectedTimePeriod, 150)
  
  // Get accessibility configuration
  const { isHighContrast, prefersReducedMotion, animationConfig } = useChartAccessibility('dashboard', leads)
  
  // Preload chart components for better performance
  const { preloadCharts } = useChartPreloader()
  
  // Simulate initial loading with respect to reduced motion preferences
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartsLoading(false)
    }, prefersReducedMotion ? 0 : 1500)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  // Preload charts on component mount
  useEffect(() => {
    preloadCharts()
  }, [preloadCharts])
  
  // Handle time period changes with smooth loading transitions
  const handleTimePeriodChange = useCallback((period: TimePeriod) => {
    setPerformanceLoading(true)
    setSelectedTimePeriod(period)
    
    // Simulate data fetching delay (respect reduced motion)
    setTimeout(() => {
      setPerformanceLoading(false)
    }, prefersReducedMotion ? 0 : 800)
  }, [prefersReducedMotion])

  return (
    <div className="dashboard-charts-grid grid gap-4 grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
      {/* Accessibility indicators */}
      <HighContrastIndicator />
      <ReducedMotionIndicator />
      
      {/* Skip links for keyboard navigation */}
      <SkipToChart chartId="revenue-chart" chartTitle="Revenue Trend Chart" />
      <SkipToChart chartId="priority-chart" chartTitle="Priority Distribution Chart" />
      <SkipToChart chartId="pipeline-chart" chartTitle="Pipeline by Stage Chart" />
      <SkipToChart chartId="performance-chart" chartTitle="Performance Overview Chart" />
      
      {/* Keyboard navigation instructions */}
      <KeyboardNavigationHelp 
        instructions={[
          "Use Tab to navigate between charts",
          "Use arrow keys to navigate data points within a chart",
          "Press Alt+T to toggle between chart and table view",
          "Press Home/End to go to first/last data point"
        ]}
      />
      
      {/* Enhanced Revenue Trend - Primary Chart (60% width - 3 of 5 columns) */}
      <AccessibleChartWrapper
        title="Revenue Trend"
        description="Monthly revenue growth and performance tracking"
        chartType="revenue"
        data={leads}
        loading={chartsLoading}
        height={320}
        className="revenue-chart md:col-span-3"
        isEmpty={leads.length === 0}
        emptyTitle="No revenue data"
        emptyMessage="Revenue data will appear here once you have closed deals."
        showDataTable={true}
        additionalAriaInfo={`Revenue tracking for ${leads.length} leads with smooth performance optimizations`}
      >
        <LazyRevenueChart
          leads={leads}
          loading={chartsLoading}
          className="revenue-chart md:col-span-3"
        />
      </AccessibleChartWrapper>

      {/* Enhanced Priority Distribution - Supporting Chart */}
      <AccessibleChartWrapper
        title="Lead Priority Distribution"
        description="Breakdown of leads by priority level"
        chartType="priority"
        data={leads}
        loading={chartsLoading}
        height={350}
        className="priority-chart md:col-span-2"
        isEmpty={leads.length === 0}
        emptyTitle="No priority data"
        emptyMessage="Lead priority distribution will appear here once you have leads."
        showDataTable={true}
        additionalAriaInfo={`Priority distribution for ${leads.length} leads with optimized rendering`}
      >
        <LazyPriorityChart
          leads={leads}
          loading={chartsLoading}
          className="priority-chart md:col-span-2"
        />
      </AccessibleChartWrapper>

      {/* Enhanced Pipeline by Stage - Supporting Chart */}
      <AccessibleChartWrapper
        title="Pipeline by Stage"
        description="Deal value distribution across pipeline stages"
        chartType="pipeline"
        data={leads}
        loading={chartsLoading}
        height={300}
        className="pipeline-chart md:col-span-2"
        isEmpty={leads.every(lead => lead.dealAmount === 0)}
        emptyTitle="No pipeline data"
        emptyMessage="Pipeline data will appear here once you have deals in progress."
        showDataTable={true}
        additionalAriaInfo={`Pipeline analysis for ${leads.length} leads with performance optimizations`}
      >
        <LazyPipelineChart
          leads={leads}
          loading={chartsLoading}
          className="pipeline-chart md:col-span-2"
        />
      </AccessibleChartWrapper>

      {/* Unified Performance Chart with Time Selection */}
      <AccessibleChartWrapper
        title="Performance Overview"
        description={`Leads, deals, and conversion trends across ${debouncedTimePeriod} periods`}
        chartType="performance"
        data={leads}
        loading={performanceLoading}
        height={300}
        className="performance-chart md:col-span-3"
        isEmpty={leads.length === 0}
        emptyTitle="No performance data"
        emptyMessage="Performance metrics will appear here once you have leads and deals."
        showDataTable={true}
        additionalAriaInfo={`Performance overview showing ${debouncedTimePeriod} data with smooth transitions`}
      >
        <LazyPerformanceChart
          leads={leads}
          selectedTimePeriod={debouncedTimePeriod}
          onTimePeriodChange={handleTimePeriodChange}
          loading={performanceLoading}
          className="performance-chart md:col-span-3"
        />
      </AccessibleChartWrapper>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for optimal re-rendering
  if (prevProps.leads.length !== nextProps.leads.length) {
    return false
  }
  
  // Deep comparison for lead changes that affect charts
  return prevProps.leads.every((lead, index) => {
    const nextLead = nextProps.leads[index]
    return nextLead && 
           lead.id === nextLead.id &&
           lead.dealAmount === nextLead.dealAmount &&
           lead.stage === nextLead.stage &&
           lead.priority === nextLead.priority &&
           lead.createdAt === nextLead.createdAt
  })
})

OptimizedDashboardCharts.displayName = 'OptimizedDashboardCharts'

export { OptimizedDashboardCharts }