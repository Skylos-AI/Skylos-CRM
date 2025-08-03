"use client"

import { useState } from 'react'
import { MediaAsset } from '@/lib/types/media'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  ExternalLink, 
  FileText, 
  Play, 
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaPreviewProps {
  asset: MediaAsset | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDownload?: (asset: MediaAsset) => void
  onOpenExternal?: (asset: MediaAsset) => void
}

export function MediaPreview({
  asset,
  open,
  onOpenChange,
  onDownload,
  onOpenExternal
}: MediaPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  if (!asset) return null

  const handleDownload = () => {
    if (asset && onDownload) {
      onDownload(asset)
    }
  }

  const handleOpenExternal = () => {
    if (asset && onOpenExternal) {
      onOpenExternal(asset)
    }
  }

  const renderPreviewContent = () => {
    switch (asset.type) {
      case 'image':
        return (
          <div className="flex justify-center">
            <img
              src={asset.url}
              alt={asset.name}
              className="max-w-full max-h-[60vh] object-contain rounded-lg"
            />
          </div>
        )

      case 'video':
        return (
          <div className="flex justify-center">
            <video
              src={asset.url}
              controls
              className="max-w-full max-h-[60vh] rounded-lg"
              poster={asset.thumbnailUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              muted={isMuted}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )

      case 'audio':
        return (
          <div className="flex flex-col items-center space-y-4 p-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Volume2 className="h-16 w-16 text-white" />
            </div>
            <audio
              src={asset.url}
              controls
              className="w-full max-w-md"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Your browser does not support the audio tag.
            </audio>
          </div>
        )

      case 'document':
        return (
          <div className="flex flex-col items-center space-y-4 p-8">
            {asset.thumbnailUrl ? (
              <img
                src={asset.thumbnailUrl}
                alt={`${asset.name} preview`}
                className="max-w-full max-h-[50vh] object-contain rounded-lg border"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
            )}
            <p className="text-sm text-muted-foreground text-center">
              {asset.metadata?.pages && `${asset.metadata.pages} pages • `}
              Document preview not available. Click download to view full content.
            </p>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center space-y-4 p-8">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
              <FileText className="h-16 w-16 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">
              Preview not available for this file type
            </p>
          </div>
        )
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold truncate">
                {asset.name}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {asset.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(asset.fileSize)}
                </span>
                {asset.duration && (
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(asset.duration)}
                  </span>
                )}
                {asset.dimensions && (
                  <span className="text-xs text-muted-foreground">
                    {asset.dimensions.width} × {asset.dimensions.height}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenExternal}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {renderPreviewContent()}
        </div>

        {/* Metadata */}
        {asset.tags.length > 0 && (
          <div className="border-t pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Additional metadata */}
        <div className="border-t pt-4 text-xs text-muted-foreground">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Created:</span>{' '}
              {asset.createdAt.toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Modified:</span>{' '}
              {asset.updatedAt.toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Type:</span>{' '}
              {asset.mimeType}
            </div>
            {asset.metadata?.author && (
              <div>
                <span className="font-medium">Author:</span>{' '}
                {asset.metadata.author}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}