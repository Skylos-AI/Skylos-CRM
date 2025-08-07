// Animation and content constants for the animated hero header

export const ANIMATION_CONFIG = {
  letterDelay: 0.03,
  wordDelay: 0.1,
  springConfig: {
    stiffness: 150,
    damping: 25,
  },
  pathAnimationDuration: 25, // Base duration, will be randomized
} as const;

export const DEFAULT_CONTENT = {
  title: "Ready to Deploy AI in Your Business?",
  subtitle: "Build, manage, and scale your AI workforce. Deploy custom conversational agents tailored to your business needs - in days, not months",
  ctaText: "Join Exclusive Whitelist",
  ctaHref: "/dashboard"
} as const;

export const AI_CONTENT_OPTIONS = {
  headlines: [
    "Ready to Deploy AI in Your Business?",
    "Stop Losing to AI-Powered Competitors",
    "Build Your AI Team Today",
    "The Future of Business is AI-First"
  ],
  subtitles: [
    "Build, manage, and scale your AI workforce. Deploy custom conversational agents tailored to your business needs - in days, not months",
    "Get custom AI agents that automate processes, handle customer interactions, and scale your operations while you focus on growth",
    "Create intelligent agents that work 24/7, handle complex tasks, and integrate seamlessly with your existing business processes",
    "Join forward-thinking companies already using AI to automate workflows, boost productivity, and stay ahead of the competition"
  ],
  ctaOptions: [
    "Join Exclusive Whitelist",
    "Get Early Access",
    "Deploy AI Now",
    "Start Building"
  ]
} as const;

// Keep the old export for backward compatibility
export const CRM_CONTENT_OPTIONS = AI_CONTENT_OPTIONS;