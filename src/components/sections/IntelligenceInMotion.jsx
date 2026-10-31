import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa6";

const CAPABILITIES = [
  {
    id: "decision-support",
    number: "01",
    total: "06",
    pillLabel: "DECISION SUPPORT",
    shortLabel: "DECISION",
    title: "DECISION SUPPORT",
    tagline: "Transforming analytical depth into decisive clarity.",
    category: "Strategic Decision Systems",
    points: [
      "Synthesizing complex analytical outputs into intuitive decision frameworks.",
      "Multi-scenario simulation, trade-off evaluation, and sensitivity testing.",
      "Empowering stakeholders with evidence-backed decision confidence."
    ],
    accent: "#6E2638",
    graphic: "decision"
  },
  {
    id: "data-storytelling",
    number: "02",
    total: "06",
    pillLabel: "STORYTELLING",
    shortLabel: "STORY",
    title: "DATA STORYTELLING",
    tagline: "Narrating complex patterns through intuitive experience.",
    category: "Visual Communication & Narrative",
    points: [
      "Translating multidimensional data into compelling, structured narratives.",
      "Establishing visual hierarchy that surfaces key findings instantly.",
      "Contextualizing statistical anomalies into actionable business impact."
    ],
    accent: "#9AA69A",
    graphic: "storytelling"
  },
  {
    id: "strategic-interpretation",
    number: "03",
    total: "06",
    pillLabel: "STRATEGIC",
    shortLabel: "STRATEGY",
    title: "STRATEGIC INTERPRETATION",
    tagline: "Bridging algorithmic precision and real-world impact.",
    category: "Executive Strategy & Forecasting",
    points: [
      "Connecting quantitative machine learning metrics to strategic objectives.",
      "Identifying long-term market trends, operational risks, and structural shifts.",
      "Transforming historical evaluations into proactive strategic positioning."
    ],
    accent: "#6E2638",
    graphic: "strategic"
  },
  {
    id: "operational-intelligence",
    number: "04",
    total: "06",
    pillLabel: "OPERATIONAL",
    shortLabel: "OPS",
    title: "OPERATIONAL INTELLIGENCE",
    tagline: "Embedding insight directly into operational workflows.",
    category: "Real-Time Telemetry & Systems",
    points: [
      "Real-time event processing, anomaly triggers, and automated telemetry.",
      "Minimizing latency between pattern detection and operational action.",
      "Closed-loop feedback architectures ensuring continuous system adaptation."
    ],
    accent: "#FAF6EE",
    graphic: "operational"
  },
  {
    id: "insight-communication",
    number: "05",
    total: "06",
    pillLabel: "COMMUNICATION",
    shortLabel: "INSIGHT",
    title: "INSIGHT COMMUNICATION",
    tagline: "Presenting evidence with mathematical fidelity and visual grace.",
    category: "Stakeholder Alignment & Synthesis",
    points: [
      "Communicating advanced modeling conclusions to cross-functional leadership.",
      "Replacing metric clutter with elegant, focused executive interfaces.",
      "Fostering shared institutional understanding and empirical alignment."
    ],
    accent: "#9AA69A",
    graphic: "prismatic"
  },
  {
    id: "analytical-recommendations",
    number: "06",
    total: "06",
    pillLabel: "RECOMMENDATIONS",
    shortLabel: "ACTION",
    title: "ANALYTICAL RECOMMENDATIONS",
    tagline: "Prescriptive action rooted in validated empirical evidence.",
    category: "Prescriptive Modeling & Action",
    points: [
      "Generating prioritized, high-leverage roadmaps directly from validated models.",
      "Quantifying expected impact, resource trade-offs, and execution feasibility.",
      "Enabling continuous empirical optimization across complex organizational workflows."
    ],
    accent: "#6E2638",
    graphic: "recommendations"
  }
];

// =============================================================================
// ABSTRACT STRATEGIC VISUALIZATIONS (Vector SVG with Subtle Ambient Motion)
// =============================================================================

function AbstractDecisionGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      <defs>
        <radialGradient id="decisionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6E2638" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#6E2638" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6E2638" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Synthesis Concentric Coordinate Rings */}
      <circle cx="140" cy="140" r="110" fill="none" stroke="#D2C7B6" strokeOpacity="0.08" strokeDasharray="3 4" />
      <circle cx="140" cy="140" r="75" fill="none" stroke="#D2C7B6" strokeOpacity="0.15" />
      <circle cx="140" cy="140" r="45" fill="url(#decisionGlow)" stroke="#6E2638" strokeWidth="1.2" />

      {/* Decision Convergence Vectors */}
      <g stroke="#9AA69A" strokeOpacity="0.35" strokeWidth="1.2">
        <line x1="45" y1="55" x2="140" y2="140" />
        <line x1="235" y1="55" x2="140" y2="140" />
        <line x1="235" y1="225" x2="140" y2="140" />
        <line x1="45" y1="225" x2="140" y2="140" />
        <line x1="140" y1="35" x2="140" y2="140" strokeOpacity="0.2" strokeDasharray="2 2" />
        <line x1="140" y1="245" x2="140" y2="140" strokeOpacity="0.2" strokeDasharray="2 2" />
      </g>

      {/* Primary Decisive Flow Vectors */}
      <line x1="45" y1="55" x2="140" y2="140" stroke="#F2E8D5" strokeWidth="1.8" strokeOpacity="0.8" />
      <line x1="235" y1="225" x2="140" y2="140" stroke="#F2E8D5" strokeWidth="1.8" strokeOpacity="0.8" />

      {/* Input Factor Nodes */}
      <circle cx="45" cy="55" r="4.5" fill="#FAF6EE" />
      <circle cx="235" cy="55" r="4" fill="#9AA69A" />
      <circle cx="235" cy="225" r="4.5" fill="#FAF6EE" />
      <circle cx="45" cy="225" r="4" fill="#6E2638" stroke="#FAF6EE" strokeWidth="1" />

      {/* Central Illuminated Decision Core */}
      <circle cx="140" cy="140" r="11" fill="#292725" stroke="#FAF6EE" strokeWidth="2.5" />
      <circle cx="140" cy="140" r="5" fill="#6E2638" />

      {/* Outward Radiant Clarity Beacon */}
      {!prefersReducedMotion && (
        <circle cx="140" cy="140" r="30" fill="none" stroke="#FAF6EE" strokeOpacity="0.35">
          <animate attributeName="r" values="12;40;12" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function AbstractStorytellingGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      <defs>
        <linearGradient id="storyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9AA69A" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#6E2638" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Narrative Guide Grid Lines */}
      <g stroke="#D2C7B6" strokeOpacity="0.08" strokeWidth="1">
        <line x1="40" y1="70" x2="240" y2="70" />
        <line x1="40" y1="140" x2="240" y2="140" />
        <line x1="40" y1="210" x2="240" y2="210" />
      </g>

      {/* Harmonic Narrative Spline */}
      <path
        d="M 45,200 C 85,200 95,90 140,90 C 185,90 195,180 235,100"
        fill="none"
        stroke="url(#storyGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Supporting Context Shimmer */}
      <path
        d="M 45,210 C 85,210 95,105 140,105 C 185,105 195,195 235,115"
        fill="none"
        stroke="#6E2638"
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeDasharray="3 3"
      />

      {/* Chronological Narrative Waypoint Nodes */}
      <circle cx="45" cy="200" r="4.5" fill="#9AA69A" />
      <circle cx="95" cy="145" r="4" fill="#6E2638" stroke="#D2C7B6" strokeWidth="1" />
      <circle cx="140" cy="90" r="6" fill="#292725" stroke="#FAF6EE" strokeWidth="2" />
      <circle cx="140" cy="90" r="3" fill="#6E2638" />
      <circle cx="185" cy="135" r="4" fill="#9AA69A" />
      <circle cx="235" cy="100" r="5.5" fill="#FAF6EE" stroke="#6E2638" strokeWidth="1.5" />

      {/* Subtle Narrative Pulse Signal */}
      {!prefersReducedMotion && (
        <circle r="3" fill="#FAF6EE">
          <animateMotion
            path="M 45,200 C 85,200 95,90 140,90 C 185,90 195,180 235,100"
            dur="3.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}

function AbstractStrategicGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      {/* Strategic Horizon Coordinate Rays */}
      <g stroke="#D2C7B6" strokeOpacity="0.1" strokeWidth="1">
        <line x1="140" y1="140" x2="50" y2="50" />
        <line x1="140" y1="140" x2="230" y2="50" />
        <line x1="140" y1="140" x2="230" y2="230" />
        <line x1="140" y1="140" x2="50" y2="230" />
      </g>

      {/* Strategic Horizon Arc Sectors */}
      <path d="M 60,140 A 80,80 0 0,1 220,140" fill="none" stroke="#9AA69A" strokeOpacity="0.25" strokeDasharray="4 4" />
      <path d="M 40,140 A 100,100 0 0,1 240,140" fill="none" stroke="#6E2638" strokeOpacity="0.3" />
      <path d="M 20,140 A 120,120 0 0,1 260,140" fill="none" stroke="#D2C7B6" strokeOpacity="0.12" />

      {/* Primary Strategic Trajectory Vectors */}
      <g stroke="#F2E8D5" strokeWidth="2" strokeLinecap="round">
        <line x1="140" y1="140" x2="195" y2="75" stroke="#FAF6EE" />
        <line x1="140" y1="140" x2="85" y2="85" stroke="#6E2638" strokeWidth="1.8" />
      </g>

      {/* Horizon Target Nodes */}
      <circle cx="140" cy="140" r="6" fill="#292725" stroke="#FAF6EE" strokeWidth="2" />
      <circle cx="140" cy="140" r="3" fill="#6E2638" />

      <circle cx="85" cy="85" r="4.5" fill="#9AA69A" stroke="#292725" strokeWidth="1.2" />
      <circle cx="195" cy="75" r="6" fill="#FAF6EE" stroke="#6E2638" strokeWidth="2" />

      {/* Scanning Radar Sweep Effect */}
      {!prefersReducedMotion && (
        <circle cx="195" cy="75" r="14" fill="none" stroke="#FAF6EE" strokeOpacity="0.4">
          <animate attributeName="r" values="6;18;6" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function AbstractOperationalGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      {/* Closed-Loop Continuous Feedback Orbit */}
      <circle cx="140" cy="140" r="85" fill="none" stroke="#D2C7B6" strokeOpacity="0.15" strokeWidth="1.5" />
      <circle cx="140" cy="140" r="85" fill="none" stroke="#6E2638" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="30 45" />

      {/* Central Telemetry Engine Nexus */}
      <circle cx="140" cy="140" r="38" fill="rgba(110, 38, 56, 0.25)" stroke="#6E2638" strokeWidth="1.2" />
      <circle cx="140" cy="140" r="8" fill="#292725" stroke="#FAF6EE" strokeWidth="2" />
      <circle cx="140" cy="140" r="3.5" fill="#6E2638" />

      {/* 4 Synchronous Operational Pipeline Nodes */}
      <circle cx="140" cy="55" r="5.5" fill="#FAF6EE" stroke="#6E2638" strokeWidth="1.5" />
      <circle cx="225" cy="140" r="5" fill="#9AA69A" stroke="#292725" strokeWidth="1.2" />
      <circle cx="140" cy="225" r="5.5" fill="#F2E8D5" stroke="#6E2638" strokeWidth="1.5" />
      <circle cx="55" cy="140" r="5" fill="#6E2638" stroke="#FAF6EE" strokeWidth="1.2" />

      {/* Radial Telemetry Interconnects */}
      <g stroke="#9AA69A" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3">
        <line x1="140" y1="55" x2="140" y2="102" />
        <line x1="225" y1="140" x2="178" y2="140" />
        <line x1="140" y1="225" x2="140" y2="178" />
        <line x1="55" y1="140" x2="102" y2="140" />
      </g>

      {/* Continuous Orbital Flow Packet */}
      {!prefersReducedMotion && (
        <circle r="3.5" fill="#FAF6EE">
          <animateMotion
            path="M 140,55 A 85,85 0 1,1 139.9,55 Z"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}

function AbstractPrismaticGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      {/* Incoming Multi-Spectrum Analytical Waves */}
      <g stroke="#9AA69A" strokeOpacity="0.35" strokeWidth="1.2">
        <line x1="40" y1="80" x2="120" y2="130" />
        <line x1="40" y1="110" x2="120" y2="135" />
        <line x1="40" y1="140" x2="120" y2="140" stroke="#FAF6EE" strokeOpacity="0.6" strokeWidth="1.5" />
        <line x1="40" y1="170" x2="120" y2="145" />
        <line x1="40" y1="200" x2="120" y2="150" />
      </g>

      {/* Prismatic Focus Aperture */}
      <polygon
        points="120,105 160,140 120,175"
        fill="rgba(110, 38, 56, 0.4)"
        stroke="#FAF6EE"
        strokeWidth="1.5"
      />

      {/* Focused Coherent Communication Beam */}
      <line x1="160" y1="140" x2="245" y2="140" stroke="#FAF6EE" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="140" x2="245" y2="140" stroke="#6E2638" strokeWidth="7" strokeOpacity="0.3" strokeLinecap="round" />

      {/* Terminal Focus Node */}
      <circle cx="245" cy="140" r="7" fill="#292725" stroke="#FAF6EE" strokeWidth="2" />
      <circle cx="245" cy="140" r="3.5" fill="#6E2638" />

      {/* Communication Radiance */}
      {!prefersReducedMotion && (
        <circle cx="245" cy="140" r="16" fill="none" stroke="#FAF6EE" strokeOpacity="0.4">
          <animate attributeName="r" values="7;22;7" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function AbstractRecommendationsGraphic({ prefersReducedMotion }) {
  return (
    <svg viewBox="0 0 280 280" className="w-full h-full max-w-[280px] max-h-[280px] select-none" aria-hidden="true">
      {/* Root Evaluation Hub */}
      <circle cx="50" cy="140" r="7" fill="#292725" stroke="#9AA69A" strokeWidth="2" />
      <circle cx="50" cy="140" r="3.5" fill="#9AA69A" />

      {/* Branching Decision Paths */}
      <g stroke="#9AA69A" strokeOpacity="0.3" strokeWidth="1.2" fill="none">
        <path d="M 57,140 C 95,140 105,75 145,75 L 210,75" />
        <path d="M 57,140 C 95,140 105,205 145,205 L 210,205" />
      </g>

      {/* OPTIMAL RECOMMENDED PATHWAY (High-Leverage Trajectory) */}
      <path
        d="M 57,140 C 100,140 110,140 150,140 L 225,140"
        fill="none"
        stroke="#FAF6EE"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 57,140 C 100,140 110,140 150,140 L 225,140"
        fill="none"
        stroke="#6E2638"
        strokeWidth="6"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />

      {/* Alternative Candidate Nodes */}
      <circle cx="210" cy="75" r="4.5" fill="#9AA69A" />
      <circle cx="210" cy="205" r="4.5" fill="#9AA69A" />

      {/* Selected Action Beacon */}
      <circle cx="225" cy="140" r="9" fill="#292725" stroke="#FAF6EE" strokeWidth="2.2" />
      <circle cx="225" cy="140" r="4.5" fill="#6E2638" />

      {/* Prescriptive Success Pulse */}
      {!prefersReducedMotion && (
        <circle cx="225" cy="140" r="18" fill="none" stroke="#6E2638" strokeOpacity="0.5">
          <animate attributeName="r" values="9;24;9" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

// =============================================================================
// MASTER COMPONENT: STAGE 05 — INTELLIGENCE IN MOTION
// =============================================================================

export default function IntelligenceInMotion({ prefersReducedMotion = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const activeCap = CAPABILITIES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAPABILITIES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAPABILITIES.length) % CAPABILITIES.length);
    setProgress(0);
  }, []);

  const handleSelect = (idx) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Auto-cycle moving window (4.8s per capability)
  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const DURATION = 4800;
    const STEP = 50;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (STEP / DURATION) * 100;
        return next >= 100 ? 100 : next;
      });
    }, STEP);

    timerRef.current = setInterval(() => {
      handleNext();
    }, DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [handleNext, isPaused, prefersReducedMotion, currentIndex]);

  const renderGraphic = (graphicType) => {
    switch (graphicType) {
      case "decision":
        return <AbstractDecisionGraphic prefersReducedMotion={prefersReducedMotion} />;
      case "storytelling":
        return <AbstractStorytellingGraphic prefersReducedMotion={prefersReducedMotion} />;
      case "strategic":
        return <AbstractStrategicGraphic prefersReducedMotion={prefersReducedMotion} />;
      case "operational":
        return <AbstractOperationalGraphic prefersReducedMotion={prefersReducedMotion} />;
      case "prismatic":
        return <AbstractPrismaticGraphic prefersReducedMotion={prefersReducedMotion} />;
      case "recommendations":
        return <AbstractRecommendationsGraphic prefersReducedMotion={prefersReducedMotion} />;
      default:
        return <AbstractDecisionGraphic prefersReducedMotion={prefersReducedMotion} />;
    }
  };

  return (
    <div
      className="relative w-full rounded-2xl bg-[#141312]/60 border border-[#D2C7B6]/10 overflow-hidden my-2.5 shadow-2xl transition-all duration-300 select-none flex-1 flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-[#D2C7B6]/10 bg-[#1C1A19]/50">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-[#9AA69A] uppercase font-semibold">
            CAPABILITY {activeCap.number} / {activeCap.total}
          </span>
          <span className="hidden sm:inline-block text-[10px] text-[#D2C7B6]/30 font-mono">•</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#F2E8D5]/80">
            {activeCap.category}
          </span>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-1 rounded text-[#9AA69A] hover:text-[#FAF6EE] text-[10px] transition cursor-pointer"
            aria-label={isPaused ? "Play capability rotation" : "Pause capability rotation"}
            title={isPaused ? "Click to play" : "Click to pause"}
          >
            {isPaused ? <FaPlay className="w-2.5 h-2.5" /> : <FaPause className="w-2.5 h-2.5 opacity-60" />}
          </button>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-lg border border-[#D2C7B6]/15 bg-[#292725] text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30 transition cursor-pointer"
              aria-label="Previous capability"
            >
              <FaChevronLeft className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-lg border border-[#D2C7B6]/15 bg-[#292725] text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30 transition cursor-pointer"
              aria-label="Next capability"
            >
              <FaChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Moving Window Presentation */}
      <div className="p-4 sm:p-6 min-h-[310px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCap.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
          >
            {/* Left Aperture: Abstract Graphic */}
            <div className="md:col-span-5 flex items-center justify-center p-2 sm:p-3 rounded-xl bg-[#141312]/60 border border-[#D2C7B6]/10 relative">
              <div className="relative w-[190px] h-[190px] sm:w-[220px] sm:h-[220px] flex items-center justify-center">
                {renderGraphic(activeCap.graphic)}
              </div>
            </div>

            {/* Right Narrative: Capability Details */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-3">
              <div>
                <span className="inline-block text-[10px] font-mono font-bold tracking-[0.2em] text-[#6E2638] uppercase mb-1">
                  STRATEGIC CAPABILITY
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#FAF6EE] tracking-tight leading-tight">
                  {activeCap.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#F2E8D5] italic font-serif">
                  {activeCap.tagline}
                </p>
              </div>

              {/* Core Points */}
              <ul className="space-y-1.5 pt-1.5 border-t border-[#D2C7B6]/10 text-xs text-[#FAF6EE]/90">
                {activeCap.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 leading-relaxed">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6E2638] mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Selector & Dynamic Progress Bar */}
      <div className="px-2 sm:px-5 py-2.5 border-t border-[#D2C7B6]/10 bg-[#1C1A19]/50">
        <div className="grid grid-cols-6 gap-1 sm:gap-1.5 w-full">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={cap.id}
                data-capability-idx={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`w-full py-1.5 sm:py-2 px-0.5 sm:px-1 rounded-lg text-center transition cursor-pointer border flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 ${
                  isActive
                    ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] font-bold shadow-sm"
                    : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                }`}
              >
                <span className="font-mono text-[9px] sm:text-[10px] font-bold">{cap.number}</span>
                <span className="hidden md:inline font-mono text-[8px] lg:text-[9px] tracking-tight">{cap.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Timing Progress Bar */}
        {!prefersReducedMotion && (
          <div className="w-full h-0.5 bg-[#D2C7B6]/10 mt-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6E2638] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
