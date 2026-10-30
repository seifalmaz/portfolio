import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";

// Local Visual Assets for Flagship Showcase
import wasteVitAttention from "../../assets/projects/waste-classifier/vit_attention_rollout.webp";
import wasteArchitecture from "../../assets/projects/waste-classifier/architecture.svg";
import spotifyComparison from "../../assets/projects/spotify-dashboard/comparison.png";
import spotifyArchitecture from "../../assets/projects/spotify-dashboard/architecture.svg";
import railwayPowerBiOverview from "../../assets/projects/railway-dashboard/powerbi_network_revenue.png";
import railwayArchitecture from "../../assets/projects/railway-dashboard/architecture.webp";
import gestureDemo1 from "../../assets/projects/gesture-recognition/gesture-recognition-demo-1.webp";
import gestureArchitecture from "../../assets/projects/gesture-recognition/architecture.svg";

const FLAGSHIPS = [
  {
    id: "waste-classifier",
    slug: "waste-classifier",
    title: "Waste Classifier — Intelligent Recycling System",
    subtitle: "Vision Transformer (ViT) & Deep CNN with Explainable Attention Rollout",
    category: "Computer Vision • Deep Learning",
    tagline: "Municipal waste classification across paper, glass, metal, plastic, and organic matter with real-time explainability.",
    metric: "96.4% Test Accuracy",
    submetric: "Sub-30ms Inference",
    tech: ["Python", "PyTorch", "Vision Transformers", "ResNet-50", "OpenCV"],
    githubUrl: "https://github.com/seifalmaz/waste-classifier",
    primaryImage: wasteVitAttention,
    secondaryImage: wasteArchitecture,
    details: [
      { label: "Architecture", val: "ViT-B/16 + ResNet & EfficientNet" },
      { label: "Explainability", val: "Self-Attention Rollout heatmaps" },
      { label: "Categories", val: "Paper, Glass, Metal, Plastic, Organic" }
    ]
  },
  {
    id: "spotify-dashboard",
    slug: "spotify-dashboard",
    title: "Spotify Analytics Dashboard",
    subtitle: "Interactive Dash & Plotly Audio Feature Exploration Engine",
    category: "Data Analytics • Exploratory Analysis",
    tagline: "Comprehensive audio feature analysis, popularity correlation modeling, and genre acoustic distributions.",
    metric: "114,000+ Track Cohort",
    submetric: "Multi-Region EDA",
    tech: ["Python", "Dash", "Plotly", "Pandas", "Statistical Modeling"],
    githubUrl: "https://github.com/seifalmaz/spotify-analytics-dashboard",
    primaryImage: spotifyComparison,
    secondaryImage: spotifyArchitecture,
    details: [
      { label: "Dashboard Engine", val: "Dash & Plotly interactive web app" },
      { label: "Analysis Scope", val: "Valence, Energy, Danceability vs Popularity" },
      { label: "Data Pipeline", val: "Outlier filtering & z-score standardization" }
    ]
  },
  {
    id: "railway-dashboard",
    slug: "railway-dashboard",
    title: "UK Railway Analytics — End-to-End BI System",
    subtitle: "Enterprise Medallion Architecture (Oracle SQL) & Power BI Dashboards",
    category: "Data Engineering • Business Intelligence",
    tagline: "Transforming 31,653 passenger records through Bronze/Silver/Gold layers into an analytical star schema with Power BI executive reporting.",
    metric: "£741.92K Ticket Revenue",
    submetric: "90.68% Punctuality",
    tech: ["Oracle SQL", "Power BI", "DAX", "Star Schema", "Python ETL"],
    githubUrl: "https://github.com/seifalmaz/Railway_Data_System",
    primaryImage: railwayPowerBiOverview,
    secondaryImage: railwayArchitecture,
    details: [
      { label: "Storage Engine", val: "Oracle Database (Schema SEIF)" },
      { label: "Schema Design", val: "Gold Star Schema with 6 Dimension tables" },
      { label: "Reliability Analysis", val: "1,062 delays (5.34%) & cancellation causes" }
    ]
  },
  {
    id: "gesture-recognition",
    slug: "gesture-recognition",
    title: "Hand Gesture Recognition & Explainable AI",
    subtitle: "Real-Time Computer Vision with Optical Webcam Pipeline",
    category: "Computer Vision • Deep Learning",
    tagline: "Diagnosing infrared-to-webcam generalization shifts with hand localization and leak-free evaluation pipelines.",
    metric: "99.1% Model Accuracy",
    submetric: "60 FPS Processing",
    tech: ["Python", "PyTorch", "OpenCV", "CUDA", "LeapGestRecog"],
    githubUrl: "https://github.com/seifalmaz/gesture-recognition",
    primaryImage: gestureDemo1,
    secondaryImage: gestureArchitecture,
    details: [
      { label: "Domain Adaptation", val: "Infrared dataset to optical webcam transfer" },
      { label: "Hardware Pipeline", val: "CUDA GPU accelerated inference" },
      { label: "Evaluation", val: "Leak-free subject-isolated train/test splits" }
    ]
  }
];

function FeaturedProjectsSection() {
  const { projects: contextProjects } = usePortfolio();

  const [activeFlagshipIdx, setActiveFlagshipIdx] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState("primary"); // 'primary' | 'secondary'
  const [catalogFilter, setCatalogFilter] = useState("ALL");

  const currentFlagship = FLAGSHIPS[activeFlagshipIdx];

  // Filter catalog items with useMemo to prevent recomputation on unrelated state changes
  const filteredProjects = useMemo(() => {
    const list = Array.isArray(contextProjects) ? contextProjects : [];
    return list.filter((p) => {
      if (catalogFilter === "ALL") return true;
      if (catalogFilter === "CV" && (p.category?.includes("Vision") || p.category?.includes("Learning"))) return true;
      if (catalogFilter === "BI" && (p.category?.includes("Analytics") || p.category?.includes("Intelligence"))) return true;
      if (catalogFilter === "ENG" && (p.category?.includes("Engineering") || p.category?.includes("Database"))) return true;
      return true;
    });
  }, [contextProjects, catalogFilter]);

  return (
    <section
      id="projects"
      data-section="projects"
      className="relative scroll-mt-24 bg-[#1C1A19] px-6 py-28 text-[#FAF6EE] border-t border-[#D2C7B6]/15"
    >
      <span id="featured-projects" className="absolute -top-24" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          subtitle="ENGINEERING PORTFOLIO"
          title="Verified Case Studies &"
          titleHighlight="Flagship Systems"
          description="Explore production-grade implementations spanning Computer Vision, end-to-end data pipelines, executive Power BI dashboards, and deep neural architectures."
        />

        {/* ================================================================= */}
        {/* 1. CINEMATIC FLAGSHIP PRODUCT SHOWCASE (Apple Keynote Presentation) */}
        {/* ================================================================= */}
        <div className="mb-20 rounded-3xl border border-[#D2C7B6]/15 bg-[#211f1e] p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Flagship Selector Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 border-b border-[#D2C7B6]/15 mb-8">
            {FLAGSHIPS.map((f, idx) => {
              const isSelected = idx === activeFlagshipIdx;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFlagshipIdx(idx);
                    setActiveViewMode("primary");
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition duration-200 border ${
                    isSelected
                      ? "border-[#6E2638] bg-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/25"
                      : "border-[#D2C7B6]/20 bg-[#1C1A19]/50 text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/40"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FAF6EE]" />
                  <span>{f.category.split("•")[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Flagship Content */}
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Left: Interactive Media Viewport */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#D2C7B6]/20 bg-[#1C1A19] overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeViewMode === "primary" ? currentFlagship.primaryImage : currentFlagship.secondaryImage}
                    src={activeViewMode === "primary" ? currentFlagship.primaryImage : (currentFlagship.secondaryImage || currentFlagship.primaryImage)}
                    alt={`${currentFlagship.title} verified asset`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${
                      activeViewMode === "secondary"
                        ? "object-contain bg-[#1C1A19] p-1 sm:p-2"
                        : "object-cover object-top"
                    }`}
                  />
                </AnimatePresence>

                {/* Sub-view toggle if secondary image exists */}
                {currentFlagship.secondaryImage && (
                  <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full border border-[#D2C7B6]/20 bg-[#1C1A19] px-3 py-1.5 shadow-md text-xs">
                    <button
                      onClick={() => setActiveViewMode("primary")}
                      className={`px-2.5 py-1 rounded-full font-medium transition ${
                        activeViewMode === "primary" ? "bg-[#6E2638] text-[#FAF6EE]" : "text-[#9AA69A] hover:text-[#FAF6EE]"
                      }`}
                    >
                      Interface
                    </button>
                    <button
                      onClick={() => setActiveViewMode("secondary")}
                      className={`px-2.5 py-1 rounded-full font-medium transition ${
                        activeViewMode === "secondary" ? "bg-[#6E2638] text-[#FAF6EE]" : "text-[#9AA69A] hover:text-[#FAF6EE]"
                      }`}
                    >
                      Architecture
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Technical Narrative & Deep-Dive Information */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <span className="inline-block rounded-full border border-[#6E2638]/40 bg-[#6E2638]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3">
                  {currentFlagship.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#FAF6EE] tracking-tight leading-tight">
                  {currentFlagship.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#9AA69A]">
                  {currentFlagship.subtitle}
                </p>
              </div>

              {/* Tagline */}
              <p className="text-sm text-[#FAF6EE]/90 leading-relaxed font-light">
                {currentFlagship.tagline}
              </p>

              {/* Key Metrics Callouts */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3.5">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#9AA69A]">
                    Primary Benchmark
                  </span>
                  <div className="text-lg font-black text-[#FAF6EE] mt-0.5">
                    {currentFlagship.metric}
                  </div>
                </div>
                <div className="rounded-xl border border-[#D2C7B6]/15 bg-[#1C1A19] p-3.5">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#9AA69A]">
                    Throughput / Scale
                  </span>
                  <div className="text-lg font-black text-[#6E2638] mt-0.5">
                    {currentFlagship.submetric}
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2 border-t border-[#D2C7B6]/15 pt-4 text-xs">
                {currentFlagship.details.map((d) => (
                  <div key={d.label} className="flex justify-between items-center text-[#9AA69A]">
                    <span className="font-medium">{d.label}:</span>
                    <span className="text-[#FAF6EE] font-semibold text-right max-w-[65%] truncate">
                      {d.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/projects/${currentFlagship.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] shadow-md shadow-[#6E2638]/25 transition hover:bg-[#451824]"
                >
                  <span>Explore Deep-Dive</span>
                  <FaArrowRight className="h-3 w-3" />
                </Link>

                {currentFlagship.githubUrl && (
                  <a
                    href={currentFlagship.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D2C7B6]/20 bg-[#1C1A19]/70 px-5 py-2.5 text-xs font-semibold text-[#FAF6EE] transition hover:bg-[#FAF6EE]/15 hover:border-[#D2C7B6]/40"
                  >
                    <FaGithub className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. COMPLETE ALL-PROJECTS CATALOG OVERVIEW (Fast Grid Access)        */}
        {/* ================================================================= */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#FAF6EE] tracking-tight">
                Complete Project Catalog
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA69A] mt-1">
                Direct access to all verified case studies, data models, and analytical tools.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {[
                { label: "All Projects", key: "ALL" },
                { label: "Computer Vision & ML", key: "CV" },
                { label: "Analytics & BI", key: "BI" },
                { label: "Data Engineering", key: "ENG" }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCatalogFilter(f.key)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    catalogFilter === f.key
                      ? "bg-[#6E2638] text-[#FAF6EE]"
                      : "bg-[#292725] text-[#9AA69A] hover:text-[#FAF6EE]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3-Column Standardized Card Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch">
            {filteredProjects.map((project) => (
              <div key={project.id || project.slug} className="flex h-full flex-col">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Direct Link to Dedicated Catalog Page */}
          <div className="mt-16 text-center">
            <Link to="/projects">
              <Button variant="outline">
                Explore Full Catalog Table with Metrics &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjectsSection;
