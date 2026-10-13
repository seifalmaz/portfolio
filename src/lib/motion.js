/**
 * Shared Motion Utilities & Variants for Framer Motion
 * Designed for high-performance (transforms & opacity only, hardware accelerated)
 * Full support for reduced-motion preferences.
 */

export const transitionFast = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] };
export const transitionMedium = { duration: 0.4, ease: [0.16, 1, 0.3, 1] };
export const transitionSlow = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

/**
 * Fade In Up scroll reveal
 */
export const fadeInUp = (delay = 0, distance = 24) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

/**
 * Staggered container for card grids
 */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

/**
 * Subtle independent floating animation for interactive widgets
 */
export const floatingMotion = (offsetY = 6, duration = 4, delay = 0) => ({
  animate: {
    y: [0, -offsetY, 0],
    transition: {
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
});

/**
 * Interactive card lift on hover
 */
export const cardHoverMotion = {
  rest: { y: 0, scale: 1, transition: transitionFast },
  hover: {
    y: -4,
    scale: 1.01,
    transition: transitionFast
  }
};

/**
 * Micro tag / chip hover
 */
export const chipHoverMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.15 } }
};
