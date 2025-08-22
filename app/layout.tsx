import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans, fontPrimary, fontSecondary } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import { CallInterfaceProvider } from "@/components/ai-assistant/call-interface-provider"
import { AccessibilityProvider } from "@/components/ui/accessibility-provider"
import { SkipLinks } from "@/components/ui/skip-links"
import { AuthProvider } from "@/hooks/use-auth"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["CRM", "Customer Relationship Management", "Sales", "Leads", "Pipeline", "Business"],
  authors: [{ name: "CRM System Team" }],
  creator: "CRM System",
  publisher: "CRM System",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@crmsystem",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontPrimary.variable,
            fontSecondary.variable
          )}
          suppressHydrationWarning
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AccessibilityProvider>
              <AuthProvider>
                <ErrorBoundary>
                  {/* Skip Links for keyboard navigation */}
                  <SkipLinks
                    links={[
                      { href: "#main-content", label: "Skip to main content" },
                      { href: "#navigation", label: "Skip to navigation" },
                      { href: "#footer", label: "Skip to footer" },
                    ]}
                  />
                  
                  <div className="relative flex min-h-screen flex-col">
                    <SiteHeader />
                    <main id="main-content" className="flex-1" tabIndex={-1}>
                      {children}
                    </main>
                  </div>
                  <TailwindIndicator />
                  <Toaster />
                  <CallInterfaceProvider />
                </ErrorBoundary>
              </AuthProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
