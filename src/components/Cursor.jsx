import { useEffect, useRef, useState } from "react";

/**
 * Ultra-lightweight custom cursor for desktop (60-120 FPS).
 * Completely disabled on mobile, tablet, and touch screens (<1024px or coarse pointers).
 * Uses rAF lerping and idles automatically when stationary with ZERO React rerenders.
 */
function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const containerRef = useRef(null);

  const [isDisabled] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return isTouch || isSmall || prefersReducedMotion;
  });

  useEffect(() => {
    if (isDisabled) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let isRunning = false;
    let rafId = null;

    const startLoop = () => {
      if (isRunning || document.hidden) return;
      isRunning = true;
      rafId = requestAnimationFrame(render);
    };

    const render = () => {
      if (!isRunning) return;

      const dx = mouseX - ringX;
      const dy = mouseY - ringY;

      ringX += dx * 0.32;
      ringY += dy * 0.32;

      const scale = isHovering ? 1.6 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Idle sleep: if distance converged and mouse is stationary, pause rAF
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${scale})`;
        }
        isRunning = false;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && containerRef.current) {
        isVisible = true;
        containerRef.current.style.opacity = "1";
      }

      // Lightweight hover detection without deep recursive closest()
      const targetTag = e.target?.tagName;
      const shouldHover =
        targetTag === "BUTTON" ||
        targetTag === "A" ||
        targetTag === "SELECT" ||
        Boolean(e.target?.closest && e.target.closest("button, a, [role='button']"));

      if (shouldHover !== isHovering) {
        isHovering = shouldHover;
        if (ringRef.current) {
          if (isHovering) {
            ringRef.current.classList.add("border-[#6E2638]", "bg-[#6E2638]/15");
            ringRef.current.classList.remove("border-[#9AA69A]/60");
          } else {
            ringRef.current.classList.remove("border-[#6E2638]", "bg-[#6E2638]/15");
            ringRef.current.classList.add("border-[#9AA69A]/60");
          }
        }
      }

      startLoop();
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
      isVisible = false;
    };

    const handleMouseEnter = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
      isVisible = true;
      startLoop();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDisabled]);

  if (isDisabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-200"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 h-8 w-8 rounded-full border border-[#9AA69A]/60 transition-colors duration-200 will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 h-2 w-2 rounded-full bg-[#6E2638] will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </div>
  );
}

export default Cursor;
