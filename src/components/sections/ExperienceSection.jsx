import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaAward, FaCalendarDays, FaLocationDot, FaCheck } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import CertificateModal from "../ui/CertificateModal";
import { usePortfolio } from "../../context/PortfolioContext";
import { experienceData } from "../../data/experienceData";

function ExperienceLogoBadge({ exp }) {
  const [hasError, setHasError] = useState(false);

  const local =
    experienceData.find((e) => e.id === exp.id) ||
    experienceData.find((e) => e.role === exp.role && e.organization === exp.organization) ||
    experienceData.find((e) => e.organization === exp.organization);

  const isDevPath = (url) => typeof url === "string" && (url.startsWith("/src/") || url.includes("localhost"));

  const candidateLogo = !hasError && (
    (exp.logo && !isDevPath(exp.logo)) ? exp.logo :
    (exp.logo_url && !isDevPath(exp.logo_url)) ? exp.logo_url :
    (local?.logo || null)
  );

  const fallbackInitials = (exp.organization || "EXP")
    .split(" ")
    .filter((w) => !["and", "&", "of", "the", "for"].includes(w.toLowerCase()))
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase() || exp.organization?.substring(0, 3).toUpperCase() || "EXP";

  return (
    <div className="relative z-10 shrink-0">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#D2C7B6]/30 bg-[#FAF6EE] shadow-lg p-2 transition-all duration-300 hover:scale-105 hover:border-[#6E2638] md:h-16 md:w-16">
        {candidateLogo ? (
          <img
            src={candidateLogo}
            alt={exp.organization}
            loading="lazy"
            decoding="async"
            width="56"
            height="56"
            onError={() => setHasError(true)}
            className="h-full w-full object-contain select-none"
          />
        ) : (
          <span className="text-xs font-black tracking-wider text-[#292725] select-none">
            {fallbackInitials}
          </span>
        )}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const { experience } = usePortfolio();
  const [activeCert, setActiveCert] = useState(null);

  const handleOpenCert = useCallback((certificate, exp) => {
    const local =
      experienceData.find((e) => e.id === exp?.id) ||
      experienceData.find((e) => e.role === exp?.role && e.organization === exp?.organization) ||
      experienceData.find((e) => e.organization === exp?.organization);

    const isDevPath = (url) => typeof url === "string" && (url.startsWith("/src/") || url.includes("localhost"));
    const certImg =
      certificate?.image && !isDevPath(certificate.image)
        ? certificate.image
        : local?.certificate?.image || certificate?.image || null;

    setActiveCert({
      ...certificate,
      image: certImg,
      imageUrl: certImg
    });
  }, []);

  const handleCloseCert = useCallback(() => {
    setActiveCert(null);
  }, []);

  const experiences = Array.isArray(experience) && experience.length > 0 ? experience : experienceData;

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 bg-[#1C1A19] px-6 py-28 text-[#FAF6EE] border-t border-[#D2C7B6]/15"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="CAREER MILESTONES"
          title="Professional Experience &"
          titleHighlight="Traineeships"
          description="A chronological record of verified technical internships, Microsoft & Google professional tracks, and competitive programming mentorship."
        />

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Timeline Guide */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#6E2638] via-[#D2C7B6]/20 to-transparent md:left-8" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id || `${exp.organization}-${exp.role}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative flex items-start gap-5 md:gap-8"
              >
                {/* Organization Logo Badge */}
                <ExperienceLogoBadge exp={exp} />

                {/* Experience Details Card */}
                <div className="flex-1 rounded-3xl border border-[#D2C7B6]/15 bg-[#292725]/80 p-6 md:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-[#6E2638]/60">
                  {/* Top Bar: Role & Timing */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 border-b border-[#D2C7B6]/10 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E2638] bg-[#6E2638]/15 px-2.5 py-0.5 rounded-full border border-[#6E2638]/30">
                          {exp.type || "Professional Experience"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#FAF6EE] tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[#9AA69A]">
                        {exp.organization}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs text-[#9AA69A] space-y-1 shrink-0">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#FAF6EE]">
                        <FaCalendarDays className="h-3 w-3 text-[#6E2638]" />
                        {exp.period}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1 text-[#687568]">
                          <FaLocationDot className="h-2.5 w-2.5" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm leading-relaxed text-[#FAF6EE]/85 font-light mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mb-6 space-y-2 text-xs text-[#FAF6EE]/90">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <FaCheck className="h-3 w-3 text-[#6E2638] mt-0.5 shrink-0" />
                          <span className="leading-relaxed font-light">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technology Tags & Certificate Preview Button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D2C7B6]/10 pt-4">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {(exp.technologies || []).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[#D2C7B6]/15 bg-[#1C1A19] px-2.5 py-1 text-[11px] font-medium text-[#9AA69A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Certificate Action */}
                    {exp.certificate && (
                      <button
                        onClick={() => handleOpenCert(exp.certificate, exp)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638]/15 px-4 py-1.5 text-xs font-semibold text-[#FAF6EE] transition hover:bg-[#6E2638] shadow-sm"
                      >
                        <FaAward className="h-3.5 w-3.5 text-[#6E2638]" />
                        <span>Inspect Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        isOpen={Boolean(activeCert)}
        onClose={handleCloseCert}
        certificate={activeCert}
      />
    </section>
  );
}

export default ExperienceSection;
