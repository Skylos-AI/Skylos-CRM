// Google Token Management with Encryption

interface GoogleTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
  scope: string
}

interface EncryptedTokenData {
  encryptedTokens: string
  iv: string
  channelId: string
  createdAt: Date
}

class TokenEncryption {
  private static async getEncryptionKey(): Promise<CryptoKey> {
    // In a real application, this would be a secure key from environment variables
    // For demo purposes, we'll generate a key from a password
    const password = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-encryption-key-change-in-production'
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt-should-be-random-in-production'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
  }

  static async encrypt(data: string): Promise<{ encrypted: string; iv: string }> {
    const key = await this.getEncryptionKey()
    const encoder = new TextEncoder()
    const iv = crypto.getRandomValues(new Uint8Array(12))
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(data)
    )

    return {
      encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv))
    }
  }

  static async decrypt(encryptedData: string, ivString: string): Promise<string> {
    const key = await this.getEncryptionKey()
    const decoder = new TextDecoder()
    
    const iv = new Uint8Array(atob(ivString).split('').map(char => char.charCodeAt(0)))
    const encrypted = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)))

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    )

    return decoder.decode(decrypted)
  }
}

export class GoogleTokenManager {
  private static readonly STORAGE_PREFIX = 'google_tokens_'

  static async storeTokens(channelId: string, tokens: GoogleTokens): Promise<void> {
    try {
      const tokenData = JSON.stringify(tokens)
      const { encrypted, iv } = await TokenEncryption.encrypt(tokenData)

      const encryptedData: EncryptedTokenData = {
        encryptedTokens: encrypted,
        iv,
        channelId,
        createdAt: new Date()
      }

      // Store in localStorage (in production, this should be httpOnly cookies or secure server storage)
      localStorage.setItem(
        `${this.STORAGE_PREFIX}${channelId}`,
        JSON.stringify(encryptedData)
      )
    } catch (error) {
      console.error('Failed to store tokens:', error)
      throw new Error('Failed to securely store authentication tokens')
    }
  }

  static async getTokens(channelId: string): Promise<GoogleTokens | null> {
    try {
      const storedData = localStorage.getItem(`${this.STORAGE_PREFIX}${channelId}`)
      if (!storedData) {
        return null
      }

      const encryptedData: EncryptedTokenData = JSON.parse(storedData)
      const decryptedTokens = await TokenEncryption.decrypt(
        encryptedData.encryptedTokens,
        encryptedData.iv
      )

      const tokens: GoogleTokens = JSON.parse(decryptedTokens)
      
      // Check if tokens are expired
      if (new Date() >= new Date(tokens.expiresAt)) {
        // Tokens are expired, attempt to refresh
        return await this.refreshTokens(channelId, tokens)
      }

      return tokens
    } catch (error) {
      console.error('Failed to retrieve tokens:', error)
      return null
    }
  }

  static async refreshTokens(channelId: string, tokens: GoogleTokens): Promise<GoogleTokens | null> {
    try {
      // Get client credentials from configuration
      const clientConfig = this.getClientConfig(channelId)
      if (!clientConfig) {
        throw new Error('Client configuration not found')
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientConfig.clientId,
          client_secret: clientConfig.clientSecret,
          refresh_token: tokens.refreshToken,
          grant_type: 'refresh_token',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh tokens')
      }

      const data = await response.json()

      const refreshedTokens: GoogleTokens = {
        accessToken: data.access_token,
        refreshToken: tokens.refreshToken, // Refresh token usually stays the same
        expiresAt: new Date(Date.now() + data.expires_in * 1000),
        scope: data.scope || tokens.scope
      }

      // Store the refreshed tokens
      await this.storeTokens(channelId, refreshedTokens)

      return refreshedTokens
    } catch (error) {
      console.error('Failed to refresh tokens:', error)
      // If refresh fails, remove the stored tokens
      await this.removeTokens(channelId)
      return null
    }
  }

  static async removeTokens(channelId: string): Promise<void> {
    try {
      // Get tokens before removing to revoke them
      const tokens = await this.getTokens(channelId)
      
      // Remove from storage
      localStorage.removeItem(`${this.STORAGE_PREFIX}${channelId}`)

      // Revoke tokens with Google
      if (tokens) {
        await this.revokeTokens(tokens.accessToken)
      }
    } catch (error) {
      console.error('Failed to remove tokens:', error)
    }
  }

  static async revokeTokens(accessToken: string): Promise<void> {
    try {
      await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    } catch (error) {
      console.error('Failed to revoke tokens:', error)
      // Don't throw error as this is cleanup
    }
  }

  static async validateTokens(channelId: string): Promise<boolean> {
    try {
      const tokens = await this.getTokens(channelId)
      if (!tokens) {
        return false
      }

      // Test the tokens by making a simple API call
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  private static getClientConfig(channelId: string): { clientId: string; clientSecret: string } | null {
    // In a real application, this would securely retrieve client configuration
    // For demo purposes, we'll get it from localStorage (this is not secure for production)
    try {
      const configKey = `channel_config_${channelId}`
      const configData = localStorage.getItem(configKey)
      if (!configData) {
        return null
      }

      const config = JSON.parse(configData)
      return {
        clientId: config.clientId,
        clientSecret: config.clientSecret
      }
    } catch (error) {
      return null
    }
  }

  static async clearAllTokens(): Promise<void> {
    try {
      // Get all keys that start with our prefix
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(this.STORAGE_PREFIX)
      )

      // Remove each token set
      for (const key of keys) {
        const channelId = key.replace(this.STORAGE_PREFIX, '')
        await this.removeTokens(channelId)
      }
    } catch (error) {
      console.error('Failed to clear all tokens:', error)
    }
  }

  static getStoredChannels(): string[] {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(this.STORAGE_PREFIX))
        .map(key => key.replace(this.STORAGE_PREFIX, ''))
    } catch (error) {
      return []
    }
  }
}

// Utility function to check if tokens need refresh soon (within 5 minutes)
export function shouldRefreshTokens(tokens: GoogleTokens): boolean {
  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60 * 1000)
  return new Date(tokens.expiresAt) <= fiveMinutesFromNow
}

// Cleanup function to be called on app logout
export async function cleanupGoogleTokens(): Promise<void> {
  await GoogleTokenManager.clearAllTokens()
}

export type { GoogleTokens, EncryptedTokenData }