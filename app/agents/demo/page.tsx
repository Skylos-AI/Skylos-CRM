"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { CrmLayout } from "@/components/layout/crm-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Bot, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  Settings, 
  TrendingUp,
  Users,
  Headphones,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AgentsService, DemoAgent, DemoObjective, ObjectiveStatus } from "@/lib/api/agents"
import { useAgentWebSocket } from "@/hooks/use-agent-websocket"
import { useAgentAudio } from "@/hooks/use-agent-audio"
import { AudioVisualizer } from "@/components/agents/audio-visualizer"

interface Message {
  id: number
  sender: 'user' | 'agent' | 'system'
  text: string
  timestamp: Date
}

export default function AgentsDemoPage() {
  // State Management
  const [agents, setAgents] = useState<DemoAgent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<DemoAgent | null>(null)
  const [isAnalysing, setIsAnalysing] = useState(false)
  const [analysisCompleted, setAnalysisCompleted] = useState(false)
  const [analysisContent, setAnalysisContent] = useState('')
  const [isApiKeySet, setIsApiKeySet] = useState(false)
  const [loading, setLoading] = useState(true)
  const [objectiveStatuses, setObjectiveStatuses] = useState<ObjectiveStatus>({})
  const [voiceConfig, setVoiceConfig] = useState({ voice_name: 'Aoede', language_code: 'es-ES' })

  // Use refs to avoid circular dependency
  const sendAudioRef = useRef<((audioData: ArrayBuffer) => void) | null>(null)

  // Audio callback
  const handleAudioData = useCallback((audioData: ArrayBuffer) => {
    console.log('Audio data received:', audioData.byteLength, 'bytes')
    if (sendAudioRef.current) {
      console.log('Sending audio to WebSocket via ref')
      sendAudioRef.current(audioData)
    } else {
      console.log('sendAudio ref not available yet')
    }
  }, [])

  // Audio hook
  const { 
    isRecording, 
    isPlaying, 
    audioPermission,
    startRecording, 
    stopRecording, 
    playAudio, 
    stopPlayback,
    finishAudioPlayback,
    analyserNode
  } = useAgentAudio({
    onAudioData: handleAudioData,
  })

  // WebSocket hook
  const {
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
  } = useAgentWebSocket({
    selectedAgent,
    voiceConfig,
    onAudioReceived: playAudio,
    onTurnComplete: finishAudioPlayback,
    onInterrupted: stopPlayback, // Use stopPlayback for interruptions
    onMessage: (message) => {
      console.log('New message:', message)
      // Update objectives when conversation progresses
      if (selectedAgent && conversationStarted) {
        updateObjectivesProgress()
      }
    }
  })

  // Update the ref when sendAudio is available and conversation is active
  useEffect(() => {
    if (sendAudio && conversationStarted) {
      console.log('Setting up sendAudio ref')
      sendAudioRef.current = sendAudio
    } else {
      console.log('Clearing sendAudio ref')
      sendAudioRef.current = null
    }
  }, [sendAudio, conversationStarted])

  useEffect(() => {
    loadAgents()
    checkApiKeyStatus()
  }, [])

  const loadAgents = async () => {
    try {
      const agentsData = await AgentsService.getDemoAgents()
      setAgents(agentsData)
      if (agentsData.length > 0) {
        const firstAgent = agentsData[0]
        setSelectedAgent(firstAgent)
        setVoiceConfig({
          voice_name: firstAgent.voice_name,
          language_code: firstAgent.language_code
        })
      }
    } catch (error) {
      console.error('Error loading agents:', error)
      // Use fallback mock data if service is not available
      const mockAgents = [
        {
          id: 'sdr',
          name: 'Agente SDR (Mock)',
          description: 'Especialista en desarrollo de ventas (modo demo offline)',
          role: 'Sales Development Representative',
          voice_name: 'Aoede',
          language_code: 'es-ES',
          objectives: [
            { id: '1', label: 'Identificar empresa', description: 'Obtener información sobre la empresa del prospecto' },
            { id: '2', label: 'Calificar necesidad', description: 'Entender problemas específicos del cliente' }
          ]
        }
      ]
      setAgents(mockAgents)
      setSelectedAgent(mockAgents[0])
      setVoiceConfig({
        voice_name: mockAgents[0].voice_name,
        language_code: mockAgents[0].language_code
      })
    } finally {
      setLoading(false)
    }
  }

  const checkApiKeyStatus = async () => {
    try {
      const status = await AgentsService.checkDemoApiKeyStatus()
      setIsApiKeySet(status.configured)
    } catch (error) {
      console.error('Error checking API key:', error)
      setIsApiKeySet(false)
    }
  }

  const updateObjectivesProgress = useCallback(async () => {
    if (!selectedAgent) return
    
    try {
      const progress = await AgentsService.getObjectivesProgress(selectedAgent.id)
      setObjectiveStatuses(progress.statuses)
    } catch (error) {
      console.error('Error updating objectives progress:', error)
    }
  }, [selectedAgent])

  // addMessage is now provided by useAgentWebSocket hook

  const toggleConversation = async () => {
    if (conversationStarted) {
      stopConversation()
    } else {
      await startConversation()
    }
  }

  const startConversation = async () => {
    if (!selectedAgent) return
    
    try {
      console.log('Starting conversation...')
      setAnalysisCompleted(false)
      setAnalysisContent('')
      setObjectiveStatuses({})
      
      // Connect WebSocket first
      console.log('Connecting WebSocket...')
      await connect()
      
      // Then start audio recording
      console.log('Starting audio recording...')
      await startRecording()
      
      console.log('Conversation started successfully')
    } catch (error) {
      console.error('Error starting conversation:', error)
    }
  }

  const stopConversation = () => {
    stopRecording()
    stopPlayback()
    disconnect()
  }

  const analyseConversation = async () => {
    if (!selectedAgent) return
    
    setIsAnalysing(true)
    try {
      // First update objectives progress
      await updateObjectivesProgress()
      
      // Then get full analysis
      const result = await AgentsService.analyseConversation(selectedAgent.id)
      setAnalysisContent(result.analysis)
      setAnalysisCompleted(true)
    } catch (error) {
      console.error('Error analyzing conversation:', error)
      // Handle rate limit errors gracefully
      if (error.message.includes('Rate limit')) {
        setAnalysisContent('⏳ Rate limit reached. Please wait a few moments and try again.')
      } else {
        setAnalysisContent('❌ Error analyzing conversation. Please try again.')
      }
      setAnalysisCompleted(true)
    } finally {
      setIsAnalysing(false)
    }
  }

  const getObjectiveStatus = (objective: DemoObjective): 'pending' | 'in_progress' | 'completed' => {
    return objectiveStatuses[objective.id] || 'pending'
  }

  const handleAgentSelection = (agent: DemoAgent) => {
    setSelectedAgent(agent)
    setVoiceConfig({
      voice_name: agent.voice_name,
      language_code: agent.language_code
    })
    setAnalysisCompleted(false)
    setAnalysisContent('')
    setObjectiveStatuses({})
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <CrmLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <Bot className="h-12 w-12 mx-auto text-blue-600 animate-pulse" />
              <p className="text-muted-foreground">Cargando demo de agentes...</p>
            </div>
          </div>
        </CrmLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <CrmLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                <Bot className="h-8 w-8 text-blue-600" />
                Demo de Agentes IA
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Prueba nuestros agentes conversacionales especializados. Selecciona un agente y comienza una conversación por voz.
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {isApiKeySet ? 'API Conectada' : 'API Desconectada'}
            </Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Agent Selection & Controls */}
            <div className="space-y-6">
              {/* Agent Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Seleccionar Agente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                        selectedAgent?.id === agent.id
                          ? "bg-primary/5 border-primary/20 shadow-sm ring-1 ring-primary/10"
                          : "hover:bg-muted/50 hover:border-border hover:shadow-sm"
                      )}
                      onClick={() => handleAgentSelection(agent)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className={cn(
                            "transition-colors duration-200",
                            agent.id === 'sdr' 
                              ? 'bg-green-50 text-green-600 border border-green-100' 
                              : 'bg-blue-50 text-blue-600 border border-blue-100'
                          )}>
                            {agent.id === 'sdr' ? (
                              <TrendingUp className="h-6 w-6" />
                            ) : (
                              <Settings className="h-6 w-6" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{agent.role}</p>
                          <p className="text-xs text-muted-foreground">{agent.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Voice Controls */}
              {selectedAgent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5" />
                      Configuración de Voz
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Voz:</span>
                        <Badge variant="secondary">{selectedAgent.voice_name}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Idioma:</span>
                        <Badge variant="secondary">{selectedAgent.language_code}</Badge>
                      </div>
                      
                      {/* Audio Visualizer */}
                      <div className="flex flex-col items-center space-y-2 pt-4">
                        <span className="text-xs text-muted-foreground">
                          {conversationStarted ? 'Conversación activa' : 'Micrófono inactivo'}
                        </span>
                        <AudioVisualizer 
                          analyserNode={analyserNode}
                          isActive={conversationStarted && isRecording}
                          width={200}
                          height={60}
                          className="mx-auto"
                        />
                        
                        {/* Audio Permission Status */}
                        <div className="flex items-center gap-2 text-xs">
                          {audioPermission === 'granted' ? (
                            <>
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-green-600">Micrófono autorizado</span>
                            </>
                          ) : audioPermission === 'denied' ? (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="text-red-600">Micrófono denegado</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                              <span className="text-yellow-600">Solicitando permisos...</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Control Buttons */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={toggleConversation}
                      disabled={!selectedAgent || !isApiKeySet || isConnecting || audioPermission === 'denied'}
                      size="lg"
                      className={cn(
                        "w-full transition-all duration-200 font-medium",
                        conversationStarted 
                          ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl" 
                          : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                      )}
                    >
                      {isConnecting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Conectando...
                        </>
                      ) : conversationStarted ? (
                        <>
                          <Square className="mr-2 h-4 w-4" />
                          Finalizar Demo
                        </>
                      ) : audioPermission === 'denied' ? (
                        <>
                          <MicOff className="mr-2 h-4 w-4" />
                          Sin Micrófono
                        </>
                      ) : (
                        <>
                          {isRecording ? <Mic className="mr-2 h-4 w-4 text-red-500 animate-pulse" /> : <Play className="mr-2 h-4 w-4" />}
                          {isRecording ? 'Grabando...' : 'Iniciar Demo'}
                        </>
                      )}
                    </Button>

                    {conversationFinished && (
                      <Button
                        onClick={analyseConversation}
                        disabled={isAnalysing}
                        variant="outline"
                        size="lg"
                        className="w-full transition-all duration-200 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                      >
                        {isAnalysing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
                            Analizando...
                          </>
                        ) : (
                          <>
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Analizar Demo
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Objectives Tracker */}
              {selectedAgent && conversationStarted && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Objetivos del Agente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedAgent.objectives.map((objective) => {
                        const status = getObjectiveStatus(objective)
                        return (
                          <div key={objective.id} className="flex items-center space-x-3">
                            <div className={cn(
                              "h-2 w-2 rounded-full",
                              status === 'completed' ? 'bg-green-500' :
                              status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                            )} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{objective.label}</p>
                              <p className="text-xs text-muted-foreground">{objective.description}</p>
                            </div>
                            <Badge 
                              variant={status === 'completed' ? 'default' : 'secondary'}
                              className={cn(
                                status === 'completed' ? 'bg-green-100 text-green-700' :
                                status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-600'
                              )}
                            >
                              {status === 'completed' ? 'Completado' :
                               status === 'in_progress' ? 'En progreso' : 'Pendiente'}
                            </Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Conversation & Analysis */}
            <div className="space-y-6">
              {/* Messages Window */}
              <Card className="h-96 flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Conversación
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Inicia una conversación para ver los mensajes aquí</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-xs px-4 py-2 rounded-lg text-sm",
                              message.sender === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : message.sender === 'agent'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-yellow-100 text-yellow-800'
                            )}
                          >
                            <p>{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              {analysisCompleted && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Análisis de la Conversación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm">
                        {analysisContent}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </CrmLayout>
    </ProtectedRoute>
  )
}