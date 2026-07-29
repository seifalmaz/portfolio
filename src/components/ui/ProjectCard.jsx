import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa6";
import Badge from "./Badge";

function ProjectCard({ project }) {
  const topMetric = project.keyMetrics && project.keyMetrics[0];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]"
    >
      <div>
        {/* Top Header & Category */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <Badge variant="blue">{project.category}</Badge>
          {topMetric && (
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              {topMetric.label}: <strong className="text-white">{topMetric.value}</strong>
            </span>
          )}
        </div>

        {/* Thumbnail Image if available */}
        {project.thumbnail && (
          <div className="relative mb-5 overflow-hidden rounded-xl h-44 w-full bg-slate-900">
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white transition duration-200 group-hover:text-blue-400">
          {project.title}
        </h3>

        {/* Tagline / Problem Solved */}
        <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[11px] font-medium text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[11px] font-medium text-gray-500 px-1 py-0.5">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Action Links */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-white"
            aria-label={`GitHub Repository for ${project.title}`}
          >
            <FaGithub className="h-3.5 w-3.5" />
            Code
          </a>
        ) : (
          <span />
        )}

        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 transition hover:text-blue-300 group-hover:translate-x-0.5"
        >
          View Case Study
          <FaArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
