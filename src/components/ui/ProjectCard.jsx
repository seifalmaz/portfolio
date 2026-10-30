import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaArrowRight, FaChartLine } from "react-icons/fa6";
import Badge from "./Badge";

/**
 * Standardized, future-proof ProjectCard component styled with Sage/Cream/Burgundy palette.
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
    <article
      className="group relative flex h-full w-full flex-col justify-between rounded-2xl border border-[#D2C7B6]/15 bg-[#211f1e] p-6 transition duration-200 ease-out hover:border-[#6E2638] hover:shadow-[0_8px_30px_rgba(110,38,56,0.18)] md:hover:-translate-y-1"
    >
      {/* Top Content Block */}
      <div className="flex flex-1 flex-col">
        {/* A. Category & Key Metric Header */}
        <div className="mb-4 flex h-7 shrink-0 items-center justify-between gap-2.5">
          <Badge variant="burgundy" className="max-w-[60%] truncate text-[11px] font-semibold">
            {project.category || "Case Study"}
          </Badge>

          {topMetric ? (
            <span
              className="shrink-0 max-w-[40%] truncate rounded-full border border-[#D2C7B6]/20 bg-[#292725] px-2.5 py-0.5 text-xs font-semibold text-[#9AA69A]"
              title={`${topMetric.label}: ${topMetric.value}`}
            >
              {topMetric.label}: <strong className="font-bold text-[#FAF6EE]">{topMetric.value}</strong>
            </span>
          ) : (
            <span className="h-5" aria-hidden="true" />
          )}
        </div>

        {/* B. Project Thumbnail (Fixed 16:9 Aspect Ratio) */}
        <Link
          to={`/projects/${project.slug}`}
          className="relative mb-5 block aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl border border-[#D2C7B6]/10 bg-[#292725]"
          tabIndex={-1}
          aria-hidden="true"
        >
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`${project.title} dashboard preview`}
              loading="lazy"
              decoding="async"
              width="480"
              height="270"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            /* Fallback Blueprint Container */
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#292725] via-[#1C1A19] to-[#292725] p-6 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-[#6E2638]/30 bg-[#6E2638]/10 text-[#FAF6EE] shadow-sm">
                <FaChartLine className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9AA69A]">
                {project.category || "Technical Case Study"}
              </span>
            </div>
          )}

          {/* Polished Ambient Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1A19]/90 via-[#1C1A19]/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-40" />
        </Link>

        {/* C. Project Title */}
        <div className="mb-2 flex h-[3.25rem] shrink-0 items-start overflow-hidden">
          <Link to={`/projects/${project.slug}`} className="block w-full">
            <h3
              className="line-clamp-2 text-lg font-bold leading-snug tracking-tight text-[#FAF6EE] transition duration-200 group-hover:text-[#F2E8D5] md:text-xl"
              title={project.title}
            >
              {project.title}
            </h3>
          </Link>
        </div>

        {/* D. Project Description */}
        <div className="mb-4 h-[2.75rem] shrink-0 overflow-hidden text-sm leading-relaxed text-[#9AA69A] font-light">
          <p className="line-clamp-2" title={overviewText}>
            {overviewText || "Explore complete technical breakdown, architecture diagrams, and verified performance benchmarks."}
          </p>
        </div>

        {/* E. Technology Tags */}
        <div className="mb-5 flex h-7 shrink-0 items-center gap-1.5 overflow-hidden">
          {stack.slice(0, 3).map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onTagClick && onTagClick(tech)}
              className="shrink-0 whitespace-nowrap rounded-md border border-[#D2C7B6]/20 bg-[#292725] px-2 py-0.5 text-[11px] font-medium text-[#FAF6EE] transition hover:border-[#6E2638] hover:bg-[#6E2638]/20 focus-visible:outline-2 focus-visible:outline-[#6E2638]"
            >
              {tech}
            </button>
          ))}
          {stack.length > 3 && (
            <span
              className="shrink-0 cursor-default whitespace-nowrap rounded-md border border-[#D2C7B6]/20 bg-[#292725] px-2 py-0.5 text-[11px] font-semibold text-[#9AA69A]"
              title={`Additional technologies: ${stack.slice(3).join(", ")}`}
            >
              +{stack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* F. Footer Actions */}
      <div className="mt-auto flex shrink-0 items-center justify-between border-t border-[#D2C7B6]/10 pt-4">
        {project.githubUrl || project.github ? (
          <a
            href={project.githubUrl || project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs text-[#9AA69A] transition hover:text-[#FAF6EE] focus-visible:outline-2 focus-visible:outline-[#6E2638]"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <FaGithub className="h-3.5 w-3.5" />
            <span>Code</span>
          </a>
        ) : (
          <span className="inline-flex cursor-default items-center gap-1 text-[11px] text-[#687568]" title="Source repository is proprietary or under NDA">
            <FaGithub className="h-3 w-3 opacity-40" />
            <span>Internal</span>
          </span>
        )}

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs font-semibold text-[#6E2638] transition hover:text-[#FAF6EE] focus-visible:outline-2 focus-visible:outline-[#6E2638]"
        >
          <span>View Case Study</span>
          <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
