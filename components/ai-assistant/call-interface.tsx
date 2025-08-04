"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Minimize2,
  Maximize2,
  X,
  MessageSquare,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ConnectionStatus } from "./connection-status"

interface CallInterfaceProps {
  isOpen: boolean
  onClose: () => void
  agentName?: string
  agentAvatar?: string
  agentType?: 'sdr' | 'customer_service' | 'custom'
  className?: string
}

type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended'

export function CallInterface({ 
  isOpen, 
  onClose, 
  agentName = "AI Assistant",
  agentAvatar,
  agentType = 'customer_service',
  className 
}: CallInterfaceProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent')
  
  const callTimerRef = useRef<NodeJS.Timeout>()

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Start call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current)
      }
    }
  }, [callStatus])

  // Simulate connection quality changes
  useEffect(() => {
    if (callStatus === 'connected') {
      const interval = setInterval(() => {
        const qualities: Array<'excellent' | 'good' | 'poor'> = ['excellent', 'good', 'poor']
        const weights = [0.7, 0.25, 0.05] // Mostly excellent, sometimes good, rarely poor
        const random = Math.random()
        let cumulative = 0
        
        for (let i = 0; i < qualities.length; i++) {
          cumulative += weights[i]
          if (random <= cumulative) {
            setConnectionQuality(qualities[i])
            break
          }
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [callStatus])

  const handleStartCall = () => {
    setCallStatus('connecting')
    // Simulate connection delay
    setTimeout(() => {
      setCallStatus('connected')
      setCallDuration(0)
    }, 2000)
  }

  const handleEndCall = () => {
    setCallStatus('ended')
    setCallDuration(0)
    // Auto close after showing ended state
    setTimeout(() => {
      onClose()
      setCallStatus('idle')
    }, 2000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
  }

  const getStatusColor = () => {
    switch (callStatus) {
      case 'connecting': return 'bg-yellow-500'
      case 'connected': return 'bg-green-500'
      case 'ended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getConnectionQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-yellow-500'
      case 'poor': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isMinimized ? "w-96" : "w-[480px]",
          className
        )}>
          <Card className="shadow-2xl border-2 bg-background/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 max-w-md mx-auto">
        {/* Header */}
        <CardHeader className="pb-6 text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                <AvatarImage src={agentAvatar} alt={agentName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {agentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-background",
                getStatusColor(),
                callStatus === 'connected' && "animate-pulse"
              )} />
            </div>
            
            {!isMinimized && (
              <div className="text-center">
                <h3 className="font-semibold text-xl mb-2">{agentName}</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-sm">
                    {agentType.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {callStatus === 'connected' && (
                    <ConnectionStatus quality={connectionQuality} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Call Status and Duration */}
          {!isMinimized && (
            <div className="text-center mt-6">
              <div className="text-lg font-medium mb-2">
                {callStatus === 'idle' && 'Ready to call'}
                {callStatus === 'connecting' && (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Connecting...</span>
                  </div>
                )}
                {callStatus === 'connected' && (
                  <div className="space-y-2">
                    <div className="text-green-600 font-semibold">Connected</div>
                    <div className="text-2xl font-mono font-bold text-primary">
                      {formatDuration(callDuration)}
                    </div>
                  </div>
                )}
                {callStatus === 'ended' && (
                  <div className="text-red-600 font-semibold">Call ended</div>
                )}
              </div>
              
              {callStatus === 'connected' && (
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-4 rounded-full transition-all duration-300",
                          connectionQuality === 'excellent' ? 'bg-green-500' :
                          connectionQuality === 'good' && i < 3 ? 'bg-yellow-500' :
                          connectionQuality === 'poor' && i < 2 ? 'bg-red-500' :
                          'bg-gray-300'
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardHeader>

        {/* Call Controls */}
        {!isMinimized && (
          <CardContent className="pt-0 pb-8">
            <div className="flex items-center justify-center space-x-6 py-6">
              {callStatus === 'idle' && (
                <Button
                  onClick={handleStartCall}
                  className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  size="sm"
                >
                  <Phone className="h-6 w-6" />
                </Button>
              )}

              {(callStatus === 'connecting' || callStatus === 'connected') && (
                <>
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    onClick={toggleMute}
                    className="h-14 w-14 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    size="sm"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant={isSpeakerOn ? "default" : "outline"}
                    onClick={toggleSpeaker}
                    className="h-14 w-14 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    size="sm"
                  >
                    {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>

                  <Button
                    onClick={handleEndCall}
                    className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    size="sm"
                  >
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                </>
              )}

              {callStatus === 'ended' && (
                <div className="text-center py-8">
                  <PhoneOff className="h-12 w-12 mx-auto text-red-500 mb-4" />
                  <p className="text-lg text-muted-foreground">Call ended</p>
                </div>
              )}
            </div>

            {/* Additional Controls */}
            {callStatus === 'connected' && (
              <div className="flex items-center justify-center space-x-3 mt-6 pt-6 border-t">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 px-4 py-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2 px-4 py-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </div>
            )}
          </CardContent>
        )}
          </Card>
        </div>
      </div>
    </>
  )
}