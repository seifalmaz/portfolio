import { useEffect, useRef, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
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
import { experienceData } from "../../data/experienceData";

const PdfDocumentViewer = lazy(() => import("./PdfDocumentViewer"));

/**
 * CertificateModal
 *
 * Lightbox for certificate inspection styled with Sage, Cream, and Burgundy palette.
 * Uses createPortal to escape parent stacking contexts and render above all fixed elements.
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
    const localExp = experienceData.find(
      (e) => e.certificate?.title === certificate.title || e.id === certificate.id
    );
    if (local?.image || local?.imageUrl) {
      docUrl = local.image || local.imageUrl;
    } else if (localExp?.certificate?.image) {
      docUrl = localExp.certificate.image;
    }
  }

  const isPdf = isPdfUrl(docUrl);
  const altText = `${certificate.title} — issued by ${certificate.issuer}`;
  const fileName = getFileName(docUrl, `${certificate.title}.pdf`);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cert-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 99998 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
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
            style={{ zIndex: 99999 }}
            className="fixed inset-0 overflow-y-auto p-3 sm:p-6 md:p-8 flex items-center justify-center pointer-events-none"
          >
            <div
              className={`relative w-full ${
                isPdf ? "max-w-5xl" : "max-w-4xl"
              } m-auto pointer-events-auto rounded-2xl border border-[#D2C7B6]/25 bg-[#1C1A19] shadow-2xl flex flex-col overflow-hidden`}
              style={{
                maxHeight: "calc(100dvh - 2rem)",
                height: isPdf ? "min(88dvh, 850px)" : "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Guaranteed sticky top, unobstructed and visible */}
              <div className="sticky top-0 z-30 shrink-0 bg-[#292725] px-4 sm:px-6 py-3 border-b border-[#D2C7B6]/15 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="p-2 rounded-xl shrink-0 bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/30">
                    {isPdf ? <FaFilePdf className="w-4 h-4" /> : <FaAward className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        id="cert-modal-title"
                        className="text-xs sm:text-sm font-bold text-[#FAF6EE] leading-tight truncate"
                      >
                        {certificate.title}
                      </p>
                      {isPdf && (
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/40 uppercase tracking-wider">
                          PDF
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#9AA69A] mt-0.5 truncate">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6E2638] hover:bg-[#451824] text-xs font-semibold text-[#FAF6EE] shadow-md shadow-[#6E2638]/20 transition focus-visible:outline-2 focus-visible:outline-[#6E2638]"
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
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#292725] hover:bg-[#292725]/80 border border-[#D2C7B6]/20 text-xs font-semibold text-[#FAF6EE] transition"
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
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-[#292725] border border-[#D2C7B6]/20 text-[#9AA69A] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20 transition focus-visible:outline-2 focus-visible:outline-[#6E2638] cursor-pointer"
                  >
                    <FaXmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Document Body - Flex-1 with min-h-0 to preserve proportional fitting */}
              <div className="flex-1 min-h-0 bg-[#141211] p-2 sm:p-4 flex items-center justify-center overflow-hidden relative">
                {docUrl ? (
                  isPdf ? (
                    <div className="w-full h-full min-h-0 max-h-full flex flex-col rounded-xl overflow-hidden">
                      <Suspense
                        fallback={
                          <div className="flex h-full w-full items-center justify-center p-8 text-center text-xs text-[#9AA69A]">
                            <div className="flex flex-col items-center gap-2">
                              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#9AA69A]/30 border-t-[#6E2638]" />
                              <span>Loading PDF document viewer...</span>
                            </div>
                          </div>
                        }
                      >
                        <PdfDocumentViewer pdfUrl={docUrl} title={certificate.title} />
                      </Suspense>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center overflow-auto p-1 min-h-0">
                      <img
                        src={docUrl}
                        alt={altText}
                        decoding="async"
                        className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-[#D2C7B6]/15"
                        style={{ display: "block", maxHeight: "calc(100dvh - 12rem)" }}
                      />
                    </div>
                  )
                ) : (
                  <div className="text-center p-12">
                    <FaAward className="w-12 h-12 text-[#9AA69A] mx-auto mb-3" />
                    <p className="text-sm font-semibold text-[#FAF6EE]">
                      No document attached to this certificate.
                    </p>
                    <p className="text-xs text-[#9AA69A] mt-1">
                      This credential is verified by institutional coursework or ID.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer - Sticky bottom */}
              <div className="sticky bottom-0 z-20 shrink-0 bg-[#292725] px-4 sm:px-6 py-2.5 border-t border-[#D2C7B6]/15 flex items-center justify-between text-xs text-[#9AA69A]">
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
                      className="inline-flex items-center gap-1 text-[11px] text-[#6E2638] hover:text-[#FAF6EE] transition"
                    >
                      <span>Institutional Verification</span>
                      <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                    </a>
                  )}

                  {docUrl && (
                    <span className="text-[11px] text-[#687568] hidden sm:inline">
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

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}

export default CertificateModal;
