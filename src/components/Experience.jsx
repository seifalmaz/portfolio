import { useState, useCallback } from "react";
import { FaAward } from "react-icons/fa6";
import { experienceData } from "../data/experienceData";
import CertificateModal from "./ui/CertificateModal";
import { usePortfolio } from "../context/PortfolioContext";

function Experience() {
  const { experience } = usePortfolio();
  const experiences = Array.isArray(experience) && experience.length > 0 ? experience : experienceData;
  const [activeCert, setActiveCert] = useState(null);

  const handleOpenCert = useCallback((certificate) => {
    setActiveCert(certificate);
  }, []);

  const handleCloseCert = useCallback(() => {
    setActiveCert(null);
  }, []);

  return (
    <section
      id="experience"
      className="bg-gradient-to-b from-black via-slate-950 to-black text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-blue-400 uppercase tracking-[0.35em] text-sm font-semibold mb-3">
            EXPERIENCE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Building My Journey in
            <span className="text-blue-400"> Data &amp; AI</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            My journey through internships, professional programs and mentoring
            experiences that shaped my expertise in Data Analytics, Machine
            Learning and Business Intelligence.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical Line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/70 via-white/10 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.id || index}
                className="relative flex gap-8 items-start"
              >

                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-blue-500 bg-white shadow-[0_0_25px_rgba(59,130,246,.55)]">
                    <img
                      src={exp.logo}
                      alt={exp.organization}
                      className="w-full h-full object-cover scale-125"
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,.15)]">

                  {/* Top */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            exp.type === "Internship"
                              ? "bg-green-500/10 text-green-300 border-green-500/30"
                              : exp.type === "Mentorship"
                                ? "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                                : "bg-blue-500/10 text-blue-300 border-blue-500/30"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-blue-400 font-medium mt-2">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-7 mb-6">
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-sm bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Certificate Action — only rendered when certificate data exists */}
                  {exp.certificate && (
                    <>
                      <div className="mt-5 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => handleOpenCert(exp.certificate)}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 rounded"
                          aria-label={`View certificate for ${exp.role}`}
                        >
                          <FaAward className="w-3.5 h-3.5" />
                          View Certificate
                        </button>
                      </div>
                    </>
                  )}

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Certificate Modal — rendered once outside the loop */}
      <CertificateModal
        isOpen={activeCert !== null}
        onClose={handleCloseCert}
        certificate={activeCert}
      />

    </section>
  );
}

export default Experience;