import { useState, useMemo } from "react";
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

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCert, setSelectedCert] = useState(null);

  const certList = useMemo(() => {
    return Array.isArray(certifications) ? certifications : [];
  }, [certifications]);

  // Extract unique categories (memoized)
  const categories = useMemo(() => {
    return ["All", ...new Set(certList.map((c) => c.category).filter(Boolean))];
  }, [certList]);

  // Filter certificates (memoized)
  const filteredCerts = useMemo(() => {
    return activeCategory === "All"
      ? certList
      : certList.filter((c) => c.category === activeCategory);
  }, [certList, activeCategory]);

  return (
    <section id="certifications" className="scroll-mt-28 bg-[#292725] px-6 py-28 text-white border-t border-[#FAF6EE]/10 relative">
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
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-burgundy ${
                    isActive
                      ? "bg-burgundy text-[#FAF6EE] shadow-lg shadow-burgundy/30 border border-burgundy/50"
                      : "bg-[#FAF6EE]/5 text-[#F2E8D5]/70 hover:bg-[#FAF6EE]/10 hover:text-[#FAF6EE] border border-[#FAF6EE]/10"
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
                  <Card className="h-full flex flex-col justify-between p-6 border border-[#FAF6EE]/10 bg-[#211f1e]/90 hover:border-burgundy/50 hover:shadow-[0_12px_35px_rgba(110,38,56,0.2)] transition-all duration-300 group">
                    <div>
                      {/* Certificate Thumbnail Preview / Document Card / Track Header */}
                      <CertificateThumbnail 
                        cert={cert} 
                        onClick={() => setSelectedCert(cert)} 
                      />

                      {/* Header row with Icon and Date */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/15 border border-burgundy/30 text-[#F2E8D5] group-hover:border-burgundy group-hover:bg-burgundy/25 group-hover:scale-105 transition-all">
                          <FaAward className="h-5 w-5 text-burgundy" />
                        </div>
                        {cert.date && (
                          <span className="text-xs text-[#9AA69A] font-medium bg-[#FAF6EE]/5 px-2.5 py-1 rounded-full border border-[#FAF6EE]/10">
                            {cert.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-[#F2E8D5] transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-sage font-semibold mb-4">{cert.issuer}</p>

                      {/* Skills tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {cert.skills.map((skill) => (
                            <Badge key={skill} variant="sage" className="text-[11px] py-0.5">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom verification and details bar */}
                    <div className="pt-4 border-t border-[#FAF6EE]/10 text-xs text-[#9AA69A] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        {cert.credentialId ? (
                          <span className="font-mono text-[11px] text-[#9AA69A] truncate">
                            ID: {cert.credentialId}
                          </span>
                        ) : hasImage ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-sage font-medium">
                            <FaCheck className="h-2.5 w-2.5 text-sage" /> Document Verified
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
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#F2E8D5] hover:text-white transition"
                          >
                            {isPdfUrl(certImg) ? <FaFilePdf className="h-3 w-3 text-rose-400" /> : <FaEye className="h-3 w-3 text-sage" />}
                            {isPdfUrl(certImg) ? "View PDF" : "Preview"}
                          </button>
                        )}

                        {hasRealVerify && (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-burgundy hover:text-[#9e3a53] transition underline underline-offset-2"
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
