"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface ErrorHandlerOptions {
  showToast?: boolean
  logError?: boolean
  fallbackMessage?: string
}

export function useErrorHandler() {
  const { toast } = useToast()

  const handleError = useCallback((
    error: Error | string,
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logError = true,
      fallbackMessage = "An unexpected error occurred"
    } = options

    const errorMessage = typeof error === 'string' ? error : error.message
    const displayMessage = errorMessage || fallbackMessage

    if (logError) {
      console.error('Error handled:', error)
    }

    if (showToast) {
      toast({
        variant: "destructive",
        title: "Error",
        description: displayMessage,
      })
    }

    return displayMessage
  }, [toast])

  const handleSuccess = useCallback((message: string) => {
    toast({
      title: "Success",
      description: message,
    })
  }, [toast])

  const handleInfo = useCallback((message: string) => {
    toast({
      title: "Info",
      description: message,
    })
  }, [toast])

  const handleWarning = useCallback((message: string) => {
    toast({
      variant: "destructive",
      title: "Warning",
      description: message,
    })
  }, [toast])

  return {
    handleError,
    handleSuccess,
    handleInfo,
    handleWarning
  }
}