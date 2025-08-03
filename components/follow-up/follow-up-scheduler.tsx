"use client"

import { useState } from 'react'
import { FollowUpMessage } from '@/lib/types/campaign'
import { Lead } from '@/lib/types/lead'
import { MediaAsset } from '@/lib/types/media'
import { MediaSelectionModal } from '@/components/media/media-selection-modal'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Calendar } from '@/components/ui/calendar' // Not available, using date input instead
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
// import { Separator } from '@/components/ui/separator' // Using div instead
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Mail, 
  MessageSquare, 
  Phone, 
  Video,
  Repeat,
  User,
  Building2,
  Paperclip,
  Image,
  FileVideo,
  FileText,
  Music,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
// import { format } from 'date-fns' // Not needed for simple date input

interface FollowUpSchedulerProps {
  lead: Lead
  onSchedule?: (followUp: Partial<FollowUpMessage>) => void
  onCancel?: () => void
  className?: string
}

export function FollowUpScheduler({
  lead,
  onSchedule,
  onCancel,
  className
}: FollowUpSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('09:00')
  const [messageType, setMessageType] = useState<FollowUpMessage['type']>('email')
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset[]>([])
  const [mediaModalOpen, setMediaModalOpen] = useState(false)

  const messageTypes = [
    { value: 'email', label: 'Email', icon: Mail, description: 'Send email with media attachments' },
    { value: 'sms', label: 'WhatsApp/SMS', icon: MessageSquare, description: 'Send message with media (video, images, docs)' },
    { value: 'call', label: 'Phone Call', icon: Phone, description: 'Schedule a phone call' },
    { value: 'meeting', label: 'Video Meeting', icon: Video, description: 'Schedule a video meeting' },
  ] as const

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ]

  const handleSchedule = () => {
    if (!selectedDate) return

    const scheduledDateTime = new Date(selectedDate)
    const [hours, minutes] = selectedTime.split(':').map(Number)
    scheduledDateTime.setHours(hours, minutes, 0, 0)

    const followUp: Partial<FollowUpMessage> = {
      leadId: lead.id,
      type: messageType,
      scheduledDate: scheduledDateTime,
      status: 'scheduled',
      content: {
        subject: messageType === 'email' ? `Follow-up: ${lead.name}` : undefined,
        body: selectedMedia.length > 0 ? `Sharing ${selectedMedia.length} file${selectedMedia.length !== 1 ? 's' : ''} with you...` : '',
        mediaAttachments: selectedMedia,
        personalizations: [],
        formatting: {
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
          textColor: '#333333',
          alignment: 'left'
        }
      }
    }

    onSchedule?.(followUp)
  }

  const getMessageTypeIcon = (type: FollowUpMessage['type']) => {
    const messageType = messageTypes.find(t => t.value === type)
    if (!messageType) return <Mail className="h-4 w-4" />
    const Icon = messageType.icon
    return <Icon className="h-4 w-4" />
  }

  const handleMediaSelect = (assets: MediaAsset[]) => {
    setSelectedMedia(assets)
  }

  const removeMediaAsset = (assetId: string) => {
    setSelectedMedia(prev => prev.filter(asset => asset.id !== assetId))
  }

  const getMediaIcon = (type: MediaAsset['type']) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />
      case 'video': return <FileVideo className="h-4 w-4" />
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

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Schedule Follow-up</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lead Information */}
        <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{lead.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{lead.company}</span>
              <div className="w-px h-3 bg-border" />
              <span>{lead.email}</span>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">
            {lead.stage}
          </Badge>
        </div>

        {/* Message Type Selection */}
        <div className="space-y-3">
          <Label>Follow-up Type</Label>
          <div className="grid grid-cols-2 gap-3">
            {messageTypes.map((type) => {
              const Icon = type.icon
              return (
                <Card
                  key={type.value}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    messageType === type.value && "ring-2 ring-primary"
                  )}
                  onClick={() => setMessageType(type.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        messageType === type.value ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Media Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Media Attachments (Optional)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMediaModalOpen(true)}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Add Media
            </Button>
          </div>
          
          {selectedMedia.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                {selectedMedia.length} file{selectedMedia.length !== 1 ? 's' : ''} selected
              </div>
              <div className="grid grid-cols-1 gap-2">
                {selectedMedia.map((asset) => (
                  <Card key={asset.id} className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {asset.thumbnailUrl ? (
                          <img
                            src={asset.thumbnailUrl}
                            alt={asset.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
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
                        onClick={() => removeMediaAsset(asset.id)}
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
          
          {selectedMedia.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No media selected. Click "Add Media" to attach files.
              </p>
            </div>
          )}
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="space-y-3">
            <Label htmlFor="date-input">Select Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date-input"
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedDate(new Date(e.target.value))
                  } else {
                    setSelectedDate(undefined)
                  }
                }}
                min={new Date().toISOString().split('T')[0]}
                className="pl-10"
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-3">
            <Label>Select Time</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recurring Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="recurring" className="flex items-center space-x-2">
              <Repeat className="h-4 w-4" />
              <span>Make this a recurring follow-up</span>
            </Label>
          </div>

          {isRecurring && (
            <div className="ml-6 space-y-2">
              <Label>Frequency</Label>
              <Select value={recurringFrequency} onValueChange={setRecurringFrequency as any}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Summary */}
        {selectedDate && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Follow-up Summary</span>
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                {getMessageTypeIcon(messageType)}
                <span className="font-medium">{messageTypes.find(t => t.value === messageType)?.label}</span>
                <span className="text-muted-foreground">to {lead.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <CalendarIcon className="h-3 w-3" />
                <span>{selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span>at {selectedTime}</span>
              </div>
              {isRecurring && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Repeat className="h-3 w-3" />
                  <span>Repeats {recurringFrequency}</span>
                </div>
              )}
              {selectedMedia.length > 0 && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Paperclip className="h-3 w-3" />
                  <span>{selectedMedia.length} media file{selectedMedia.length !== 1 ? 's' : ''} attached</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSchedule}
            disabled={!selectedDate}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Follow-up
          </Button>
        </div>
      </CardContent>
      
      {/* Media Selection Modal */}
      <MediaSelectionModal
        open={mediaModalOpen}
        onOpenChange={setMediaModalOpen}
        onSelect={handleMediaSelect}
        selectedAssets={selectedMedia}
        selectionMode="multiple"
        title="Select Media for Follow-up"
        description="Choose media files to include with your follow-up message"
      />
    </Card>
  )
}