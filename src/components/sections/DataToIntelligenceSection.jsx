import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaDatabase, 
  FaFilter, 
  FaChartLine, 
  FaBrain, 
  FaCircleCheck,
  FaCheck,
  FaArrowRight,
  FaSliders,
  FaTrainSubway,
  FaRecycle,
  FaMusic
} from "react-icons/fa6";

const STAGES = [
  {
    step: "01",
    name: "RAW DATA",
    icon: FaDatabase,
    badge: "Unstructured Ingestion • High Entropy • Raw Logs",
    description:
      "Every data solution begins with noisy, heterogeneous inputs: railway transaction logs, audio acoustic features, multi-category municipal waste streams, and real-time webcam frames.",
    tech: ["Raw CSV/JSON", "SQL Logs", "Image Corpora", "Streaming Telemetry"],
    canvasLabel: "Illustrative Simulation: Raw Unstructured Ingestion"
  },
  {
    step: "02",
    name: "DATA ENGINEERING",
    icon: FaFilter,
    badge: "Medallion Architecture • Star Schema • Cleansing",
    description:
      "Structuring raw data into reliable analytics warehouses. Implementing Bronze staging, Silver validation, and Gold dimensional models with surrogate keys and role-playing dimensions.",
    tech: ["Oracle SQL", "Informatica ETL", "Python Automation", "Pandas & NumPy"],
    canvasLabel: "Enterprise Medallion Ingestion Pipeline (Bronze → Silver → Gold)"
  },
  {
    step: "03",
    name: "ANALYSIS & BI",
    icon: FaChartLine,
    badge: "Statistical Modeling • Cohort Retention • DAX Metrics",
    description:
      "Extracting statistical patterns, distributions, and correlation matrices. Designing executive Power BI and Plotly dashboards that surface delay root-causes and acoustic popularity trends.",
    tech: ["Power BI", "DAX Measures", "Plotly & Dash", "Statistical Inference"],
    canvasLabel: "DAX Statistical Variance & Executive Dashboard Metrics"
  },
  {
    step: "04",
    name: "MACHINE LEARNING",
    icon: FaBrain,
    badge: "Vision Transformers • Transfer Learning • Explainable AI",
    description:
      "Formulating predictive and computer-vision architectures. Benchmarking CNN backbones (ResNet, EfficientNet) and Vision Transformers (ViT) with attention rollout heatmaps.",
    tech: ["PyTorch", "OpenCV", "ViT Rollout", "Scikit-Learn"],
    canvasLabel: "Multi-Class Decision Boundary & Attention Rollout Map"
  },
  {
    step: "05",
    name: "ACTIONABLE INSIGHT",
    icon: FaCircleCheck,
    badge: "Verified Findings • Documented Portfolio Deliverables",
    description:
      "Deploying verified models and validated analytics into recruiter-ready case studies with documented performance metrics, confusion matrices, and reproducible code.",
    tech: ["Documented Metrics", "Production Pipelines", "Case Study Blueprints"],
    canvasLabel: "Decision-Ready Synthesis: Multi-Domain Portfolio Outcomes"
  }
];

// Documented findings from Seif's genuine portfolio projects for Stage 5
const VERIFIED_INSIGHTS = [
  {
    id: "waste-classifier",
    domain: "Computer Vision",
    icon: FaRecycle,
    title: "Waste Classifier (ViT & CNN)",
    finding: "Self-attention rollout maps accurately isolate boundary contours on transparent plastics and thin metals where standard CNNs experienced feature decay.",
    deliverable: "96.4% test accuracy with sub-30ms real-time inference pipeline.",
    tag: "PyTorch • ViT-B/16"
  },
  {
    id: "railway-analytics",
    domain: "Enterprise Analytics",
    icon: FaTrainSubway,
    title: "UK Railway Analytics (Power BI)",
    finding: "Star Schema dimensional drill-down proved 1,062 delay incidents (5.34%) were concentrated in signal routing bottlenecks rather than mechanical breakdowns.",
    deliverable: "£741.92K ticket revenue reconciled across 31,653 passenger journeys.",
    tag: "Oracle SQL • Star Schema"
  },
  {
    id: "spotify-analytics",
    domain: "Exploratory Analytics",
    icon: FaMusic,
    title: "Spotify Analytics (Dash & Plotly)",
    finding: "Multi-region acoustic correlation proved danceability & valence dictate playlist longevity, validating statistical shrinkage over raw averages.",
    deliverable: "114,000+ tracks segmented across acoustic distributions with zero synthetic data.",
    tag: "Python • Dash & Plotly"
  }
];

function DataToIntelligenceSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [selectedInsightIdx, setSelectedInsightIdx] = useState(0);
  const activeStageRef = useRef(0);

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  // ---------------------------------------------------------------------------
  // Canvas Visualization: Stage-Driven Interactive Simulation
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    let resizeTimeout = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
        height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes for visualization
    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      size: Math.random() * 2.8 + 1.6,
      cat: Math.floor(Math.random() * 3) // 0: Metal, 1: Organic, 2: Glass/Plastic
    }));

    let tick = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;
    let isRunning = false;

    const render = () => {
      if (!isRunning) return;

      tick++;
      ctx.clearRect(0, 0, width, height);

      const stageIndex = activeStageRef.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const dpr = window.devicePixelRatio || 1;

      // =======================================================================
      // STAGE 0: RAW DATA (Dispersed chaotic points with streaming packets)
      // =======================================================================
      if (stageIndex === 0) {
        // Draw chaotic connection lines
        ctx.strokeStyle = "rgba(154, 166, 154, 0.12)";
        ctx.lineWidth = 1 * dpr;
        for (let i = 0; i < nodes.length; i += 3) {
          const next = nodes[(i + 1) % nodes.length];
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(next.x, next.y);
          ctx.stroke();
        }

        // Render floating stochastic particles
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 10) n.vx = Math.abs(n.vx);
          if (n.x > width - 10) n.vx = -Math.abs(n.vx);
          if (n.y < 10) n.vy = Math.abs(n.vy);
          if (n.y > height - 10) n.vy = -Math.abs(n.vy);

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = n.cat === 0 ? "#6E2638" : n.cat === 1 ? "#9AA69A" : "#F2E8D5";
          ctx.fill();
        });

        // Floating raw telemetry packet indicators
        ctx.font = `${10 * dpr}px monospace`;
        ctx.fillStyle = "rgba(242, 232, 213, 0.4)";
        const yOffset1 = (centerY - 60 + Math.sin(tick * 0.02) * 12);
        const yOffset2 = (centerY + 60 + Math.cos(tick * 0.02) * 12);
        ctx.fillText("{ ingest: 'railway_journey_logs', rows: 31653 }", width * 0.12, yOffset1);
        ctx.fillText("{ stream: 'spotify_audio_features', samples: 114000 }", width * 0.15, yOffset2);
      }

      // =======================================================================
      // STAGE 1: DATA ENGINEERING (Medallion Architecture: Bronze -> Silver -> Gold)
      // =======================================================================
      else if (stageIndex === 1) {
        const laneCount = 3;
        const laneHeight = height / (laneCount + 1);
        const layerNames = ["BRONZE (Staging Logs)", "SILVER (Cleaned & Validated)", "GOLD (Star Schema Mart)"];
        const layerColors = ["#9AA69A", "#F2E8D5", "#6E2638"];

        for (let l = 0; l < laneCount; l++) {
          const yPos = (l + 1) * laneHeight;

          // Pipeline conduit
          ctx.strokeStyle = "rgba(210, 199, 182, 0.22)";
          ctx.lineWidth = 2 * dpr;
          ctx.beginPath();
          ctx.moveTo(width * 0.08, yPos);
          ctx.lineTo(width * 0.92, yPos);
          ctx.stroke();

          // Stage label
          ctx.font = `bold ${10 * dpr}px sans-serif`;
          ctx.fillStyle = layerColors[l];
          ctx.fillText(layerNames[l], width * 0.08, yPos - 12 * dpr);

          // Moving validated data packets
          for (let p = 0; p < 4; p++) {
            const speed = 0.06 * (l + 1);
            const packetX = ((tick * speed * 20 + p * (width * 0.22)) % (width * 0.84)) + width * 0.08;
            ctx.fillStyle = layerColors[l];
            ctx.beginPath();
            ctx.arc(packetX, yPos, (4.5 + l * 0.8) * dpr, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Schema Dimension Nodes on Gold layer
        const dimY = 3 * laneHeight;
        const dimNames = ["Dim_Date", "Dim_Station", "Fact_Journey"];
        dimNames.forEach((name, i) => {
          const x = width * 0.35 + i * (width * 0.22);
          ctx.strokeStyle = "rgba(110, 38, 56, 0.6)";
          ctx.lineWidth = 1 * dpr;
          ctx.fillStyle = "rgba(33, 31, 30, 0.9)";
          ctx.fillRect(x - 36 * dpr, dimY + 8 * dpr, 72 * dpr, 20 * dpr);
          ctx.strokeRect(x - 36 * dpr, dimY + 8 * dpr, 72 * dpr, 20 * dpr);

          ctx.fillStyle = "#FAF6EE";
          ctx.font = `${9 * dpr}px monospace`;
          ctx.textAlign = "center";
          ctx.fillText(name, x, dimY + 22 * dpr);
          ctx.textAlign = "left";
        });
      }

      // =======================================================================
      // STAGE 2: ANALYSIS & BI (Statistical Distribution & KPI Curves)
      // =======================================================================
      else if (stageIndex === 2) {
        const barCount = 14;
        const barWidth = (width * 0.7) / barCount;
        const startX = width * 0.15;
        const baseY = height * 0.78;

        // Cohort frequency bars
        for (let b = 0; b < barCount; b++) {
          const harmonic = Math.sin(b * 0.45 + tick * 0.02) * 0.35 + 0.55;
          const barHeight = harmonic * height * 0.48;
          const x = startX + b * barWidth;
          const y = baseY - barHeight;

          ctx.fillStyle = b % 3 === 0 ? "rgba(110, 38, 56, 0.85)" : b % 2 === 0 ? "rgba(154, 166, 154, 0.45)" : "rgba(242, 232, 213, 0.35)";
          ctx.fillRect(x + 3 * dpr, y, barWidth - 6 * dpr, barHeight);
        }

        // Fitted normal trendline
        ctx.strokeStyle = "#FAF6EE";
        ctx.lineWidth = 2.5 * dpr;
        ctx.beginPath();
        for (let b = 0; b < barCount; b++) {
          const harmonic = Math.sin(b * 0.45 + tick * 0.02) * 0.35 + 0.55;
          const x = startX + b * barWidth + barWidth / 2;
          const y = baseY - harmonic * height * 0.48;
          if (b === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Baseline axis
        ctx.strokeStyle = "rgba(154, 166, 154, 0.35)";
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(startX, baseY);
        ctx.lineTo(startX + barCount * barWidth, baseY);
        ctx.stroke();

        // KPI Overlay
        ctx.font = `bold ${10 * dpr}px sans-serif`;
        ctx.fillStyle = "#FAF6EE";
        ctx.fillText("Punctuality Baseline: 90.68%", startX, height * 0.2);
        ctx.fillStyle = "#9AA69A";
        ctx.fillText("Signal Delay Cluster: 5.34% Root Cause", startX, height * 0.26);
      }

      // =======================================================================
      // STAGE 3: MACHINE LEARNING (Multi-Class Decision Boundary & Attention)
      // =======================================================================
      else if (stageIndex === 3) {
        // Non-linear decision boundary
        ctx.strokeStyle = "rgba(110, 38, 56, 0.85)";
        ctx.lineWidth = 2 * dpr;
        ctx.setLineDash([6 * dpr, 6 * dpr]);
        ctx.beginPath();
        for (let x = width * 0.12; x < width * 0.88; x += 10 * dpr) {
          const y = centerY + Math.sin(x * 0.008 + tick * 0.015) * 60 * dpr;
          if (x === width * 0.12) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Clustered classification feature embeddings
        nodes.forEach((n, idx) => {
          const clusterOffset = n.cat === 0 ? -70 * dpr : n.cat === 1 ? 70 * dpr : 0;
          const targetY = centerY + clusterOffset + Math.cos(idx + tick * 0.02) * 24 * dpr;
          const targetX = centerX + (idx - 21) * 14 * dpr;

          ctx.fillStyle = n.cat === 0 ? "#6E2638" : n.cat === 1 ? "#9AA69A" : "#F2E8D5";
          ctx.beginPath();
          ctx.arc(targetX, targetY, 4 * dpr, 0, Math.PI * 2);
          ctx.fill();
        });

        // Corner Model Evaluation HUD
        ctx.font = `bold ${10 * dpr}px monospace`;
        ctx.fillStyle = "#FAF6EE";
        ctx.fillText("ViT-B/16 Accuracy: 96.4%", width * 0.12, height * 0.2);
        ctx.fillStyle = "#9AA69A";
        ctx.fillText("Inference Latency: 28.4ms (CUDA)", width * 0.12, height * 0.26);
      }

      // =======================================================================
      // STAGE 4: ACTIONABLE INSIGHT (Multi-Domain Radar & Production Synthesis)
      // =======================================================================
      else {
        // Multi-axial synthesis geometry
        const axisCount = 6;
        const maxRadius = Math.min(width, height) * 0.36;

        ctx.strokeStyle = "rgba(154, 166, 154, 0.16)";
        ctx.lineWidth = 1 * dpr;

        // Concentric radar polygons
        for (let level = 1; level <= 3; level++) {
          const r = (maxRadius / 3) * level;
          ctx.beginPath();
          for (let a = 0; a < axisCount; a++) {
            const angle = (Math.PI * 2 * a) / axisCount;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Radar axes
        for (let a = 0; a < axisCount; a++) {
          const angle = (Math.PI * 2 * a) / axisCount;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
          ctx.stroke();
        }

        // Active Synthesis Envelope (Live pulsating polygon)
        const pulse = Math.sin(tick * 0.02) * 0.08 + 0.92;
        ctx.strokeStyle = "#6E2638";
        ctx.fillStyle = "rgba(110, 38, 56, 0.24)";
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        const weights = [0.92, 0.85, 0.95, 0.88, 0.94, 0.89];
        for (let a = 0; a < axisCount; a++) {
          const angle = (Math.PI * 2 * a) / axisCount;
          const r = maxRadius * weights[a] * pulse;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Central core
        ctx.fillStyle = "#6E2638";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6 * dpr, 0, Math.PI * 2);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
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
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  const curr = STAGES[activeStage] || STAGES[0];
  const IconComponent = curr.icon;

  return (
    <section
      ref={sectionRef}
      id="data-workflow"
      className="relative w-full bg-[#292725] text-[#FAF6EE] overflow-hidden py-24 sm:py-32 border-t border-[#D2C7B6]/15"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9AA69A] mb-3">
            The Analytical Architecture
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FAF6EE]">
            From Raw Entropy to <span className="text-[#6E2638]">Actionable Intelligence</span>
          </h2>
          <p className="mt-3 text-sm text-[#9AA69A]">
            Select any stage below to inspect the engineering methodology, data flows, and analytical deliverables.
          </p>
        </div>

        {/* Stage Timeline Navigation Tabs (Button-Controlled) */}
        <div
          role="tablist"
          aria-label="Analytical Architecture Stages"
          className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-3 max-w-full relative z-20"
        >
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={s.step}
                type="button"
                role="tab"
                id={`stage-tab-${idx}`}
                aria-selected={isActive}
                aria-controls={`stage-panel-${idx}`}
                tabIndex={0}
                onClick={() => setActiveStage(idx)}
                className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs font-semibold transition-all duration-200 border cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E2638] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A19] relative z-20 ${
                  isActive
                    ? "border-[#6E2638] bg-[#6E2638] text-[#FAF6EE] shadow-lg shadow-[#6E2638]/30 scale-[1.02]"
                    : "border-[#D2C7B6]/20 bg-[#1C1A19]/60 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/40"
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{s.step}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Presentation Grid */}
        <div 
          id={`stage-panel-${activeStage}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeStage}`}
          className="grid gap-8 lg:grid-cols-12 items-stretch"
        >
          {/* Left Column: Stage-Specific Visual Simulation */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] rounded-3xl border border-[#D2C7B6]/15 bg-[#1C1A19]/90 overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col justify-between">
            {/* Top Simulation Header */}
            <div className="flex items-center justify-between text-xs text-[#9AA69A] border-b border-[#D2C7B6]/10 pb-3 relative z-10">
              <span className="font-mono font-semibold text-[#6E2638]">
                STAGE {curr.step} / 05 • {curr.name}
              </span>
              <span className="uppercase tracking-widest text-[10px] hidden sm:inline">
                Interactive Engineering Simulation
              </span>
            </div>

            {/* Dynamic Stage Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 h-full w-full pointer-events-none"
            />

            {/* Stage 5 Overlay: Verified Case-Study Insights Matrix */}
            {activeStage === 4 && (
              <div className="relative z-10 mt-auto pt-4">
                <div className="rounded-2xl border border-[#D2C7B6]/20 bg-[#292725]/90 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3 border-b border-[#D2C7B6]/10 pb-2">
                    <span className="text-xs font-bold text-[#FAF6EE] uppercase tracking-wider flex items-center gap-1.5">
                      <FaCircleCheck className="text-[#6E2638]" />
                      Documented Portfolio Deliverables
                    </span>
                    <span className="text-[10px] font-mono text-[#9AA69A]">Verified Real Outcomes</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {VERIFIED_INSIGHTS.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedInsightIdx(idx)}
                        className={`text-left p-2.5 rounded-xl border transition cursor-pointer ${
                          selectedInsightIdx === idx
                            ? "border-[#6E2638] bg-[#6E2638]/20 shadow-sm"
                            : "border-[#D2C7B6]/10 bg-[#1C1A19]/50 hover:border-[#D2C7B6]/30"
                        }`}
                      >
                        <div className="text-[11px] font-bold text-[#FAF6EE] truncate mb-1">
                          {item.title.split("(")[0]}
                        </div>
                        <div className="text-[10px] text-[#9AA69A] line-clamp-2 leading-relaxed">
                          {item.deliverable}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Active Selected Insight Detail */}
                  <div className="mt-3 p-3 rounded-xl bg-[#1C1A19]/70 border border-[#D2C7B6]/10 text-xs">
                    <span className="text-[#6E2638] font-bold mr-1">Finding:</span>
                    <span className="text-[#FAF6EE]/90">
                      {VERIFIED_INSIGHTS[selectedInsightIdx].finding}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Status Overlay (Stages 0-3) */}
            {activeStage !== 4 && (
              <div className="relative z-10 flex items-center justify-between bg-[#292725]/85 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-[#D2C7B6]/10 text-xs mt-auto">
                <span className="text-[#9AA69A] font-medium hidden sm:inline">Active State:</span>
                <span className="font-semibold text-[#FAF6EE] text-[11px] sm:text-xs">{curr.badge}</span>
              </div>
            )}
          </div>

          {/* Right Column: Editorial Explanation & Technical Deep Dive */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={curr.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6E2638]/20 border border-[#6E2638]/40 text-[#FAF6EE] shadow-sm">
                    <IconComponent className="h-5 w-5 text-[#FAF6EE]" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#6E2638] uppercase tracking-widest">
                      Phase {curr.step} / 05
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#FAF6EE] tracking-tight">
                      {curr.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#FAF6EE]/90 leading-relaxed font-light">
                  {curr.description}
                </p>

                {/* Core Technologies & Tools in this Stage */}
                <div className="pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9AA69A] mb-3">
                    Applied Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {curr.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-[#D2C7B6]/20 bg-[#1C1A19]/60 px-3 py-1.5 text-xs font-medium text-[#FAF6EE] backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stage Navigation Prompt */}
                <div className="pt-4 border-t border-[#D2C7B6]/10 flex items-center justify-between text-xs text-[#9AA69A]">
                  <span>Methodology Step {curr.step} of 05</span>
                  {activeStage < 4 ? (
                    <button
                      type="button"
                      onClick={() => setActiveStage((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 text-[#FAF6EE] font-semibold hover:text-[#6E2638] transition cursor-pointer"
                    >
                      <span>Next: {STAGES[activeStage + 1].name}</span>
                      <FaArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStage(0)}
                      className="inline-flex items-center gap-1.5 text-[#FAF6EE] font-semibold hover:text-[#6E2638] transition cursor-pointer"
                    >
                      <span>Restart: RAW DATA</span>
                      <FaArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataToIntelligenceSection;
