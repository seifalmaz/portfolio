import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaArrowUpRightFromSquare, FaEye, FaCheck, FaFilePdf } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import CertificateModal from "../ui/CertificateModal";
import CertificateThumbnail from "../ui/CertificateThumbnail";
import { usePortfolio } from "../../context/PortfolioContext";
import { isPdfUrl } from "../../utils/fileUtils";

function CertificationsSection() {
  const { certifications } = usePortfolio();
  const certList = Array.isArray(certifications) ? certifications : [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  // Extract unique categories
  const categories = ["All", ...new Set(certList.map(c => c.category).filter(Boolean))];

  const filteredCerts = activeCategory === "All"
    ? certList
    : certList.filter(c => c.category === activeCategory);

  return (
    <section id="certifications" className="scroll-mt-28 bg-slate-950 px-6 py-28 text-white border-t border-white/5 relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader
          subtitle="CREDENTIALS &amp; PROFESSIONAL DEVELOPMENT"
          title="Verified"
          titleHighlight="Certifications"
          description="Recognized credentials and specialized tracks from Microsoft, Google, DEPI, CIB, Banque du Caire, and academic institutions."
        />

        {/* Category Filter Tabs */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Certificates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {filteredCerts.map((cert) => {
              const hasImage = Boolean(cert.image || cert.imageUrl);
              const certImg = cert.image || cert.imageUrl;
              const hasRealVerify = cert.verifyUrl && cert.verifyUrl !== '#' && cert.verifyUrl.startsWith('http');

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="h-full flex flex-col justify-between p-6 border border-white/10 hover:border-blue-500/40 hover:shadow-[0_10px_35px_rgba(59,130,246,0.15)] transition-all duration-300 group">
                    <div>
                      {/* Certificate Thumbnail Preview / Document Card / Track Header */}
                      <CertificateThumbnail 
                        cert={cert} 
                        onClick={() => setSelectedCert(cert)} 
                      />

                      {/* Header row with Icon and Date */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:border-blue-400 group-hover:scale-105 transition-all">
                          <FaAward className="h-5 w-5" />
                        </div>
                        {cert.date && (
                          <span className="text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                            {cert.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-blue-300 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-blue-400 font-semibold mb-4">{cert.issuer}</p>

                      {/* Skills tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="slate" className="text-[11px] py-0.5">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom verification and details bar */}
                    <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        {cert.credentialId ? (
                          <span className="font-mono text-[11px] text-gray-400 truncate">
                            ID: {cert.credentialId}
                          </span>
                        ) : hasImage ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-blue-400 font-medium">
                            <FaCheck className="h-2.5 w-2.5" /> Document Verified
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-500">Professional Track</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {hasImage && (
                          <button
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                          >
                            {isPdfUrl(certImg) ? <FaFilePdf className="h-3 w-3 text-rose-400" /> : <FaEye className="h-3 w-3" />}
                            {isPdfUrl(certImg) ? "View PDF" : "Preview"}
                          </button>
                        )}

                        {hasRealVerify && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition underline underline-offset-2"
                          >
                            Verify
                            <FaArrowUpRightFromSquare className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Accessible Lightbox Modal for Certificate Preview */}
      <CertificateModal
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </section>
  );
}

export default CertificationsSection;
