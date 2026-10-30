import { useState, useEffect } from "react";
import { FaFilePdf, FaEye, FaAward, FaCheck } from "react-icons/fa6";
import { isPdfUrl } from "../../utils/fileUtils";
import { certificationsData } from "../../data/certificationsData";

/**
 * CertificateThumbnail
 *
 * Renders an authentic visual preview for any certificate styled with Sage/Cream/Burgundy tokens.
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

    if (explicitThumb) {
      return;
    }

    if (isPdf && docUrl) {
      setLoading(true);
      import("../../utils/pdfThumbnail")
        .then(({ getPdfThumbnail }) => getPdfThumbnail(docUrl, { targetWidth: 600, quality: 0.85 }))
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

  // Case 1: Valid thumbnail image available
  if (thumbnailSrc && !renderFailed) {
    return (
      <div
        className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-[#D2C7B6]/20 bg-[#1C1A19] cursor-pointer group/thumb shadow-inner"
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
          loading="lazy"
          decoding="async"
          width="400"
          height="176"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105 bg-[#1C1A19]"
        />

        {/* Format Badge in top-left */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          {isPdf ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1C1A19]/90 backdrop-blur-md border border-[#6E2638]/40 text-[#FAF6EE] text-[10px] font-bold uppercase tracking-wider shadow-md">
              <FaFilePdf className="w-3 h-3 text-[#6E2638]" />
              <span>PDF Document</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1C1A19]/90 backdrop-blur-md border border-[#D2C7B6]/30 text-[#FAF6EE] text-[10px] font-bold uppercase tracking-wider shadow-md">
              <FaCheck className="w-2.5 h-2.5 text-[#6E2638]" />
              <span>Verified Certificate</span>
            </span>
          )}
        </div>

        {/* Hover overlay with action button */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A19]/95 via-[#1C1A19]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6E2638] px-4 py-1.5 text-xs font-semibold text-[#FAF6EE] shadow-xl backdrop-blur-sm transform translate-y-1 group-hover/thumb:translate-y-0 transition-transform duration-300">
            {isPdf ? <FaFilePdf className="h-3.5 w-3.5" /> : <FaEye className="h-3.5 w-3.5" />}
            <span>{isPdf ? "Preview PDF Certificate" : "Inspect Document"}</span>
          </span>
        </div>
      </div>
    );
  }

  // Case 2: Rendering in progress for a PDF
  if (loading) {
    return (
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-[#D2C7B6]/20 bg-[#292725] p-4 flex flex-col justify-between animate-pulse">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6E2638]/10 border border-[#6E2638]/20 text-[#6E2638] text-[10px] font-bold uppercase tracking-wider">
            <FaFilePdf className="w-3.5 h-3.5 animate-spin" />
            <span>Rendering Preview...</span>
          </span>
          <span className="text-[10px] text-[#9AA69A] font-mono">Loading</span>
        </div>
        <div className="my-auto py-2 text-center">
          <p className="text-xs font-bold text-[#FAF6EE] truncate">{cert.title}</p>
          <p className="text-[11px] text-[#9AA69A] truncate">{cert.issuer}</p>
        </div>
        <div className="h-1.5 w-full bg-[#1C1A19] rounded-full overflow-hidden">
          <div className="h-full bg-[#6E2638] w-1/2" />
        </div>
      </div>
    );
  }

  // Case 3: PDF fallback
  if (isPdf && docUrl) {
    return (
      <div
        className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-[#D2C7B6]/20 bg-[#292725] p-4 flex flex-col justify-between cursor-pointer group/thumb"
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6E2638]/15 border border-[#6E2638]/30 text-[#FAF6EE] text-[10px] font-bold uppercase tracking-wider">
            <FaFilePdf className="w-3.5 h-3.5 text-[#6E2638]" />
            <span>Official PDF Document</span>
          </span>
          <span className="text-[10px] text-[#9AA69A] font-mono">Verified File</span>
        </div>
        <div className="my-auto py-1">
          <p className="text-xs font-bold text-[#FAF6EE] line-clamp-1">{cert.title}</p>
          <p className="text-[11px] text-[#6E2638] line-clamp-1">{cert.issuer}</p>
        </div>
        <div className="text-[10px] text-[#9AA69A] flex items-center justify-between pt-1 border-t border-[#D2C7B6]/10">
          <span>Click to open PDF reader</span>
          <span className="text-[#6E2638] font-semibold group-hover/thumb:translate-x-0.5 transition-transform">
            Interactive Viewer →
          </span>
        </div>
      </div>
    );
  }

  // Case 4: Institutional or coursework credential without an attached file
  return (
    <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl border border-[#D2C7B6]/15 bg-[#292725] p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6E2638]/10 border border-[#6E2638]/20 text-[#6E2638] text-[10px] font-bold uppercase tracking-wider">
          <FaAward className="w-3.5 h-3.5" />
          <span>Verified Track</span>
        </span>
        <span className="text-[10px] text-[#9AA69A] font-mono">Academic / Pro</span>
      </div>
      <div className="my-auto py-1">
        <p className="text-xs font-bold text-[#FAF6EE] line-clamp-1">{cert.title}</p>
        <p className="text-[11px] text-[#9AA69A] line-clamp-1">{cert.issuer}</p>
      </div>
      <div className="text-[10px] text-[#687568] flex items-center justify-between pt-1 border-t border-[#D2C7B6]/10">
        <span>Institutional Record</span>
        <span className="text-[#6E2638] font-semibold">Credential Verified ✓</span>
      </div>
    </div>
  );
}
