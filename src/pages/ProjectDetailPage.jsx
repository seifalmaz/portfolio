import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import ProjectHeader from "../components/projects/ProjectHeader";
import RelatedProjects from "../components/projects/RelatedProjects";
import ProjectNav from "../components/projects/ProjectNav";
import ProjectArchitectureDiagram from "../components/projects/ProjectArchitectureDiagram";
import ProjectMetricsDeepDive from "../components/projects/ProjectMetricsDeepDive";
import ProjectCodeSnippet from "../components/projects/ProjectCodeSnippet";
import ProjectGallery from "../components/projects/ProjectGallery";
import { useProject } from "../hooks/useProject";
import {
  FaCircleCheck,
  FaLightbulb,
  FaChartLine,
  FaTriangleExclamation,
  FaSliders,
  FaRocket,
  FaComments
} from "react-icons/fa6";

function ProjectDetailPage() {
  const { slug } = useParams();
  const { project, relatedProjects, adjacentProjects, loading, error } = useProject(slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll restoration to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black pt-32 pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6 animate-pulse space-y-8">
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-10 w-3/4 bg-white/10 rounded" />
            <div className="h-6 w-1/2 bg-white/5 rounded" />
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !project) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
          <div className="p-8 rounded-2xl border border-white/10 bg-slate-950/60 max-w-md">
            <h1 className="text-3xl font-bold text-rose-400 mb-2">Project Not Found</h1>
            <p className="text-gray-400 text-sm mb-6">
              The case study you are looking for does not exist or may have been moved.
            </p>
            <Link
              to="/projects"
              className="inline-block rounded-full bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition"
            >
              Back to All Projects
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Normalized content resolution for optional sections
  const problemText = project.businessProblem || project.problem || project.businessContext;
  const methodologyText = project.methodology || project.dataPreparation;
  const featuresList = project.keyFeatures || project.features || [];
  const challengesList = project.challengesAndSolutions || project.challenges || [];
  const resultsList = project.resultsAndImpact || project.results || project.businessImpact || [];
  const businessInsightsList = project.businessInsights || project.insights || [];
  const lessonsList = project.lessonsLearned || project.lessons || [];
  const futureImprovementsList = project.futureImprovements || project.nextSteps || [];

  return (
    <PageTransition>
      {/* Reading scroll progress indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 origin-left z-50 pointer-events-none"
      />

      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-white transition">Projects</Link>
            <span>/</span>
            <span className="text-blue-400 font-medium">{project.title}</span>
          </div>

          {/* Project Header Banner */}
          <ProjectHeader project={project} />

          {/* Main Content Case Study Breakdown */}
          <div className="space-y-12 text-gray-300 leading-relaxed font-light">
            {/* 1. Visual Artifacts Gallery (Optional) */}
            <ProjectGallery
              gallery={project.gallery}
              images={project.images}
              screenshots={project.screenshots}
            />

            {/* 2. Business Problem & Context (Optional) */}
            {problemText && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <FaLightbulb className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Business Problem &amp; Context</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">{problemText}</p>
              </section>
            )}

            {/* 3. Core Objectives (Optional) */}
            {Array.isArray(project.objectives) && project.objectives.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <FaCircleCheck className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Core Objectives</h2>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {project.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white/5 p-3.5 rounded-xl border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      <span className="text-gray-300">{obj}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 4. Methodology & Data Preparation (Optional) */}
            {methodologyText && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-indigo-400">
                  <FaSliders className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Methodology &amp; Data Preparation</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">{methodologyText}</p>
              </section>
            )}

            {/* 5. System Architecture & Pipeline (Optional) */}
            <ProjectArchitectureDiagram
              architecture={project.architecture}
              pipeline={project.pipeline}
              workflow={project.workflow}
            />

            {/* 6. Quantitative Metrics & Dataset Characteristics (Optional) */}
            <ProjectMetricsDeepDive
              datasetDescription={project.datasetDescription}
              dataset={project.dataset}
              metricsDeepDive={project.metricsDeepDive}
              metrics={project.metrics}
              benchmarkTable={project.benchmarkTable}
            />

            {/* 7. Key Code & Query Logic Snippets (Optional) */}
            <ProjectCodeSnippet
              snippets={project.codeSnippets}
              codeSnippets={project.snippets}
            />

            {/* 8. Key Features & Capabilities (Optional) */}
            {Array.isArray(featuresList) && featuresList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white tracking-tight mb-4">Key Capabilities &amp; Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {featuresList.map((feat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-white font-medium">{feat}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. Challenges & Applied Solutions (Optional) */}
            {Array.isArray(challengesList) && challengesList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6 text-amber-400">
                  <FaTriangleExclamation className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Challenges &amp; Applied Solutions</h2>
                </div>
                <div className="space-y-4">
                  {challengesList.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-white/10 bg-white/5 space-y-2">
                      <p className="text-sm font-semibold text-rose-300">
                        <strong>Challenge:</strong> {item.challenge}
                      </p>
                      <p className="text-sm text-emerald-300">
                        <strong>Solution:</strong> {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 10. Business Insights & Discoveries (Optional) */}
            {Array.isArray(businessInsightsList) && businessInsightsList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-amber-400">
                  <FaComments className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Business Insights &amp; Findings</h2>
                </div>
                <ul className="space-y-3 text-sm">
                  {businessInsightsList.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold">•</span>
                      <span className="text-gray-200">{insight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 11. Results & Business Impact (Optional) */}
            {Array.isArray(resultsList) && resultsList.length > 0 && (
              <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <FaChartLine className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Results &amp; Measurable Impact</h2>
                </div>
                <ul className="space-y-3 text-sm">
                  {resultsList.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className="text-gray-200">{res}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 12. Lessons Learned (Optional) */}
            {Array.isArray(lessonsList) && lessonsList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white tracking-tight mb-4">Engineering Lessons Learned</h2>
                <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                  {lessonsList.map((lesson, idx) => (
                    <li key={idx}>{lesson}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* 13. Future Roadmap & Improvements (Optional) */}
            {Array.isArray(futureImprovementsList) && futureImprovementsList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4 text-cyan-400">
                  <FaRocket className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-white tracking-tight">Future Roadmap &amp; Improvements</h2>
                </div>
                <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                  {futureImprovementsList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Previous / Next Navigation (Optional) */}
          <ProjectNav prev={adjacentProjects.prev} next={adjacentProjects.next} />

          {/* Related Projects (Optional) */}
          <RelatedProjects projects={relatedProjects} />
        </div>
      </div>
    </PageTransition>
  );
}

export default ProjectDetailPage;
