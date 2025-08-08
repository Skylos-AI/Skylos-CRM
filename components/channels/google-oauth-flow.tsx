"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface GoogleTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  scope: string
}

interface GoogleOAuthFlowProps {
  channelType: 'google-meet' | 'google-sheets'
  clientId: string
  scopes: string[]
  onSuccess: (tokens: GoogleTokens) => void
  onError: (error: string) => void
}

export function GoogleOAuthFlow({ 
  channelType, 
  clientId, 
  scopes, 
  onSuccess, 
  onError 
}: GoogleOAuthFlowProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authResult, setAuthResult] = useState<{ success: boolean; message: string } | null>(null)

  const generateCodeVerifier = () => {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  const generateCodeChallenge = async (verifier: string) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }

  const initiateOAuthFlow = useCallback(async () => {
    if (!clientId) {
      onError('Google Client ID is required')
      return
    }

    setIsAuthenticating(true)
    setAuthResult(null)

    try {
      // Generate PKCE parameters for security
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = await generateCodeChallenge(codeVerifier)
      const state = crypto.getRandomValues(new Uint32Array(1))[0].toString(16)

      // Store PKCE parameters for later use
      sessionStorage.setItem('oauth_code_verifier', codeVerifier)
      sessionStorage.setItem('oauth_state', state)

      // Build OAuth URL
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: `${window.location.origin}/auth/google/callback`,
        response_type: 'code',
        scope: scopes.join(' '),
        state: state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        access_type: 'offline',
        prompt: 'consent'
      })

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

      // Open OAuth popup
      const popup = window.open(
        authUrl,
        'google-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      )

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.')
      }

      // Listen for popup messages
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return

        if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
          const { code, state: returnedState } = event.data
          
          // Verify state parameter
          const storedState = sessionStorage.getItem('oauth_state')
          if (returnedState !== storedState) {
            onError('Invalid OAuth state. Please try again.')
            return
          }

          // Exchange code for tokens (mock implementation)
          exchangeCodeForTokens(code)
          popup.close()
        } else if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
          onError(event.data.error || 'OAuth authentication failed')
          popup.close()
        }

        window.removeEventListener('message', handleMessage)
      }

      window.addEventListener('message', handleMessage)

      // Check if popup was closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', handleMessage)
          setIsAuthenticating(false)
          setAuthResult({
            success: false,
            message: 'Authentication cancelled by user'
          })
        }
      }, 1000)

    } catch (error) {
      setIsAuthenticating(false)
      onError(error instanceof Error ? error.message : 'Authentication failed')
    }
  }, [clientId, scopes, onError])

  const exchangeCodeForTokens = async (code: string) => {
    try {
      const codeVerifier = sessionStorage.getItem('oauth_code_verifier')
      if (!codeVerifier) {
        throw new Error('Missing code verifier')
      }

      // In a real implementation, this would make a secure server-side call
      // For now, we'll simulate the token exchange
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful token response
      const mockTokens: GoogleTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
        scope: scopes.join(' ')
      }

      setAuthResult({
        success: true,
        message: `Successfully connected to ${channelType === 'google-meet' ? 'Google Meet' : 'Google Sheets'}!`
      })

      onSuccess(mockTokens)

      // Clean up stored parameters
      sessionStorage.removeItem('oauth_code_verifier')
      sessionStorage.removeItem('oauth_state')

    } catch (error) {
      onError(error instanceof Error ? error.message : 'Token exchange failed')
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Google Authentication</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={initiateOAuthFlow}
          disabled={isAuthenticating || !clientId}
        >
          {isAuthenticating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Connect to Google
            </>
          )}
        </Button>
      </div>

      {authResult && (
        <Alert variant={authResult.success ? "default" : "destructive"}>
          {authResult.success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{authResult.message}</AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-muted-foreground">
        <p>
          This will open a popup window to authenticate with Google. 
          Make sure popups are enabled for this site.
        </p>
        <p className="mt-1">
          Required permissions: {scopes.join(', ')}
        </p>
      </div>
    </div>
  )
}