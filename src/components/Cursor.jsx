import { useEffect, useRef, useState } from "react";

/**
 * Ultra-high-performance custom cursor.
 * Uses requestAnimationFrame and direct DOM transforms via refs to achieve 60-120 FPS
 * with ZERO React component re-renders on mousemove.
 */
function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const containerRef = useRef(null);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return (
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches
    );
  });

  useEffect(() => {
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;
    let rafId = null;

    const render = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;

      const ringOffset = isHovering ? 28 : 16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - ringOffset}px, ${ringY - ringOffset}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
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
              ringRef.current.classList.add("h-14", "w-14", "border-blue-400");
              ringRef.current.classList.remove("h-8", "w-8");
            } else {
              ringRef.current.classList.remove("h-14", "w-14", "border-blue-400");
              ringRef.current.classList.add("h-8", "w-8");
            }
          }
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
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-0 transition-opacity duration-150"
      aria-hidden="true"
    >
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 rounded-full border border-blue-400/50 transition-[width,height,border-color] duration-150 ease-out h-8 w-8 will-change-transform"
      />

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-transform"
      />
    </div>
  );
}

export default Cursor;