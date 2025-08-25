import { useState, useRef, useCallback, useEffect } from 'react'

interface UseAgentAudioProps {
  onAudioData?: (audioData: ArrayBuffer) => void
  sampleRate?: number
}

export function useAgentAudio({ onAudioData, sampleRate = 24000 }: UseAgentAudioProps = {}) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioPermission, setAudioPermission] = useState<'granted' | 'denied' | 'pending'>('pending')

  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const analyserNodeRef = useRef<AnalyserNode | null>(null)
  const workletNodeRef = useRef<AudioWorkletNode | null>(null)
  const playbackNodesRef = useRef<AudioBufferSourceNode[]>([])
  const audioBufferRef = useRef<Int16Array[]>([])
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio context
  const initializeAudio = useCallback(async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: sampleRate
        })
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      return audioContextRef.current
    } catch (error) {
      console.error('Error initializing audio context:', error)
      throw error
    }
  }, [sampleRate])

  // Request microphone permission and start recording
  const startRecording = useCallback(async () => {
    try {
      const audioContext = await initializeAudio()

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: sampleRate
        } 
      })

      mediaStreamRef.current = stream
      setAudioPermission('granted')

      // Create analyser node for visualization
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      analyserNodeRef.current = analyser

      // Connect microphone to audio context
      const source = audioContext.createMediaStreamSource(stream)
      
      // Create worklet node for processing audio data
      try {
        // Load audio worklet processor
        await audioContext.audioWorklet.addModule('/pcm-recorder-processor.js')
        
        const workletNode = new AudioWorkletNode(audioContext, 'pcm-recorder-processor')
        workletNodeRef.current = workletNode

        // Handle audio data from worklet
        workletNode.port.onmessage = (event) => {
          if (event.data.type === 'audioData') {
            onAudioData?.(event.data.audioData)
          }
        }

        // Connect audio graph
        source.connect(analyser)
        analyser.connect(workletNode)
        
        setIsRecording(true)
        console.log('Recording started')

      } catch (workletError) {
        console.warn('AudioWorklet not available, falling back to ScriptProcessor:', workletError)
        
        // Fallback to ScriptProcessor for older browsers
        const scriptNode = audioContext.createScriptProcessor(4096, 1, 1)
        scriptNode.onaudioprocess = (event) => {
          const inputBuffer = event.inputBuffer
          const inputData = inputBuffer.getChannelData(0)
          
          // Convert Float32Array to Int16Array (PCM 16-bit)
          const pcmData = new Int16Array(inputData.length)
          for (let i = 0; i < inputData.length; i++) {
            pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF
          }
          
          onAudioData?.(pcmData.buffer)
        }

        source.connect(analyser)
        analyser.connect(scriptNode)
        scriptNode.connect(audioContext.destination)
        
        setIsRecording(true)
      }

    } catch (error) {
      console.error('Error starting recording:', error)
      setAudioPermission('denied')
      throw error
    }
  }, [initializeAudio, onAudioData, sampleRate])

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }

    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect()
      workletNodeRef.current = null
    }

    setIsRecording(false)
    console.log('Recording stopped')
  }, [])

  // Function to actually play the buffered audio
  const flushAudioBuffer = useCallback(async () => {
    if (audioBufferRef.current.length === 0) return
    
    try {
      const audioContext = await initializeAudio()
      
      // Concatenate all buffered chunks
      const totalSamples = audioBufferRef.current.reduce((sum, chunk) => sum + chunk.length, 0)
      const concatenated = new Int16Array(totalSamples)
      let offset = 0
      
      for (const chunk of audioBufferRef.current) {
        concatenated.set(chunk, offset)
        offset += chunk.length
      }
      
      // Clear the buffer
      audioBufferRef.current = []
      
      // Create AudioBuffer
      const audioBuffer = audioContext.createBuffer(1, concatenated.length, sampleRate)
      const channelData = audioBuffer.getChannelData(0)
      
      // Convert Int16 to Float32
      for (let i = 0; i < concatenated.length; i++) {
        channelData[i] = concatenated[i] / 0x7FFF
      }

      // Stop any currently playing audio to avoid overlap
      playbackNodesRef.current.forEach(node => {
        try {
          node.stop()
          node.disconnect()
        } catch (e) {
          // Ignore errors from already stopped nodes
        }
      })
      playbackNodesRef.current = []

      // Create and play audio source
      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      
      playbackNodesRef.current.push(source)
      
      source.onended = () => {
        const index = playbackNodesRef.current.indexOf(source)
        if (index > -1) {
          playbackNodesRef.current.splice(index, 1)
        }
        
        if (playbackNodesRef.current.length === 0) {
          setIsPlaying(false)
        }
      }

      source.start()
      setIsPlaying(true)
      
    } catch (error) {
      console.error('Error playing buffered audio:', error)
      audioBufferRef.current = [] // Clear buffer on error
    }
  }, [initializeAudio, sampleRate])

  // Play audio data with buffering to avoid fragmentation
  const playAudio = useCallback(async (audioData: ArrayBuffer) => {
    try {
      // Convert to Int16Array and add to buffer
      const pcmData = new Int16Array(audioData)
      audioBufferRef.current.push(pcmData)
      
      // Clear existing timeout and set a new one
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current)
      }
      
      // Wait longer to accumulate more chunks (reduced frequency of playback)
      playbackTimeoutRef.current = setTimeout(() => {
        flushAudioBuffer()
      }, 150) // Increased to 150ms to accumulate more audio
      
    } catch (error) {
      console.error('Error buffering audio:', error)
    }
  }, [flushAudioBuffer])

  // Force flush audio buffer (called when turn_complete is received)
  const finishAudioPlayback = useCallback(() => {
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current)
      playbackTimeoutRef.current = null
    }
    flushAudioBuffer()
  }, [flushAudioBuffer])

  // Stop all audio playback
  const stopPlayback = useCallback(() => {
    // Clear any pending playback timeout
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current)
      playbackTimeoutRef.current = null
    }
    
    // Clear audio buffer
    audioBufferRef.current = []
    
    // Stop all playing audio
    playbackNodesRef.current.forEach(node => {
      try {
        node.stop()
        node.disconnect()
      } catch (error) {
        // Ignore errors when stopping already stopped nodes
      }
    })
    playbackNodesRef.current = []
    setIsPlaying(false)
  }, [])

  // Get audio levels for visualization
  const getAudioLevels = useCallback(() => {
    if (!analyserNodeRef.current) return new Uint8Array(0)
    
    const bufferLength = analyserNodeRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNodeRef.current.getByteFrequencyData(dataArray)
    return dataArray
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
      stopPlayback()
      
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopRecording, stopPlayback])

  return {
    isRecording,
    isPlaying,
    audioPermission,
    startRecording,
    stopRecording,
    playAudio,
    stopPlayback,
    finishAudioPlayback,
    getAudioLevels,
    analyserNode: analyserNodeRef.current
  }
}