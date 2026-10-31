import { FaGraduationCap, FaCalendarDays, FaLocationDot, FaAward, FaBookBookmark } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import { usePortfolio } from "../../context/PortfolioContext";
import { defaultEducation } from "../../services/educationService";

const CORE_COURSEWORK = [
  "Machine Learning",
  "Statistical Inference",
  "Data Structures & Algorithms",
  "Database Systems & SQL",
  "Computational Linear Algebra",
  "Deep Learning & Computer Vision"
];

function EducationSection() {
  const { education } = usePortfolio();
  const eduList = Array.isArray(education) && education.length > 0 ? education : defaultEducation;

  return (
    <section
      id="education"
      className="relative scroll-mt-28 bg-[#1C1A19] px-4 sm:px-6 py-16 sm:py-24 text-[#FAF6EE] border-t border-[#D2C7B6]/15"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          subtitle="ACADEMIC FOUNDATION"
          title="Formal"
          titleHighlight="Education"
          description="Theoretical rigor in mathematical statistics, computational algorithms, and computer science principles."
        />

        <div className="space-y-4 sm:space-y-6">
          {eduList.map((edu) => (
            <div
              key={edu.id || edu.institution}
              className="group relative rounded-2xl border border-[#D2C7B6]/20 bg-[#211f1e] p-4 sm:p-8 transition-all duration-300 hover:border-[#6E2638] hover:shadow-[0_8px_30px_rgba(110,38,56,0.18)]"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Icon & Core Academic Details */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D2C7B6]/30 bg-[#FAF6EE] text-[#6E2638] shadow-sm sm:h-14 sm:w-14">
                    <FaGraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold tracking-tight text-[#FAF6EE] sm:text-2xl">
                        {edu.degree}
                      </h3>
                      {edu.field_of_study && (
                        <span className="text-base font-semibold text-[#F2E8D5]/90">
                          — {edu.field_of_study}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm font-medium text-[#FAF6EE]">
                      {edu.institution}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[#9AA69A]">
                      {edu.period && (
                        <span className="inline-flex items-center gap-1.5 font-mono">
                          <FaCalendarDays className="text-[#6E2638]" />
                          {edu.period}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <FaLocationDot className="text-[#6E2638]" />
                        Cairo, Egypt
                      </span>
                      {edu.is_current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sage/40 bg-sage/10 px-2.5 py-0.5 font-semibold text-[#FAF6EE]">
                          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                          Approaching Graduation (2027)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Academic Standing Badge */}
                {edu.gpa && (
                  <div className="shrink-0 self-start">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#6E2638]/40 bg-[#6E2638]/15 px-3.5 py-1.5 text-xs font-mono font-bold text-[#FAF6EE]">
                      <span className="text-[#9AA69A]">GPA</span>
                      <span className="text-[#F2E8D5]">{edu.gpa}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {edu.description && (
                <p className="mt-5 text-sm leading-relaxed text-[#F2E8D5]/80 font-light max-w-3xl">
                  {edu.description}
                </p>
              )}

              {/* Achievements & Honors */}
              {Array.isArray(edu.achievements) && edu.achievements.length > 0 && (
                <div className="mt-5 border-t border-[#D2C7B6]/15 pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9AA69A] flex items-center gap-1.5 mb-2.5">
                    <FaAward className="text-[#6E2638]" />
                    <span>Academic Highlights &amp; Leadership</span>
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs text-[#FAF6EE]">
                    {edu.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6E2638]" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Coursework Focus */}
              <div className="mt-5 border-t border-[#D2C7B6]/15 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9AA69A] flex items-center gap-1.5 mb-2.5">
                  <FaBookBookmark className="text-[#6E2638]" />
                  <span>Key Coursework &amp; Theoretical Focus</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CORE_COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="rounded-lg border border-[#D2C7B6]/15 bg-[#1C1A19]/70 px-2.5 py-1 text-[11px] font-medium text-[#FAF6EE]/90"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;

