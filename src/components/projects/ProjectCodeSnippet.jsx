import { useState } from "react";
import { FaCheck, FaCopy, FaTerminal } from "react-icons/fa6";

function ProjectCodeSnippet({ snippets = [], codeSnippets = [] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const rawList = Array.isArray(snippets) && snippets.length > 0
    ? snippets
    : Array.isArray(codeSnippets) && codeSnippets.length > 0
      ? codeSnippets
      : snippets && typeof snippets === "object"
        ? [snippets]
        : [];

  const items = rawList.filter((s) => s && s.code);

  if (items.length === 0) return null;

  const currentSnippet = items[activeTab] || items[0];

  const handleCopy = () => {
    if (!currentSnippet?.code) return;
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-2xl border border-[#FAF6EE]/15 bg-[#211f1e] p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 text-burgundy">
        <FaTerminal className="w-5 h-5" />
        <h2 className="text-xl font-bold text-[#FAF6EE] tracking-tight">
          Key Implementation Logic &amp; Code Artifacts
        </h2>
      </div>

      {/* Tabs if multiple snippets */}
      {items.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-[#FAF6EE]/10 pb-3">
          {items.map((snip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setCopied(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === idx
                  ? "bg-burgundy text-[#FAF6EE] shadow-lg shadow-burgundy/30"
                  : "bg-white/5 text-[#9AA69A] hover:text-white hover:bg-white/10"
              }`}
            >
              {snip.title || `Snippet ${idx + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* Code Box */}
      <div className="rounded-xl border border-[#FAF6EE]/15 bg-[#1a1817] overflow-hidden">
        {/* Code Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-[#FAF6EE]/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-[#9AA69A]">
              {currentSnippet?.language ? currentSnippet.language.toUpperCase() : "CODE"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-[#9AA69A] hover:text-white transition px-2.5 py-1 rounded bg-white/5 hover:bg-white/10"
            aria-label="Copy Code"
          >
            {copied ? (
              <>
                <FaCheck className="w-3 h-3 text-sage" />
                <span className="text-sage">Copied</span>
              </>
            ) : (
              <>
                <FaCopy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <pre className="p-4 overflow-x-auto text-xs font-mono text-[#F2E8D5]/90 leading-relaxed bg-[#141211]">
          <code>{currentSnippet?.code || ""}</code>
        </pre>

        {/* Snippet Description Note */}
        {currentSnippet?.description && (
          <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 text-xs text-gray-400">
            <strong className="text-gray-300">Technical Note: </strong>
            {currentSnippet.description}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectCodeSnippet;
