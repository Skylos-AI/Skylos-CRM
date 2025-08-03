export interface MediaAsset {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  url: string
  thumbnailUrl?: string
  fileSize: number
  mimeType: string
  dimensions?: { width: number; height: number }
  duration?: number // for videos/audio in seconds
  metadata: Record<string, any>
  tags: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface MediaUploadProgress {
  id: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  error?: string
}

export interface MediaLibraryFilters {
  type?: MediaAsset['type'][]
  tags?: string[]
  search?: string
  createdBy?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export interface MediaUploadConfig {
  maxFileSize: number
  acceptedTypes: string[]
  generateThumbnails: boolean
  optimizeImages: boolean
  compressVideos: boolean
}

export const MEDIA_UPLOAD_CONFIGS = {
  image: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    generateThumbnails: true,
    optimizeImages: true,
    compressVideos: false
  },
  video: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    acceptedTypes: ['video/mp4', 'video/mov', 'video/avi', 'video/webm'],
    generateThumbnails: true,
    optimizeImages: false,
    compressVideos: true
  },
  document: {
    maxFileSize: 25 * 1024 * 1024, // 25MB
    acceptedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    generateThumbnails: true,
    optimizeImages: false,
    compressVideos: false
  },
  audio: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    acceptedTypes: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'],
    generateThumbnails: false,
    optimizeImages: false,
    compressVideos: false
  }
} as const