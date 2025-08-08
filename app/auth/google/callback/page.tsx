"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function GoogleOAuthCallback() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    if (error) {
      // Send error to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: error
      }, window.location.origin)
    } else if (code && state) {
      // Send success to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_SUCCESS',
        code: code,
        state: state
      }, window.location.origin)
    } else {
      // Send generic error
      window.opener?.postMessage({
        type: 'GOOGLE_OAUTH_ERROR',
        error: 'Missing authorization code'
      }, window.location.origin)
    }

    // Close the popup
    window.close()
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-lg font-medium mb-2">Processing authentication...</h1>
        <p className="text-muted-foreground">This window will close automatically.</p>
      </div>
    </div>
  )
}