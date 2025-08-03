"use client"

import { useState } from 'react'
import { FollowUpMessage, MessageContent } from '@/lib/types/campaign'
import { Lead } from '@/lib/types/lead'
import { CampaignService } from '@/lib/api/campaigns'
import { RichMessageEditor } from './rich-message-editor'
import { FollowUpScheduler } from './follow-up-scheduler'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Send
} from 'lucide-react'
import { useErrorHandler } from '@/hooks/use-error-handler'

interface EnhancedFollowUpDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onFollowUpCreated?: (followUp: FollowUpMessage) => void
  initialFollowUp?: FollowUpMessage
}

export function EnhancedFollowUpDialog({
  lead,
  open,
  onOpenChange,
  onFollowUpCreated,
  initialFollowUp
}: EnhancedFollowUpDialogProps) {
  const [currentStep, setCurrentStep] = useState<'schedule' | 'compose'>('schedule')
  const [followUpData, setFollowUpData] = useState<Partial<FollowUpMessage>>(
    initialFollowUp || {}
  )
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { handleError, handleSuccess } = useErrorHandler()

  if (!lead) return null

  const handleScheduleComplete = (scheduledFollowUp: Partial<FollowUpMessage>) => {
    setFollowUpData(scheduledFollowUp)
    setCurrentStep('compose')
  }

  const handleMessageSave = async (content: MessageContent) => {
    if (!followUpData.scheduledDate || !followUpData.type) return

    try {
      setLoading(true)
      
      const followUpMessage: Omit<FollowUpMessage, 'id' | 'createdAt'> = {
        leadId: lead.id,
        type: followUpData.type,
        content,
        scheduledDate: followUpData.scheduledDate,
        status: 'scheduled',
        createdBy: 'current-user' // This would come from auth context
      }

      const createdFollowUp = await CampaignService.createFollowUpMessage(followUpMessage)
      
      setSuccess(true)
      handleSuccess('Follow-up message scheduled successfully!')
      onFollowUpCreated?.(createdFollowUp)
      
      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
        setCurrentStep('schedule')
        setFollowUpData({})
      }, 2000)
      
    } catch (error) {
      handleError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  const handleMessageSend = async (content: MessageContent) => {
    if (!followUpData.scheduledDate || !followUpData.type) return

    try {
      setLoading(true)
      
      // Create and immediately send the follow-up
      const followUpMessage: Omit<FollowUpMessage, 'id' | 'createdAt'> = {
        leadId: lead.id,
        type: followUpData.type,
        content,
        scheduledDate: new Date(), // Send immediately
        status: 'scheduled',
        createdBy: 'current-user'
      }

      const createdFollowUp = await CampaignService.createFollowUpMessage(followUpMessage)
      
      // Send the message
      await CampaignService.sendFollowUpMessage(createdFollowUp.id)
      
      setSuccess(true)
      handleSuccess('Follow-up message sent successfully!')
      onFollowUpCreated?.(createdFollowUp)
      
      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
        setCurrentStep('schedule')
        setFollowUpData({})
      }, 2000)
      
    } catch (error) {
      handleError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setCurrentStep('schedule')
  }

  const handleCancel = () => {
    onOpenChange(false)
    setCurrentStep('schedule')
    setFollowUpData({})
    setSuccess(false)
  }

  const getStepIcon = (step: string) => {
    if (success) return <CheckCircle className="h-5 w-5 text-green-600" />
    
    switch (step) {
      case 'schedule':
        return <Calendar className="h-5 w-5" />
      case 'compose':
        return <MessageSquare className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStepTitle = () => {
    if (success) return 'Follow-up Scheduled!'
    
    switch (currentStep) {
      case 'schedule':
        return 'Schedule Follow-up'
      case 'compose':
        return 'Compose Message'
      default:
        return 'Follow-up'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStepIcon(currentStep)}
            <span>{getStepTitle()}</span>
            {followUpData.type && (
              <Badge variant="outline" className="ml-2 capitalize">
                {followUpData.type}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Follow-up Scheduled Successfully!</h3>
              <p className="text-muted-foreground mb-4">
                Your follow-up message for {lead.name} has been scheduled and will be sent at the specified time.
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {followUpData.scheduledDate?.toLocaleDateString()} at{' '}
                  {followUpData.scheduledDate?.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ) : currentStep === 'schedule' ? (
            <div className="overflow-auto">
              <FollowUpScheduler
                lead={lead}
                onSchedule={handleScheduleComplete}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div className="overflow-auto">
              {/* Step Navigation */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-muted/50 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>1. Schedule</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </Button>
                <div className="w-8 h-px bg-border" />
                <div className="flex items-center space-x-2 text-primary">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">2. Compose Message</span>
                </div>
              </div>

              {/* Scheduled Follow-up Info */}
              <Alert className="mb-6">
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>
                      Scheduled for {followUpData.scheduledDate?.toLocaleDateString()} at{' '}
                      {followUpData.scheduledDate?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {followUpData.type}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>

              {/* Message Editor */}
              <RichMessageEditor
                initialContent={followUpData.content}
                onSave={handleMessageSave}
                onSend={handleMessageSend}
                leadData={lead}
                messageType={followUpData.type as any}
              />
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              <span>Processing...</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}