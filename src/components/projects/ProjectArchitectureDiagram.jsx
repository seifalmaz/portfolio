import { FaGears, FaDatabase, FaCode, FaChartPie, FaBrain, FaServer, FaSliders } from "react-icons/fa6";

// Keyword-based fallback icon mapper aligned with brand palette
function getStepIcon(stepTitle = "") {
  const t = (stepTitle || "").toLowerCase();
  if (t.includes("extract") || t.includes("sql") || t.includes("data") || t.includes("storage") || t.includes("ingest")) {
    return <FaDatabase className="w-4 h-4 text-sage" />;
  }
  if (t.includes("preprocess") || t.includes("clean") || t.includes("feature") || t.includes("pipeline") || t.includes("prep")) {
    return <FaSliders className="w-4 h-4 text-[#F2E8D5]" />;
  }
  if (t.includes("model") || t.includes("train") || t.includes("neural") || t.includes("ai") || t.includes("learn")) {
    return <FaBrain className="w-4 h-4 text-[#FAF6EE]" />;
  }
  if (t.includes("deploy") || t.includes("api") || t.includes("server") || t.includes("engine") || t.includes("service")) {
    return <FaServer className="w-4 h-4 text-sage" />;
  }
  if (t.includes("dashboard") || t.includes("bi") || t.includes("visual") || t.includes("report") || t.includes("chart")) {
    return <FaChartPie className="w-4 h-4 text-[#F2E8D5]" />;
  }
  return <FaCode className="w-4 h-4 text-sage" />;
}

function ProjectArchitectureDiagram({ architecture, pipeline = [], workflow = [], steps = [], architectureImage }) {
  const stepsList = Array.isArray(pipeline) && pipeline.length > 0
    ? pipeline
    : Array.isArray(workflow) && workflow.length > 0
      ? workflow
      : Array.isArray(steps) && steps.length > 0
        ? steps
        : [];

  const hasArchitectureText = typeof architecture === "string" && architecture.trim() !== "";
  const hasSteps = stepsList.length > 0;
  const hasImage = Boolean(architectureImage);

  if (!hasArchitectureText && !hasSteps && !hasImage) return null;

  return (
    <section className="rounded-2xl border border-[#FAF6EE]/15 bg-[#211f1e] p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 text-burgundy">
        <FaGears className="w-5 h-5 text-[#6E2638]" />
        <h2 className="text-xl font-bold text-[#FAF6EE] tracking-tight">
          System Architecture &amp; Execution Pipeline
        </h2>
      </div>

      {/* High-Level Architecture Diagram Asset */}
      {hasImage && (
        <div className="mb-8 overflow-hidden rounded-xl border border-[#FAF6EE]/15 bg-[#141211] shadow-2xl">
          <div className="px-4 py-2.5 bg-[#292725] border-b border-[#FAF6EE]/10 flex items-center justify-between text-xs text-[#9AA69A]">
            <span className="font-semibold text-[#FAF6EE]">Verified High-Level System Architecture</span>
            <span className="font-mono text-[11px] text-sage">Visual Pipeline Blueprint</span>
          </div>
          <div className="p-2 sm:p-4 bg-[#1C1A19] flex items-center justify-center">
            <img
              src={architectureImage}
              alt="System Architecture Diagram"
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-[600px] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Visual Pipeline Flow */}
      {hasSteps && (
        <div className={hasArchitectureText ? "mb-8" : ""}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {stepsList.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between p-5 rounded-xl border border-[#FAF6EE]/10 bg-[#292725]/60 backdrop-blur-sm transition hover:border-burgundy/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-burgundy/20 text-[#FAF6EE] text-xs font-bold border border-burgundy/40">
                      {idx + 1}
                    </span>
                    {step?.icon || getStepIcon(step?.title)}
                  </div>
                  {step?.title && (
                    <h3 className="text-sm font-bold text-[#FAF6EE] mb-2">
                      {step.title}
                    </h3>
                  )}
                  {step?.description && (
                    <p className="text-xs text-[#9AA69A] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  )}
                </div>

                {step?.tech && (
                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[11px] font-mono font-medium text-sage bg-sage/10 px-2 py-0.5 rounded border border-sage/20">
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
