import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaArrowDown, FaBrain, FaChartLine } from "react-icons/fa6";
import { personalData } from "../../data/personalData";
import { usePortfolio } from "../../context/PortfolioContext";

function HeroSection() {
  const { profile } = usePortfolio();
  const currentProfile = profile || personalData;

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const metricsRef = useRef(null);
  const ctaRef = useRef(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ---------------------------------------------------------------------------
  // Canvas: High-Performance Computational Data Geometry (60 FPS Optimized)
  // Low-overhead batched drawing, capped DPR, and mobile-aware particle counts.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // Cap DPR to 1.5 on desktop and 1.0 on mobile to prevent GPU fill-rate exhaustion
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    let width = (canvas.width = Math.floor(canvas.offsetWidth * dpr));
    let height = (canvas.height = Math.floor(canvas.offsetHeight * dpr));
    let cachedHeroHeight = section ? section.offsetHeight : window.innerHeight;

    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        const currentIsMobile = window.innerWidth < 768;
        const currentDpr = currentIsMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
        width = canvas.width = Math.floor(canvas.offsetWidth * currentDpr);
        height = canvas.height = Math.floor(canvas.offsetHeight * currentDpr);
        cachedHeroHeight = section ? section.offsetHeight : window.innerHeight;
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Streamlined particle count: 24 for desktop, 12 for mobile (previously 75)
    const pointCount = isMobile ? 12 : 24;
    const colors = ["#6E2638", "#9AA69A", "#F2E8D5"];

    const points = Array.from({ length: pointCount }, (_, idx) => ({
      x0: (Math.random() - 0.5) * width * 0.85 + width / 2,
      y0: (Math.random() - 0.5) * height * 0.85 + height / 2,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      driftSpeed: 0.003 + Math.random() * 0.004,
      driftAmp: 6 + Math.random() * 8,
      rad: Math.random() * 0.32 * Math.min(width, height) + 50 * dpr,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.005,
      size: (Math.random() * 1.6 + 1.2) * dpr,
      color: colors[idx % 3],
    }));

    // Pre-group points by color for batched rendering
    const pointsByColor = {
      "#6E2638": points.filter((p) => p.color === "#6E2638"),
      "#9AA69A": points.filter((p) => p.color === "#9AA69A"),
      "#F2E8D5": points.filter((p) => p.color === "#F2E8D5"),
    };

    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      scrollProgress = Math.min(Math.max(scrollY / cachedHeroHeight, 0), 1);
      if (scrollProgress >= 1) {
        if (isRunning) stopAnimation();
      } else if (!isRunning && isVisible && isTabActive) {
        startAnimation();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let tick = 0;
    let orbitAngle = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let isRunning = false;

    const render = () => {
      if (!isRunning) return;

      tick++;
      if (!prefersReducedMotion) {
        orbitAngle += 0.0028;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const progress = scrollProgress;
      const ellipseY = 0.58;

      // 1. Orbital Coordinate Tracks (Clean single path)
      const rInner = (130 + progress * 40) * dpr;
      const rOuter = (220 + progress * 70) * dpr;

      ctx.save();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(154, 166, 154, 0.12)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, rInner, rInner * ellipseY, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(154, 166, 154, 0.06)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, rOuter, rOuter * ellipseY, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 2. Trailing Arc
      if (!prefersReducedMotion) {
        ctx.strokeStyle = "rgba(110, 38, 56, 0.3)";
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rInner, rInner * ellipseY, 0, orbitAngle - 0.4, orbitAngle);
        ctx.stroke();
      }

      // 3. Central Primary Orbital Element
      const orbX1 = centerX + Math.cos(orbitAngle) * rInner;
      const orbY1 = centerY + Math.sin(orbitAngle) * rInner * ellipseY;

      // Core Burgundy orbital satellite
      ctx.fillStyle = "#6E2638";
      ctx.beginPath();
      ctx.arc(orbX1, orbY1, 3.8 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Warm Cream light pin
      ctx.fillStyle = "#FAF6EE";
      ctx.beginPath();
      ctx.arc(orbX1, orbY1, 1.6 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // 4. Secondary Counter-Orbital Satellite
      const orbitAngle2 = -orbitAngle * 0.65 + 1.8;
      const orbX2 = centerX + Math.cos(orbitAngle2) * rOuter;
      const orbY2 = centerY + Math.sin(orbitAngle2) * rOuter * ellipseY;

      ctx.fillStyle = "rgba(154, 166, 154, 0.75)";
      ctx.beginPath();
      ctx.arc(orbX2, orbY2, 2.4 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 5. Update Point Positions
      const driftFactor = prefersReducedMotion ? 0 : 1;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.angle += p.speed;

        const driftX = Math.sin(tick * p.driftSpeed + p.phaseX) * p.driftAmp * driftFactor;
        const driftY = Math.cos(tick * p.driftSpeed * 0.85 + p.phaseY) * (p.driftAmp * 0.75) * driftFactor;

        const targetX = centerX + Math.cos(p.angle) * p.rad;
        const targetY = centerY + Math.sin(p.angle) * p.rad * 0.65;

        p.currX = (p.x0 + driftX) * (1 - progress) + targetX * progress;
        p.currY = (p.y0 + driftY) * (1 - progress) + targetY * progress;
      }

      // 6. Desktop-Only Connection Lines (Completely skipped on mobile for 60 FPS guarantee)
      if (!isMobile && progress > 0.25) {
        ctx.strokeStyle = `rgba(154, 166, 154, ${progress * 0.25})`;
        ctx.lineWidth = 0.75 * dpr;
        ctx.beginPath();
        for (let i = 0; i < points.length; i += 2) {
          const next = points[(i + 1) % points.length];
          const dist = Math.hypot(points[i].currX - next.currX, points[i].currY - next.currY);
          if (dist < 120 * dpr) {
            ctx.moveTo(points[i].currX, points[i].currY);
            ctx.lineTo(next.currX, next.currY);
          }
        }
        ctx.stroke();
      }

      // 7. BATCHED Point Drawing: 3 Single GPU Draw Calls
      for (const color of colors) {
        const group = pointsByColor[color];
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let j = 0; j < group.length; j++) {
          const p = group[j];
          ctx.moveTo(p.currX + p.size, p.currY);
          ctx.arc(p.currX, p.currY, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!isRunning && isVisible && isTabActive) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };

    // IntersectionObserver to pause loop when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && scrollProgress < 1) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05, rootMargin: "-40px 0px" }
    );

    if (section) {
      observer.observe(section);
    }

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    startAnimation();

    return () => {
      stopAnimation();
      if (section) observer.unobserve(section);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [prefersReducedMotion]);

  // ---------------------------------------------------------------------------
  // Hero Entrance Sequence (Fast, Refined, Non-Blocking)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtext = subtextRef.current;
    const metrics = metricsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline) return;

    if (prefersReducedMotion) {
      gsap.set([headline, subtext, metrics, cta], { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(headline, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, delay: 0.08 })
        .fromTo(subtext, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35")
        .fromTo(metrics, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(cta, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.25");
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full bg-[#1C1A19] text-[#FAF6EE] overflow-hidden flex items-center justify-center pt-20 pb-16"
    >
      {/* Background Subtle Gradient & Canvas Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(110,38,56,0.18),transparent_65%),radial-gradient(ellipse_at_80%_80%,rgba(154,166,154,0.1),transparent_60%)] pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center lg:px-8"
      >
        {/* Top Professional Label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D2C7B6]/20 bg-[#292725] px-4 py-1.5 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9AA69A]">
            Data Science • Machine Learning • AI Engineering
          </span>
        </div>

        {/* Primary Stage 1: Massive Editorial Headline */}
        <div ref={headlineRef} className="will-change-transform max-w-5xl">
          <h1 className="text-6xl font-black tracking-tight text-[#FAF6EE] sm:text-8xl md:text-9xl lg:text-[10rem] uppercase leading-[0.88] select-none">
            Seif <span className="text-[#6E2638]">Almaz</span>
          </h1>

          <p className="mt-8 text-xl font-light text-[#F2E8D5] sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed">
            Turning data into intelligence. <br className="hidden sm:inline" />
            <span className="text-[#9AA69A] font-normal">
              Building solutions that matter.
            </span>
          </p>
        </div>

        {/* Stage 2: Technical Identity & Narrative Reveal */}
        <div ref={subtextRef} className="mt-8 max-w-3xl will-change-transform">
          <p className="text-sm sm:text-base text-[#9AA69A] leading-relaxed max-w-2xl mx-auto">
            Data Science &amp; AI Engineer specializing in machine learning, deep neural architectures,
            and executive data intelligence. Architecting verified models, end-to-end pipelines,
            and interactive analytics platforms that transform raw data into measurable operational value.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#F2E8D5]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D2C7B6]/20 bg-[#292725] px-3.5 py-1.5">
              <FaBrain className="text-[#6E2638]" />
              Machine Learning &amp; AI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D2C7B6]/20 bg-[#292725] px-3.5 py-1.5">
              <FaChartLine className="text-[#6E2638]" />
              Predictive Models &amp; BI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6E2638]/40 bg-[#6E2638]/20 px-3.5 py-1.5 text-[#FAF6EE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6E2638]" />
              Cairo, Egypt
            </span>
          </div>
        </div>

        {/* Stage 3: Real Portfolio Metrics & Statistics */}
        <div
          ref={metricsRef}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl w-full will-change-transform"
        >
          {(currentProfile.stats || personalData.stats).map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#D2C7B6]/15 bg-[#292725] p-4 text-center transition duration-200 hover:border-[#6E2638]/50 hover:bg-[#2e2c2a]"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#FAF6EE]">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] font-medium text-[#9AA69A] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stage 4: CTAs & Scroll Cue */}
        <div
          ref={ctaRef}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 will-change-transform"
        >
          <button
            onClick={() => scrollToSection("data-workflow")}
            className="inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638] px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF6EE] shadow-lg shadow-[#6E2638]/25 transition duration-200 hover:bg-[#451824] hover:border-[#451824]"
          >
            <span>The Data Workflow</span>
            <FaArrowDown className="h-3 w-3" />
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="inline-flex items-center gap-2 rounded-full border border-[#D2C7B6]/30 bg-[#FAF6EE]/10 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF6EE] transition duration-200 hover:bg-[#FAF6EE]/20 hover:border-[#FAF6EE]/50"
          >
            <span>Flagship Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
