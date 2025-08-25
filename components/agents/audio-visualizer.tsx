"use client"

import { useEffect, useRef } from 'react'

interface AudioVisualizerProps {
  analyserNode?: AnalyserNode | null
  isActive: boolean
  width?: number
  height?: number
  className?: string
}

export function AudioVisualizer({ 
  analyserNode, 
  isActive, 
  width = 125, 
  height = 50,
  className = "" 
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !analyserNode || !isActive) {
      // Clear canvas and stop animation if not active
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }

      animationIdRef.current = requestAnimationFrame(draw)
      
      // Get frequency data
      analyserNode.getByteFrequencyData(dataArray)
      
      // Clear canvas
      ctx.fillStyle = 'rgb(15, 20, 25)' // Dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Calculate bar dimensions
      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0
      
      // Draw frequency bars
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8 // Scale to 80% of canvas height
        
        // Create gradient color based on frequency
        const intensity = dataArray[i] / 255
        const hue = 200 + (intensity * 60) // Blue to cyan gradient
        ctx.fillStyle = `hsl(${hue}, 70%, ${50 + intensity * 30}%)`
        
        // Draw bar from bottom up
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        
        x += barWidth + 1
      }
    }

    draw()

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
    }
  }, [analyserNode, isActive])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <div className={`relative inline-block ${className}`}>
      <canvas 
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-border rounded-md bg-background"
        style={{ 
          imageRendering: 'pixelated',
          filter: 'contrast(1.1) saturate(1.2)'
        }}
      />
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">
            Micrófono inactivo
          </span>
        </div>
      )}
    </div>
  )
}