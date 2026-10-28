import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaChartPie,
  FaDatabase,
  FaCode,
  FaArrowRight,
  FaLink
} from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { usePortfolio } from "../../context/PortfolioContext";

// Explicit verified mapping connecting skills to real projects
const SKILL_PROJECT_MAP = {
  Python: [
    { title: "Waste Classifier", slug: "waste-classifier" },
    { title: "Spotify Dashboard", slug: "spotify-dashboard" },
    { title: "UK Railway Analytics", slug: "railway-dashboard" }
  ],
  PyTorch: [
    { title: "Waste Classifier (ViT & CNN)", slug: "waste-classifier" },
    { title: "Hand Gesture Recognition", slug: "gesture-recognition" }
  ],
  "Vision Transformers": [
    { title: "Waste Classifier (Attention Rollout)", slug: "waste-classifier" }
  ],
  "Computer Vision (OpenCV)": [
    { title: "Waste Classifier", slug: "waste-classifier" },
    { title: "Hand Gesture Recognition", slug: "gesture-recognition" }
  ],
  "Pandas & NumPy": [
    { title: "Spotify Analytics Dashboard", slug: "spotify-dashboard" },
    { title: "UK Railway Data Prep", slug: "railway-dashboard" }
  ],
  "Scikit-Learn": [
    { title: "Waste Classifier Baseline", slug: "waste-classifier" },
    { title: "Spotify Feature Clustering", slug: "spotify-dashboard" }
  ],
  "Power BI": [
    { title: "UK Railway Network & Reliability", slug: "railway-dashboard" },
    { title: "DEPI Executive Dashboards", slug: "railway-dashboard" }
  ],
  "DAX & Data Modeling": [
    { title: "UK Railway Star Schema Measures", slug: "railway-dashboard" }
  ],
  "Plotly & Dash": [
    { title: "Spotify Interactive Web Dashboard", slug: "spotify-dashboard" }
  ],
  Tableau: [
    { title: "DEPI Analytics Trainee Workflows", slug: "railway-dashboard" }
  ],
  SQL: [
    { title: "UK Railway Oracle DB Pipeline", slug: "railway-dashboard" },
    { title: "Banque du Caire Banking Queries", slug: "railway-dashboard" }
  ],
  "Informatica PowerCenter": [
    { title: "Banque du Caire ETL Integration", slug: "railway-dashboard" }
  ],
  "ETL Pipeline Design": [
    { title: "UK Railway Medallion Architecture", slug: "railway-dashboard" },
    { title: "Banque du Caire Data Engineering", slug: "railway-dashboard" }
  ],
  "Data Warehousing": [
    { title: "UK Railway Gold Star Schema", slug: "railway-dashboard" }
  ],
  "C++": [
    { title: "ICPC Competitive Programming & Mentorship", slug: "gesture-recognition" }
  ],
  "Algorithms & Data Structures": [
    { title: "ICPC Community Coaching (50+ Students)", slug: "gesture-recognition" }
  ]
};

const CATEGORIES_METADATA = [
  {
    name: "Data Science & Machine Learning",
    icon: FaBrain,
    desc: "Predictive modeling, deep learning backbones (ViT & CNN), computer vision, and transfer learning.",
    skills: [
      { name: "Python", category: "Core Language" },
      { name: "PyTorch", category: "Deep Learning" },
      { name: "Vision Transformers", category: "Computer Vision" },
      { name: "Computer Vision (OpenCV)", category: "Spatial Processing" },
      { name: "Scikit-Learn", category: "Machine Learning" },
      { name: "Pandas & NumPy", category: "Data Science" },
      { name: "Model Evaluation & Benchmarking", category: "MLOps" }
    ]
  },
  {
    name: "Analytics & Business Intelligence",
    icon: FaChartPie,
    desc: "Transforming multidimensional data into executive DAX metrics, cohort retention models, and interactive BI platforms.",
    skills: [
      { name: "Power BI", category: "Executive Reporting" },
      { name: "DAX & Data Modeling", category: "Analytical Measures" },
      { name: "Plotly & Dash", category: "Interactive Dashboards" },
      { name: "Tableau", category: "Visual Analytics" },
      { name: "Statistical Modeling", category: "Inference" },
      { name: "KPI Root-Cause Analysis", category: "Decision Intelligence" }
    ]
  },
  {
    name: "Data Engineering & Databases",
    icon: FaDatabase,
    desc: "Designing robust multi-tiered ETL pipelines, relational dimensional schemas, and data quality frameworks.",
    skills: [
      { name: "SQL (Oracle & PostgreSQL)", category: "Relational Queries" },
      { name: "Informatica PowerCenter", category: "Enterprise ETL" },
      { name: "ETL Pipeline Design", category: "Data Architecture" },
      { name: "Medallion Star Schema", category: "Data Warehousing" },
      { name: "Data Cleansing & Validation", category: "Data Quality" },
      { name: "XML & Transaction Parsing", category: "Staging Ingestion" }
    ]
  },
  {
    name: "Software Development & Core CS",
    icon: FaCode,
    desc: "Rigorous algorithms, data structures, competitive programming, and modern reactive web development.",
    skills: [
      { name: "C++", category: "Systems & Algorithms" },
      { name: "Algorithms & Data Structures", category: "Algorithmic Rigor" },
      { name: "Competitive Programming", category: "ICPC Community" },
      { name: "JavaScript & React", category: "Frontend Applications" },
      { name: "HTML & Modern CSS", category: "UI/UX Engineering" },
      { name: "Java & Object-Oriented Design", category: "Software Architecture" }
    ]
  }
];

function SkillsSection() {
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState("Python");

  const currentCategory = CATEGORIES_METADATA[activeCatIdx];
  const IconComp = currentCategory.icon;
  const connectedProjects = SKILL_PROJECT_MAP[selectedSkill] || [];

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 bg-[#1C1A19] px-6 py-28 text-[#FAF6EE] border-t border-[#D2C7B6]/15"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="CONNECTED TECHNICAL LANDSCAPE"
          title="Skills, Tools &"
          titleHighlight="Applied Engineering"
          description="A structured presentation of my technical core. Select any skill to view verified case studies where it is actively deployed."
        />

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-[#D2C7B6]/15 pb-4">
          {CATEGORIES_METADATA.map((cat, idx) => {
            const active = idx === activeCatIdx;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCatIdx(idx);
                  if (cat.skills[0]) setSelectedSkill(cat.skills[0].name);
                }}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition duration-200 border ${
                  active
                    ? "border-[#6E2638] bg-[#6E2638] text-[#FAF6EE] shadow-md shadow-[#6E2638]/20"
                    : "border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] hover:text-[#FAF6EE] hover:border-[#D2C7B6]/40"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Connected Architecture Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Interactive Skills Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/40">
                <IconComp className="h-5 w-5 text-[#FAF6EE]" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#FAF6EE] tracking-tight">
                  {currentCategory.name}
                </h3>
                <p className="text-xs text-[#9AA69A] font-light mt-0.5">
                  {currentCategory.desc}
                </p>
              </div>
            </div>

            {/* Grid of Interactive Skill Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {currentCategory.skills.map((s) => {
                const isSelected = s.name === selectedSkill;
                const hasConnections = Boolean(SKILL_PROJECT_MAP[s.name]);

                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSkill(s.name)}
                    className={`flex items-center justify-between rounded-xl p-4 text-left transition-all duration-200 border ${
                      isSelected
                        ? "border-[#6E2638] bg-[#6E2638]/15 shadow-md shadow-[#6E2638]/20"
                        : "border-[#D2C7B6]/15 bg-[#292725]/70 hover:border-[#D2C7B6]/40 hover:bg-[#292725]"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[#FAF6EE]">{s.name}</h4>
                      <p className="text-[11px] text-[#9AA69A] mt-0.5">{s.category}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasConnections && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#6E2638] uppercase">
                          <FaLink className="h-2.5 w-2.5" />
                          <span>Projects</span>
                        </span>
                      )}
                      <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-[#6E2638]" : "bg-[#9AA69A]/40"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Connected Projects Inspector Panel */}
          <div className="lg:col-span-4 rounded-3xl border border-[#D2C7B6]/15 bg-[#292725] p-6 shadow-xl sticky top-28">
            <div className="flex items-center justify-between border-b border-[#D2C7B6]/15 pb-4 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9AA69A]">
                Skill-to-Project Connection
              </span>
              <span className="rounded-full bg-[#6E2638]/20 border border-[#6E2638]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#FAF6EE]">
                {selectedSkill}
              </span>
            </div>

            <p className="text-xs text-[#9AA69A] leading-relaxed mb-6 font-light">
              Selecting <strong className="text-[#FAF6EE] font-semibold">{selectedSkill}</strong> dynamically reveals real portfolio case studies and production code repositories leveraging this tool.
            </p>

            {connectedProjects.length > 0 ? (
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6E2638]">
                  Verified Deployments ({connectedProjects.length})
                </span>
                {connectedProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-[#D2C7B6]/15 bg-[#1C1A19]/80 p-3.5 transition hover:border-[#6E2638] hover:bg-[#6E2638]/10"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-[#FAF6EE] group-hover:text-[#F2E8D5] transition">
                        {p.title}
                      </h5>
                      <span className="text-[10px] text-[#9AA69A]">View case study</span>
                    </div>
                    <FaArrowRight className="h-3 w-3 text-[#9AA69A] transition group-hover:translate-x-1 group-hover:text-[#FAF6EE]" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#D2C7B6]/10 bg-[#1C1A19]/40 p-4 text-center text-xs text-[#9AA69A]">
                Applied broadly across statistical exploratory modeling and academic coursework.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
