import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaDatabase, 
  FaFilter, 
  FaChartLine, 
  FaBrain, 
  FaCircleCheck,
  FaArrowRight
} from "react-icons/fa6";
import AnalyticalArchitecture2D from "../canvas/AnalyticalArchitecture2D";
import IntelligenceInMotion from "./IntelligenceInMotion";
import ExecutiveBiDashboard from "./ExecutiveBiDashboard";
import AnalyticalArchitectureMobile from "./AnalyticalArchitectureMobile";

export const STAGES = [
  {
    step: "01",
    name: "RAW DATA",
    icon: FaDatabase,
    badge: "The Data Source Landscape • Multi-Modal Ingress Confluence",
    description:
      "Every data solution begins with noisy, heterogeneous inputs: UK railway transaction logs, high-dimensional Spotify acoustic vectors, multi-category municipal waste image streams, and real-time webcam frame telemetry.",
    tech: ["Raw CSV/JSON", "SQL Logs", "Image Corpora", "Streaming Telemetry"],
    canvasLabel: "The Data Source Landscape: 4 Heterogeneous Modalities"
  },
  {
    step: "02",
    name: "DATA ENGINEERING",
    icon: FaFilter,
    badge: "Enterprise ETL Architecture • Sources → Pipeline → Warehouse",
    description:
      "Structuring raw multi-source data into a reliable analytical warehouse. Automated extraction, robust transformation and validation gates, and optimized loading into a centralized star schema repository.",
    tech: ["Oracle SQL", "Informatica ETL", "Python Automation", "Pandas & NumPy"],
    canvasLabel: "Enterprise ETL Pipeline: Sources → Transform → Warehouse"
  },
  {
    step: "03",
    name: "ANALYSIS & BI",
    icon: FaChartLine,
    badge: "Executive Dashboards • Operations & Revenue Intelligence",
    description:
      "Transforming verified analytical data into executive business intelligence. Designing interactive Power BI and analytical dashboards that surface operational bottlenecks, financial performance, and strategic opportunities for decision-makers.",
    tech: ["Power BI", "DAX Measures", "SQL Analytics", "Interactive Dashboards", "KPI Modeling"],
    canvasLabel: "Executive Business Intelligence • Interactive Operations & Revenue Dashboard"
  },
  {
    step: "04",
    name: "MACHINE LEARNING",
    icon: FaBrain,
    badge: "Vision Transformers • Attention Rollout • Explainable AI",
    description:
      "Formulating predictive and computer-vision architectures. Benchmarking CNN backbones (ResNet, EfficientNet) and Vision Transformers (ViT) with attention rollout heatmaps isolating boundary contours.",
    tech: ["PyTorch", "OpenCV", "ViT Rollout", "Scikit-Learn"],
    canvasLabel: "Neural Perception Lab & Multi-Class Hyperplane"
  },
  {
    step: "05",
    name: "ACTIONABLE INSIGHT",
    icon: FaCircleCheck,
    badge: "Intelligence in Motion • Strategic Decision Systems",
    description:
      "Synthesizing analytical engineering and machine learning models into executive decision intelligence. Transforming complex computational outputs into actionable recommendations, real-time operational telemetry, and compelling data storytelling.",
    tech: [
      "Decision Support",
      "Data Storytelling",
      "Strategic Interpretation",
      "Operational Intelligence",
      "Insight Communication",
      "Analytical Recommendations"
    ],
    canvasLabel: "Intelligence in Motion: 6 Strategic Capabilities"
  }
];

// 4 Verified Data Source Clusters for Stage 01
export const RAW_SOURCES = [
  {
    id: "tabular-logs",
    title: "Tabular & Relational Logs",
    modality: "Structured Transaction Stream",
    volume: "31,653 Passenger Journeys",
    format: "UTF-8 JSON / CSV Timetable Payloads",
    entropy: "High schema variance, timestamp skew, nullable delay indicators",
    dimensions: "18 Relational Attributes [Date, Time, Stn, Class, Price, Delay]",
    sample: '{"event_id": "0x7F2A", "sched_dep": "08:15", "delay_min": 18, "refund": 0, "hash": "e9a4f2"}',
    role: "Transactional log capturing train schedules, passenger tickets, and physical timestamp delay variances."
  },
  {
    id: "vector-embeddings",
    title: "High-Dimensional Vectors",
    modality: "Continuous Latent Vectors",
    volume: "114,000+ Raw / 54,465 Cleaned",
    format: "Float64 Multi-Variate Audio Features",
    entropy: "Multi-collinear feature distributions, dynamic loudness ranges",
    dimensions: "12 Continuous Dimensions [Danceability, Valence, Energy, Tempo...]",
    sample: '[0.742, 0.681, 0.812, -0.214, 0.045, 124.0, 0.551, -5.42, 0.038, 0.141]',
    role: "High-dimensional acoustic feature stream spanning 24 years for multi-variate statistical clustering."
  },
  {
    id: "visual-corpora",
    title: "Unstructured Visual Corpora",
    modality: "Multi-Spectral Image Tensors",
    volume: "6,166 Annotated RGB Images",
    format: "224x224x3 Tensor Arrays [Uint8]",
    entropy: "Variable illumination, specular reflection, non-rigid transparent deformations",
    dimensions: "150,528 Floating Tensors per Frame [3 RGB Channels]",
    sample: 'Tensor(shape=[3, 224, 224], μ=[0.485, 0.456, 0.406], σ=[0.229, 0.224, 0.225])',
    role: "Multi-category municipal recycling images with challenging transparent plastics and reflective metal foils."
  },
  {
    id: "streaming-telemetry",
    title: "Streaming Telemetry",
    modality: "Real-Time Coordinate Ingress",
    volume: "Continuous 30–60 FPS Stream",
    format: "High-Frequency JSON / 3D Landmark Packets",
    entropy: "Sensor jitter, high-frequency coordinate drift, frame drops, network latency",
    dimensions: "21 (x, y, z) Hand Keypoint Vertices [63 Spatial Coordinates]",
    sample: '{"frame_idx": 1042, "fps": 97.0, "landmarks_3d": [21, 3], "latency": "10.3ms", "jitter": "±0.4mm"}',
    role: "High-frequency webcam video feed streaming infrared and RGB hand pose coordinates for edge inference."
  }
];

// Simplified ETL Pipeline Architecture for Stage 02
export const ETL_STEPS = {
  sources: {
    key: "sources",
    label: "1. SOURCES",
    mobileLabel: "1. SRC",
    name: "DATA SOURCES",
    badge: "Heterogeneous Ingress • 4 Independent Origins",
    role: "Collecting raw data from independent transactional databases, file logs, REST endpoints, and sensor feeds.",
    summary: "Independent source systems feeding continuous operational and analytical events into the ingestion layer.",
    components: [
      { id: "src_sql", name: "Relational Databases", type: "SQL / OLTP Transactions" },
      { id: "src_files", name: "CSV / JSON File Sinks", type: "Timetable & Event Payloads" },
      { id: "src_apis", name: "REST Web APIs", type: "Catalog & External Audio Streams" },
      { id: "src_telemetry", name: "Image & Sensor Telemetry", type: "RGB Frames & Webcam Coordinates" }
    ],
    tech: ["PostgreSQL / Oracle", "Apache Parquet", "REST Webhooks", "OpenCV Frame Ingress"]
  },
  extract: {
    key: "extract",
    label: "2. EXTRACT",
    mobileLabel: "2. EXT",
    name: "EXTRACT STAGE",
    badge: "Lossless Ingestion • Non-Blocking Audit Staging",
    role: "Extracting raw information reliably from disparate origin systems without impacting production workloads.",
    summary: "Asynchronous schema-on-read ingestion with immutable audit timestamps and ingestion checksums.",
    components: [
      { id: "ext_buffer", name: "Ingestion Ring Buffer", type: "Asynchronous Queue" },
      { id: "ext_audit", name: "Immutable Audit Log", type: "SHA-256 Checksum Validation" },
      { id: "ext_partition", name: "Partition Schedulers", type: "Temporal & Zone Bucketing" }
    ],
    tech: ["Informatica PowerCenter", "Python Automation", "Staging Buffers", "Audit Logging"]
  },
  transform: {
    key: "transform",
    label: "3. TRANSFORM",
    mobileLabel: "3. TRF",
    name: "TRANSFORM STAGE",
    badge: "Validation Gates • Cleansing • Standardization",
    role: "Cleaning, standardizing, validating schemas, deduplicating records, and preparing normalized structures for analytical use.",
    summary: "Refining raw inputs through automated data quality gates into strongly-typed, validated records.",
    components: [
      { id: "tf_dedup", name: "Deduplication & Null Gate", type: "100% Unique Primary Keys" },
      { id: "tf_regex", name: "Regex & Format Standardization", type: "ISO Timestamps & Clean Strings" },
      { id: "tf_norm", name: "Numerical & Spatial Normalizer", type: "Z-Score & ROI Letterboxing" }
    ],
    tech: ["Pandas & NumPy", "SQL STG_ Transformations", "Data Quality Contracts", "Regex Engine"]
  },
  load: {
    key: "load",
    label: "4. LOAD",
    mobileLabel: "4. LOAD",
    name: "LOAD STAGE",
    badge: "Optimized Columnar Ingress • Batch & Micro-Batch",
    role: "Persisting validated, strongly-typed datasets into high-performance columnar storage and analytics tables.",
    summary: "Atomic loading with zero-downtime swaps, surrogate key mapping, and partition alignment.",
    components: [
      { id: "ld_columnar", name: "Columnar Storage Loader", type: "Parquet / Delta Compression" },
      { id: "ld_keys", name: "Surrogate Key Generator", type: "Deterministic Sequence Mapping" },
      { id: "ld_atomic", name: "ACID Transaction Gate", type: "Zero-Downtime Atomic Swaps" }
    ],
    tech: ["Oracle SQL Loader", "Bulk Insert Pipelines", "Surrogate Key Sequences", "Partition Pruning"]
  },
  warehouse: {
    key: "warehouse",
    label: "5. WAREHOUSE",
    mobileLabel: "5. DWH",
    name: "CENTRAL DATA WAREHOUSE",
    badge: "Kimball Dimensional Star Schema • Power BI Mart",
    role: "Organizing prepared data into a reliable, centralized star schema repository optimized for business intelligence and executive reporting.",
    summary: "Unified central repository structured into Fact and Dimension tables for high-throughput reporting.",
    components: [
      { id: "wh_facts", name: "Central Fact Tables", type: "FACT_RAILWAY Grain & Metrics" },
      { id: "wh_dims", name: "Role-Playing Dimensions", type: "DIM_DATE, DIM_STATION, DIM_TICKET" },
      { id: "wh_views", name: "Curated Analytical Views", type: "VW_EXECUTIVE_REPORTING" }
    ],
    tech: ["Oracle SQL Mart", "Kimball Star Schema", "Power BI Semantic Model", "DAX Metrics"]
  }
};

function DataToIntelligenceSection() {
  const sectionRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // Stage 01 state
  const [selectedSourceIdx, setSelectedSourceIdx] = useState(0);

  // Stage 02 state: Clean 5-step ETL selection
  const [selectedEtlStep, setSelectedEtlStep] = useState("transform");

  // Stage 03 state: Dual statistical views
  const [analysisView, setAnalysisView] = useState("distribution"); // "distribution" | "correlation"

  // Stage 04 state: 3 ML workbench modes & 8 heads
  const [mlView, setMlView] = useState("attention"); // "attention" | "rollout" | "hyperplane"
  const [selectedAttentionHead, setSelectedAttentionHead] = useState(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const curr = STAGES[activeStage] || STAGES[0];
  const IconComponent = curr.icon;

  const currentSource = RAW_SOURCES[selectedSourceIdx] || RAW_SOURCES[0];
  const currentEtl = ETL_STEPS[selectedEtlStep] || ETL_STEPS.transform;

  return (
    <section
      ref={sectionRef}
      id="data-workflow"
      className="relative w-full bg-[#292725] text-[#FAF6EE] overflow-hidden py-20 sm:py-28 border-t border-[#D2C7B6]/15"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9AA69A] mb-2 sm:mb-3">
            The Analytical Architecture
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#FAF6EE]">
            From Raw Entropy to <span className="text-[#6E2638]">Actionable Intelligence</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-[#9AA69A] max-w-2xl mx-auto">
            Select any stage below to explore data streams, engineering layers, model benchmarks, and strategic decision systems.
          </p>
        </div>

        {/* DEDICATED MOBILE ARCHITECTURE EXPERIENCE (< 1024px) */}
        <AnalyticalArchitectureMobile
          stages={STAGES}
          rawSources={RAW_SOURCES}
          etlSteps={ETL_STEPS}
          activeStage={activeStage}
          onSelectStage={setActiveStage}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* ================================================================= */}
        {/* DESKTOP TWO-COLUMN EXPERIENCE (>= 1024px)                         */}
        {/* ================================================================= */}

        {/* Desktop Stage Timeline Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Analytical Architecture Stages"
          className="hidden lg:flex items-center justify-center gap-2.5 mb-8 max-w-full relative z-20"
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
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 border cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E2638] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A19] relative z-20 ${
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

        {/* Desktop Main Stage Presentation Grid */}
        <div 
          id={`stage-panel-${activeStage}`}
          role="tabpanel"
          aria-labelledby={`stage-tab-${activeStage}`}
          className="hidden lg:grid gap-8 lg:grid-cols-12 items-stretch"
        >
          {/* Left Column: 4-Zone Structured Visualization Container */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[#D2C7B6]/15 bg-[#1C1A19]/90 shadow-2xl p-4 sm:p-5 overflow-hidden">
            {/* ZONE 1: Dedicated Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#9AA69A] border-b border-[#D2C7B6]/10 pb-2.5 gap-1.5 shrink-0">
              <span className="font-mono font-semibold text-[#6E2638] text-[11px] sm:text-xs">
                STAGE {curr.step} / 05 • {curr.name}
              </span>
              <span className="uppercase tracking-wider text-[9.5px] sm:text-[10px] text-[#FAF6EE]/80 truncate">
                {curr.canvasLabel}
              </span>
            </div>

            {activeStage === 4 ? (
              <IntelligenceInMotion prefersReducedMotion={prefersReducedMotion} />
            ) : activeStage === 2 ? (
              <div className="pt-2">
                <ExecutiveBiDashboard prefersReducedMotion={prefersReducedMotion} />
              </div>
            ) : (
              <>
                {/* ZONE 2: Dedicated Controls / Selectors Row (Responsive Grids, ZERO Horizontal Scrollbars) */}
                {activeStage === 0 && (
                  <div className="pt-2.5 pb-1 shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full">
                      {RAW_SOURCES.map((src, sIdx) => {
                        const isSelected = sIdx === selectedSourceIdx;
                        return (
                          <button
                            key={src.id}
                            type="button"
                            onClick={() => setSelectedSourceIdx(sIdx)}
                            className={`w-full px-2 py-1.5 rounded-lg text-center text-[10px] sm:text-[11px] font-mono transition cursor-pointer border truncate ${
                              isSelected
                                ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                                : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                            }`}
                          >
                            {src.title.split(" ")[0]} ({src.volume.split(" ")[0]})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeStage === 1 && (
                  <div className="pt-2.5 pb-1 shrink-0">
                    <div className="grid grid-cols-5 gap-1 sm:gap-1.5 w-full">
                      {Object.values(ETL_STEPS).map((step) => {
                        const isSelected = step.key === selectedEtlStep;
                        return (
                          <button
                            key={step.key}
                            type="button"
                            onClick={() => setSelectedEtlStep(step.key)}
                            className={`w-full px-1 sm:px-2 py-1.5 rounded-lg text-center text-[9.5px] sm:text-[10.5px] font-mono transition cursor-pointer border truncate ${
                              isSelected
                                ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                                : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                            }`}
                          >
                            <span className="hidden sm:inline">{step.label}</span>
                            <span className="inline sm:hidden">{step.mobileLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}


                {activeStage === 3 && (
                  <div className="pt-2.5 pb-1 space-y-1.5 shrink-0">
                    {/* Row 1: 3 ML Modes */}
                    <div className="grid grid-cols-3 gap-1.5 w-full">
                      <button
                        type="button"
                        onClick={() => setMlView("attention")}
                        className={`w-full px-1.5 py-1.5 rounded-lg text-center text-[10px] sm:text-[11px] font-mono transition cursor-pointer border truncate ${
                          mlView === "attention"
                            ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                            : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                        }`}
                      >
                        ViT Attention
                      </button>
                      <button
                        type="button"
                        onClick={() => setMlView("rollout")}
                        className={`w-full px-1.5 py-1.5 rounded-lg text-center text-[10px] sm:text-[11px] font-mono transition cursor-pointer border truncate ${
                          mlView === "rollout"
                            ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                            : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                        }`}
                      >
                        Saliency Rollout
                      </button>
                      <button
                        type="button"
                        onClick={() => setMlView("hyperplane")}
                        className={`w-full px-1.5 py-1.5 rounded-lg text-center text-[10px] sm:text-[11px] font-mono transition cursor-pointer border truncate ${
                          mlView === "hyperplane"
                            ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                            : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30"
                        }`}
                      >
                        Hyperplane & Matrix
                      </button>
                    </div>

                    {/* Row 2: 8 Head Selector Pills (When in Attention mode) */}
                    {mlView === "attention" && (
                      <div className="grid grid-cols-8 gap-1 w-full pt-0.5">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setSelectedAttentionHead(h)}
                            className={`w-full py-1 rounded text-[9.5px] font-mono font-bold transition cursor-pointer flex items-center justify-center border ${
                              selectedAttentionHead === h
                                ? "bg-[#6E2638] border-[#6E2638] text-[#FAF6EE] shadow-sm"
                                : "bg-[#292725]/80 border-[#D2C7B6]/15 text-[#9AA69A] hover:text-[#FAF6EE]"
                            }`}
                          >
                            H{h + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ZONE 3: Dedicated Main Visualization Area (Canvas) */}
                <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[370px] rounded-2xl bg-[#141312]/60 border border-[#D2C7B6]/10 overflow-hidden my-2.5 shrink-0">
                  <AnalyticalArchitecture2D
                    activeStage={activeStage}
                    prefersReducedMotion={prefersReducedMotion}
                    selectedSourceIdx={selectedSourceIdx}
                    onSelectSource={setSelectedSourceIdx}
                    selectedEtlStep={selectedEtlStep}
                    onSelectEtlStep={setSelectedEtlStep}
                    analysisView={analysisView}
                    onSelectAnalysisView={setAnalysisView}
                    mlView={mlView}
                    onSelectMlView={setMlView}
                    selectedAttentionHead={selectedAttentionHead}
                    onSelectAttentionHead={setSelectedAttentionHead}
                  />
                </div>

                {/* ZONE 4: Dedicated Contextual Information Area (Consistent Height, Zero Layout Shift) */}
                {activeStage === 0 && (
                  <div className="rounded-2xl border border-[#D2C7B6]/20 bg-[#292725] p-3 sm:p-3.5 min-h-[125px] sm:min-h-[135px] flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
                          <span className="text-xs font-bold text-[#FAF6EE] tracking-wide">
                            {currentSource.title} • {currentSource.modality}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#9AA69A]">
                          {currentSource.volume}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-2">
                        <div>
                          <span className="text-[#9AA69A] block font-mono text-[9px]">RAW ENTROPY CHARACTER</span>
                          <span className="text-[#FAF6EE] font-medium text-[10.5px] leading-snug">{currentSource.entropy}</span>
                        </div>
                        <div>
                          <span className="text-[#9AA69A] block font-mono text-[9px]">INPUT DIMENSIONALITY & GRAIN</span>
                          <span className="text-[#FAF6EE] font-medium text-[10.5px] leading-snug">{currentSource.dimensions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#1C1A19]/80 border border-[#D2C7B6]/10 text-xs truncate">
                      <span className="text-[#6E2638] font-bold mr-1">Live Unparsed Payload:</span>
                      <code className="text-[#FAF6EE]/90 text-[10.5px] font-mono break-all">{currentSource.sample}</code>
                    </div>
                  </div>
                )}

                {activeStage === 1 && (
                  <div className="rounded-2xl border border-[#D2C7B6]/20 bg-[#292725] p-3 sm:p-3.5 min-h-[125px] sm:min-h-[135px] flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
                          <span className="text-xs font-bold text-[#FAF6EE] tracking-wide">
                            {currentEtl.name} • {currentEtl.badge}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#9AA69A]">Enterprise Architecture</span>
                      </div>

                      <p className="text-xs text-[#FAF6EE]/90 mb-2 leading-relaxed">
                        {currentEtl.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {currentEtl.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[#D2C7B6]/15 bg-[#1C1A19] px-2 py-0.5 font-mono text-[9.5px] text-[#9AA69A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}


                {activeStage === 3 && (
                  <div className="rounded-2xl border border-[#D2C7B6]/20 bg-[#292725] p-3 sm:p-3.5 min-h-[125px] sm:min-h-[135px] flex flex-col justify-between shrink-0">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#6E2638] animate-pulse" />
                          <span className="text-xs font-bold text-[#FAF6EE] tracking-wide">
                            {mlView === "attention"
                              ? `Vision Transformer ViT-B/16 • Head ${selectedAttentionHead + 1} / 8 Active`
                              : mlView === "rollout"
                              ? "Explainable AI (XAI) • Boundary Contour Rollout vs CNN Grad-CAM"
                              : "Multi-Class Decision Hyperplane • ResNet vs EfficientNet vs ViT"}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#9AA69A]">
                          {mlView === "attention" ? "196 Tokens • 12 Layers" : mlView === "rollout" ? "IoU: 0.89 vs 0.63" : "Test Acc: 96.4%"}
                        </span>
                      </div>

                      <p className="text-xs text-[#FAF6EE]/90 mb-2 leading-relaxed">
                        {mlView === "attention"
                          ? "ViT-B/16 tokenizes 224x224 RGB inputs into 196 linear patch embeddings. The multi-head self-attention mechanism enables global pairwise feature interactions across all tokens simultaneously, resolving spatial long-range dependencies."
                          : mlView === "rollout"
                          ? "Standard CNN Grad-CAM produces diffuse activation blobs that bleed across boundaries, degrading classification on transparent plastics and reflective metal foils. Attention Rollout sharply segments high-frequency specular edges, achieving an IoU fidelity score of 0.89."
                          : "Non-linear decision boundary hyperplanes benchmarked across 6,166 annotated waste images. ViT-B/16 achieves 96.4% test accuracy (Macro F1: 0.962), outperforming EfficientNet-B4 (94.3%) and ResNet-50 (92.1%)."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {["PyTorch ViT-B/16", "Self-Attention Graphs", "Rollout Heatmaps", "Grad-CAM XAI", "Scikit-Learn Evaluator"].map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-[#D2C7B6]/15 bg-[#1C1A19] px-2 py-0.5 font-mono text-[9.5px] text-[#9AA69A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
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
                        className="rounded-lg border border-[#D2C7B6]/20 bg-[#1C1A19] px-3 py-1.5 text-xs font-medium text-[#FAF6EE]"
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
