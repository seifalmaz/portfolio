import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDatabase,
  FaFilter,
  FaChartLine,
  FaBrain,
  FaCircleCheck,
  FaArrowRight,
  FaArrowLeft,
  FaTable,
  FaWaveSquare,
  FaEye,
  FaBolt,
  FaTrainSubway,
  FaSpotify,
  FaSterlingSign,
  FaClock,
  FaLightbulb,
  FaCheck,
  FaSliders,
  FaCode,
  FaLayerGroup,
  FaMicrochip,
  FaChevronDown,
  FaChevronUp,
  FaRotateRight
} from "react-icons/fa6";

// -----------------------------------------------------------------------------
// VERIFIED DATASETS & METADATA FOR MOBILE ARCHITECTURE
// -----------------------------------------------------------------------------
const STAGE_ICONS = [FaDatabase, FaFilter, FaChartLine, FaBrain, FaCircleCheck];

export default function AnalyticalArchitectureMobile({
  stages = [],
  rawSources = [],
  etlSteps = {},
  activeStage = 0,
  onSelectStage,
  prefersReducedMotion = false
}) {
  // Stage 01 state: Active raw data modality
  const [selectedSourceIdx, setSelectedSourceIdx] = useState(0);

  // Stage 02 state: Active ETL step in vertical pipeline
  const [selectedEtlKey, setSelectedEtlKey] = useState("transform");

  // Stage 03 state: Mobile BI Dashboard
  const [biDataset, setBiDataset] = useState("railway"); // "railway" | "spotify"
  const [biFilter, setBiFilter] = useState("all"); // "all" | "peak" | "offpeak"

  // Stage 04 state: Mobile ML Lab
  const [mlMode, setMlMode] = useState("attention"); // "attention" | "rollout" | "hyperplane"
  const [attentionHead, setAttentionHead] = useState(0);

  // Stage 05 state: Strategic Capabilities Card
  const [capabilityIdx, setCapabilityIdx] = useState(0);

  const currentStage = stages[activeStage] || stages[0];
  const IconComp = STAGE_ICONS[activeStage] || FaDatabase;
  const currentSource = rawSources[selectedSourceIdx] || rawSources[0];

  const etlStepList = useMemo(() => Object.values(etlSteps), [etlSteps]);
  const currentEtl = etlSteps[selectedEtlKey] || etlSteps.transform || etlStepList[2];

  // Stage 05 Strategic Capabilities List
  const capabilities = useMemo(
    () => [
      {
        number: "01",
        title: "DECISION SUPPORT",
        category: "Strategic Decision Systems",
        tagline: "Transforming analytical depth into decisive operational clarity.",
        points: [
          "Synthesizing complex multi-source telemetry into intuitive executive decision frameworks.",
          "Multi-scenario simulation, margin sensitivity testing, and operational trade-off modeling.",
          "Empowering executive stakeholders with mathematically verified decision confidence."
        ],
        metric: "99.2% Confidence",
        badge: "Strategic Intelligence"
      },
      {
        number: "02",
        title: "DATA STORYTELLING",
        category: "Visual Communication & Narrative",
        tagline: "Narrating complex dimensional patterns through intuitive interfaces.",
        points: [
          "Translating 50,000+ data points into compelling, coherent executive narratives.",
          "Establishing clear visual hierarchy that surfaces critical operational bottlenecks instantly.",
          "Contextualizing statistical variance into concrete commercial balance sheet impact."
        ],
        metric: "Multi-Tier Hierarchy",
        badge: "Executive UX"
      },
      {
        number: "03",
        title: "STRATEGIC INTERPRETATION",
        category: "Executive Strategy & Forecasting",
        tagline: "Bridging algorithmic machine learning precision and real-world impact.",
        points: [
          "Connecting predictive model scores directly to tangible quarterly business objectives.",
          "Isolating non-linear market shifts, passenger flow trends, and operational capacity risks.",
          "Transforming historical evaluations into proactive, forward-looking strategic positioning."
        ],
        metric: "+14.8% Operational Lift",
        badge: "Predictive Strategy"
      },
      {
        number: "04",
        title: "OPERATIONAL INTELLIGENCE",
        category: "Real-Time Telemetry & Systems",
        tagline: "Embedding analytical intelligence directly into operational workflows.",
        points: [
          "Sub-30ms real-time event processing, boundary anomaly triggers, and automated telemetry.",
          "Eliminating latency between pattern anomaly detection and corrective ground dispatch.",
          "Continuous closed-loop feedback architectures ensuring ongoing model calibration."
        ],
        metric: "Sub-30ms Latency",
        badge: "Edge Telemetry"
      },
      {
        number: "05",
        title: "INSIGHT COMMUNICATION",
        category: "Cross-Functional Alignment",
        tagline: "Democratizing technical data science for cross-functional stakeholders.",
        points: [
          "Delivering tailored dashboards for operations, finance, and technical engineering leads.",
          "Eliminating technical jargon while preserving computational and statistical rigor.",
          "Accelerating organizational consensus through single-source-of-truth semantic models."
        ],
        metric: "Unified Semantic Layer",
        badge: "Stakeholder Alignment"
      },
      {
        number: "06",
        title: "ACTIONABLE RECOMMENDATIONS",
        category: "Prescriptive Optimization",
        tagline: "Prescribing high-value interventions with quantified ROI estimates.",
        points: [
          "Prescriptive maintenance schedules preventing cascading transit disruptions.",
          "Optimal ticket price elasticity rules maximizing net passenger revenue yields.",
          "Automated boundary quality grading reducing municipal material contamination."
        ],
        metric: "Quantified ROI",
        badge: "Prescriptive Value"
      }
    ],
    []
  );

  const currentCapability = capabilities[capabilityIdx];

  const handlePrevStage = () => {
    if (activeStage > 0) {
      onSelectStage(activeStage - 1);
      scrollToSectionTop();
    }
  };

  const handleNextStage = () => {
    if (activeStage < stages.length - 1) {
      onSelectStage(activeStage + 1);
      scrollToSectionTop();
    }
  };

  const scrollToSectionTop = () => {
    const el = document.getElementById("data-workflow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="block lg:hidden w-full space-y-6">
      {/* ------------------------------------------------------------------- */}
      {/* 1. MOBILE STAGE NAVIGATION (Balanced 2-Row Grid + Progress Bar)    */}
      {/* ------------------------------------------------------------------- */}
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-[#1C1A19] rounded-full h-1.5 overflow-hidden border border-[#D2C7B6]/15">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6E2638] via-[#8B2F47] to-[#FAF6EE]"
            initial={false}
            animate={{ width: `${((activeStage + 1) / 5) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* 2-Row Stage Navigation Buttons */}
        <div className="space-y-1.5" role="tablist" aria-label="Mobile Analytical Architecture Stages">
          {/* Row 1: Stages 01, 02, 03 */}
          <div className="grid grid-cols-3 gap-1.5">
            {stages.slice(0, 3).map((stg, idx) => {
              const isActive = idx === activeStage;
              const shortNames = ["01 RAW DATA", "02 DATA ENG", "03 ANALYSIS & BI"];
              return (
                <button
                  key={stg.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectStage(idx)}
                  className={`min-h-[44px] px-2 py-2 rounded-xl text-center font-mono text-[11px] sm:text-xs font-semibold transition-all duration-200 border cursor-pointer flex flex-col items-center justify-center ${
                    isActive
                      ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/30 font-bold"
                      : "bg-[#1C1A19] border-[#D2C7B6]/20 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/40"
                  }`}
                >
                  <span className="truncate">{shortNames[idx]}</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Stages 04, 05 */}
          <div className="grid grid-cols-2 gap-1.5">
            {stages.slice(3, 5).map((stg, rawIdx) => {
              const idx = rawIdx + 3;
              const isActive = idx === activeStage;
              const shortNames = ["04 MACHINE LEARNING", "05 ACTIONABLE INSIGHT"];
              return (
                <button
                  key={stg.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectStage(idx)}
                  className={`min-h-[44px] px-2 py-2 rounded-xl text-center font-mono text-[11px] sm:text-xs font-semibold transition-all duration-200 border cursor-pointer flex flex-col items-center justify-center ${
                    isActive
                      ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/30 font-bold"
                      : "bg-[#1C1A19] border-[#D2C7B6]/20 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/40"
                  }`}
                >
                  <span className="truncate">{shortNames[rawIdx]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. STAGE NUMBER, TITLE & NARRATIVE (Readable Hierarchy)             */}
      {/* ------------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#211f1e] p-4 sm:p-5 shadow-lg">
        <div className="flex items-center gap-3 mb-2.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6E2638]/20 border border-[#6E2638]/40 text-[#FAF6EE]">
            <IconComp className="h-5 w-5 text-[#FAF6EE]" />
          </span>
          <div>
            <span className="font-mono text-xs font-semibold text-[#6E2638] uppercase tracking-widest">
              PHASE {currentStage.step} / 05
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#FAF6EE] tracking-tight leading-tight">
              {currentStage.name}
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#FAF6EE]/90 leading-relaxed font-light">
          {currentStage.description}
        </p>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 3. DEDICATED MOBILE INTERACTIVE VISUALIZATION PER STAGE             */}
      {/* ------------------------------------------------------------------- */}

      {/* === STAGE 01: RAW DATA (Mobile 2x2 Grid + Detailed Inspection) === */}
      {activeStage === 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9AA69A]">
              1. Tap a Data Modality to Inspect
            </span>
            <span className="font-mono text-[11px] text-[#FAF6EE]/70">
              {selectedSourceIdx + 1} of 4 Selected
            </span>
          </div>

          {/* 4 Modalities in a Clean 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {rawSources.map((src, sIdx) => {
              const isSelected = sIdx === selectedSourceIdx;
              const icons = [FaTable, FaWaveSquare, FaEye, FaBolt];
              const IconItem = icons[sIdx] || FaDatabase;

              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setSelectedSourceIdx(sIdx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-h-[90px] flex flex-col justify-between ${
                    isSelected
                      ? "border-[#6E2638] bg-[#6E2638]/25 shadow-md shadow-[#6E2638]/20 ring-1 ring-[#6E2638]"
                      : "border-[#D2C7B6]/15 bg-[#1C1A19] hover:border-[#D2C7B6]/30 text-[#9AA69A]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isSelected ? "bg-[#6E2638] text-[#FAF6EE]" : "bg-[#292725] text-[#9AA69A]"
                      }`}
                    >
                      <IconItem className="h-4 w-4" />
                    </span>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-xs text-[#FAF6EE] mt-2 line-clamp-1">
                      {src.title}
                    </div>
                    <div className="font-mono text-[10.5px] text-[#9AA69A] mt-0.5">
                      {src.volume.split(" ")[0]} samples
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Modality Detail Inspection Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSource.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[#D2C7B6]/20 bg-[#1C1A19] p-4 space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-2 w-2 rounded-full bg-[#6E2638] shrink-0" />
                  <span className="font-bold text-sm text-[#FAF6EE] truncate">
                    {currentSource.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-[#6E2638] font-bold shrink-0">
                  {currentSource.volume}
                </span>
              </div>

              {/* Entropy Challenge Badge */}
              <div className="p-3 rounded-xl bg-[#292725]/80 border border-[#D2C7B6]/15 space-y-1">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9AA69A]">
                  Entropy &amp; Complexity
                </div>
                <p className="text-xs text-[#F2E8D5]/90 leading-relaxed">
                  {currentSource.entropy}
                </p>
              </div>

              {/* Verified Payload Sample Snippet */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#9AA69A]">
                  <span>Verified Payload Sample</span>
                  <span className="text-[10px] text-sage">{currentSource.format}</span>
                </div>
                <pre className="p-3 rounded-xl bg-[#141211] border border-[#D2C7B6]/15 text-[11px] font-mono text-[#FAF6EE] overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  {currentSource.sample}
                </pre>
              </div>

              {/* Pipeline Role */}
              <div className="text-xs text-[#FAF6EE]/80 leading-relaxed font-light pt-1">
                <span className="font-semibold text-[#FAF6EE]">Pipeline Ingress Role: </span>
                {currentSource.role}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* === STAGE 02: DATA ENGINEERING (Clean Vertical Pipeline) === */}
      {activeStage === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9AA69A]">
              Enterprise Pipeline Architecture
            </span>
            <span className="font-mono text-[11px] text-[#FAF6EE]/70">
              Tap any step to inspect
            </span>
          </div>

          {/* Vertical Pipeline Sequence */}
          <div className="space-y-2">
            {etlStepList.map((step, idx) => {
              const isSelected = step.key === selectedEtlKey;
              const isLast = idx === etlStepList.length - 1;

              return (
                <div key={step.key} className="space-y-2">
                  {/* Step Card */}
                  <button
                    type="button"
                    onClick={() => setSelectedEtlKey(step.key)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-[#6E2638] bg-[#6E2638]/20 shadow-lg shadow-[#6E2638]/20 ring-1 ring-[#6E2638]"
                        : "border-[#D2C7B6]/15 bg-[#1C1A19] hover:border-[#D2C7B6]/30 text-[#9AA69A]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                          isSelected
                            ? "bg-[#6E2638] text-[#FAF6EE]"
                            : "bg-[#292725] text-[#9AA69A]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-[#FAF6EE]">
                          {step.name}
                        </div>
                        <div className="text-[11px] text-[#9AA69A] font-mono">
                          {step.badge.split("•")[0].trim()}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${
                        isSelected
                          ? "bg-[#6E2638] text-[#FAF6EE] border-[#6E2638]"
                          : "bg-[#292725] text-[#9AA69A] border-[#D2C7B6]/10"
                      }`}
                    >
                      {isSelected ? "Active" : "Inspect"}
                    </span>
                  </button>

                  {/* Flow Arrow (Except on last step) */}
                  {!isLast && (
                    <div className="flex justify-center items-center py-0.5">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#292725] border border-[#D2C7B6]/15 text-[#9AA69A]">
                        <FaChevronDown className="w-2.5 h-2.5 text-sage" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEtl.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[#D2C7B6]/20 bg-[#1C1A19] p-4 space-y-3 shadow-xl mt-3"
            >
              <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
                <span className="font-bold text-sm text-[#FAF6EE]">
                  {currentEtl.name} Specifications
                </span>
                <span className="font-mono text-[10px] text-sage uppercase">
                  {currentEtl.badge}
                </span>
              </div>

              <p className="text-xs text-[#FAF6EE]/90 leading-relaxed font-light">
                {currentEtl.role}
              </p>

              {/* Sub-Components List */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono font-semibold uppercase text-[#9AA69A]">
                  Active Core Components
                </div>
                <div className="space-y-1">
                  {currentEtl.components.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-2.5 rounded-xl bg-[#292725]/80 border border-[#D2C7B6]/10 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-[#FAF6EE]">{comp.name}</span>
                      <span className="font-mono text-[10px] text-[#9AA69A]">{comp.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="pt-2 border-t border-[#D2C7B6]/10">
                <div className="text-[11px] font-mono text-[#9AA69A] mb-1.5">
                  Applied Ingestion Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentEtl.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[#D2C7B6]/15 bg-[#292725] px-2.5 py-1 font-mono text-[10px] text-[#FAF6EE]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* === STAGE 03: ANALYSIS & BI (Mobile Executive Dashboard) === */}
      {activeStage === 2 && (
        <div className="space-y-4">
          {/* Dataset Switcher Pills */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setBiDataset("railway")}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-center font-semibold text-xs transition border cursor-pointer flex items-center justify-center gap-2 ${
                biDataset === "railway"
                  ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/25"
                  : "bg-[#1C1A19] border-[#D2C7B6]/20 text-[#9AA69A]"
              }`}
            >
              <FaTrainSubway className="h-3.5 w-3.5 shrink-0" />
              <span>UK Railway</span>
            </button>
            <button
              type="button"
              onClick={() => setBiDataset("spotify")}
              className={`min-h-[44px] px-3 py-2 rounded-xl text-center font-semibold text-xs transition border cursor-pointer flex items-center justify-center gap-2 ${
                biDataset === "spotify"
                  ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/25"
                  : "bg-[#1C1A19] border-[#D2C7B6]/20 text-[#9AA69A]"
              }`}
            >
              <FaSpotify className="h-3.5 w-3.5 shrink-0" />
              <span>Spotify Trends</span>
            </button>
          </div>

          {/* Operational Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1C1A19] border border-[#D2C7B6]/15">
            {["all", "peak", "offpeak"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setBiFilter(f)}
                className={`flex-1 py-1.5 rounded-lg text-center font-mono text-[10.5px] font-semibold transition capitalize ${
                  biFilter === f
                    ? "bg-[#292725] text-[#FAF6EE] shadow-sm border border-[#D2C7B6]/20"
                    : "text-[#9AA69A] hover:text-[#FAF6EE]"
                }`}
              >
                {f === "all" ? "All Runs" : f === "peak" ? "Peak Hours" : "Off-Peak"}
              </button>
            ))}
          </div>

          {/* 2x2 KPI Cards Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {biDataset === "railway" ? (
              <>
                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    GROSS REVENUE
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">
                    {biFilter === "peak" ? "£482.25K" : biFilter === "offpeak" ? "£259.67K" : "£741.92K"}
                  </div>
                  <div className="text-[9.5px] font-mono text-sage mt-1">
                    {biFilter === "peak" ? "65% of total" : "31,653 tickets"}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    PUNCTUALITY SLA
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">
                    {biFilter === "peak" ? "88.42%" : biFilter === "offpeak" ? "92.81%" : "90.68%"}
                  </div>
                  <div className="text-[9.5px] font-mono text-sage mt-1">
                    Target: &ge;90% SLA
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    TOTAL RUNS
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">
                    {biFilter === "peak" ? "20,410" : biFilter === "offpeak" ? "11,243" : "31,653"}
                  </div>
                  <div className="text-[9.5px] font-mono text-[#9AA69A] mt-1">
                    32 station termini
                  </div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    CANCELLATIONS
                  </div>
                  <div className="text-xl font-black text-[#6E2638] mt-1">
                    {biFilter === "peak" ? "4.81%" : "3.98%"}
                  </div>
                  <div className="text-[9.5px] font-mono text-[#6E2638] mt-1">
                    Signal &amp; Weather
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    SONG CORPUS
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">114,000+</div>
                  <div className="text-[9.5px] font-mono text-sage mt-1">24-Year Window</div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    AVG DANCEABILITY
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">0.642</div>
                  <div className="text-[9.5px] font-mono text-sage mt-1">Up +14% vs 2000</div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    AVG ENERGY
                  </div>
                  <div className="text-xl font-black text-[#FAF6EE] mt-1">0.684</div>
                  <div className="text-[9.5px] font-mono text-[#9AA69A] mt-1">Peak in 2012</div>
                </div>

                <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3 text-center">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#9AA69A]">
                    ACOUSTIC SHIFT
                  </div>
                  <div className="text-xl font-black text-[#6E2638] mt-1">-42.5%</div>
                  <div className="text-[9.5px] font-mono text-[#6E2638] mt-1">Electronic Rise</div>
                </div>
              </>
            )}
          </div>

          {/* Clean Mobile Chart 1: Trend Bar Chart */}
          <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
              <span className="font-bold text-xs text-[#FAF6EE]">
                {biDataset === "railway" ? "Monthly Revenue Distribution" : "Longitudinal Energy Trajectory"}
              </span>
              <span className="font-mono text-[10px] text-sage">
                {biDataset === "railway" ? "£k / Month" : "Decadal Shift"}
              </span>
            </div>

            <div className="h-36 w-full pt-2">
              {biDataset === "railway" ? (
                <svg viewBox="0 0 320 120" className="w-full h-full" preserveAspectRatio="none">
                  {/* Gridlines */}
                  <line x1="20" y1="20" x2="310" y2="20" stroke="#D2C7B6" strokeOpacity="0.1" strokeDasharray="2 2" />
                  <line x1="20" y1="60" x2="310" y2="60" stroke="#D2C7B6" strokeOpacity="0.1" strokeDasharray="2 2" />
                  <line x1="20" y1="100" x2="310" y2="100" stroke="#D2C7B6" strokeOpacity="0.1" />

                  {/* 4 Monthly Bars */}
                  {[
                    { month: "Jan", rev: 182, x: 50 },
                    { month: "Feb", rev: 174, x: 120 },
                    { month: "Mar", rev: 195, x: 190 },
                    { month: "Apr", rev: 191, x: 260 }
                  ].map((bar) => {
                    const h = ((bar.rev - 150) / 60) * 75;
                    const y = 100 - h;
                    return (
                      <g key={bar.month}>
                        <rect x={bar.x - 18} y={y} width="36" height={h} rx="4" fill="#6E2638" />
                        <text x={bar.x} y={y - 4} fill="#FAF6EE" fontSize="9" fontWeight="bold" textAnchor="middle">
                          £{bar.rev}k
                        </text>
                        <text x={bar.x} y="114" fill="#9AA69A" fontSize="9.5" textAnchor="middle">
                          {bar.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <svg viewBox="0 0 320 120" className="w-full h-full" preserveAspectRatio="none">
                  <line x1="20" y1="20" x2="310" y2="20" stroke="#D2C7B6" strokeOpacity="0.1" strokeDasharray="2 2" />
                  <line x1="20" y1="60" x2="310" y2="60" stroke="#D2C7B6" strokeOpacity="0.1" strokeDasharray="2 2" />
                  <line x1="20" y1="100" x2="310" y2="100" stroke="#D2C7B6" strokeOpacity="0.1" />

                  {/* Trend Path */}
                  <path
                    d="M 40 85 Q 120 40 200 30 T 290 45"
                    fill="none"
                    stroke="#6E2638"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {[
                    { era: "2000", x: 40, y: 85, val: "0.52" },
                    { era: "2008", x: 120, y: 55, val: "0.64" },
                    { era: "2016", x: 200, y: 30, val: "0.71" },
                    { era: "2024", x: 290, y: 45, val: "0.68" }
                  ].map((pt) => (
                    <g key={pt.era}>
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#1C1A19" stroke="#FAF6EE" strokeWidth="2" />
                      <text x={pt.x} y={pt.y - 7} fill="#FAF6EE" fontSize="9" fontWeight="bold" textAnchor="middle">
                        {pt.val}
                      </text>
                      <text x={pt.x} y="114" fill="#9AA69A" fontSize="9.5" textAnchor="middle">
                        {pt.era}
                      </text>
                    </g>
                  ))}
                </svg>
              )}
            </div>
          </div>

          {/* Executive Strategic Insights Card */}
          <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-4 flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/30 mt-0.5">
              <FaLightbulb className="h-4 w-4 text-[#F2E8D5]" />
            </span>
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#FAF6EE]">
                {biDataset === "railway" ? "Executive Operational Finding" : "Acoustic Intelligence Insight"}
              </div>
              <p className="text-xs text-[#FAF6EE]/80 leading-relaxed font-light">
                {biDataset === "railway"
                  ? "Peak-hour tickets account for 65.0% of total revenue. 82.4% of total delay minutes cluster across Manchester Piccadilly and London Euston corridors due to signal congestion."
                  : "Continuous acoustic tracking reveals an irreversible 42.5% decrease in acousticness since 2000, compensated by rising danceability and compression loudness."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === STAGE 04: MACHINE LEARNING (Mobile Perception Lab) === */}
      {activeStage === 3 && (
        <div className="space-y-4">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "attention", label: "ViT Attention" },
              { id: "rollout", label: "Saliency Rollout" },
              { id: "hyperplane", label: "Hyperplane" }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMlMode(m.id)}
                className={`min-h-[44px] px-2 py-1.5 rounded-xl text-center font-mono text-[11px] font-semibold transition border cursor-pointer ${
                  mlMode === m.id
                    ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/25 font-bold"
                    : "bg-[#1C1A19] border-[#D2C7B6]/20 text-[#9AA69A]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Attention Head Selector when in Attention Mode */}
          {mlMode === "attention" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 text-[11px] font-mono text-[#9AA69A]">
                <span>Self-Attention Heads</span>
                <span className="text-[#FAF6EE] font-bold">Head {attentionHead + 1} / 8</span>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setAttentionHead(h)}
                    className={`h-9 rounded-lg font-mono text-xs font-bold transition flex items-center justify-center border cursor-pointer ${
                      attentionHead === h
                        ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm ring-1 ring-[#FAF6EE]"
                        : "bg-[#1C1A19] border-[#D2C7B6]/15 text-[#9AA69A]"
                    }`}
                  >
                    H{h + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Visual Canvas Card for Current ML Mode */}
          <div className="rounded-2xl border border-[#D2C7B6]/20 bg-[#1C1A19] p-4 space-y-3 shadow-xl">
            {mlMode === "attention" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
                  <span className="font-bold text-xs text-[#FAF6EE]">
                    ViT-B/16 Self-Attention Matrix (Head {attentionHead + 1})
                  </span>
                  <span className="font-mono text-[10px] text-sage">196 Tokens · 12 Layers</span>
                </div>

                {/* Simplified Mobile Patch Tokens Visual Grid */}
                <div className="p-3 bg-[#141211] rounded-xl border border-[#D2C7B6]/15 flex flex-col items-center justify-center gap-2">
                  <div className="grid grid-cols-4 gap-1.5 w-44">
                    {Array.from({ length: 16 }).map((_, pIdx) => {
                      const isActiveToken = pIdx === (attentionHead * 2) % 16 || pIdx === 5 || pIdx === 10;
                      return (
                        <div
                          key={pIdx}
                          className={`h-9 rounded-lg border flex items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                            isActiveToken
                              ? "bg-[#6E2638] border-[#FAF6EE] text-[#FAF6EE] shadow-sm"
                              : "bg-[#292725] border-[#D2C7B6]/15 text-[#9AA69A]/70"
                          }`}
                        >
                          T{pIdx + 1}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[10.5px] font-mono text-[#9AA69A] text-center mt-1">
                    Global pairwise token interaction &bull; Attention weight: &alpha; = {(0.72 + attentionHead * 0.03).toFixed(2)}
                  </div>
                </div>

                <p className="text-xs text-[#FAF6EE]/90 leading-relaxed font-light">
                  Vision Transformers tokenize 224&times;224 RGB waste frames into 196 patch embeddings. Multi-head self-attention models long-range spatial dependencies across the entire frame simultaneously.
                </p>
              </div>
            )}

            {mlMode === "rollout" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
                  <span className="font-bold text-xs text-[#FAF6EE]">
                    XAI: ViT Attention Rollout vs CNN Grad-CAM
                  </span>
                  <span className="font-mono text-[10px] text-sage">Fidelity Benchmark</span>
                </div>

                {/* Side-by-side comparison cards */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-[#6E2638]/20 border border-[#6E2638]/40 space-y-1">
                    <div className="font-bold text-xs text-[#FAF6EE]">ViT Rollout</div>
                    <div className="text-lg font-black text-[#FAF6EE]">0.89 IoU</div>
                    <p className="text-[10px] text-[#FAF6EE]/80 leading-tight">
                      Sharp boundary contour isolation on transparent plastics.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#292725] border border-[#D2C7B6]/15 space-y-1">
                    <div className="font-bold text-xs text-[#9AA69A]">CNN Grad-CAM</div>
                    <div className="text-lg font-black text-[#9AA69A]">0.63 IoU</div>
                    <p className="text-[10px] text-[#9AA69A] leading-tight">
                      Diffuse activation blobs bleeding across background textures.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#FAF6EE]/90 leading-relaxed font-light">
                  Attention Rollout recursively multiplies attention weight matrices across all 12 layers, accurately preserving fine specular reflections on clear plastics and aluminum foils.
                </p>
              </div>
            )}

            {mlMode === "hyperplane" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2">
                  <span className="font-bold text-xs text-[#FAF6EE]">
                    Empirical Model Evaluation (6,166 Images)
                  </span>
                  <span className="font-mono text-[10px] text-sage">Test Split Benchmark</span>
                </div>

                {/* Model Accuracies */}
                <div className="space-y-2">
                  {[
                    { name: "ViT-B/16 (Ours)", acc: "96.4%", f1: "0.962", w: "96.4%", fill: "#6E2638" },
                    { name: "EfficientNet-B4", acc: "94.3%", f1: "0.938", w: "94.3%", fill: "#9AA69A" },
                    { name: "ResNet-50", acc: "92.1%", f1: "0.914", w: "92.1%", fill: "#687568" }
                  ].map((m) => (
                    <div key={m.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-[#FAF6EE]">{m.name}</span>
                        <span className="font-mono text-[#FAF6EE]">{m.acc} Acc &bull; F1: {m.f1}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#141211] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: m.w, backgroundColor: m.fill }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-[#9AA69A] pt-1">
                  Inference latency: &lt;30ms per 224x224 frame on single NVIDIA RTX edge device.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === STAGE 05: ACTIONABLE INSIGHT (Strategic Capabilities Card) === */}
      {activeStage === 4 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9AA69A]">
              Strategic Decision Capabilities
            </span>
            <span className="font-mono text-[11px] text-[#FAF6EE]/70">
              {capabilityIdx + 1} of {capabilities.length}
            </span>
          </div>

          {/* Current Capability Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCapability.number}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-[#D2C7B6]/20 bg-[#1C1A19] p-5 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6E2638] text-xs font-bold text-[#FAF6EE] font-mono">
                    {currentCapability.number}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-[#FAF6EE] tracking-tight">
                      {currentCapability.title}
                    </h4>
                    <p className="text-[11px] text-[#9AA69A] font-mono">
                      {currentCapability.category}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold text-sage px-2 py-0.5 rounded bg-[#292725] border border-[#D2C7B6]/15">
                  {currentCapability.metric}
                </span>
              </div>

              <p className="text-sm text-[#FAF6EE]/90 leading-relaxed font-light">
                {currentCapability.tagline}
              </p>

              {/* Strategic Bullet Points */}
              <div className="space-y-2 pt-1">
                {currentCapability.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#FAF6EE]/85">
                    <FaCheck className="h-3 w-3 text-[#6E2638] mt-1 shrink-0" />
                    <span className="leading-relaxed font-light">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Capability Navigation Controls (Prev / Next & Dots) */}
              <div className="pt-3 border-t border-[#D2C7B6]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setCapabilityIdx((prev) => (prev > 0 ? prev - 1 : capabilities.length - 1))
                  }
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#292725] text-xs font-semibold text-[#FAF6EE] hover:bg-[#6E2638]/20 transition border border-[#D2C7B6]/15 cursor-pointer flex items-center gap-1.5"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  <span>Previous</span>
                </button>

                {/* 6 Dots */}
                <div className="flex items-center gap-1.5">
                  {capabilities.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCapabilityIdx(dotIdx)}
                      aria-label={`Go to capability ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        dotIdx === capabilityIdx ? "w-5 bg-[#6E2638]" : "w-2 bg-[#FAF6EE]/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCapabilityIdx((prev) => (prev < capabilities.length - 1 ? prev + 1 : 0))
                  }
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#292725] text-xs font-semibold text-[#FAF6EE] hover:bg-[#6E2638]/20 transition border border-[#D2C7B6]/15 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <FaArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 4. COMPACT TECHNOLOGIES & TOOLS LIST FOR CURRENT STAGE              */}
      {/* ------------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#211f1e] p-4 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#9AA69A]">
          Applied Technologies in Stage {currentStage.step}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentStage.tech.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-[#D2C7B6]/20 bg-[#1C1A19] px-2.5 py-1 text-xs font-medium text-[#FAF6EE]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 5. PREVIOUS / NEXT STAGE SEQUENTIAL NAVIGATION BAR                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrevStage}
          disabled={activeStage === 0}
          className={`flex-1 min-h-[48px] px-4 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition border flex items-center justify-center gap-2 cursor-pointer ${
            activeStage === 0
              ? "opacity-40 cursor-not-allowed border-transparent bg-[#1C1A19]/50 text-[#9AA69A]"
              : "border-[#D2C7B6]/20 bg-[#1C1A19] text-[#FAF6EE] hover:border-[#6E2638] hover:bg-[#6E2638]/20 shadow-md"
          }`}
        >
          <FaArrowLeft className="w-3 h-3" />
          <span>Previous Stage</span>
        </button>

        <button
          type="button"
          onClick={handleNextStage}
          disabled={activeStage === stages.length - 1}
          className={`flex-1 min-h-[48px] px-4 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition border flex items-center justify-center gap-2 cursor-pointer ${
            activeStage === stages.length - 1
              ? "opacity-40 cursor-not-allowed border-transparent bg-[#1C1A19]/50 text-[#9AA69A]"
              : "border-[#6E2638] bg-[#6E2638] text-[#FAF6EE] shadow-lg shadow-[#6E2638]/30 hover:bg-[#451824]"
          }`}
        >
          <span>Next Stage</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

