import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../ui/ProjectCard";
import ProjectEmptyState from "./ProjectEmptyState";

function ProjectGrid({ projects = [], loading = false, onResetFilters, onTagClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-96 rounded-2xl border border-white/5 bg-slate-900/40 animate-pulse p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-white/10 rounded-full" />
              <div className="h-44 bg-white/5 rounded-xl" />
              <div className="h-6 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-full bg-white/5 rounded" />
            </div>
            <div className="h-8 w-full bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <ProjectEmptyState onReset={onResetFilters} />;
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {projects.map((project) => (
          <motion.div
            key={project.id || project.slug}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} onTagClick={onTagClick} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProjectGrid;
