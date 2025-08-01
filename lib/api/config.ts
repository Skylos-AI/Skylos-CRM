// API Configuration for backend integration

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
}

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Leads
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    GET: (id: string) => `/leads/${id}`,
    UPDATE: (id: string) => `/leads/${id}`,
    DELETE: (id: string) => `/leads/${id}`,
    MOVE_STAGE: (id: string) => `/leads/${id}/stage`,
  },
  
  // Companies
  COMPANIES: {
    LIST: '/companies',
    CREATE: '/companies',
    GET: (id: string) => `/companies/${id}`,
    UPDATE: (id: string) => `/companies/${id}`,
    DELETE: (id: string) => `/companies/${id}`,
  },
  
  // Contacts
  CONTACTS: {
    LIST: '/contacts',
    CREATE: '/contacts',
    GET: (id: string) => `/contacts/${id}`,
    UPDATE: (id: string) => `/contacts/${id}`,
    DELETE: (id: string) => `/contacts/${id}`,
    BY_COMPANY: (companyId: string) => `/contacts?companyId=${companyId}`,
  },
  
  // Channels
  CHANNELS: {
    LIST: '/channels',
    CONFIGURE: (type: string) => `/channels/${type}/configure`,
    TEST: (type: string) => `/channels/${type}/test`,
    STATUS: (type: string) => `/channels/${type}/status`,
  },
  
  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    PIPELINE: '/analytics/pipeline',
    PERFORMANCE: '/analytics/performance',
    TRENDS: '/analytics/trends',
  },
  
  // File Upload
  UPLOAD: '/upload',
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
  },
}

// HTTP Client configuration
export const createApiClient = () => {
  const baseURL = API_CONFIG.BASE_URL
  
  return {
    get: async (url: string, options?: RequestInit) => {
      return fetch(`${baseURL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options?.headers,
        },
        ...options,
      })
    },
    
    post: async (url: string, data?: any, options?: RequestInit) => {
      return fetch(`${baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })
    },
    
    put: async (url: string, data?: any, options?: RequestInit) => {
      return fetch(`${baseURL}${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })
    },
    
    patch: async (url: string, data?: any, options?: RequestInit) => {
      return fetch(`${baseURL}${url}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })
    },
    
    delete: async (url: string, options?: RequestInit) => {
      return fetch(`${baseURL}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options?.headers,
        },
        ...options,
      })
    },
  }
}

function getAuthHeaders(): Record<string, string> {
  // In a real app, get token from localStorage, cookies, or auth context
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new ApiError(
      errorData.message || 'An error occurred',
      response.status,
      errorData.code,
      errorData.details
    )
  }
  
  return response.json()
}

// Retry utility
export async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS,
  delay: number = API_CONFIG.RETRY_DELAY
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (attempts > 1 && shouldRetry(error)) {
      await new Promise(resolve => setTimeout(resolve, delay))
      return withRetry(fn, attempts - 1, delay * 2) // Exponential backoff
    }
    throw error
  }
}

function shouldRetry(error: any): boolean {
  // Retry on network errors or 5xx server errors
  return (
    error instanceof TypeError || // Network error
    (error instanceof ApiError && error.status >= 500)
  )
}