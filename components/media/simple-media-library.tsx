"use client"

import { Card, CardContent } from '@/components/ui/card'

export function SimpleMediaLibrary() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Media Library</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-white dark:bg-slate-800 border-light-border-subtle/60 dark:border-slate-700/40 shadow-light-card dark:shadow-card hover:shadow-light-card-hover dark:hover:shadow-card-hover transition-all duration-200">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 dark:bg-slate-700 rounded-lg mb-2" />
              <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Sample File {i + 1}</p>
              <p className="text-xs text-light-text-muted dark:text-dark-text-tertiary">Image • 1.2 MB</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}