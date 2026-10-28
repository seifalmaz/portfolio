import { useEffect, useRef, useState } from "react";

/**
 * Ultra-high-performance custom cursor styled with Sage, Cream & Burgundy palette.
 * Uses requestAnimationFrame and direct DOM transforms via refs to achieve 60-120 FPS
 * with ZERO React component re-renders on mousemove.
 * Idles automatically when the mouse is stationary, avoiding CPU/GPU waste.
 */
function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const containerRef = useRef(null);
  const [isDisabled] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return isTouch || prefersReducedMotion;
  });

  useEffect(() => {
    if (isDisabled) return;

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

      // Smooth lerp for outer ring
      ringX += dx * 0.28;
      ringY += dy * 0.28;

      const scale = isHovering ? 1.75 : 1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Idle sleep: if distance converged and mouse is stationary, pause rAF
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
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

      startLoop();
    };

    const handleMouseOver = (e) => {
      if (e.target && typeof e.target.closest === "function") {
        const target = e.target.closest(
          "button, a, select, [role='button'], .cursor-pointer, input[type='checkbox'], input[type='submit']"
        );
        const shouldHover = Boolean(target);
        if (shouldHover !== isHovering) {
          isHovering = shouldHover;
          if (ringRef.current) {
            if (isHovering) {
              ringRef.current.classList.add("border-[#6E2638]", "bg-[#6E2638]/10");
              ringRef.current.classList.remove("border-[#9AA69A]/60");
            } else {
              ringRef.current.classList.remove("border-[#6E2638]", "bg-[#6E2638]/10");
              ringRef.current.classList.add("border-[#9AA69A]/60");
            }
          }
          startLoop();
        }
      }
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
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
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
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-150"
      aria-hidden="true"
    >
      {/* Outer Ring - 32px diameter, transformed and scaled via GPU without layout reflow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 h-8 w-8 rounded-full border border-[#9AA69A]/60 transition-[border-color,background-color] duration-150 ease-out will-change-transform"
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 h-2 w-2 rounded-full bg-[#6E2638] shadow-[0_0_8px_rgba(110,38,56,0.6)] will-change-transform"
      />
    </div>
  );
}

export default Cursor;