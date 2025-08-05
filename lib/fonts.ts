import { JetBrains_Mono as FontMono, Inter as FontSans, Roboto } from "next/font/google"
import localFont from "next/font/local"

// Primary font - Winner Sans (using Inter as fallback until Winner Sans is available)
// TODO: Replace with actual Winner Sans font files when available
export const fontPrimary = FontSans({
  subsets: ["latin"],
  variable: "--font-primary",
  display: 'swap',
})

// Secondary font - Roboto (Google Font)
export const fontSecondary = Roboto({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: "--font-secondary",
  display: 'swap',
})

// Keep existing fonts for backward compatibility
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
