// Image optimization utilities

export interface ImageOptimizationOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
  blur?: boolean
  grayscale?: boolean
}

// Generate optimized image URL for Next.js Image component
export function getOptimizedImageUrl(
  src: string,
  options: ImageOptimizationOptions = {}
): string {
  const {
    width,
    height,
    quality = 85,
    format = 'webp',
  } = options

  // For external images, you might want to use a service like Cloudinary
  if (src.startsWith('http')) {
    return src // Return as-is for external images, or implement external optimization
  }

  // For local images, Next.js will handle optimization
  const params = new URLSearchParams()
  
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', quality.toString())
  params.set('f', format)

  return `${src}?${params.toString()}`
}

// Generate responsive image srcSet
export function generateSrcSet(
  src: string,
  sizes: number[] = [640, 768, 1024, 1280, 1920],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(src, { ...options, width: size })
      return `${optimizedUrl} ${size}w`
    })
    .join(', ')
}

// Generate blur placeholder
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="100%" height="100%" fill="${color}" filter="url(#blur)"/>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

// Image format detection and fallback
export function getImageFormat(src: string): string {
  const extension = src.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'webp':
      return 'image/webp'
    case 'avif':
      return 'image/avif'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'image/jpeg'
  }
}

// Check if browser supports WebP
export function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

// Check if browser supports AVIF
export function supportsAVIF(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  
  return new Promise((resolve) => {
    const avif = new Image()
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2)
    }
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
  })
}

// Preload critical images
export function preloadImage(src: string, options: ImageOptimizationOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => resolve()
    img.onerror = reject
    
    // Set optimized source
    img.src = getOptimizedImageUrl(src, options)
    
    // Preload with high priority
    if ('loading' in img) {
      img.loading = 'eager'
    }
  })
}

// Batch preload images
export async function preloadImages(
  sources: Array<{ src: string; options?: ImageOptimizationOptions }>
): Promise<void> {
  const promises = sources.map(({ src, options }) => preloadImage(src, options))
  
  try {
    await Promise.all(promises)
    console.log(`Successfully preloaded ${sources.length} images`)
  } catch (error) {
    console.warn('Some images failed to preload:', error)
  }
}

// Image lazy loading intersection observer
export function createImageLazyLoader(
  rootMargin: string = '50px',
  threshold: number = 0.1
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    return null
  }
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            img.classList.remove('lazy')
          }
        }
      })
    },
    { rootMargin, threshold }
  )
}

// Performance metrics for images
export function trackImagePerformance(src: string, startTime: number) {
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = performance.now() - startTime
    
    console.log(`Image loaded: ${src} in ${loadTime.toFixed(2)}ms`)
    
    // Send to analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'image_load_time', {
        event_category: 'Performance',
        event_label: src,
        value: Math.round(loadTime),
      })
    }
  }
}