// PCM Player Worklet Processor
// Handles playback of PCM audio data from agent responses

class PCMPlayerProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super(options)
    this.audioQueue = []
    this.isPlaying = false
    this.currentBuffer = null
    this.bufferIndex = 0
    this.sampleRate = 24000

    // Listen for audio data from main thread
    this.port.onmessage = (event) => {
      if (event.data.type === 'audioData') {
        this.queueAudio(event.data.audioData)
      } else if (event.data.type === 'stop') {
        this.stop()
      }
    }
  }

  queueAudio(audioBuffer) {
    // Convert ArrayBuffer to Float32Array
    const pcmData = new Int16Array(audioBuffer)
    const floatData = new Float32Array(pcmData.length)
    
    // Convert 16-bit PCM to Float32
    for (let i = 0; i < pcmData.length; i++) {
      floatData[i] = pcmData[i] / 0x7FFF
    }
    
    this.audioQueue.push(floatData)
    this.isPlaying = true
  }

  stop() {
    this.audioQueue = []
    this.currentBuffer = null
    this.bufferIndex = 0
    this.isPlaying = false
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0]
    
    if (!output || output.length === 0) {
      return true
    }

    const outputChannel = output[0]
    if (!outputChannel) {
      return true
    }

    // Fill output with queued audio data
    for (let i = 0; i < outputChannel.length; i++) {
      if (!this.currentBuffer && this.audioQueue.length > 0) {
        // Get next buffer from queue
        this.currentBuffer = this.audioQueue.shift()
        this.bufferIndex = 0
      }

      if (this.currentBuffer) {
        if (this.bufferIndex < this.currentBuffer.length) {
          outputChannel[i] = this.currentBuffer[this.bufferIndex]
          this.bufferIndex++
        } else {
          // Current buffer finished
          this.currentBuffer = null
          outputChannel[i] = 0
        }
      } else {
        // No audio data available
        outputChannel[i] = 0
      }
    }

    // Copy to other channels if stereo
    for (let channel = 1; channel < output.length; channel++) {
      if (output[channel]) {
        output[channel].set(outputChannel)
      }
    }

    // Continue processing if we have more audio or are still playing
    return true
  }

  static get parameterDescriptors() {
    return []
  }
}

registerProcessor('pcm-player-processor', PCMPlayerProcessor)