"use client"

import { useState } from 'react'
import { MediaAsset } from '@/lib/types/media'
import { MediaLibrary } from './media-library'
import { MediaUpload } from './media-upload'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Upload, Library, Check } from 'lucide-react'

interface MediaSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (assets: MediaAsset[]) => void
  selectedAssets?: MediaAsset[]
  selectionMode?: 'single' | 'multiple'
  title?: string
  description?: string
}

export function MediaSelectionModal({
  open,
  onOpenChange,
  onSelect,
  selectedAssets = [],
  selectionMode = 'multiple',
  title = 'Select Media',
  description = 'Choose media files for your campaign'
}: MediaSelectionModalProps) {
  const [currentSelection, setCurrentSelection] = useState<MediaAsset[]>(selectedAssets)
  const [activeTab, setActiveTab] = useState('library')

  const handleSelectionChange = (assets: MediaAsset[]) => {
    setCurrentSelection(assets)
  }

  const handleUploadComplete = (assets: MediaAsset[]) => {
    // Add uploaded assets to current selection
    if (selectionMode === 'single') {
      setCurrentSelection(assets.slice(-1)) // Take only the last uploaded asset
    } else {
      setCurrentSelection(prev => [...prev, ...assets])
    }
    
    // Switch to library tab to show the uploaded files
    setActiveTab('library')
  }

  const handleConfirm = () => {
    onSelect(currentSelection)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setCurrentSelection(selectedAssets) // Reset to original selection
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library" className="flex items-center space-x-2">
                <Library className="h-4 w-4" />
                <span>Media Library</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload New</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden mt-4">
              <TabsContent value="library" className="h-full overflow-auto">
                <MediaLibrary
                  onSelect={handleSelectionChange}
                  selectionMode={selectionMode}
                  selectedAssets={currentSelection}
                />
              </TabsContent>

              <TabsContent value="upload" className="h-full overflow-auto">
                <MediaUpload
                  onUploadComplete={handleUploadComplete}
                  onUploadError={(error) => {
                    console.error('Upload error:', error)
                    // You could show a toast notification here
                  }}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {currentSelection.length > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Check className="h-3 w-3" />
                  <span>
                    {currentSelection.length} selected
                  </span>
                </Badge>
                
                {/* Show selected file names for single selection */}
                {selectionMode === 'single' && currentSelection.length === 1 && (
                  <span className="text-sm text-muted-foreground truncate max-w-xs">
                    {currentSelection[0].name}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={currentSelection.length === 0}
            >
              {selectionMode === 'single' ? 'Select' : `Select ${currentSelection.length} items`}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}