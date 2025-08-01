"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, LayoutDashboard, AlertCircle, Image } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return false
    }
    if (!formData.password) {
      setError("Password is required")
      return false
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any valid email/password combination
      if (formData.email && formData.password.length >= 6) {
        // In a real app, you would validate credentials with your backend
        console.log("Login successful:", formData)
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left side - Login Form */}
      <div className="flex items-center justify-center py-12 lg:py-0">
        <div className="mx-auto grid w-[350px] gap-6">
          {/* Header */}
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold">CRM System</h1>
            </div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={loading}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                disabled={loading}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>

            {/* OAuth Buttons */}
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium">Demo Credentials</p>
              <p className="text-xs text-muted-foreground">
                Email: demo@example.com<br />
                Password: demo123
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image Placeholder */}
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <div className="flex h-full items-center justify-center p-8">
          <div className="w-full h-full border-2 border-dashed border-muted-foreground/25 rounded-lg bg-background/30 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="mx-auto h-24 w-24 bg-muted rounded-lg flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium text-muted-foreground">Image Placeholder</p>
                <p className="text-sm text-muted-foreground">Add your branding image here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}