import { motion } from "framer-motion";
import { FaGithub, FaGlobe, FaArrowLeft, FaCalendar, FaUserGear, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ProjectHeader({ project }) {
  if (!project) return null;

  const stack = project.technologies || project.techStack || [];
  const githubLink = project.githubUrl || project.github;
  const demoLink = project.liveDemoUrl || project.liveDemo;

  return (
    <div className="relative mb-12 border-b border-white/10 pb-10">
      {/* Back to Projects link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition mb-6 group"
      >
        <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {project.category && <Badge variant="burgundy">{project.category}</Badge>}
        {project.timeline && (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#9AA69A] bg-[#FAF6EE]/5 border border-[#FAF6EE]/10 px-3 py-1 rounded-full font-medium">
            <FaCalendar className="w-3 h-3 text-burgundy" />
            {project.timeline}
          </span>
        )}
        {project.role && (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#F2E8D5] bg-[#FAF6EE]/5 border border-[#FAF6EE]/10 px-3 py-1 rounded-full font-medium">
            <FaUserGear className="w-3 h-3 text-sage" />
            {project.role}
          </span>
        )}
        {project.team && (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#F2E8D5] bg-[#FAF6EE]/5 border border-[#FAF6EE]/10 px-3 py-1 rounded-full font-medium">
            <FaUsers className="w-3 h-3 text-sage" />
            {project.team}
          </span>
        )}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FAF6EE] tracking-tight leading-tight mb-4"
      >
        {project.title}
      </motion.h1>

      {project.subtitle && (
        <p className="text-lg text-[#F2E8D5]/80 max-w-3xl leading-relaxed mb-6 font-light">
          {project.subtitle}
        </p>
      )}

      {/* Tech Stack Chips */}
      {stack.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium text-[#FAF6EE] bg-burgundy/15 border border-burgundy/30 px-3 py-1 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {(demoLink || githubLink) && (
        <div className="flex flex-wrap items-center gap-4">
          {demoLink && (
            <Button href={demoLink} target="_blank" rel="noopener noreferrer" variant="burgundy" className="gap-2 text-xs">
              <FaGlobe className="w-4 h-4" />
              Live Demo
            </Button>
          )}
          {githubLink && (
            <Button href={githubLink} target="_blank" rel="noopener noreferrer" variant="outline" className="gap-2 text-xs">
              <FaGithub className="w-4 h-4" />
              View Source Code
            </Button>
          )}
        </div>
      )}

      {/* Key Metrics Strip if available */}
      {project.keyMetrics && project.keyMetrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 p-6 rounded-2xl border border-[#FAF6EE]/15 bg-[#211f1e]">
          {project.keyMetrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xs font-medium text-sage uppercase tracking-wider mb-1">
                {m.label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#FAF6EE] tracking-tight">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectHeader;
