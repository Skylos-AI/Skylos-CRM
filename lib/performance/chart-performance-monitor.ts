/**
 * Chart Performance Monitoring and Testing Utilities
 * Provides tools to measure and optimize chart rendering performance
 */

interface PerformanceMetrics {
  renderTime: number
  memoryUsage: number
  reRenderCount: number
  cacheHitRate: number
  bundleSize?: number
}

interface ChartPerformanceEntry {
  chartName: string
  timestamp: number
  metrics: PerformanceMetrics
}

class ChartPerformanceMonitor {
  private entries: ChartPerformanceEntry[] = []
  private renderCounts = new Map<string, number>()
  private cacheStats = new Map<string, { hits: number; misses: number }>()
  private readonly maxEntries = 100

  // Record performance metrics for a chart render
  recordRender(chartName: string, renderTime: number, memoryUsage?: number) {
    const currentCount = this.renderCounts.get(chartName) || 0
    this.renderCounts.set(chartName, currentCount + 1)

    const entry: ChartPerformanceEntry = {
      chartName,
      timestamp: Date.now(),
      metrics: {
        renderTime,
        memoryUsage: memoryUsage || this.getMemoryUsage(),
        reRenderCount: currentCount + 1,
        cacheHitRate: this.getCacheHitRate(chartName)
      }
    }

    this.entries.push(entry)

    // Keep only recent entries
    if (this.entries.length > this.maxEntries) {
      this.entries.shift()
    }

    // Log performance warnings in development
    if (process.env.NODE_ENV === 'development') {
      this.checkPerformanceThresholds(entry)
    }
  }

  // Record cache hit/miss for performance tracking
  recordCacheAccess(chartName: string, isHit: boolean) {
    const stats = this.cacheStats.get(chartName) || { hits: 0, misses: 0 }
    if (isHit) {
      stats.hits++
    } else {
      stats.misses++
    }
    this.cacheStats.set(chartName, stats)
  }

  // Get cache hit rate for a specific chart
  private getCacheHitRate(chartName: string): number {
    const stats = this.cacheStats.get(chartName)
    if (!stats || (stats.hits + stats.misses) === 0) {
      return 0
    }
    return (stats.hits / (stats.hits + stats.misses)) * 100
  }

  // Get current memory usage (if available)
  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      return (window.performance as any).memory.usedJSHeapSize / 1024 / 1024 // MB
    }
    return 0
  }

  // Check performance thresholds and warn about issues
  private checkPerformanceThresholds(entry: ChartPerformanceEntry) {
    const { chartName, metrics } = entry

    // Warn about slow renders
    if (metrics.renderTime > 100) {
      console.warn(`🐌 Slow chart render: ${chartName} took ${metrics.renderTime.toFixed(2)}ms`)
    }

    // Warn about excessive re-renders
    if (metrics.reRenderCount > 10) {
      console.warn(`🔄 Excessive re-renders: ${chartName} has rendered ${metrics.reRenderCount} times`)
    }

    // Warn about low cache hit rate
    if (metrics.cacheHitRate < 50 && metrics.reRenderCount > 5) {
      console.warn(`💾 Low cache hit rate: ${chartName} has ${metrics.cacheHitRate.toFixed(1)}% cache hits`)
    }

    // Warn about high memory usage
    if (metrics.memoryUsage > 50) {
      console.warn(`🧠 High memory usage: ${metrics.memoryUsage.toFixed(1)}MB`)
    }
  }

  // Get performance summary for all charts
  getPerformanceSummary() {
    const summary = new Map<string, {
      avgRenderTime: number
      totalRenders: number
      cacheHitRate: number
      lastRenderTime: number
    }>()

    // Group entries by chart name
    const chartEntries = new Map<string, ChartPerformanceEntry[]>()
    this.entries.forEach(entry => {
      const entries = chartEntries.get(entry.chartName) || []
      entries.push(entry)
      chartEntries.set(entry.chartName, entries)
    })

    // Calculate summary statistics
    chartEntries.forEach((entries, chartName) => {
      const renderTimes = entries.map(e => e.metrics.renderTime)
      const avgRenderTime = renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length
      const lastEntry = entries[entries.length - 1]

      summary.set(chartName, {
        avgRenderTime,
        totalRenders: entries.length,
        cacheHitRate: lastEntry.metrics.cacheHitRate,
        lastRenderTime: lastEntry.metrics.renderTime
      })
    })

    return summary
  }

  // Get detailed performance report
  getDetailedReport() {
    const summary = this.getPerformanceSummary()
    const report = {
      totalCharts: summary.size,
      totalRenders: this.entries.length,
      avgRenderTime: 0,
      slowestChart: '',
      fastestChart: '',
      bestCacheHitRate: 0,
      worstCacheHitRate: 100,
      charts: {} as Record<string, any>
    }

    let totalRenderTime = 0
    let slowestTime = 0
    let fastestTime = Infinity

    summary.forEach((stats, chartName) => {
      totalRenderTime += stats.avgRenderTime
      
      if (stats.avgRenderTime > slowestTime) {
        slowestTime = stats.avgRenderTime
        report.slowestChart = chartName
      }
      
      if (stats.avgRenderTime < fastestTime) {
        fastestTime = stats.avgRenderTime
        report.fastestChart = chartName
      }

      if (stats.cacheHitRate > report.bestCacheHitRate) {
        report.bestCacheHitRate = stats.cacheHitRate
      }

      if (stats.cacheHitRate < report.worstCacheHitRate) {
        report.worstCacheHitRate = stats.cacheHitRate
      }

      report.charts[chartName] = stats
    })

    report.avgRenderTime = totalRenderTime / summary.size

    return report
  }

  // Clear all performance data
  clear() {
    this.entries = []
    this.renderCounts.clear()
    this.cacheStats.clear()
  }

  // Export performance data for analysis
  exportData() {
    return {
      entries: this.entries,
      renderCounts: Object.fromEntries(this.renderCounts),
      cacheStats: Object.fromEntries(this.cacheStats),
      summary: this.getPerformanceSummary(),
      report: this.getDetailedReport()
    }
  }
}

// Global performance monitor instance
export const chartPerformanceMonitor = new ChartPerformanceMonitor()

// Hook for measuring chart render performance
export function useChartRenderMetrics(chartName: string) {
  const startTime = performance.now()

  const recordRender = () => {
    const renderTime = performance.now() - startTime
    chartPerformanceMonitor.recordRender(chartName, renderTime)
  }

  const recordCacheHit = () => {
    chartPerformanceMonitor.recordCacheAccess(chartName, true)
  }

  const recordCacheMiss = () => {
    chartPerformanceMonitor.recordCacheAccess(chartName, false)
  }

  return {
    recordRender,
    recordCacheHit,
    recordCacheMiss
  }
}

// Performance testing utilities
export const performanceTestUtils = {
  // Simulate heavy chart data for performance testing
  generateHeavyChartData(size: number) {
    return Array.from({ length: size }, (_, i) => ({
      id: i,
      value: Math.random() * 1000,
      category: `Category ${i % 10}`,
      timestamp: new Date(Date.now() - i * 86400000).toISOString()
    }))
  },

  // Measure component render time
  async measureRenderTime(renderFunction: () => Promise<void>): Promise<number> {
    const start = performance.now()
    await renderFunction()
    return performance.now() - start
  },

  // Test cache performance
  testCachePerformance(cacheFunction: (key: string) => any, keys: string[]) {
    const results = {
      hits: 0,
      misses: 0,
      avgAccessTime: 0
    }

    const accessTimes: number[] = []

    keys.forEach(key => {
      const start = performance.now()
      const result = cacheFunction(key)
      const accessTime = performance.now() - start
      
      accessTimes.push(accessTime)
      
      if (result !== null) {
        results.hits++
      } else {
        results.misses++
      }
    })

    results.avgAccessTime = accessTimes.reduce((sum, time) => sum + time, 0) / accessTimes.length

    return results
  },

  // Memory usage snapshot
  getMemorySnapshot() {
    if (typeof window !== 'undefined' && 'performance' in window && 'memory' in (window.performance as any)) {
      const memory = (window.performance as any).memory
      return {
        used: memory.usedJSHeapSize / 1024 / 1024, // MB
        total: memory.totalJSHeapSize / 1024 / 1024, // MB
        limit: memory.jsHeapSizeLimit / 1024 / 1024 // MB
      }
    }
    return null
  }
}

// Development-only performance logging
if (process.env.NODE_ENV === 'development') {
  // Log performance summary every 30 seconds
  setInterval(() => {
    const report = chartPerformanceMonitor.getDetailedReport()
    if (report.totalRenders > 0) {
      console.group('📊 Chart Performance Summary')
      console.log(`Total Charts: ${report.totalCharts}`)
      console.log(`Total Renders: ${report.totalRenders}`)
      console.log(`Average Render Time: ${report.avgRenderTime.toFixed(2)}ms`)
      console.log(`Slowest Chart: ${report.slowestChart}`)
      console.log(`Best Cache Hit Rate: ${report.bestCacheHitRate.toFixed(1)}%`)
      console.groupEnd()
    }
  }, 30000)
}