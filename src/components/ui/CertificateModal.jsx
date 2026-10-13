import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaXmark, 
  FaAward, 
  FaFilePdf, 
  FaArrowUpRightFromSquare, 
  FaDownload 
} from "react-icons/fa6";
import { isPdfUrl, getFileName } from "../../utils/fileUtils";
import { certificationsData } from "../../data/certificationsData";
import PdfDocumentViewer from "./PdfDocumentViewer";

/**
 * CertificateModal
 *
 * A responsive, fully accessible lightbox for displaying certificate documents (Images & PDFs).
 * - Uses responsive canvas-based PdfDocumentViewer for razor-sharp, properly scaled PDF rendering
 * - Positioned at z-[100] so it is strictly above the fixed navigation bar
 * - Never extends beyond viewport bounds or clips viewer controls on laptops or mobile
 * - Restores body scrolling upon close; locks scrolling while open
 * - Full keyboard accessibility (Escape to close, focus management)
 */
function CertificateModal({ isOpen, onClose, certificate }) {
  const closeButtonRef = useRef(null);

  // Lock background scroll while open; restore on unmount/close
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!certificate) return null;

  let docUrl = certificate.image || certificate.imageUrl;
  if (typeof docUrl === "string" && (docUrl.startsWith("/src/") || docUrl.includes("localhost"))) {
    const local = certificationsData.find(
      (c) => c.id === certificate.id || c.title === certificate.title
    );
    if (local?.image || local?.imageUrl) {
      docUrl = local.image || local.imageUrl;
    }
  }

  const isPdf = isPdfUrl(docUrl);
  const altText = `${certificate.title} — issued by ${certificate.issuer}`;
  const fileName = getFileName(docUrl, `${certificate.title}.pdf`);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - strictly z-[100] to sit above fixed navbar */}
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            key="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-none"
          >
            <div
              className={`relative w-full ${
                isPdf ? "max-w-5xl" : "max-w-4xl"
              } pointer-events-auto rounded-2xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/90 flex flex-col min-h-[360px] sm:min-h-[500px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Pinned at top */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 shrink-0 bg-slate-900/90 backdrop-blur-sm gap-3">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      isPdf
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {isPdf ? <FaFilePdf className="w-4 h-4" /> : <FaAward className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        id="cert-modal-title"
                        className="text-xs sm:text-sm font-semibold text-white leading-tight truncate"
                      >
                        {certificate.title}
                      </p>
                      {isPdf && (
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                          PDF
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 truncate">
                      {certificate.issuer}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {docUrl && (
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
                      title={isPdf ? "Open original PDF in full tab" : "Open full-resolution image"}
                    >
                      <span className="hidden sm:inline">
                        {isPdf ? "Open Original PDF" : "Full Image"}
                      </span>
                      <span className="sm:hidden">{isPdf ? "PDF" : "View"}</span>
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                    </a>
                  )}

                  {docUrl && isPdf && (
                    <a
                      href={docUrl}
                      download={fileName}
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition"
                      title="Download Certificate PDF"
                    >
                      <FaDownload className="w-3 h-3" />
                      <span className="hidden md:inline">Download</span>
                    </a>
                  )}

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close certificate viewer"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 cursor-pointer"
                  >
                    <FaXmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Document Body - Flexibly Constrained */}
              <div className="flex-1 min-h-0 bg-slate-950 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
                {docUrl ? (
                  isPdf ? (
                    <div className="w-full h-full min-h-[300px] max-h-[calc(100dvh-170px)] sm:max-h-[calc(100dvh-190px)] flex flex-col rounded-xl overflow-hidden">
                      <PdfDocumentViewer pdfUrl={docUrl} title={certificate.title} />
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-[280px] sm:min-h-[420px] flex items-center justify-center overflow-auto p-1">
                      <img
                        src={docUrl}
                        alt={altText}
                        decoding="async"
                        className="max-h-[calc(100dvh-180px)] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-white/10"
                        style={{ display: "block" }}
                      />
                    </div>
                  )
                ) : (
                  <div className="text-center p-12">
                    <FaAward className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-300">
                      No document attached to this certificate.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      This credential is verified by institutional coursework or ID.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer - Pinned at bottom */}
              <div className="px-4 sm:px-6 py-2.5 border-t border-white/10 bg-slate-900/90 flex items-center justify-between text-xs text-gray-400 shrink-0">
                <span className="font-mono text-[11px] truncate max-w-[70%]">
                  {certificate.credentialId
                    ? `Credential ID: ${certificate.credentialId}`
                    : "Verified Credential"}
                </span>

                <div className="flex items-center gap-3">
                  {certificate.verifyUrl && certificate.verifyUrl !== "#" && (
                    <a
                      href={certificate.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition"
                    >
                      <span>Institutional Verification</span>
                      <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                    </a>
                  )}

                  {docUrl && (
                    <span className="text-[11px] text-gray-500 hidden sm:inline">
                      {isPdf ? "PDF Document" : "Image Asset"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CertificateModal;
