"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
    </div>
  )
}

export function CardSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card className={cn("animate-pulse", className)}>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-8 bg-muted rounded flex-1 animate-pulse"></div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function KanbanSkeleton() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {Array.from({ length: 4 }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex-shrink-0 w-80">
          <Card className="h-full animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-5 bg-muted rounded w-32"></div>
                <div className="h-6 w-8 bg-muted rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <div key={cardIndex} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-muted rounded w-6"></div>
                      <div className="h-4 bg-muted rounded w-4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-12"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}