import { useState, useRef, useCallback, useEffect } from 'react'

export interface Agent {
  id: string
  name: string
  description: string
  role: string
  voice_name: string
  language_code: string
  objectives: Objective[]
}

export interface Objective {
  id: string
  label: string
  description: string
  status?: 'pending' | 'in_progress' | 'completed'
}

export interface Message {
  id: number
  sender: 'user' | 'agent' | 'system'
  text: string
  timestamp: Date
}

interface VoiceConfig {
  voice_name: string
  language_code: string
}

interface UseAgentWebSocketProps {
  selectedAgent: Agent | null
  voiceConfig: VoiceConfig
  onAudioReceived?: (audioData: ArrayBuffer) => void
  onMessage?: (message: Message) => void
  onTurnComplete?: () => void
  onInterrupted?: () => void
}

export function useAgentWebSocket({
  selectedAgent,
  voiceConfig,
  onAudioReceived,
  onMessage,
  onTurnComplete,
  onInterrupted
}: UseAgentWebSocketProps) {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)
  const [conversationFinished, setConversationFinished] = useState(false)

  const websocketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const addMessage = useCallback((sender: Message['sender'], text: string) => {
    const message: Message = {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
    onMessage?.(message)
  }, [onMessage])

  const connect = useCallback(async () => {
    if (!selectedAgent) {
      addMessage('system', 'No agent selected')
      return
    }

    setIsConnecting(true)
    
    try {
      // Check if Python API is available
      const isApiAvailable = await fetch('http://localhost:8080/api/agents', { 
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      }).then(() => true).catch(() => false)
      
      if (!isApiAvailable) {
        addMessage('system', 'Python API service is not available. Demo mode disabled.')
        setIsConnecting(false)
        return
      }
      
      // Connect to Python API WebSocket
      const wsUrl = `ws://localhost:8080/ws/1?is_audio=true&agent_id=${selectedAgent.id}&voice_name=${voiceConfig.voice_name}&language_code=${voiceConfig.language_code}`
      
      const ws = new WebSocket(wsUrl)
      
      ws.onopen = () => {
        console.log('WebSocket connected')
        setWebsocket(ws)
        websocketRef.current = ws
        setConversationStarted(true)
        setIsConnecting(false)
        addMessage('system', `Connected to ${selectedAgent.name}`)
        console.log('WebSocket state updated: connected=true, conversation=true')
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          
          if (data.mime_type === 'audio/pcm' && data.data) {
            // Handle audio data
            const audioData = Uint8Array.from(atob(data.data), c => c.charCodeAt(0))
            onAudioReceived?.(audioData.buffer)
          } else if (data.mime_type === 'text/plain' && data.data) {
            // Handle text message
            addMessage('agent', data.data)
          } else if (data.turn_complete) {
            console.log('Turn completed - flushing audio buffer')
            onTurnComplete?.()
          } else if (data.interrupted) {
            console.log('Agent interrupted - stopping playback')
            onInterrupted?.()
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        addMessage('system', 'Connection error occurred')
        setIsConnecting(false)
      }

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason)
        setWebsocket(null)
        websocketRef.current = null
        setConversationStarted(false)
        setConversationFinished(true)
        
        if (event.code !== 1000) { // Not a normal closure
          addMessage('system', 'Connection lost')
        }
      }

    } catch (error) {
      console.error('Error connecting WebSocket:', error)
      addMessage('system', 'Failed to connect to agent service')
      setIsConnecting(false)
    }
  }, [selectedAgent, voiceConfig, addMessage, onAudioReceived])

  const disconnect = useCallback(() => {
    if (websocketRef.current) {
      websocketRef.current.close(1000, 'User disconnected')
    }
    setConversationStarted(false)
    setConversationFinished(true)
  }, [])

  const sendMessage = useCallback((message: string) => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        mime_type: 'text/plain',
        data: message
      }
      websocketRef.current.send(JSON.stringify(payload))
      addMessage('user', message)
    }
  }, [addMessage])

  const sendAudio = useCallback((audioData: ArrayBuffer) => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioData)))
      const payload = {
        mime_type: 'audio/pcm',
        data: base64Audio
      }
      websocketRef.current.send(JSON.stringify(payload))
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (websocketRef.current) {
        websocketRef.current.close()
      }
    }
  }, [])

  return {
    websocket,
    messages,
    isConnecting,
    conversationStarted,
    conversationFinished,
    connect,
    disconnect,
    sendMessage,
    sendAudio,
    addMessage
  }
}