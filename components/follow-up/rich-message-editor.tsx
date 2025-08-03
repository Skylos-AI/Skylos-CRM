"use client"

import { useState, useRef } from 'react'
import { MessageContent, PersonalizationRule } from '@/lib/types/campaign'
import { MediaAsset } from '@/lib/types/media'
import { MediaSelectionModal } from '@/components/media/media-selection-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator' // Using div instead
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  Image, 
  Video, 
  FileText, 
  Music,
  Paperclip, 
  X, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  User,
  Building2,
  DollarSign,
  Calendar,
  Eye,
  Send,
  Save
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichMessageEditorProps {
  initialContent?: MessageContent
  onSave?: (content: MessageContent) => void
  onSend?: (content: MessageContent) => void
  onPreview?: (content: MessageContent) => void
  leadData?: any // For personalization preview
  messageType?: 'email' | 'sms' | 'social'
  className?: string
}

export function RichMessageEditor({
  initialContent,
  onSave,
  onSend,
  onPreview,
  leadData,
  messageType = 'email',
  className
}: RichMessageEditorProps) {
  const [content, setContent] = useState<MessageContent>(initialContent || {
    subject: '',
    body: '',
    mediaAttachments: [],
    personalizations: [],
    formatting: {
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      textColor: '#333333',
      alignment: 'left'
    }
  })
  
  const [mediaModalOpen, setMediaModalOpen] = useState(false)
  const [showPersonalizationMenu, setShowPersonalizationMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const personalizationTokens = [
    { token: '{{lead.name}}', label: 'Lead Name', icon: User, example: 'John Doe' },
    { token: '{{lead.company}}', label: 'Company', icon: Building2, example: 'Acme Corp' },
    { token: '{{lead.dealAmount}}', label: 'Deal Amount', icon: DollarSign, example: '$15,000' },
    { token: '{{lead.email}}', label: 'Email', icon: User, example: 'john@acme.com' },
    { token: '{{lead.nextFollowUp}}', label: 'Next Follow-up', icon: Calendar, example: 'Tomorrow' },
  ]

  const handleMediaSelect = (assets: MediaAsset[]) => {
    setContent(prev => ({
      ...prev,
      mediaAttachments: [...prev.mediaAttachments, ...assets]
    }))
  }

  const removeMediaAttachment = (assetId: string) => {
    setContent(prev => ({
      ...prev,
      mediaAttachments: prev.mediaAttachments.filter(asset => asset.id !== assetId)
    }))
  }

  const insertPersonalizationToken = (token: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const currentBody = content.body
      
      const newBody = currentBody.substring(0, start) + token + currentBody.substring(end)
      
      setContent(prev => ({ ...prev, body: newBody }))
      
      // Set cursor position after the inserted token
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + token.length, start + token.length)
      }, 0)
    }
    setShowPersonalizationMenu(false)
  }

  const updateFormatting = (key: string, value: any) => {
    setContent(prev => ({
      ...prev,
      formatting: {
        ...prev.formatting,
        [key]: value
      }
    }))
  }

  const getMediaIcon = (type: MediaAsset['type']) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'audio': return <Music className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      default: return <Paperclip className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const previewPersonalization = (text: string) => {
    if (!leadData) return text
    
    return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const keys = path.split('.')
      let value = leadData
      
      for (const key of keys) {
        value = value?.[key]
      }
      
      return value || match
    })
  }

  return (
    <TooltipProvider>
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Compose Follow-up Message</span>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {messageType.toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPreview?.(content)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Subject Line (for email) */}
          {messageType === 'email' && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                placeholder="Enter email subject..."
                value={content.subject || ''}
                onChange={(e) => setContent(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
          )}

          {/* Formatting Toolbar */}
          <div className="flex items-center space-x-2 p-2 border rounded-lg bg-muted/50">
            {/* Text Formatting */}
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('bold', !content.formatting?.bold)}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('italic', !content.formatting?.italic)}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('underline', !content.formatting?.underline)}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>
            </div>

            <div className="w-px h-6 bg-border" />

            {/* Alignment */}
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('alignment', 'left')}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Left</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('alignment', 'center')}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Center</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => updateFormatting('alignment', 'right')}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Right</TooltipContent>
              </Tooltip>
            </div>

            <div className="w-px h-6 bg-border" />

            {/* Font Size */}
            <Select
              value={content.formatting?.fontSize || '16px'}
              onValueChange={(value) => updateFormatting('fontSize', value)}
            >
              <SelectTrigger className="w-20 h-8">
                <Type className="h-3 w-3" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12px">12px</SelectItem>
                <SelectItem value="14px">14px</SelectItem>
                <SelectItem value="16px">16px</SelectItem>
                <SelectItem value="18px">18px</SelectItem>
                <SelectItem value="20px">20px</SelectItem>
                <SelectItem value="24px">24px</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-px h-6 bg-border" />

            {/* Personalization */}
            <DropdownMenu open={showPersonalizationMenu} onOpenChange={setShowPersonalizationMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-xs">Personalize</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {personalizationTokens.map((token) => (
                  <DropdownMenuItem
                    key={token.token}
                    onClick={() => insertPersonalizationToken(token.token)}
                    className="flex items-center space-x-2"
                  >
                    <token.icon className="h-4 w-4" />
                    <div className="flex-1">
                      <div className="font-medium">{token.label}</div>
                      <div className="text-xs text-muted-foreground">{token.example}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-6 bg-border" />

            {/* Media Attachment */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => setMediaModalOpen(true)}
            >
              <Paperclip className="h-4 w-4 mr-1" />
              <span className="text-xs">Attach</span>
            </Button>
          </div>

          {/* Message Body */}
          <div className="space-y-2">
            <Label htmlFor="body">Message Content</Label>
            <Textarea
              ref={textareaRef}
              id="body"
              placeholder="Type your message here... Use the personalization menu to add dynamic content."
              value={content.body}
              onChange={(e) => setContent(prev => ({ ...prev, body: e.target.value }))}
              className="min-h-[200px] resize-none"
              style={{
                fontSize: content.formatting?.fontSize,
                fontFamily: content.formatting?.fontFamily,
                color: content.formatting?.textColor,
                textAlign: content.formatting?.alignment as any,
                fontWeight: content.formatting?.bold ? 'bold' : 'normal',
                fontStyle: content.formatting?.italic ? 'italic' : 'normal',
                textDecoration: content.formatting?.underline ? 'underline' : 'none'
              }}
            />
            
            {/* Character count for SMS */}
            {messageType === 'sms' && (
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>SMS Message</span>
                <span className={cn(
                  content.body.length > 160 && "text-orange-600",
                  content.body.length > 320 && "text-red-600"
                )}>
                  {content.body.length}/160 characters
                  {content.body.length > 160 && ` (${Math.ceil(content.body.length / 160)} messages)`}
                </span>
              </div>
            )}
          </div>

          {/* Media Attachments */}
          {content.mediaAttachments.length > 0 && (
            <div className="space-y-2">
              <Label>Media Attachments ({content.mediaAttachments.length})</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.mediaAttachments.map((asset) => (
                  <Card key={asset.id} className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {asset.thumbnailUrl ? (
                          <img
                            src={asset.thumbnailUrl}
                            alt={asset.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                            {getMediaIcon(asset.type)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{asset.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {asset.type}
                          </Badge>
                          <span>{formatFileSize(asset.fileSize)}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMediaAttachment(asset.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Preview Section */}
          {leadData && (
            <div className="space-y-2">
              <Label>Preview with Lead Data</Label>
              <Card className="p-4 bg-muted/50">
                {messageType === 'email' && content.subject && (
                  <div className="mb-3">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Subject:</div>
                    <div className="font-medium">{previewPersonalization(content.subject)}</div>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm">
                  {previewPersonalization(content.body)}
                </div>
              </Card>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {content.mediaAttachments.length > 0 && (
                <span>{content.mediaAttachments.length} attachment{content.mediaAttachments.length !== 1 ? 's' : ''}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => onSave?.(content)}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button
                onClick={() => onSend?.(content)}
                disabled={!content.body.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Selection Modal */}
      <MediaSelectionModal
        open={mediaModalOpen}
        onOpenChange={setMediaModalOpen}
        onSelect={handleMediaSelect}
        selectionMode="multiple"
        title="Attach Media Files"
        description="Select media files to attach to your follow-up message"
      />
    </TooltipProvider>
  )
}