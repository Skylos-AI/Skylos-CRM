"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  animation?: 'scale' | 'bounce' | 'pulse' | 'none'
}

export function AnimatedButton({ 
  children, 
  className, 
  animation = 'scale',
  ...props 
}: AnimatedButtonProps) {
  const getAnimationClass = () => {
    switch (animation) {
      case 'scale':
        return 'hover:scale-105 active:scale-95 transition-transform duration-150'
      case 'bounce':
        return 'hover:animate-bounce'
      case 'pulse':
        return 'hover:animate-pulse'
      default:
        return ''
    }
  }

  return (
    <Button
      className={cn(getAnimationClass(), className)}
      {...props}
    >
      {children}
    </Button>
  )
}