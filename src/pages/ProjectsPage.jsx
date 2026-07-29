import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
            PORTFOLIO CATALOG
          </p>
          <h1 className="text-4xl font-bold md:text-6xl">
            All Projects &amp; <span className="text-blue-400">Case Studies</span>
          </h1>
          <p className="mt-4 max-w-2xl text-gray-400">
            Explore complete technical breakdowns, system architectures, machine learning models, and analytics dashboards.
          </p>
        </div>

        {/* Temporary Projects Grid Shell */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div>
                <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {project.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {project.techStack.slice(0, 3).join(" • ")}
                </span>
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-xs font-semibold text-blue-400 hover:underline"
                >
                  View Case Study &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
