import { useState, useEffect, useRef, useCallback } from "react";
import { 
  FaMagnifyingGlassPlus, 
  FaMagnifyingGlassMinus, 
  FaArrowsRotate, 
  FaExpand, 
  FaArrowsLeftRight,
  FaChevronLeft,
  FaChevronRight,
  FaFilePdf
} from "react-icons/fa6";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

let pdfjsLibPromise = null;
async function getPdfJs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = import("pdfjs-dist").then((lib) => {
      if (lib.GlobalWorkerOptions && !lib.GlobalWorkerOptions.workerSrc) {
        lib.GlobalWorkerOptions.workerSrc = pdfWorker;
      }
      return lib;
    });
  }
  return pdfjsLibPromise;
}

/**
 * PdfDocumentViewer
 * 
 * High-performance, responsive canvas-based PDF renderer for certificate documents:
 * - Dynamically calculates container dimensions to fit the document proportionally
 * - High-DPI / Retina canvas rendering for razor-sharp text and graphics
 * - Zoom controls (+ / - / Fit Width / Fit Page / Reset)
 * - Multi-page navigation (Next / Prev) when applicable
 * - Smooth vertical scrolling when zoomed or on small viewports
 * - Zero layout shifts and graceful error handling
 */
export default function PdfDocumentViewer({ pdfUrl, title = "Certificate Document" }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [userZoom, setUserZoom] = useState(1.0); // Multiplier on auto-fit scale
  const [fitMode, setFitMode] = useState("auto"); // "auto" (fit page) | "width" (fit width)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Load PDF document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const pdfjs = await getPdfJs();
        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/cmaps/",
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
      } catch (err) {
        if (isCancelled) return;
        console.error("Failed to load PDF in viewer:", err);
        setError("Unable to render document preview. You can still view or download the original file.");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  // 2. Render current page onto canvas
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    try {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDoc.getPage(currentPage);
      const unscaledViewport = page.getViewport({ scale: 1.0 });

      const container = containerRef.current;
      const availableWidth = Math.max(container.clientWidth - 32, 280);
      const availableHeight = Math.max(container.clientHeight - 32, 240);

      // Calculate base scale according to fitMode
      let baseScale = 1.0;
      if (fitMode === "width") {
        baseScale = availableWidth / unscaledViewport.width;
      } else {
        // "auto" / "fit": fit within BOTH available width and height proportionally
        const scaleW = availableWidth / unscaledViewport.width;
        const scaleH = availableHeight / unscaledViewport.height;
        baseScale = Math.min(scaleW, scaleH);
      }

      // Apply user zoom multiplier
      const finalScale = baseScale * userZoom;
      const viewport = page.getViewport({ scale: finalScale });

      // High-DPI / Retina adjustment
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: false });

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      ctx.save();
      ctx.scale(pixelRatio, pixelRatio);

      // Fill white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, viewport.width, viewport.height);

      const renderContext = {
        canvasContext: ctx,
        viewport,
        background: "rgb(255,255,255)",
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      await task.promise;
      ctx.restore();
    } catch (err) {
      if (err?.name !== "RenderingCancelledException") {
        console.warn("PDF page render warning:", err);
      }
    }
  }, [pdfDoc, currentPage, userZoom, fitMode]);

  // Re-render when page, zoom, or fitMode changes
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Resize listener with debounced re-render
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        renderPage();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [renderPage]);

  // Zoom handlers
  const handleZoomIn = () => setUserZoom((z) => Math.min(Number((z + 0.15).toFixed(2)), 2.5));
  const handleZoomOut = () => setUserZoom((z) => Math.max(Number((z - 0.15).toFixed(2)), 0.5));
  const handleResetZoom = () => {
    setUserZoom(1.0);
    setFitMode("auto");
  };

  const handleToggleFitMode = () => {
    setUserZoom(1.0);
    setFitMode((m) => (m === "auto" ? "width" : "auto"));
  };

  return (
    <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-white/10 bg-slate-950 relative shadow-inner">
      {/* Floating Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-900/95 border-b border-white/10 shrink-0 text-xs text-gray-300 gap-2 flex-wrap">
        {/* Page navigation */}
        <div className="flex items-center gap-1.5">
          {numPages > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-white"
                title="Previous Page"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>
              <span className="font-mono text-[11px] px-1 text-gray-400">
                {currentPage} / {numPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, numPages))}
                disabled={currentPage >= numPages}
                className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition text-white"
                title="Next Page"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </>
          )}
          {numPages === 1 && (
            <span className="text-[11px] font-mono text-gray-400 px-1">
              Certificate Document (1 Page)
            </span>
          )}
        </div>

        {/* Zoom & Fit controls */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={userZoom <= 0.6}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-30 transition"
            title="Zoom Out (-15%)"
          >
            <FaMagnifyingGlassMinus className="w-3 h-3" />
          </button>
          <span className="font-mono text-[11px] w-12 text-center text-gray-300 select-none">
            {Math.round(userZoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={userZoom >= 2.4}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white disabled:opacity-30 transition"
            title="Zoom In (+15%)"
          >
            <FaMagnifyingGlassPlus className="w-3 h-3" />
          </button>

          <div className="h-3.5 w-px bg-white/10 mx-1" />

          <button
            type="button"
            onClick={handleToggleFitMode}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition ${
              fitMode === "width"
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            }`}
            title={fitMode === "auto" ? "Switch to Fit Width" : "Switch to Fit Page"}
          >
            {fitMode === "auto" ? (
              <>
                <FaExpand className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">Fit Page</span>
              </>
            ) : (
              <>
                <FaArrowsLeftRight className="w-2.5 h-2.5" />
                <span className="hidden sm:inline">Fit Width</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
            title="Reset Zoom & Scale"
          >
            <FaArrowsRotate className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Document Viewport / Canvas Container */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full overflow-auto p-4 flex items-center justify-center bg-slate-950/90 select-none"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
            <FaFilePdf className="w-10 h-10 text-rose-400 animate-pulse mb-3" />
            <p className="text-xs font-semibold text-gray-200">Rendering Certificate Document...</p>
            <p className="text-[11px] text-gray-500 mt-1">Extracting high-resolution vector preview</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-md bg-slate-900 rounded-2xl border border-white/10">
            <FaFilePdf className="w-12 h-12 text-rose-400 mb-3" />
            <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
            <p className="text-xs text-gray-400 mb-4">{error}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md transition"
            >
              Open PDF in New Window
            </a>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`shadow-2xl rounded-lg border border-white/10 max-w-full transition-opacity duration-200 ${
            loading || error ? "hidden opacity-0" : "opacity-100"
          }`}
          style={{
            margin: "auto",
            display: loading || error ? "none" : "block",
          }}
        />
      </div>
    </div>
  );
}
