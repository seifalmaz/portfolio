import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrainSubway,
  FaSpotify,
  FaArrowRotateLeft,
  FaSterlingSign,
  FaClock,
  FaRoute,
  FaCircleExclamation,
  FaMusic,
  FaBolt,
  FaStar,
  FaChartSimple,
  FaLightbulb,
  FaFilter
} from "react-icons/fa6";

// -----------------------------------------------------------------------------
// VERIFIED DATASETS (UK RAILWAY ANALYTICS & SPOTIFY AUDIO INTELLIGENCE)
// -----------------------------------------------------------------------------
const DASHBOARD_DATA = {
  railway: {
    id: "railway",
    name: "UK Railway Analytics",
    subtitle: "Enterprise Power BI Semantic Model • Oracle Star Schema",
    icon: FaTrainSubway,
    filterName: "Operational Filter",
    filters: [
      { id: "all", label: "All Journeys" },
      { id: "peak", label: "Peak Hours" },
      { id: "offpeak", label: "Off-Peak" }
    ],
    kpis: {
      all: [
        {
          label: "GROSS REVENUE",
          value: "£741.92K",
          context: "31,653 ticket sales",
          indicator: "+4.8%",
          icon: FaSterlingSign,
          accent: "#6E2638"
        },
        {
          label: "PUNCTUALITY SLA",
          value: "90.68%",
          context: "18,019 on-time runs",
          indicator: "SLA: 90%",
          icon: FaClock,
          accent: "#9AA69A"
        },
        {
          label: "UNIQUE JOURNEYS",
          value: "19,871",
          context: "32 station termini",
          indicator: "Verified",
          icon: FaRoute,
          accent: "#D2C7B6"
        },
        {
          label: "CANCELLATION RATE",
          value: "3.98%",
          context: "790 cancelled trips",
          indicator: "Disrupted",
          icon: FaCircleExclamation,
          accent: "#6E2638"
        }
      ],
      peak: [
        {
          label: "GROSS REVENUE",
          value: "£482.25K",
          context: "20,410 rush tickets",
          indicator: "65.0% Rev",
          icon: FaSterlingSign,
          accent: "#6E2638"
        },
        {
          label: "PUNCTUALITY SLA",
          value: "88.42%",
          context: "9,938 on-time runs",
          indicator: "-1.58% SLA",
          icon: FaClock,
          accent: "#6E2638"
        },
        {
          label: "UNIQUE JOURNEYS",
          value: "11,240",
          context: "Peak commuter slots",
          indicator: "Rush Slots",
          icon: FaRoute,
          accent: "#D2C7B6"
        },
        {
          label: "CANCELLATION RATE",
          value: "4.65%",
          context: "522 cancelled trips",
          indicator: "Peak Impact",
          icon: FaCircleExclamation,
          accent: "#6E2638"
        }
      ],
      offpeak: [
        {
          label: "GROSS REVENUE",
          value: "£259.67K",
          context: "11,243 leisure fares",
          indicator: "35.0% Rev",
          icon: FaSterlingSign,
          accent: "#6E2638"
        },
        {
          label: "PUNCTUALITY SLA",
          value: "93.15%",
          context: "8,081 on-time runs",
          indicator: "+3.15% SLA",
          icon: FaClock,
          accent: "#9AA69A"
        },
        {
          label: "UNIQUE JOURNEYS",
          value: "8,631",
          context: "Regular interval runs",
          indicator: "Optimal",
          icon: FaRoute,
          accent: "#D2C7B6"
        },
        {
          label: "CANCELLATION RATE",
          value: "3.10%",
          context: "268 cancelled trips",
          indicator: "Low Risk",
          icon: FaCircleExclamation,
          accent: "#9AA69A"
        }
      ]
    },
    primaryChart: {
      title: "Monthly Revenue & Punctuality Reliability Trend",
      subtitle: "Gross Ticket Sales (£K) vs On-Time Performance (%)",
      series: [
        { month: "Jan '24", rev: 178.4, onTime: 91.2, delayMin: 2.05, journeys: 4890 },
        { month: "Feb '24", rev: 182.1, onTime: 90.8, delayMin: 2.12, journeys: 4940 },
        { month: "Mar '24", rev: 194.8, onTime: 89.4, delayMin: 2.37, journeys: 5120 },
        { month: "Apr '24", rev: 186.6, onTime: 91.3, delayMin: 1.85, journeys: 4921 }
      ]
    },
    secondaryViews: {
      ticketClasses: {
        title: "Revenue by Ticket Class",
        subtitle: "Gross Sales Share & Booking Grain",
        items: [
          { label: "Advance Booking", pct: 54.0, val: "£400.6K", count: "17,092 tix", color: "#6E2638" },
          { label: "Off-Peak Fares", pct: 32.0, val: "£237.4K", count: "10,129 tix", color: "#9AA69A" },
          { label: "Anytime Open", pct: 14.0, val: "£103.9K", count: "4,432 tix", color: "#D2C7B6" }
        ]
      },
      delayCauses: {
        title: "Delay Cause Distribution",
        subtitle: "Root Cause of 1,062 Disrupted Journeys",
        items: [
          { label: "Weather Incidents", pct: 32.0, val: "340 runs", count: "Wind & flooding", color: "#6E2638" },
          { label: "Rolling Stock Tech", pct: 28.0, val: "297 runs", count: "Mechanical failure", color: "#9AA69A" },
          { label: "Signal Infrastructure", pct: 24.0, val: "255 runs", count: "Network Rail circuits", color: "#D2C7B6" },
          { label: "Crew & Staffing", pct: 16.0, val: "170 runs", count: "Roster gaps", color: "#7A6B63" }
        ]
      }
    },
    insights: [
      {
        tag: "Punctuality Target",
        title: "Network Reliability Exceeds 90% SLA Benchmark",
        detail: "90.68% of 19,871 scheduled train runs arrived strictly on time at their destination, confirming network resilience across 32 inter-city stations."
      },
      {
        tag: "Commercial Stability",
        title: "Advance Bookings Anchor 54% of Network Revenue",
        detail: "Advance fares (£400.6K) provide high passenger demand visibility, mitigating the volatility of on-the-day peak walk-up ticket purchases."
      },
      {
        tag: "Bottleneck Recovery",
        title: "Seasonal Disruption Peaked in March (2.37 min Avg Delay)",
        detail: "Weather and signal constraints in March increased delays before timetable buffer adjustments reduced average delays to a low of 1.85 min in April."
      }
    ]
  },
  spotify: {
    id: "spotify",
    name: "Spotify Audio Intelligence",
    subtitle: "Plotly Dash Exploratory BI • 54,465 Cleaned Tracks",
    icon: FaSpotify,
    filterName: "Catalog Cohort",
    filters: [
      { id: "all", label: "All Cohorts" },
      { id: "modern", label: "Modern (2015+)" },
      { id: "legacy", label: "Legacy (2000-14)" }
    ],
    kpis: {
      all: [
        {
          label: "AUDITED TRACKS",
          value: "54,465",
          context: "Filtered from 114K+",
          indicator: "Cleaned",
          icon: FaMusic,
          accent: "#6E2638"
        },
        {
          label: "HIGH-ENERGY SHARE",
          value: "58.4%",
          context: "Energy coefficient > 0.6",
          indicator: "r = +0.68",
          icon: FaBolt,
          accent: "#9AA69A"
        },
        {
          label: "BAYESIAN POPULARITY",
          value: "51.8",
          context: "Prior weight m=500",
          indicator: "m = 500",
          icon: FaStar,
          accent: "#D2C7B6"
        },
        {
          label: "AVG DANCEABILITY",
          value: "0.62",
          context: "Across 7 dimensions",
          indicator: "Trending",
          icon: FaChartSimple,
          accent: "#6E2638"
        }
      ],
      modern: [
        {
          label: "AUDITED TRACKS",
          value: "31,240",
          context: "Streaming era catalog",
          indicator: "57.3% Cat",
          icon: FaMusic,
          accent: "#6E2638"
        },
        {
          label: "HIGH-ENERGY SHARE",
          value: "62.1%",
          context: "Dense electronic mix",
          indicator: "+3.7% Rise",
          icon: FaBolt,
          accent: "#9AA69A"
        },
        {
          label: "BAYESIAN POPULARITY",
          value: "56.2",
          context: "Active streaming tracks",
          indicator: "Velocity",
          icon: FaStar,
          accent: "#D2C7B6"
        },
        {
          label: "AVG DANCEABILITY",
          value: "0.65",
          context: "Rhythm-first production",
          indicator: "Decade Peak",
          icon: FaChartSimple,
          accent: "#6E2638"
        }
      ],
      legacy: [
        {
          label: "AUDITED TRACKS",
          value: "23,225",
          context: "Pre-streaming catalog",
          indicator: "Physical",
          icon: FaMusic,
          accent: "#6E2638"
        },
        {
          label: "HIGH-ENERGY SHARE",
          value: "53.5%",
          context: "Organic instruments",
          indicator: "Acoustic",
          icon: FaBolt,
          accent: "#9AA69A"
        },
        {
          label: "BAYESIAN POPULARITY",
          value: "45.9",
          context: "Long-tail back catalog",
          indicator: "Regularized",
          icon: FaStar,
          accent: "#D2C7B6"
        },
        {
          label: "AVG DANCEABILITY",
          value: "0.58",
          context: "Diverse tempos",
          indicator: "Dynamic",
          icon: FaChartSimple,
          accent: "#6E2638"
        }
      ]
    },
    primaryChart: {
      title: "Acoustic Feature Evolution Across Decades",
      subtitle: "Energy, Danceability & Acousticness Trajectory (2000–2023)",
      series: [
        { era: "2000–2007", energy: 0.58, danceability: 0.57, acousticness: 0.38, tracks: 14850 },
        { era: "2008–2014", energy: 0.63, danceability: 0.61, acousticness: 0.28, tracks: 16400 },
        { era: "2015–2019", energy: 0.67, danceability: 0.64, acousticness: 0.23, tracks: 12215 },
        { era: "2020–2023", energy: 0.69, danceability: 0.66, acousticness: 0.21, tracks: 11000 }
      ]
    },
    secondaryViews: {
      genres: {
        title: "Genre Share & Popularity Spread",
        subtitle: "Bayesian-Adjusted Popularity Benchmarks",
        items: [
          { label: "Pop & Mainstream", pct: 34.5, val: "Score: 68.2", count: "18,790 tracks", color: "#6E2638" },
          { label: "Hip-Hop & Urban", pct: 26.2, val: "Score: 64.5", count: "14,269 tracks", color: "#9AA69A" },
          { label: "Rock & Alternative", pct: 18.8, val: "Score: 54.1", count: "10,239 tracks", color: "#D2C7B6" },
          { label: "Electronic & Dance", pct: 12.5, val: "Score: 52.3", count: "6,808 tracks", color: "#7A6B63" },
          { label: "Indie & Acoustic", pct: 8.0, val: "Score: 44.8", count: "4,357 tracks", color: "#A8586A" }
        ]
      }
    },
    insights: [
      {
        tag: "Audio Dynamics",
        title: "Multivariate Correlation (r = +0.68) Governs Playlists",
        detail: "Energy and Danceability exhibit strong covariance, with modern recommendation engines heavily biasing towards tracks occupying high-valence quadrants."
      },
      {
        tag: "Production Evolution",
        title: "Acousticness Contracted 34% Across Modern Cohorts",
        detail: "Tracks produced post-2015 show a steep reduction in acoustic instruments in favor of side-chained electronic synths and normalized loudness envelopes."
      },
      {
        tag: "Ranking Regularization",
        title: "Bayesian Shrinkage (m=500) Neutralizes Niche Outliers",
        detail: "Applying Bayesian prior weighting stabilized genre rankings, preventing micro-genres with small track samples from skewing popularity leaderboards."
      }
    ]
  }
};

export default function ExecutiveBiDashboard({ prefersReducedMotion = false }) {
  const [activeDataset, setActiveDataset] = useState("railway");
  const [activeFilter, setActiveFilter] = useState("all");
  const [secondaryViewMode, setSecondaryViewMode] = useState("ticketClasses");
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

  const dataset = DASHBOARD_DATA[activeDataset];
  const activeKpis = dataset.kpis[activeFilter] || dataset.kpis.all;

  // Handle dataset switch
  const handleDatasetSwitch = (newDs) => {
    setActiveDataset(newDs);
    setActiveFilter("all");
    setHoveredDataPoint(null);
    setHoveredBarIndex(null);
    if (newDs === "railway") {
      setSecondaryViewMode("ticketClasses");
    } else {
      setSecondaryViewMode("genres");
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setActiveFilter("all");
    setHoveredDataPoint(null);
    setHoveredBarIndex(null);
  };

  const IconComponent = dataset.icon;

  return (
    <div className="w-full flex flex-col justify-between space-y-3 sm:space-y-3.5">
      {/* --------------------------------------------------------------------- */}
      {/* 1. EXECUTIVE DASHBOARD HEADER (Title, Dataset Selector, Filter, Reset) */}
      {/* --------------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#292725]/60 p-2.5 sm:p-3 space-y-2 shrink-0">
        {/* Top Row: Title + Live Badge (Left) & Dataset Selector (Right) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6E2638] text-[#FAF6EE] shadow-sm shrink-0">
              <IconComponent className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#FAF6EE] tracking-tight truncate">
                  Business Intelligence Overview
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#1C1A19] border border-[#D2C7B6]/20 px-2 py-0.5 text-[9px] font-mono text-[#9AA69A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6E2638] animate-pulse" />
                  Executive Mode
                </span>
              </div>
            </div>
          </div>

          {/* Dataset Switcher Group */}
          <div className="inline-flex rounded-lg border border-[#D2C7B6]/15 bg-[#1C1A19]/80 p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => handleDatasetSwitch("railway")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-medium transition cursor-pointer ${
                activeDataset === "railway"
                  ? "bg-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                  : "text-[#9AA69A] hover:text-[#FAF6EE]"
              }`}
            >
              <FaTrainSubway className="h-2.5 w-2.5" />
              <span>UK Railway</span>
            </button>
            <button
              type="button"
              onClick={() => handleDatasetSwitch("spotify")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono font-medium transition cursor-pointer ${
                activeDataset === "spotify"
                  ? "bg-[#6E2638] text-[#FAF6EE] shadow-sm font-bold"
                  : "text-[#9AA69A] hover:text-[#FAF6EE]"
              }`}
            >
              <FaSpotify className="h-2.5 w-2.5" />
              <span>Spotify</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Subtitle (Left) & Operational Filter Pills + Reset (Right) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#D2C7B6]/10 text-[11px] text-[#9AA69A]">
          <p className="truncate font-light text-[10.5px]">
            {dataset.subtitle}
          </p>

          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
            {/* Filter Pills */}
            <div className="inline-flex rounded-lg border border-[#D2C7B6]/15 bg-[#1C1A19]/80 p-0.5">
              {dataset.filters.map((flt) => {
                const isSelected = activeFilter === flt.id;
                return (
                  <button
                    key={flt.id}
                    type="button"
                    onClick={() => setActiveFilter(flt.id)}
                    className={`rounded-md px-2 py-0.5 text-[9.5px] sm:text-[10px] font-mono transition cursor-pointer ${
                      isSelected
                        ? "bg-[#FAF6EE] text-[#1C1A19] font-bold shadow-sm"
                        : "text-[#9AA69A] hover:text-[#FAF6EE]"
                    }`}
                  >
                    {flt.label}
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset Filters"
              className="flex items-center gap-1 rounded-lg border border-[#D2C7B6]/15 bg-[#1C1A19]/80 px-2 py-0.5 text-[10px] text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/30 transition cursor-pointer"
            >
              <FaArrowRotateLeft className="h-2.5 w-2.5" />
              <span className="font-mono text-[9px]">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 2. EXECUTIVE KPI CARDS ROW (4 Metric Cards in 1 Row)                   */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 shrink-0">
        {activeKpis.map((kpi, idx) => {
          const KpiIcon = kpi.icon;
          return (
            <motion.div
              key={`${activeDataset}-${activeFilter}-${kpi.label}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="group relative overflow-hidden rounded-xl border border-[#D2C7B6]/15 bg-[#292725]/80 p-2.5 sm:p-3 hover:border-[#6E2638]/40 transition duration-200"
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-75"
                style={{
                  background: `linear-gradient(90deg, ${kpi.accent} 0%, transparent 100%)`
                }}
              />

              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-mono text-[9px] sm:text-[9.5px] uppercase tracking-wider text-[#9AA69A] font-semibold truncate">
                  {kpi.label}
                </span>
                <KpiIcon className="h-3 w-3 text-[#9AA69A] group-hover:text-[#FAF6EE] transition shrink-0" />
              </div>

              <div className="text-base sm:text-xl lg:text-[22px] font-black text-[#FAF6EE] tracking-tight leading-none mb-1">
                {kpi.value}
              </div>

              <div className="flex items-center justify-between text-[9px] sm:text-[9.5px] text-[#9AA69A] pt-1 border-t border-[#D2C7B6]/10 font-mono">
                <span className="truncate">{kpi.context}</span>
                <span className="text-[8.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#1C1A19] border border-[#D2C7B6]/15 text-[#FAF6EE]/90 shrink-0 ml-1">
                  {kpi.indicator}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 3. MAIN VISUALIZATION AREA: BALANCED 2-COLUMN LAYOUT                   */}
      {/* Primary Chart (~62% Left) + Secondary Chart (~38% Right)              */}
      {/* --------------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 shrink-0">
        {/* PRIMARY CHART: Large Trend Visualization */}
        <div className="lg:col-span-7 rounded-2xl border border-[#D2C7B6]/15 bg-[#141312]/70 p-3 flex flex-col justify-between relative overflow-hidden">
          {/* Header & Legend */}
          <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2 mb-2">
            <div>
              <h4 className="text-xs font-bold text-[#FAF6EE] tracking-wide">
                {dataset.primaryChart.title}
              </h4>
              <p className="text-[10px] text-[#9AA69A] font-mono">
                {dataset.primaryChart.subtitle}
              </p>
            </div>

            {/* Legend Chips */}
            <div className="flex items-center gap-2 font-mono text-[9px] text-[#9AA69A]">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[#6E2638]" />
                {activeDataset === "railway" ? "Gross Rev" : "Energy"}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FAF6EE]" />
                {activeDataset === "railway" ? "Punctuality" : "Danceability"}
              </span>
            </div>
          </div>

          {/* SVG Vector Chart Canvas */}
          <div className="relative w-full h-[155px] sm:h-[165px]">
            {activeDataset === "railway" ? (
              // RAILWAY MONTHLY REVENUE & PUNCTUALITY DUAL-AXIS CHART
              <svg viewBox="0 0 480 160" className="w-full h-full" preserveAspectRatio="none">
                {/* Horizontal Gridlines */}
                {[25, 48, 70, 100, 135].map((y) => (
                  <line
                    key={y}
                    x1="32"
                    y1={y}
                    x2="465"
                    y2={y}
                    stroke="#D2C7B6"
                    strokeOpacity={y === 48 ? "0.15" : "0.08"}
                    strokeDasharray={y === 48 ? "4 4" : "2 3"}
                  />
                ))}

                {/* Y-Axis Reference Labels (Banded Dual Axis) */}
                <text x="28" y="27" fill="#FAF6EE" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="end">92%</text>
                <text x="28" y="47" fill="#9AA69A" fontSize="7.5" fontFamily="monospace" textAnchor="end">90%</text>
                <text x="28" y="74" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">£200k</text>
                <text x="28" y="104" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">£180k</text>
                <text x="28" y="137" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">£160k</text>

                {/* Bars for Monthly Revenue (Lower Band Y=65..135) */}
                {dataset.primaryChart.series.map((item, idx) => {
                  const barW = 44;
                  const colX = 75 + idx * 105;
                  const normRev = (item.rev - 160) / 45;
                  const barH = normRev * 68;
                  const barY = 135 - barH;
                  const isHovered = hoveredDataPoint === idx;

                  return (
                    <g
                      key={item.month}
                      onMouseEnter={() => setHoveredDataPoint(idx)}
                      onMouseLeave={() => setHoveredDataPoint(null)}
                      className="cursor-pointer transition-opacity"
                    >
                      {/* Bar Rectangle with Rounded Top */}
                      <rect
                        x={colX - barW / 2}
                        y={barY}
                        width={barW}
                        height={barH}
                        rx="4"
                        fill={isHovered ? "#8B2F47" : "#6E2638"}
                        stroke={isHovered ? "#FAF6EE" : "rgba(210, 199, 182, 0.25)"}
                        strokeWidth="1"
                        className="transition duration-150"
                      />

                      {/* Bar Value Label - Placed cleanly above bar */}
                      <text
                        x={colX}
                        y={barY - 4}
                        fill={isHovered ? "#FAF6EE" : "#D2C7B6"}
                        fontSize="8.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        £{item.rev}k
                      </text>

                      {/* X-Axis Month Label */}
                      <text
                        x={colX}
                        y="150"
                        fill="#FAF6EE"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}

                {/* Line Spline for Punctuality % (Upper Band Y=16..46) */}
                {(() => {
                  const pts = dataset.primaryChart.series.map((item, idx) => {
                    const colX = 75 + idx * 105;
                    const normPunct = (item.onTime - 88.5) / 3.5;
                    const py = 46 - normPunct * 28;
                    return { x: colX, y: py, item, idx };
                  });

                  const pathD = pts.reduce((acc, p, i) => {
                    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
                  }, "");

                  return (
                    <g>
                      {/* Smooth Trend Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#FAF6EE"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />

                      {/* Line Nodes */}
                      {pts.map((p) => {
                        const isHovered = hoveredDataPoint === p.idx;
                        return (
                          <g
                            key={p.idx}
                            onMouseEnter={() => setHoveredDataPoint(p.idx)}
                            onMouseLeave={() => setHoveredDataPoint(null)}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={isHovered ? 5.5 : 4}
                              fill="#1C1A19"
                              stroke="#FAF6EE"
                              strokeWidth="2"
                              className="transition duration-150"
                            />
                            <text
                              x={p.x}
                              y={p.y - 6}
                              fill="#FAF6EE"
                              fontSize="8"
                              fontWeight="bold"
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              {p.item.onTime}%
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>
            ) : (
              // SPOTIFY LONGITUDINAL FEATURE TRAJECTORY
              <svg viewBox="0 0 480 160" className="w-full h-full" preserveAspectRatio="none">
                {/* Horizontal Gridlines */}
                {[30, 65, 100, 135].map((y) => (
                  <line
                    key={y}
                    x1="30"
                    y1={y}
                    x2="465"
                    y2={y}
                    stroke="#D2C7B6"
                    strokeOpacity="0.08"
                    strokeDasharray="2 3"
                  />
                ))}

                <text x="25" y="34" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">0.70</text>
                <text x="25" y="69" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">0.50</text>
                <text x="25" y="104" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">0.30</text>
                <text x="25" y="139" fill="#9AA69A" fontSize="8" fontFamily="monospace" textAnchor="end">0.10</text>

                {(() => {
                  const series = dataset.primaryChart.series;
                  const ptsEnergy = series.map((s, idx) => ({
                    x: 75 + idx * 105,
                    y: 135 - ((s.energy - 0.1) / 0.65) * 110,
                    val: s.energy,
                    era: s.era,
                    idx
                  }));

                  const ptsDance = series.map((s, idx) => ({
                    x: 75 + idx * 105,
                    y: 135 - ((s.danceability - 0.1) / 0.65) * 110,
                    val: s.danceability,
                    era: s.era,
                    idx
                  }));

                  const ptsAcoustic = series.map((s, idx) => ({
                    x: 75 + idx * 105,
                    y: 135 - ((s.acousticness - 0.1) / 0.65) * 110,
                    val: s.acousticness,
                    era: s.era,
                    idx
                  }));

                  const makePath = (pts) => pts.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "");

                  return (
                    <g>
                      {/* Energy Trend */}
                      <path d={makePath(ptsEnergy)} fill="none" stroke="#6E2638" strokeWidth="2.5" />
                      {/* Danceability Trend */}
                      <path d={makePath(ptsDance)} fill="none" stroke="#FAF6EE" strokeWidth="2" strokeDasharray="4 2" />
                      {/* Acousticness Decline */}
                      <path d={makePath(ptsAcoustic)} fill="none" stroke="#9AA69A" strokeWidth="1.8" />

                      {series.map((s, idx) => {
                        const cx = 75 + idx * 105;
                        const isHovered = hoveredDataPoint === idx;
                        return (
                          <g
                            key={s.era}
                            onMouseEnter={() => setHoveredDataPoint(idx)}
                            onMouseLeave={() => setHoveredDataPoint(null)}
                            className="cursor-pointer"
                          >
                            <line
                              x1={cx}
                              y1="25"
                              x2={cx}
                              y2="135"
                              stroke={isHovered ? "#FAF6EE" : "transparent"}
                              strokeWidth="1"
                              strokeDasharray="2 2"
                            />
                            <circle cx={cx} cy={ptsEnergy[idx].y} r="3.5" fill="#6E2638" stroke="#FAF6EE" strokeWidth="1.2" />
                            <circle cx={cx} cy={ptsDance[idx].y} r="3.5" fill="#FAF6EE" />
                            <circle cx={cx} cy={ptsAcoustic[idx].y} r="3" fill="#9AA69A" />
                            <text
                              x={cx}
                              y="150"
                              fill="#FAF6EE"
                              fontSize="8.5"
                              fontWeight="600"
                              fontFamily="monospace"
                              textAnchor="middle"
                            >
                              {s.era}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>
            )}

            {/* Hover Tooltip Overlay */}
            {hoveredDataPoint !== null && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 right-2 pointer-events-none rounded-lg border border-[#D2C7B6]/20 bg-[#1C1A19]/95 px-2.5 py-1.5 shadow-xl text-[10px] font-mono z-10"
              >
                {activeDataset === "railway" ? (
                  <div>
                    <span className="text-[#FAF6EE] font-bold block">
                      {dataset.primaryChart.series[hoveredDataPoint].month}
                    </span>
                    <span className="text-[#6E2638] font-bold block">
                      Gross Rev: £{dataset.primaryChart.series[hoveredDataPoint].rev}k
                    </span>
                    <span className="text-[#9AA69A] block">
                      On-Time: {dataset.primaryChart.series[hoveredDataPoint].onTime}%
                    </span>
                    <span className="text-[#D2C7B6] block">
                      Volume: {dataset.primaryChart.series[hoveredDataPoint].journeys.toLocaleString()} Journeys
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-[#FAF6EE] font-bold block">
                      Era: {dataset.primaryChart.series[hoveredDataPoint].era}
                    </span>
                    <span className="text-[#6E2638] font-bold block">
                      Energy: {dataset.primaryChart.series[hoveredDataPoint].energy}
                    </span>
                    <span className="text-[#FAF6EE] block">
                      Danceability: {dataset.primaryChart.series[hoveredDataPoint].danceability}
                    </span>
                    <span className="text-[#9AA69A] block">
                      Acousticness: {dataset.primaryChart.series[hoveredDataPoint].acousticness}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* SECONDARY CHART: Distribution Breakdown & Proportions */}
        <div className="lg:col-span-5 rounded-2xl border border-[#D2C7B6]/15 bg-[#141312]/70 p-3 flex flex-col justify-between">
          {/* Header & Sub-Toggle */}
          <div className="flex items-center justify-between border-b border-[#D2C7B6]/10 pb-2 mb-2">
            <div>
              <h4 className="text-xs font-bold text-[#FAF6EE] tracking-wide">
                {activeDataset === "railway"
                  ? secondaryViewMode === "ticketClasses"
                    ? "Revenue by Ticket Class"
                    : "Delay Causes Breakdown"
                  : "Genre Market Share & Popularity"}
              </h4>
              <p className="text-[10px] text-[#9AA69A] font-mono">
                {activeDataset === "railway" ? "Commercial & Operational Grain" : "Bayesian Weighted Index"}
              </p>
            </div>

            {/* Toggle button for Railway (Ticket vs Delay) */}
            {activeDataset === "railway" && (
              <button
                type="button"
                onClick={() =>
                  setSecondaryViewMode((m) => (m === "ticketClasses" ? "delayCauses" : "ticketClasses"))
                }
                className="rounded-md border border-[#D2C7B6]/20 bg-[#1C1A19] px-2 py-0.5 text-[9px] font-mono text-[#FAF6EE] hover:border-[#6E2638] transition cursor-pointer"
              >
                {secondaryViewMode === "ticketClasses" ? "View Delays" : "View Tickets"}
              </button>
            )}
          </div>

          {/* Interactive Breakdown Progress Rows */}
          <div className="space-y-2 py-1">
            {(() => {
              const items =
                activeDataset === "railway"
                  ? dataset.secondaryViews[secondaryViewMode].items
                  : dataset.secondaryViews.genres.items;

              return items.map((item, idx) => {
                const isHovered = hoveredBarIndex === idx;
                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="p-1.5 rounded-lg border border-transparent hover:border-[#D2C7B6]/15 hover:bg-[#1C1A19]/50 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[10.5px] font-medium text-[#FAF6EE] mb-1">
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">{item.label}</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#FAF6EE] font-bold shrink-0 ml-1">
                        {typeof item.pct === "number" ? item.pct.toFixed(1) : item.pct}% ({item.val})
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 bg-[#1C1A19] rounded-full overflow-hidden border border-[#D2C7B6]/10">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.pct}%`,
                          backgroundColor: item.color,
                          opacity: isHovered ? 1 : 0.85
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-[#9AA69A] mt-0.5">
                      <span>{item.count}</span>
                      {isHovered && <span className="text-[#FAF6EE] font-semibold">Active Segment</span>}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 4. KEY ANALYTICAL INSIGHTS PANEL (3 Structured Findings)              */}
      {/* --------------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#D2C7B6]/15 bg-[#292725]/50 p-2.5 sm:p-3 shrink-0">
        <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#D2C7B6]/10">
          <FaLightbulb className="h-3.5 w-3.5 text-[#6E2638]" />
          <h4 className="text-[11px] font-bold tracking-wider uppercase font-mono text-[#FAF6EE]">
            Key Analytical Insights • Verified Findings
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {dataset.insights.map((ins, idx) => (
            <div
              key={ins.tag}
              className="p-2 rounded-xl bg-[#1C1A19]/60 border border-[#D2C7B6]/10 hover:border-[#6E2638]/30 transition"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6E2638] shrink-0" />
                <span className="text-[9.5px] font-mono font-bold text-[#FAF6EE] uppercase tracking-wide truncate">
                  {ins.tag}
                </span>
              </div>
              <h5 className="text-[10.5px] font-bold text-[#FAF6EE] leading-tight mb-1">
                {ins.title}
              </h5>
              <p className="text-[10px] text-[#FAF6EE]/80 leading-relaxed font-light">
                {ins.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
