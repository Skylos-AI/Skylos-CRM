"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  )
}

function AuthProviderInner({ children }: AuthProviderProps) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isLoading = status === "loading"

  useEffect(() => {
    if (session?.user) {
      const userData = {
        id: session.user.id || "google-user",
        email: session.user.email || "",
        name: session.user.name || session.user.email?.split("@")[0] || ""
      }
      setUser(userData)
    } else {
      // Fallback to localStorage for regular login
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          localStorage.removeItem("user")
        }
      } else {
        setUser(null)
      }
    }
  }, [session])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Demo login logic (replace with real authentication)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password.length >= 6) {
        const userData = {
          id: "1",
          email,
          name: email.split("@")[0]
        }
        
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" })
  }

  const logout = () => {
    if (session) {
      signOut({ callbackUrl: "/" })
    } else {
      setUser(null)
      localStorage.removeItem("user")
      router.push("/")
    }
  }

  const authValue = {
    user,
    isLoading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user || !!session
  }

  return React.createElement(
    AuthContext.Provider,
    { value: authValue },
    children
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}