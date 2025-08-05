"use client"

import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals'

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
}

type MetricName = 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB'

interface WebVitalsData {
  name: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

// Analytics function to send metrics
function sendToAnalytics(metric: WebVitalsData) {
  // Send to your analytics service
  console.log('Web Vitals:', metric)
  
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
  
  // Example: Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    }).catch(console.error)
  }
}

function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

function handleMetric(metric: Metric) {
  const webVitalsData: WebVitalsData = {
    name: metric.name as MetricName,
    value: metric.value,
    rating: getRating(metric.name as MetricName, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType || 'navigate',
  }
  
  sendToAnalytics(webVitalsData)
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  if (typeof window === 'undefined') return
  
  try {
    getCLS(handleMetric)
    getFID(handleMetric)
    getFCP(handleMetric)
    getLCP(handleMetric)
    getTTFB(handleMetric)
  } catch (error) {
    console.error('Error initializing Web Vitals:', error)
  }
}

// Performance observer for custom metrics
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private observers: PerformanceObserver[] = []
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }
  
  // Monitor animation performance
  monitorAnimations() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'measure' && entry.name.includes('animation')) {
          console.log(`Animation ${entry.name}: ${entry.duration}ms`)
          
          // Alert if animation is too slow
          if (entry.duration > 16.67) { // 60fps threshold
            console.warn(`Slow animation detected: ${entry.name} took ${entry.duration}ms`)
          }
        }
      })
    })
    
    observer.observe({ entryTypes: ['measure'] })
    this.observers.push(observer)
  }
  
  // Monitor resource loading
  monitorResources() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          
          // Monitor large resources
          if (resourceEntry.transferSize > 100000) { // 100KB
            console.warn(`Large resource: ${resourceEntry.name} (${resourceEntry.transferSize} bytes)`)
          }
          
          // Monitor slow resources
          if (resourceEntry.duration > 1000) { // 1 second
            console.warn(`Slow resource: ${resourceEntry.name} (${resourceEntry.duration}ms)`)
          }
        }
      })
    })
    
    observer.observe({ entryTypes: ['resource'] })
    this.observers.push(observer)
  }
  
  // Monitor long tasks
  monitorLongTasks() {
    if (typeof window === 'undefined' || !window.PerformanceObserver) return
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'longtask') {
          console.warn(`Long task detected: ${entry.duration}ms`)
          
          // Send to analytics
          sendToAnalytics({
            name: 'TTFB', // Using TTFB as placeholder for custom metric
            value: entry.duration,
            rating: entry.duration > 50 ? 'poor' : 'good',
            delta: entry.duration,
            id: `longtask-${Date.now()}`,
            navigationType: 'navigate',
          })
        }
      })
    })
    
    observer.observe({ entryTypes: ['longtask'] })
    this.observers.push(observer)
  }
  
  // Cleanup observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Utility to measure custom performance
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  if (typeof window === 'undefined' || !window.performance) {
    return fn()
  }
  
  const startMark = `${name}-start`
  const endMark = `${name}-end`
  const measureName = `${name}-duration`
  
  performance.mark(startMark)
  
  const result = fn()
  
  if (result instanceof Promise) {
    return result.finally(() => {
      performance.mark(endMark)
      performance.measure(measureName, startMark, endMark)
    })
  } else {
    performance.mark(endMark)
    performance.measure(measureName, startMark, endMark)
    return result
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  if (typeof window !== 'undefined') {
    const monitor = PerformanceMonitor.getInstance()
    
    return {
      startMonitoring: () => {
        monitor.monitorAnimations()
        monitor.monitorResources()
        monitor.monitorLongTasks()
      },
      stopMonitoring: () => monitor.disconnect(),
      measurePerformance,
    }
  }
  
  return {
    startMonitoring: () => {},
    stopMonitoring: () => {},
    measurePerformance: (name: string, fn: () => void) => fn(),
  }
}