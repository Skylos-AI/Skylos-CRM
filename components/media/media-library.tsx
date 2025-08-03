"use client"

import { useState, useEffect } from 'react'
import { MediaAsset, MediaLibraryFilters } from '@/lib/types/media'
import { MediaService } from '@/lib/api/media'
import { MediaPreview } from './media-preview'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Eye,
  FileImage,
  FileVideo,
  FileText,
  Music,
  Calendar
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MediaLibraryProps {
  onSelect?: (assets: MediaAsset[]) => void
  selectionMode?: 'single' | 'multiple' | 'none'
  selectedAssets?: MediaAsset[]
  className?: string
}

export function MediaLibrary({
  onSelect,
  selectionMode = 'none',
  selectedAssets = [],
  className
}: MediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<MediaLibraryFilters>({})
  const [selectedItems, setSelectedItems] = useState<MediaAsset[]>(selectedAssets)
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    loadAssets()
  }, [filters])

  useEffect(() => {
    setSelectedItems(selectedAssets)
  }, [selectedAssets])

  const loadAssets = async () => {
    try {
      setLoading(true)
      const data = await MediaService.getMediaAssets(filters)
      setAssets(data)
    } catch (error) {
      console.error('Failed to load media assets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search: search || undefined }))
  }

  const handleTypeFilter = (types: string[]) => {
    setFilters(prev => ({ 
      ...prev, 
      type: types.length > 0 ? types as MediaAsset['type'][] : undefined 
    }))
  }

  const handleAssetSelect = (asset: MediaAsset, checked: boolean) => {
    if (selectionMode === 'none') return

    let newSelection: MediaAsset[]
    
    if (selectionMode === 'single') {
      newSelection = checked ? [asset] : []
    } else {
      newSelection = checked 
        ? [...selectedItems, asset]
        : selectedItems.filter(item => item.id !== asset.id)
    }

    setSelectedItems(newSelection)
    onSelect?.(newSelection)
  }

  const handlePreview = (asset: MediaAsset) => {
    setPreviewAsset(asset)
    setPreviewOpen(true)
  }

  const handleDownload = (asset: MediaAsset) => {
    // Create download link
    const link = document.createElement('a')
    link.href = asset.url
    link.download = asset.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (asset: MediaAsset) => {
    try {
      await MediaService.deleteMediaAsset(asset.id)
      setAssets(prev => prev.filter(item => item.id !== asset.id))
      setSelectedItems(prev => prev.filter(item => item.id !== asset.id))
    } catch (error) {
      console.error('Failed to delete asset:', error)
    }
  }

  const getFileIcon = (type: MediaAsset['type']) => {
    switch (type) {
      case 'image': return <FileImage className="h-4 w-4" />
      case 'video': return <FileVideo className="h-4 w-4" />
      case 'audio': return <Music className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isSelected = (asset: MediaAsset) => {
    return selectedItems.some(item => item.id === asset.id)
  }

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {assets.map((asset) => (
        <Card 
          key={asset.id} 
          className={cn(
            "group cursor-pointer transition-all hover:shadow-md",
            isSelected(asset) && "ring-2 ring-primary"
          )}
          onClick={() => selectionMode === 'none' ? handlePreview(asset) : undefined}
        >
          <CardContent className="p-3">
            {/* Selection checkbox */}
            {selectionMode !== 'none' && (
              <div className="flex justify-end mb-2">
                <Checkbox
                  checked={isSelected(asset)}
                  onCheckedChange={(checked) => handleAssetSelect(asset, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Thumbnail */}
            <div className="aspect-square mb-3 bg-muted rounded-lg overflow-hidden">
              {asset.thumbnailUrl ? (
                <img
                  src={asset.thumbnailUrl}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getFileIcon(asset.type)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                {getFileIcon(asset.type)}
                <Badge variant="secondary" className="text-xs">
                  {asset.type}
                </Badge>
              </div>
              <p className="text-sm font-medium truncate" title={asset.name}>
                {asset.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(asset.fileSize)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePreview(asset)
                }}
                className="h-6 w-6 p-0"
              >
                <Eye className="h-3 w-3" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                    className="h-6 w-6 p-0"
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDownload(asset)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(asset)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-2">
      {assets.map((asset) => (
        <Card 
          key={asset.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-sm",
            isSelected(asset) && "ring-2 ring-primary"
          )}
          onClick={() => selectionMode === 'none' ? handlePreview(asset) : undefined}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {/* Selection */}
              {selectionMode !== 'none' && (
                <Checkbox
                  checked={isSelected(asset)}
                  onCheckedChange={(checked) => handleAssetSelect(asset, checked as boolean)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Thumbnail */}
              <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {asset.thumbnailUrl ? (
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {getFileIcon(asset.type)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium truncate">{asset.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {asset.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{formatFileSize(asset.fileSize)}</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{asset.createdAt.toLocaleDateString()}</span>
                  </span>
                  {asset.tags.length > 0 && (
                    <div className="flex space-x-1">
                      {asset.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {asset.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{asset.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePreview(asset)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownload(asset)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(asset)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            className="pl-10"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Type Filter */}
        <Select onValueChange={(value) => handleTypeFilter(value ? [value] : [])}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>

        {/* View Mode */}
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selection Info */}
      {selectionMode !== 'none' && selectedItems.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
          <span className="text-sm font-medium">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedItems([])
              onSelect?.([])
            }}
          >
            Clear selection
          </Button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3">
                <div className="aspect-square bg-muted rounded-lg animate-pulse mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12">
          <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No media files found</h3>
          <p className="text-muted-foreground">
            Upload some files to get started with your media library.
          </p>
        </div>
      ) : (
        viewMode === 'grid' ? renderGridView() : renderListView()
      )}

      {/* Preview Dialog */}
      <MediaPreview
        asset={previewAsset}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onDownload={handleDownload}
        onOpenExternal={(asset) => window.open(asset.url, '_blank')}
      />
    </div>
  )
}