import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "sa_intro_shown";

/**
 * InitialPreloader:
 * Classy, minimal, brand-aligned loading screen.
 * Prepares critical fonts and above-the-fold visual assets in the background,
 * then smoothly fades away to reveal the portfolio without artificial delay.
 */
function InitialPreloader() {
  const [shouldShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!shouldShow) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Safe fallback
      }
      setIsReady(true);
      return;
    }

    // Lock body scroll temporarily while loading screen is visible
    document.body.style.overflow = "hidden";

    let isCancelled = false;

    // Resource preparation strategy:
    // 1. Critical fonts readiness
    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    // 2. Critical visual asset preloading (About portrait webp)
    const heroImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = "/about-profile.webp";
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false); // Graceful fallback, never block
    });

    // 3. Safety maximum timeout: ensures preloader never hangs indefinitely
    const safetyTimeout = new Promise((resolve) => setTimeout(resolve, 850));

    // Wait for critical resources or timeout (whichever arrives first)
    Promise.race([
      Promise.all([fontsPromise, heroImagePromise]),
      safetyTimeout,
    ]).then(() => {
      if (isCancelled) return;
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Ignore storage errors in restricted contexts
      }
      setIsReady(true);
    });

    return () => {
      isCancelled = true;
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  // Clean up body overflow when loader finishes
  useEffect(() => {
    if (isReady) {
      document.body.style.overflow = "";
    }
  }, [isReady]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="initial-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C1A19] text-[#FAF6EE] select-none"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(110,38,56,0.18),transparent_70%)] pointer-events-none" />

          {/* Centered Brand Presentation */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Monogram & Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-3 mb-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E2638] text-xs font-bold text-[#FAF6EE] shadow-md shadow-[#6E2638]/30">
                SA
              </span>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#FAF6EE]">
                Seif Almaz<span className="text-[#6E2638]">.</span>
              </span>
            </motion.div>

            {/* Subtitle / Domain Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#9AA69A]"
            >
              Data Science &amp; AI Engineering
            </motion.p>

            {/* Understated Burgundy Loading Indicator Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-[#FAF6EE]/10 relative"
            >
              <motion.div
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#6E2638] to-[#FAF6EE]"
                animate={{
                  x: ["-100%", "250%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialPreloader;
