import { useEffect, useLayoutEffect } from 'react';

// Use useLayoutEffect in the browser, useEffect for SSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * A robust hook to lock the body scroll when a modal is open.
 * Features:
 * - Prevents background scrolling across all browsers (including iOS Safari).
 * - Compensates for scrollbar width to prevent layout shift (jank).
 * - Preserves the exact scroll position when the modal is closed.
 * - Restores scrolling instantly, bypassing CSS smooth scrolling rules.
 */
export function useScrollLock(isLocked: boolean) {
  useIsomorphicLayoutEffect(() => {
    if (!isLocked || typeof window === 'undefined') return;

    // Get original inline styles to restore later
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;
    const originalWidth = document.body.style.width;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalOverflow = document.body.style.overflow;
    
    // Save current smooth scroll behavior to bypass it
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;

    // Calculate the width of the scrollbar to prevent horizontal layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollY = window.scrollY;

    // Lock body in a fixed position at the exact negative scroll offset
    // This absolutely defeats background scrolling even on iOS devices
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore all original body styles
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.left = originalLeft;
      document.body.style.right = originalRight;
      document.body.style.width = originalWidth;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.overflow = originalOverflow;

      // Temporarily disable smooth scrolling to restore position instantly
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Restore exact scroll position
      window.scrollTo(0, scrollY);
      
      // Re-enable smooth scrolling if it was present
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [isLocked]);
}
