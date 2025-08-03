"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export function SimpleMediaUpload() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Media Upload</h3>
      <Card className="bg-white dark:bg-slate-800 border-light-border-subtle/60 dark:border-slate-700/40 shadow-light-card dark:shadow-card">
        <CardContent className="p-8">
          <div className="border-2 border-dashed border-light-border-default/40 dark:border-slate-600/40 rounded-lg p-8 text-center bg-gray-25 dark:bg-slate-800/50">
            <Upload className="h-12 w-12 mx-auto mb-4 text-light-text-muted dark:text-dark-text-tertiary" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">Upload media files</p>
              <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                Drag and drop files here or click to browse
              </p>
              <Button className="mt-4">
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}