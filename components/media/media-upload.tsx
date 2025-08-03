"use client"

import { useState, useCallback } from 'react'
// import { useDropzone } from 'react-dropzone' // Using simple file input instead
import { MediaAsset, MediaUploadProgress, MEDIA_UPLOAD_CONFIGS } from '@/lib/types/media'
import { MediaService } from '@/lib/api/media'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Upload, 
  X, 
  FileImage, 
  FileVideo, 
  FileText, 
  Music,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaUploadProps {
  onUploadComplete?: (assets: MediaAsset[]) => void
  onUploadError?: (error: string) => void
  acceptedTypes?: (keyof typeof MEDIA_UPLOAD_CONFIGS)[]
  maxFiles?: number
  className?: string
}

export function MediaUpload({
  onUploadComplete,
  onUploadError,
  acceptedTypes = ['image', 'video', 'document', 'audio'],
  maxFiles = 10,
  className
}: MediaUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<MediaUploadProgress[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const getAllowedMimeTypes = () => {
    return acceptedTypes.flatMap(type => MEDIA_UPLOAD_CONFIGS[type].acceptedTypes)
  }

  const getMaxFileSize = () => {
    return Math.max(...acceptedTypes.map(type => MEDIA_UPLOAD_CONFIGS[type].maxFileSize))
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setErrors([])
    
    // Validate files
    const validFiles: File[] = []
    const newErrors: string[] = []

    acceptedFiles.forEach(file => {
      const validation = MediaService.validateFile(file)
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        newErrors.push(`${file.name}: ${validation.error}`)
      }
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
      onUploadError?.(newErrors.join(', '))
    }

    if (validFiles.length === 0) return

    // Initialize progress tracking
    const initialProgress = validFiles.map(file => ({
      id: crypto?.randomUUID?.() || `upload-${Date.now()}-${Math.random()}`,
      fileName: file.name,
      progress: 0,
      status: 'uploading' as const
    }))
    setUploadProgress(initialProgress)

    try {
      const uploadedAssets = await MediaService.uploadMedia(
        validFiles,
        (progressUpdates) => {
          setUploadProgress(prev => {
            const updated = [...prev]
            progressUpdates.forEach(update => {
              const index = updated.findIndex(p => p.fileName === update.fileName)
              if (index !== -1) {
                updated[index] = update
              }
            })
            return updated
          })
        }
      )

      onUploadComplete?.(uploadedAssets)
      
      // Clear progress after a delay
      setTimeout(() => {
        setUploadProgress([])
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      onUploadError?.(errorMessage)
      setErrors(prev => [...prev, errorMessage])
    }
  }, [onUploadComplete, onUploadError])

  // Simple file input approach instead of react-dropzone
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      onDrop(files)
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <FileImage className="h-4 w-4" />
    }
    if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) {
      return <FileVideo className="h-4 w-4" />
    }
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(extension || '')) {
      return <Music className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  const removeUploadItem = (id: string) => {
    setUploadProgress(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-muted-foreground/25 hover:border-primary/50">
            <input
              type="file"
              multiple
              accept={getAllowedMimeTypes().join(',')}
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Upload media files</p>
                <p className="text-sm text-muted-foreground">
                  Click to browse and select files
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {acceptedTypes.map(type => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type.toUpperCase()}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Max {maxFiles} files, up to {MediaService.formatFileSize(getMaxFileSize())} each
                </p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadProgress.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Uploading Files</h3>
            <div className="space-y-3">
              {uploadProgress.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 flex-1">
                    {getFileIcon(item.fileName)}
                    <span className="text-sm font-medium truncate">
                      {item.fileName}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-1">
                    {item.status === 'uploading' && (
                      <Progress value={item.progress} className="flex-1" />
                    )}
                    {item.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-xs">Complete</span>
                      </div>
                    )}
                    {item.status === 'error' && (
                      <div className="flex items-center space-x-1 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs">Error</span>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUploadItem(item.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}