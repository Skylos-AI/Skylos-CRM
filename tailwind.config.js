const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Design system colors
      colors: {
        // Keep existing shadcn colors for compatibility
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          25: '#fafbff',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Simplified color system - REMOVED semantic colors (success, warning, error)
        // Only primary blue and neutral colors allowed
        neutral: {
          0: '#ffffff',
          25: '#fdfdfd',
          50: '#f9fafb',
          75: '#f6f7f8',
          100: '#f3f4f6',
          150: '#eef0f2',
          200: '#e5e7eb',
          250: '#dde0e4',
          300: '#d1d5db',
          350: '#c4c9d0',
          400: '#9ca3af',
          450: '#8b92a5',
          500: '#6b7280',
          550: '#5d6370',
          600: '#4b5563',
          650: '#424954',
          700: '#374151',
          750: '#2f3441',
          800: '#1f2937',
          825: '#1c2532',
          850: '#18212e',
          875: '#151d2a',
          900: '#111827',
          925: '#0f1419',
          950: '#030712',
          975: '#020509',
        },
        // Enhanced dark theme color system using slate palette
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Enhanced gray palette for light theme
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Dark theme optimized colors
        'dark-bg': {
          primary: '#020617',    // slate-950
          secondary: '#0f172a',  // slate-900
          tertiary: '#1e293b',   // slate-800
          elevated: '#334155',   // slate-700
        },
        'dark-text': {
          primary: '#f8fafc',    // slate-50
          secondary: '#cbd5e1',  // slate-300
          tertiary: '#94a3b8',   // slate-400
          muted: '#64748b',      // slate-500
        },
        'dark-border': {
          subtle: '#334155',     // slate-700
          default: '#475569',    // slate-600
          emphasis: '#64748b',   // slate-500
        },
        // Light theme optimized colors
        'light-bg': {
          primary: '#f9fafb',    // gray-50 - Main app background
          secondary: '#f3f4f6',  // gray-100 - Sidebar background
          tertiary: '#ffffff',   // white - Card backgrounds
          elevated: '#e5e7eb',   // gray-200 - Hover states
        },
        'light-text': {
          primary: '#111827',    // gray-900
          secondary: '#374151',  // gray-700
          tertiary: '#6b7280',   // gray-500
          muted: '#9ca3af',      // gray-400
        },
        'light-border': {
          subtle: '#e5e7eb',     // gray-200
          default: '#d1d5db',    // gray-300
          emphasis: '#9ca3af',   // gray-400
        },
      },
      // Design system spacing
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
      },
      // Design system border radius
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
        none: '0px',
        base: '0.25rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      // Design system typography
      fontFamily: {
        primary: ["Winner Sans", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", ...fontFamily.sans],
        secondary: ["Roboto", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", ...fontFamily.sans],
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", ...fontFamily.sans],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", ...fontFamily.mono],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      // Design system shadows
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        // Enhanced shadows for professional UI
        soft: '0 1px 3px rgba(0, 0, 0, 0.2)',
        sidebar: '4px 0 24px -8px rgba(0, 0, 0, 0.3)',
        card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)',
        glow: '0 0 0 1px rgba(148, 163, 184, 0.1)',
        'glow-soft': '0 0 0 1px rgba(148, 163, 184, 0.05)',
        'glow-emphasis': '0 0 0 1px rgba(148, 163, 184, 0.15)',
        // Light theme shadows
        'light-sidebar': '4px 0 24px -8px rgba(0, 0, 0, 0.1)',
        'light-card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
        'light-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        'light-soft': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      // Design system animations
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      scale: {
        102: '1.02',
        105: '1.05',
      },
      translate: {
        '0.5': '2px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: 0 },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in-from-bottom 0.3s ease-out",
        "zoom-in": "zoom-in 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "bounce-in": "bounce-in 0.6s ease-out",
        "wiggle": "wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
