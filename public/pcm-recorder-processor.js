// PCM Recorder Worklet Processor
// Processes audio input and converts to PCM format for agent demo

class PCMRecorderProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super(options)
    this.sampleRate = 24000 // Target sample rate for Gemini Live API
    this.bufferSize = 4096
    this.inputBuffer = new Float32Array(this.bufferSize)
    this.bufferIndex = 0
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0]
    
    // Only process if we have input
    if (input.length === 0) {
      return true
    }

    const inputChannel = input[0]
    if (!inputChannel) {
      return true
    }

    // Process input samples
    for (let i = 0; i < inputChannel.length; i++) {
      this.inputBuffer[this.bufferIndex] = inputChannel[i]
      this.bufferIndex++

      // When buffer is full, process and send
      if (this.bufferIndex >= this.bufferSize) {
        this.processBuffer()
        this.bufferIndex = 0
      }
    }

    return true
  }

  processBuffer() {
    // Convert Float32 to Int16 (PCM 16-bit)
    const pcmBuffer = new Int16Array(this.bufferSize)
    
    for (let i = 0; i < this.bufferSize; i++) {
      // Clamp to [-1, 1] and convert to 16-bit PCM
      const sample = Math.max(-1, Math.min(1, this.inputBuffer[i]))
      pcmBuffer[i] = Math.round(sample * 0x7FFF)
    }

    // Send PCM data to main thread
    this.port.postMessage({
      type: 'audioData',
      audioData: pcmBuffer.buffer
    })
  }

  static get parameterDescriptors() {
    return []
  }
}

registerProcessor('pcm-recorder-processor', PCMRecorderProcessor)