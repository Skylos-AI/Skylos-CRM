"use client"

import React, { useState, useEffect } from 'react'
import { runAccessibilityChecks } from '@/lib/utils/accessibility'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface AccessibilityTesterProps {
  targetSelector?: string
  autoRun?: boolean
  showResults?: boolean
}

export function AccessibilityTester({
  targetSelector = 'main',
  autoRun = false,
  showResults = true,
}: AccessibilityTesterProps) {
  const [issues, setIssues] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const runTests = () => {
    setIsRunning(true)
    
    setTimeout(() => {
      const targetElement = document.querySelector(targetSelector) as HTMLElement
      if (targetElement) {
        const foundIssues = runAccessibilityChecks(targetElement)
        setIssues(foundIssues)
      }
      setIsRunning(false)
      setHasRun(true)
    }, 500)
  }

  useEffect(() => {
    if (autoRun) {
      // Run tests after page load
      const timer = setTimeout(runTests, 2000)
      return () => clearTimeout(timer)
    }
  }, [autoRun])

  if (!showResults && process.env.NODE_ENV === 'production') {
    return null
  }

  const getStatusIcon = () => {
    if (isRunning) return <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
    if (!hasRun) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    if (issues.length === 0) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusText = () => {
    if (isRunning) return 'Running accessibility tests...'
    if (!hasRun) return 'Accessibility tests not run'
    if (issues.length === 0) return 'No accessibility issues found'
    return `${issues.length} accessibility issue${issues.length === 1 ? '' : 's'} found`
  }

  const getStatusColor = () => {
    if (isRunning) return 'bg-blue-50 border-blue-200'
    if (!hasRun) return 'bg-yellow-50 border-yellow-200'
    if (issues.length === 0) return 'bg-green-50 border-green-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <Card className={`fixed bottom-4 right-4 w-80 z-50 ${getStatusColor()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          {getStatusIcon()}
          Accessibility Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">{getStatusText()}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={runTests}
              disabled={isRunning}
            >
              {isRunning ? 'Testing...' : 'Run Tests'}
            </Button>
          </div>

          {hasRun && issues.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Issues Found:</h4>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="destructive" className="text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-xs text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasRun && issues.length === 0 && (
            <div className="text-sm text-green-700">
              ✅ All basic accessibility checks passed!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Development-only accessibility overlay
export function AccessibilityDevOverlay() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <AccessibilityTester
      autoRun={true}
      showResults={true}
    />
  )
}