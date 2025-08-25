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

      const uploadId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      try {
        // Simulate upload progress
        const progressSteps = [20, 40, 60, 80, 100]
        for (const progress of progressSteps) {
          await new Promise(resolve => setTimeout(resolve, 200))
          onProgress?.([{
            id: uploadId,
            fileName: file.name,
            progress,
            status: 'uploading'
          }])
        }

        // Create mock media asset
        const mediaAsset: MediaAsset = {
          id: uploadId,
          name: file.name,
          type: this.getMediaType(file.type),
          url: URL.createObjectURL(file),
          thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          fileSize: file.size,
          mimeType: file.type,
          dimensions: file.type.startsWith('image/') ? { width: 800, height: 600 } : undefined,
          metadata: {},
          tags: [],
          createdBy: 'current-user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
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
    // For development, return mock data
    // In production, this would make an actual API call
    const { mockMediaAssets } = await import('@/lib/mock-data/campaigns')
    
    let filteredAssets = [...mockMediaAssets]
    
    // Apply filters
    if (filters?.type?.length) {
      filteredAssets = filteredAssets.filter(asset => filters.type!.includes(asset.type))
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredAssets = filteredAssets.filter(asset => 
        asset.name.toLowerCase().includes(searchLower) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    if (filters?.tags?.length) {
      filteredAssets = filteredAssets.filter(asset =>
        filters.tags!.some(tag => asset.tags.includes(tag))
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return filteredAssets
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
    // For development, simulate deletion
    // In production, this would make an actual API call
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // In a real implementation, this would remove the asset from the backend
    console.log(`Deleted media asset: ${id}`)
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
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return '🎥'
    if (mimeType.startsWith('audio/')) return '🎵'
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word')) return '📝'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'presentation'
    return '📎'
  }
}