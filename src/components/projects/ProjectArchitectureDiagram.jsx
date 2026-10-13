import { FaGears, FaDatabase, FaCode, FaChartPie, FaBrain, FaServer, FaSliders } from "react-icons/fa6";

// Keyword-based fallback icon mapper
function getStepIcon(stepTitle = "") {
  const t = (stepTitle || "").toLowerCase();
  if (t.includes("extract") || t.includes("sql") || t.includes("data") || t.includes("storage") || t.includes("ingest")) {
    return <FaDatabase className="w-4 h-4 text-blue-400" />;
  }
  if (t.includes("preprocess") || t.includes("clean") || t.includes("feature") || t.includes("pipeline") || t.includes("prep")) {
    return <FaSliders className="w-4 h-4 text-indigo-400" />;
  }
  if (t.includes("model") || t.includes("train") || t.includes("neural") || t.includes("ai") || t.includes("learn")) {
    return <FaBrain className="w-4 h-4 text-purple-400" />;
  }
  if (t.includes("deploy") || t.includes("api") || t.includes("server") || t.includes("engine") || t.includes("service")) {
    return <FaServer className="w-4 h-4 text-emerald-400" />;
  }
  if (t.includes("dashboard") || t.includes("bi") || t.includes("visual") || t.includes("report") || t.includes("chart")) {
    return <FaChartPie className="w-4 h-4 text-amber-400" />;
  }
  return <FaCode className="w-4 h-4 text-cyan-400" />;
}

function ProjectArchitectureDiagram({ architecture, pipeline = [], workflow = [], steps = [] }) {
  const stepsList = Array.isArray(pipeline) && pipeline.length > 0
    ? pipeline
    : Array.isArray(workflow) && workflow.length > 0
      ? workflow
      : Array.isArray(steps) && steps.length > 0
        ? steps
        : [];

  const hasArchitectureText = typeof architecture === "string" && architecture.trim() !== "";
  const hasSteps = stepsList.length > 0;

  if (!hasArchitectureText && !hasSteps) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 text-blue-400">
        <FaGears className="w-5 h-5" />
        <h2 className="text-xl font-bold text-white tracking-tight">
          System Architecture &amp; Execution Pipeline
        </h2>
      </div>

      {/* Visual Pipeline Flow */}
      {hasSteps && (
        <div className={hasArchitectureText ? "mb-8" : ""}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {stepsList.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition hover:border-blue-500/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                      {idx + 1}
                    </span>
                    {step?.icon || getStepIcon(step?.title)}
                  </div>
                  {step?.title && (
                    <h3 className="text-sm font-bold text-white mb-2">
                      {step.title}
                    </h3>
                  )}
                  {step?.description && (
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  )}
                </div>

                {step?.tech && (
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[11px] font-medium text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {step.tech}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Narrative Architecture Description */}
      {hasArchitectureText && (
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-300 text-sm leading-relaxed font-light">
          <strong className="text-white block mb-1 font-semibold">
            Pipeline Architecture Flow:
          </strong>
          {architecture}
        </div>
      )}
    </section>
  );
}

export default ProjectArchitectureDiagram;
