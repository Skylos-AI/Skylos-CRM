"use client"

import { useState } from 'react'
import { CrmLayout } from "@/components/layout/crm-layout"
import { SimpleMediaLibrary } from "@/components/media/simple-media-library"
import { SimpleMediaUpload } from "@/components/media/simple-media-upload"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaAsset } from "@/lib/types/media"
import { Plus, Upload, Library, TestTube2 } from "lucide-react"

export default function MediaPage() {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false)
  const [selectedAssets, setSelectedAssets] = useState<MediaAsset[]>([])

  const handleUploadComplete = (assets: MediaAsset[]) => {
    console.log('Uploaded assets:', assets)
    // In a real app, this would refresh the media library
  }

  const handleSelectionComplete = (assets: MediaAsset[]) => {
    setSelectedAssets(assets)
    console.log('Selected assets:', assets)
  }

  return (
    <CrmLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-light-text-primary dark:text-slate-50">Media Library</h1>
            <p className="text-light-text-tertiary dark:text-slate-400">
              Manage your media assets for campaigns and follow-up messages.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setSelectionModalOpen(true)}
            >
              <TestTube2 className="mr-2 h-4 w-4" />
              Test Selection
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          </div>
        </div>

        <Tabs defaultValue="library" className="space-y-6">
          <TabsList>
            <TabsTrigger value="library" className="flex items-center space-x-2">
              <Library className="h-4 w-4" />
              <span>Library</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library">
            <SimpleMediaLibrary />
          </TabsContent>

          <TabsContent value="upload">
            <SimpleMediaUpload />
          </TabsContent>
        </Tabs>

        {/* Selection Modal for Testing - Temporarily disabled */}
        {selectionModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Selection Modal</h3>
              <p className="text-muted-foreground mb-4">Modal is temporarily disabled for debugging.</p>
              <Button onClick={() => setSelectionModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}

        {/* Show selected assets for testing */}
        {selectedAssets.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Selected Assets ({selectedAssets.length}):</h3>
            <div className="space-y-1">
              {selectedAssets.map(asset => (
                <div key={asset.id} className="text-sm text-muted-foreground">
                  {asset.name} ({asset.type})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CrmLayout>
  )
}