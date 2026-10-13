import { useState, useEffect } from "react";
import { FaFilePdf, FaEye, FaAward, FaCheck } from "react-icons/fa6";
import { isPdfUrl } from "../../utils/fileUtils";
import { getPdfThumbnail } from "../../utils/pdfThumbnail";
import { certificationsData } from "../../data/certificationsData";

/**
 * CertificateThumbnail
 *
 * Renders an authentic visual preview for any certificate:
 * - Image-based certificates render their crisp image
 * - PDF-based certificates dynamically render page 1 via PDF.js into a high-fidelity thumbnail
 * - Fallback to verified track header if no document or if rendering fails
 * - Includes interactive hover overlays and format badges
 */
export default function CertificateThumbnail({ cert, onClick }) {
  let docUrl = cert.image || cert.imageUrl || null;
  let thumbUrl = cert.thumbnailUrl || null;

  if (typeof docUrl === "string" && (docUrl.startsWith("/src/") || docUrl.includes("localhost"))) {
    const local = certificationsData.find((c) => c.id === cert.id || c.title === cert.title);
    if (local?.image || local?.imageUrl) {
      docUrl = local.image || local.imageUrl;
    }
  }

  if (typeof thumbUrl === "string" && (thumbUrl.startsWith("/src/") || thumbUrl.includes("localhost"))) {
    const local = certificationsData.find((c) => c.id === cert.id || c.title === cert.title);
    if (local?.thumbnailUrl) {
      thumbUrl = local.thumbnailUrl;
    }
  }

  const isPdf = isPdfUrl(docUrl);
  const explicitThumb = thumbUrl || (!isPdf ? docUrl : null);

  const [pdfThumbnailSrc, setPdfThumbnailSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [renderFailed, setRenderFailed] = useState(false);

  const thumbnailSrc = explicitThumb || pdfThumbnailSrc;

  useEffect(() => {
    let isMounted = true;

    // If an explicit image thumbnail is already provided, no dynamic PDF generation needed
    if (explicitThumb) {
      return;
    }

    // If it's a PDF document without a pre-generated thumbnail, render page 1 dynamically
    if (isPdf && docUrl) {
      setLoading(true);
      getPdfThumbnail(docUrl, { targetWidth: 600, quality: 0.85 })
        .then((dataUrl) => {
          if (!isMounted) return;
          if (dataUrl) {
            setPdfThumbnailSrc(dataUrl);
            setRenderFailed(false);
          } else {
            setRenderFailed(true);
          }
        })
        .catch((err) => {
          if (!isMounted) return;
          console.warn("Could not generate thumbnail for", cert.title, err);
          setRenderFailed(true);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [docUrl, isPdf, explicitThumb, cert.title]);

  // Case 1: Valid thumbnail image available (either native image or rendered PDF page 1)
  if (thumbnailSrc && !renderFailed) {
    return (
      <div
        className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 cursor-pointer group/thumb shadow-inner"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`Preview ${cert.title} certificate`}
      >
        <img
          src={thumbnailSrc}
          alt={`${cert.title} Certificate`}
          decoding="async"
          width="400"
          height="176"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105 bg-slate-950"
        />

        {/* Format Badge in top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          {isPdf ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-rose-500/30 text-rose-300 text-[10px] font-bold uppercase tracking-wider shadow-md">
              <FaFilePdf className="w-3 h-3 text-rose-400" />
              <span>PDF Document</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/85 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider shadow-md">
              <FaCheck className="w-2.5 h-2.5 text-blue-400" />
              <span>Verified Certificate</span>
            </span>
          )}
        </div>

        {/* Hover overlay with action button */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/95 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-sm transform translate-y-1 group-hover/thumb:translate-y-0 transition-transform duration-300">
            {isPdf ? <FaFilePdf className="h-3.5 w-3.5 text-rose-200" /> : <FaEye className="h-3.5 w-3.5 text-blue-200" />}
            <span>{isPdf ? "Preview PDF Certificate" : "View Certificate"}</span>
          </span>
        </div>
      </div>
    );
  }

  // Case 2: Rendering in progress for a PDF
  if (loading) {
    return (
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-4 flex flex-col justify-between animate-pulse">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
            <FaFilePdf className="w-3.5 h-3.5 animate-spin text-rose-400" />
            <span>Rendering PDF Preview...</span>
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Loading</span>
        </div>
        <div className="my-auto py-2 text-center">
          <p className="text-xs font-bold text-gray-300 truncate">{cert.title}</p>
          <p className="text-[11px] text-gray-500 truncate">{cert.issuer}</p>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500/40 w-1/2 animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    );
  }

  // Case 3: PDF where thumbnail generation failed, or PDF with direct view card
  if (isPdf && docUrl) {
    return (
      <div
        className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/30 p-4 flex flex-col justify-between cursor-pointer group/thumb"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`Preview ${cert.title} PDF certificate`}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-bold uppercase tracking-wider">
            <FaFilePdf className="w-3.5 h-3.5 text-rose-400" />
            <span>Official PDF Document</span>
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Verified File</span>
        </div>
        <div className="my-auto py-1">
          <p className="text-xs font-bold text-white line-clamp-1">{cert.title}</p>
          <p className="text-[11px] text-blue-400 line-clamp-1">{cert.issuer}</p>
        </div>
        <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5">
          <span>Click to open PDF reader</span>
          <span className="text-blue-400 font-semibold group-hover/thumb:translate-x-0.5 transition-transform">
            Interactive Viewer →
          </span>
        </div>
      </div>
    );
  }

  // Case 4: Institutional or coursework credential without an attached file
  return (
    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
          <FaAward className="w-3.5 h-3.5" />
          <span>Verified Track</span>
        </span>
        <span className="text-[10px] text-gray-500 font-mono">Academic / Pro</span>
      </div>
      <div className="my-auto py-1">
        <p className="text-xs font-bold text-white line-clamp-1">{cert.title}</p>
        <p className="text-[11px] text-blue-400 line-clamp-1">{cert.issuer}</p>
      </div>
      <div className="text-[10px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5">
        <span>Institutional Record</span>
        <span className="text-blue-400 font-semibold">Credential Verified ✓</span>
      </div>
    </div>
  );
}
