import { MediaAsset, MediaLibraryFilters, MediaUploadProgress, MEDIA_UPLOAD_CONFIGS } from '@/lib/types/media'

export class MediaService {
  private static baseUrl = '/api/media'

  static async uploadMedia(files: File[], onProgress?: (progress: MediaUploadProgress[]) => void): Promise<MediaAsset[]> {
    const uploadPromises = files.map(async (file) => {
      // Validate file
      const validation = this.validateFile(file)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', this.getMediaType(file.type))

      const uploadId = crypto.randomUUID()
      
      try {
        const response = await fetch(`${this.baseUrl}/upload`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`)
        }

        const mediaAsset: MediaAsset = await response.json()
        
        // Notify progress completion
        onProgress?.([{
          id: uploadId,
          fileName: file.name,
          progress: 100,
          status: 'completed'
        }])

        return mediaAsset
      } catch (error) {
        // Notify progress error
        onProgress?.([{
          id: uploadId,
          fileName: file.name,
          progress: 0,
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed'
        }])
        throw error
      }
    })

    return Promise.all(uploadPromises)
  }

  static async getMediaAssets(filters?: MediaLibraryFilters): Promise<MediaAsset[]> {
    const params = new URLSearchParams()
    
    if (filters?.type?.length) {
      params.append('type', filters.type.join(','))
    }
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','))
    }
    if (filters?.search) {
      params.append('search', filters.search)
    }
    if (filters?.createdBy) {
      params.append('createdBy', filters.createdBy)
    }
    if (filters?.dateRange) {
      params.append('startDate', filters.dateRange.start.toISOString())
      params.append('endDate', filters.dateRange.end.toISOString())
    }

    const response = await fetch(`${this.baseUrl}?${params}`)
    if (!response.ok) {
      throw new Error('Failed to fetch media assets')
    }

    return response.json()
  }

  static async getMediaAsset(id: string): Promise<MediaAsset> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch media asset')
    }
    return response.json()
  }

  static async updateMediaAsset(id: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error('Failed to update media asset')
    }

    return response.json()
  }

  static async deleteMediaAsset(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete media asset')
    }
  }

  static async generateThumbnail(id: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/${id}/thumbnail`, {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to generate thumbnail')
    }

    const { thumbnailUrl } = await response.json()
    return thumbnailUrl
  }

  static validateFile(file: File): { isValid: boolean; error?: string } {
    const mediaType = this.getMediaType(file.type)
    const config = MEDIA_UPLOAD_CONFIGS[mediaType]

    if (!config) {
      return { isValid: false, error: 'Unsupported file type' }
    }

    if (!config.acceptedTypes.includes(file.type)) {
      return { isValid: false, error: `File type ${file.type} is not supported` }
    }

    if (file.size > config.maxFileSize) {
      const maxSizeMB = Math.round(config.maxFileSize / (1024 * 1024))
      return { isValid: false, error: `File size exceeds ${maxSizeMB}MB limit` }
    }

    return { isValid: true }
  }

  static getMediaType(mimeType: string): keyof typeof MEDIA_UPLOAD_CONFIGS {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType.startsWith('audio/')) return 'audio'
    return 'document'
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  static getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return '🖼️'
    if (mimeType.startsWith('video/')) return '🎥'
    if (mimeType.startsWith('audio/')) return '🎵'
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word')) return '📝'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📊'
    return '📎'
  }
}