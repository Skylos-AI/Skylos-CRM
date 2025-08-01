import { renderHook } from '@testing-library/react'
import { useErrorHandler } from '@/hooks/use-error-handler'

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('useErrorHandler', () => {
  it('handles string errors', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const message = result.current.handleError('Test error message')
    expect(message).toBe('Test error message')
  })

  it('handles Error objects', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const error = new Error('Test error')
    const message = result.current.handleError(error)
    expect(message).toBe('Test error')
  })

  it('uses fallback message for empty errors', () => {
    const { result } = renderHook(() => useErrorHandler())
    
    const error = new Error('')
    const message = result.current.handleError(error, {
      fallbackMessage: 'Custom fallback'
    })
    expect(message).toBe('Custom fallback')
  })

  it('logs errors when logError is true', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { result } = renderHook(() => useErrorHandler())
    
    result.current.handleError('Test error', { logError: true })
    expect(consoleSpy).toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })
})