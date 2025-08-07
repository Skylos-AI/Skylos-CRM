import { useEffect, useState } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Respects the prefers-reduced-motion CSS media query
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}