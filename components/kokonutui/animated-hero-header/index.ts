// Export all components from the animated hero header module

export { AnimatedHeroHeader } from "./animated-hero-header";
export { FloatingPaths } from "./floating-paths";
export { AnimatedText, AnimatedSubtitle } from "./text-animation";
export { AnimatedCTAButton } from "./animated-cta-button";
export { AIHeroConfig, CRMHeroConfig } from "./crm-content-config";

export type {
  AnimatedHeroHeaderProps,
  FloatingPathsProps,
  HeroContentProps,
  AnimationConfig,
  HeroContent,
} from "./types";

export {
  ANIMATION_CONFIG,
  DEFAULT_CONTENT,
  AI_CONTENT_OPTIONS,
  CRM_CONTENT_OPTIONS, // backward compatibility
} from "./constants";