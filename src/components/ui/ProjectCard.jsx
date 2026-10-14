import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight, FaChartLine } from "react-icons/fa6";
import Badge from "./Badge";

/**
 * Standardized, future-proof ProjectCard component.
 * Guarantees identical dimensions, aligned section baselines,
 * 16:9 aspect-ratio media with robust fallbacks, and pinned footers.
 */
function ProjectCard({ project, onTagClick }) {
  const [imgError, setImgError] = useState(false);

  if (!project) return null;

  const topMetric = project.keyMetrics && project.keyMetrics.length > 0 ? project.keyMetrics[0] : null;
  const stack = project.technologies || project.techStack || [];
  const overviewText = project.tagline || project.subtitle || project.overview || project.businessProblem || "";
  const thumbnailSrc = !imgError && project.thumbnail ? project.thumbnail : null;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full w-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    >
      {/* Top Content Block */}
      <div className="flex flex-1 flex-col">
        {/* A. Category & Key Metric Header (Strict h-7 baseline) */}
        <div className="mb-4 flex h-7 shrink-0 items-center justify-between gap-2.5">
          <Badge variant="blue" className="max-w-[60%] truncate text-[11px] font-semibold">
            {project.category || "Case Study"}
          </Badge>

          {topMetric ? (
            <span
              className="shrink-0 max-w-[40%] truncate rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400"
              title={`${topMetric.label}: ${topMetric.value}`}
            >
              {topMetric.label}: <strong className="font-bold text-white">{topMetric.value}</strong>
            </span>
          ) : (
            <span className="h-5" aria-hidden="true" />
          )}
        </div>

        {/* B. Project Thumbnail / Dashboard Preview (Fixed 16:9 Aspect Ratio) */}
        <Link
          to={`/projects/${project.slug}`}
          className="relative mb-5 block aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl border border-white/5 bg-slate-900"
          tabIndex={-1}
          aria-hidden="true"
        >
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`${project.title} dashboard preview`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            /* Graceful Fallback Blueprint Container */
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-950 p-6 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <FaChartLine className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {project.category || "Technical Case Study"}
              </span>
            </div>
          )}

          {/* Polished Ambient Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
        </Link>

        {/* C. Project Title (Strict 2-line reserved height) */}
        <div className="mb-2 flex h-[3.25rem] shrink-0 items-start overflow-hidden">
          <Link to={`/projects/${project.slug}`} className="block w-full">
            <h3
              className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-white transition duration-200 group-hover:text-blue-400 md:text-xl"
              title={project.title}
            >
              {project.title}
            </h3>
          </Link>
        </div>

        {/* D. Project Description (Strict 2-line reserved height) */}
        <div className="mb-4 h-[2.75rem] shrink-0 overflow-hidden text-sm leading-relaxed text-gray-400">
          <p className="line-clamp-2" title={overviewText}>
            {overviewText || "Explore complete technical breakdown, architecture diagrams, and verified performance benchmarks."}
          </p>
        </div>

        {/* E. Technology Tags (Strict single-row h-7, never wraps) */}
        <div className="mb-5 flex h-7 shrink-0 items-center gap-1.5 overflow-hidden">
          {stack.slice(0, 3).map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onTagClick && onTagClick(tech)}
              className="shrink-0 whitespace-nowrap rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-gray-300 transition hover:border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              {tech}
            </button>
          ))}
          {stack.length > 3 && (
            <span
              className="shrink-0 cursor-default whitespace-nowrap rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-400 transition hover:bg-blue-500/20"
              title={`Additional technologies: ${stack.slice(3).join(", ")}`}
            >
              +{stack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* F. Footer Actions (Always pinned to bottom via mt-auto) */}
      <div className="mt-auto flex shrink-0 items-center justify-between border-t border-white/10 pt-4">
        {project.githubUrl || project.github ? (
          <a
            href={project.githubUrl || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs text-gray-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <FaGithub className="h-3.5 w-3.5" />
            <span>Code</span>
          </a>
        ) : (
          <span className="inline-flex cursor-default items-center gap-1 text-[11px] text-gray-500" title="Source repository is proprietary or under NDA">
            <FaGithub className="h-3 w-3 opacity-40" />
            <span>Internal</span>
          </span>
        )}

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs font-semibold text-blue-400 transition hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-blue-400"
        >
          <span>View Case Study</span>
          <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
