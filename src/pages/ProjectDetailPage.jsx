import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        <div>
          <h1 className="text-4xl font-bold text-red-400">Project Not Found</h1>
          <p className="mt-4 text-gray-400">The case study you are looking for does not exist.</p>
          <Link
            to="/projects"
            className="mt-6 inline-block rounded-full bg-blue-500 px-6 py-2 font-medium text-white hover:bg-blue-600 transition"
          >
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition">Projects</Link>
          <span>/</span>
          <span className="text-blue-400">{project.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 mb-4">
            {project.category}
          </span>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-3 text-xl text-gray-300 font-light">{project.subtitle}</p>
        </div>

        {/* Metrics Grid */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {project.keyMetrics.map((metric, idx) => (
            <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{metric.value}</p>
              <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Content Shell */}
        <div className="space-y-12 text-gray-300 leading-relaxed">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-4">Business Problem</h2>
            <p>{project.businessProblem}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-4">Objectives</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-block rounded-full border border-blue-400/50 bg-blue-500/10 px-8 py-3 text-blue-300 font-medium hover:bg-blue-500/20 transition"
          >
            &larr; Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
