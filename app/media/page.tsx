"use client"

import { useState } from 'react'
import { CrmLayout } from "@/components/layout/crm-layout"
import { MediaLibrary } from "@/components/media/media-library"
import { MediaUpload } from "@/components/media/media-upload"
import { MediaSelectionModal } from "@/components/media/media-selection-modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaAsset } from "@/lib/types/media"
import { mockMediaAssets } from "@/lib/mock-data/campaigns"
import { Plus, Upload, Library, TestTube } from "lucide-react"

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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Media Library</h1>
            <p className="text-muted-foreground">
              Manage your media assets for campaigns and follow-up messages.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setSelectionModalOpen(true)}
            >
              <TestTube className="mr-2 h-4 w-4" />
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
            <MediaLibrary />
          </TabsContent>

          <TabsContent value="upload">
            <MediaUpload
              onUploadComplete={handleUploadComplete}
              onUploadError={(error) => {
                console.error('Upload error:', error)
              }}
            />
          </TabsContent>
        </Tabs>

        {/* Selection Modal for Testing */}
        <MediaSelectionModal
          open={selectionModalOpen}
          onOpenChange={setSelectionModalOpen}
          onSelect={handleSelectionComplete}
          selectedAssets={selectedAssets}
          selectionMode="multiple"
          title="Select Media Files"
          description="Choose media files to test the selection functionality"
        />

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