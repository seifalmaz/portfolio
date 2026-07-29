import { useState, useEffect } from "react";

/**
 * Custom hook to track active section on the homepage using IntersectionObserver.
 * @param {Array<string>} sectionIds List of section DOM IDs to observe
 * @returns {string} ID of the active section currently in view
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section top enters upper part of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
