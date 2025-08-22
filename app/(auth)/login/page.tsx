"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const { loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      await loginWithGoogle()
    } catch (err) {
      setError("An error occurred during Google login. Please try again.")
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .skylos-login {
          margin: 0;
          background: #0a0a0a;
          font-family: "Inter", sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .skylos-login::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
          animation: backgroundShift 6s ease-in-out infinite alternate;
          z-index: -1;
        }

        @keyframes backgroundShift {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }

        .login-container {
          position: relative;
          z-index: 1;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px 40px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          max-width: 420px;
          width: 100%;
          text-align: center;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3),
                      0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .login-header {
          margin-bottom: 32px;
        }

        .login-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #7C77C6, #FF77C6);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(124, 119, 198, 0.3);
        }

        .login-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          color: #94a3b8;
          font-size: 15px;
          font-weight: 400;
          margin: 0;
          line-height: 1.6;
        }

        .google-button {
          width: 100%;
          padding: 16px 24px;
          background: #ffffff;
          color: #1a1a1a;
          border: none;
          border-radius: 16px;
          font-family: "Inter", sans-serif;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 32px 0 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .google-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .google-button:hover:not(:disabled)::before {
          left: 100%;
        }

        .google-button:hover:not(:disabled) {
          background: #f8fafc;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .google-button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .google-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-top: 2px solid #7C77C6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .back-link {
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .back-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fca5a5;
          font-size: 14px;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
        }

        .floating-elements::before,
        .floating-elements::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(124, 119, 198, 0.1), rgba(255, 119, 198, 0.1));
          animation: float 8s ease-in-out infinite;
        }

        .floating-elements::before {
          width: 300px;
          height: 300px;
          top: -150px;
          right: -150px;
          animation-delay: -4s;
        }

        .floating-elements::after {
          width: 200px;
          height: 200px;
          bottom: -100px;
          left: -100px;
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
          75% { transform: translateY(-20px) rotate(270deg); }
        }

        @media screen and (max-width: 767px) {
          .login-card {
            padding: 40px 24px;
            margin: 20px;
            border-radius: 20px;
          }
          
          .login-title {
            font-size: 24px;
          }
          
          .login-logo {
            width: 56px;
            height: 56px;
            font-size: 20px;
            border-radius: 12px;
          }

          .google-button {
            padding: 14px 20px;
            font-size: 14px;
          }
        }
      `}</style>
      
      <div className="skylos-login">
        <div className="floating-elements"></div>
        <div className="login-container">
          <div className="login-card">
          <div className="login-header">
            <div className="login-logo">S</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Access your Skylos CRM dashboard with your Google account
            </p>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button 
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}