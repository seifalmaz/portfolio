import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Universal Scroll & Hash Navigation Manager:
 * Handles route changes, section anchor scrolling, and browser history (popstate)
 * reliably across React Router, AnimatePresence page transitions, and direct URL entry.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Case 1: Route without hash -> scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Case 2: Hash anchor navigation (#skills, #experience, #about, #contact, #education)
    const targetId = hash.replace(/^#/, "");
    if (!targetId || targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 60; // 60 * 25ms = 1500ms max polling window for page transitions

    const tryScroll = () => {
      if (cancelled) return;

      const element = document.getElementById(targetId);
      const isBodyUnlocked = document.body.style.overflow !== "hidden";

      if (element && isBodyUnlocked) {
        element.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 25);
      }
    };

    tryScroll();

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
