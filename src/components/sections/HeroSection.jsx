import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaArrowDown, FaBrain, FaChartLine } from "react-icons/fa6";
import { personalData } from "../../data/personalData";
import { usePortfolio } from "../../context/PortfolioContext";
import LivingDataUniverse from "../canvas/LivingDataUniverse";

function HeroSection() {
  const { profile } = usePortfolio();
  const currentProfile = profile || personalData;

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
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
      className="relative min-h-screen w-full bg-[#1C1A19] text-[#FAF6EE] overflow-hidden flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* Ambient Gradient Foundation */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(110,38,56,0.22),transparent_65%),radial-gradient(ellipse_at_80%_80%,rgba(154,166,154,0.12),transparent_60%)] pointer-events-none" />

      {/* Signature Visual Identity: The Living Data Universe */}
      <LivingDataUniverse prefersReducedMotion={prefersReducedMotion} />

      {/* Main Content Container with Natural Readability Backdrop */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Top Professional Label */}
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#D2C7B6]/20 bg-[#292725]/90 backdrop-blur-xs px-3 sm:px-4 py-1.5 shadow-sm max-w-full">
          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider sm:tracking-[0.25em] text-[#9AA69A] text-center truncate">
            Data Science • Machine Learning • AI Engineering
          </span>
        </div>

        {/* Primary Stage 1: Massive Editorial Headline */}
        <div ref={headlineRef} className="will-change-transform max-w-5xl">
          <h1 className="text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-[#FAF6EE] uppercase leading-[0.9] select-none drop-shadow-[0_4px_24px_rgba(28,26,25,0.7)]">
            Seif <span className="text-[#6E2638]">Almaz</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-lg sm:text-2xl md:text-3xl font-light text-[#F2E8D5] max-w-3xl mx-auto leading-snug sm:leading-relaxed drop-shadow-[0_2px_12px_rgba(28,26,25,0.8)]">
            Turning data into intelligence. <br className="hidden sm:inline" />
            <span className="text-[#9AA69A] font-normal">
              Building solutions that matter.
            </span>
          </p>
        </div>

        {/* Stage 2: Technical Identity & Narrative Reveal */}
        <div ref={subtextRef} className="mt-4 sm:mt-6 max-w-3xl will-change-transform">
          <p className="text-xs sm:text-base text-[#9AA69A] leading-relaxed max-w-2xl mx-auto font-light">
            Data Science &amp; AI Engineer specializing in machine learning, deep neural architectures,
            and executive data intelligence. Architecting verified models, end-to-end pipelines,
            and interactive analytics platforms that transform raw data into measurable operational value.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#F2E8D5]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D2C7B6]/20 bg-[#292725]/90 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-xs text-[11px] sm:text-xs">
              <FaBrain className="text-[#6E2638]" />
              Machine Learning &amp; AI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D2C7B6]/20 bg-[#292725]/90 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-xs text-[11px] sm:text-xs">
              <FaChartLine className="text-[#6E2638]" />
              Predictive Models &amp; BI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6E2638]/40 bg-[#6E2638]/25 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[#FAF6EE] text-[11px] sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6E2638]" />
              Cairo, Egypt
            </span>
          </div>
        </div>

        {/* Stage 3: Real Portfolio Metrics & Statistics */}
        <div
          ref={metricsRef}
          className="mt-6 sm:mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-4 max-w-3xl w-full will-change-transform"
        >
          {(currentProfile.stats || personalData.stats).map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#D2C7B6]/15 bg-[#292725]/90 backdrop-blur-xs p-3 sm:p-4 text-center transition duration-200 hover:border-[#6E2638]/50 hover:bg-[#2e2c2a]"
            >
              <div className="text-xl sm:text-3xl font-black text-[#FAF6EE]">
                {stat.value}
              </div>
              <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] font-medium text-[#9AA69A] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stage 4: CTAs & Scroll Cue */}
        <div
          ref={ctaRef}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 will-change-transform"
        >
          <button
            onClick={() => scrollToSection("data-workflow")}
            className="inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638] px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF6EE] shadow-lg shadow-[#6E2638]/25 transition duration-200 hover:bg-[#451824] hover:border-[#451824] cursor-pointer"
          >
            <span>The Data Workflow</span>
            <FaArrowDown className="h-3 w-3" />
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="inline-flex items-center gap-2 rounded-full border border-[#D2C7B6]/30 bg-[#FAF6EE]/10 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF6EE] transition duration-200 hover:bg-[#FAF6EE]/20 hover:border-[#FAF6EE]/50 cursor-pointer"
          >
            <span>Flagship Projects</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
