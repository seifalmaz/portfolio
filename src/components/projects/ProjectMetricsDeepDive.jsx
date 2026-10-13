import { FaChartLine, FaDatabase } from "react-icons/fa6";

function ProjectMetricsDeepDive({ 
  datasetDescription, 
  dataset, 
  metricsDeepDive = [], 
  metrics = [],
  benchmarkTable = []
}) {
  const datasetText = typeof datasetDescription === "string" && datasetDescription.trim() !== ""
    ? datasetDescription
    : typeof dataset === "string" && dataset.trim() !== ""
      ? dataset
      : null;

  const rawList = Array.isArray(metricsDeepDive) && metricsDeepDive.length > 0
    ? metricsDeepDive
    : Array.isArray(metrics) && metrics.length > 0
      ? metrics
      : [];

  const metricsList = rawList.filter((m) => m && (m.label || m.name) && m.value);
  const hasBenchmark = Array.isArray(benchmarkTable) && benchmarkTable.length > 0;

  if (!datasetText && metricsList.length === 0 && !hasBenchmark) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 text-blue-400">
        <FaChartLine className="w-5 h-5" />
        <h2 className="text-xl font-bold text-white tracking-tight">
          Quantitative Metrics &amp; Candidate Models Benchmark
        </h2>
      </div>

      {/* Dataset Specification if present */}
      {datasetText && (
        <div className="mb-6 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-200">
            <FaDatabase className="w-4 h-4 text-blue-400" />
            Dataset Scope &amp; Characteristics
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            {datasetText}
          </p>
        </div>
      )}

      {/* Candidate Models Benchmark Table if present */}
      {hasBenchmark && (
        <div className="mb-8 rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden shadow-lg">
          <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Candidate Models Empirical Evaluation (Independent Test Split)
            </span>
            <span className="text-[11px] text-gray-400 font-mono">
              LeapGestRecog Subject 09 · 800 Unseen Samples
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-slate-950 text-gray-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Model Architecture</th>
                  <th className="py-3 px-4 text-center">Test Acc</th>
                  <th className="py-3 px-4 text-center">Macro F1</th>
                  <th className="py-3 px-4 text-center">Precision</th>
                  <th className="py-3 px-4 text-center">Recall</th>
                  <th className="py-3 px-4 text-center">Latency</th>
                  <th className="py-3 px-4 text-center">Throughput</th>
                  <th className="py-3 px-4 text-center">Size</th>
                  <th className="py-3 px-4 text-right">Params</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {benchmarkTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.isSelected
                        ? "bg-blue-500/10 font-medium text-white border-l-2 border-l-blue-400"
                        : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                      {row.isSelected ? (
                        <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
                      )}
                      <span>{row.model}</span>
                    </td>
                    <td className={`py-3 px-4 text-center font-bold ${row.isSelected ? "text-blue-300 font-mono text-sm" : "text-gray-300 font-mono"}`}>
                      {row.accuracy}
                    </td>
                    <td className="py-3 px-4 text-center font-mono">{row.f1}</td>
                    <td className="py-3 px-4 text-center text-gray-400 font-mono">{row.precision}</td>
                    <td className="py-3 px-4 text-center text-gray-400 font-mono">{row.recall}</td>
                    <td className="py-3 px-4 text-center font-mono text-cyan-300">{row.latency}</td>
                    <td className="py-3 px-4 text-center font-mono text-emerald-300">{row.fps} FPS</td>
                    <td className="py-3 px-4 text-center text-gray-300 font-mono">{row.size}</td>
                    <td className="py-3 px-4 text-right font-mono text-gray-400">{row.params}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deep Dive Metrics Cards */}
      {metricsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricsList.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col justify-between hover:border-white/10 transition"
            >
              <div>
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {item.label || item.name}
                </div>
                <div className="text-2xl font-bold text-white tracking-tight mb-2 text-blue-400">
                  {item.value}
                </div>
              </div>
              {(item.detail || item.description) && (
                <p className="text-xs text-gray-400 pt-2 border-t border-white/5 font-light leading-relaxed">
                  {item.detail || item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectMetricsDeepDive;
