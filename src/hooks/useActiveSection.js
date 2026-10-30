import { useState, useEffect } from "react";

/**
 * Ultra-high-performance active section tracker.
 * Uses native IntersectionObserver off the main thread with ZERO forced synchronous layout reflows.
 * Completely eliminates getBoundingClientRect() polling during scroll events.
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
    if (ids.length === 0 || typeof window === "undefined") return;

    // Native IntersectionObserver: runs in browser compositing engine without layout recalculation
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Find the visible section with highest intersection ratio
        if (visibleSections.size > 0) {
          let bestId = null;
          let bestRatio = -1;
          for (const [id, ratio] of visibleSections.entries()) {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = id;
            }
          }
          if (bestId) {
            setActiveSection((prev) => (prev !== bestId ? bestId : prev));
          }
        }
      },
      {
        rootMargin: `-${offset}px 0px -25% 0px`,
        threshold: [0.1, 0.3, 0.6],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [sectionIdsKey, offset]);

  return activeSection;
}

export default useActiveSection;
