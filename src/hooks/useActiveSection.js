import { useState, useEffect } from "react";

/**
 * Custom hook to track the active section on the homepage with high precision and smoothness.
 * Accurately handles tall/short sections, bidirectional scrolling, window resize, and hash navigation.
 *
 * @param {Array<string>} sectionIds - Ordered list of section DOM IDs to observe
 * @param {number} offset - Pixel offset from the top of the viewport (navbar height + padding)
 * @returns {string} ID of the active section currently in view
 */
export function useActiveSection(sectionIds = [], offset = 140) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "hero");
  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split(",") : [];
    if (ids.length === 0) return;

    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // 1. If at the very top of the page, activate the first section
      if (scrollY < 80) {
        setActiveSection(ids[0]);
        ticking = false;
        return;
      }

      // 2. If scrolled near the very bottom of the page, activate the last section
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      if (scrollY + clientHeight >= scrollHeight - 50) {
        setActiveSection(ids[ids.length - 1]);
        ticking = false;
        return;
      }

      // 3. Scan backwards from bottom to top: find the lowest section whose top passed reading offset
      let currentActive = ids[0];
      for (let i = ids.length - 1; i >= 0; i--) {
        const id = ids[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Element header has scrolled past the reading line
          if (rect.top <= offset) {
            currentActive = id;
            break;
          }
        }
      }

      setActiveSection(prev => (prev !== currentActive ? currentActive : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Run on initial mount
    updateActiveSection();

    // Listen to scroll, resize, and hashchange with passive performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [sectionIdsKey, offset]); // Stable primitive dependency to avoid re-binding on new array references

  return activeSection;
}
