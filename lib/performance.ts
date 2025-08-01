// Performance monitoring utilities

export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  if (typeof window === 'undefined') {
    return fn()
  }

  const start = performance.now()
  const result = fn()

  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now()
      console.log(`${name} took ${end - start} milliseconds`)
    })
  } else {
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility for images
export function lazyLoadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

// Memory usage monitoring (development only)
export function logMemoryUsage() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return
  }

  if ('memory' in performance) {
    const memory = (performance as any).memory
    console.log('Memory Usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
    })
  }
}