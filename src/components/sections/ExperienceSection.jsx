import { experienceData } from "../../data/experienceData";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28 bg-gradient-to-b from-black via-slate-950 to-black px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="CAREER TIMELINE"
          title="Professional Experience &amp;"
          titleHighlight="Traineeships"
          description="A chronological history of my engineering internships, Microsoft &amp; Google professional tracks, and ICPC community mentorship."
        />

        {/* Timeline Container */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Timeline Line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/70 via-white/10 to-transparent md:left-8" />

          <div className="space-y-12">
            {experienceData.map((exp) => (
              <div key={exp.id} className="relative flex gap-6 md:gap-8 items-start">
                {/* Timeline Dot / Logo */}
                <div className="relative z-10 shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-blue-500 bg-white shadow-[0_0_25px_rgba(59,130,246,0.55)] md:h-16 md:w-16">
                    <img
                      src={exp.logo}
                      alt={exp.organization}
                      loading="lazy"
                      className="h-full w-full object-cover scale-110"
                    />
                  </div>
                </div>

                {/* Experience Card */}
                <Card className="flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-white md:text-2xl">{exp.role}</h3>
                        <Badge variant={exp.type === "Internship" ? "green" : exp.type === "Mentorship" ? "yellow" : "blue"}>
                          {exp.type}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-blue-400">{exp.organization}</p>
                    </div>

                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {exp.period}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm leading-relaxed text-gray-300 mb-4">{exp.description}</p>

                  {/* Achievements List */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mb-6 space-y-1.5 text-xs text-gray-300">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-0.5 text-xs text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
