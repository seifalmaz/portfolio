import { motion, useReducedMotion } from "framer-motion";
import {
  FaGraduationCap,
  FaLocationDot,
  FaCircleCheck,
  FaLaptopCode,
  FaRocket,
  FaGithub,
  FaLinkedin,
  FaKaggle,
  FaEnvelope,
  FaChartLine
} from "react-icons/fa6";
import aboutImageWebp from "../../assets/about-profile.webp";
import aboutImageDefault from "../../assets/about-profile.png";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import MostaqlIcon from "../ui/MostaqlIcon";
import { usePortfolio } from "../../context/PortfolioContext";
import { personalData } from "../../data/personalData";

function AboutSection() {
  const { profile, education } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();

  // Merge profile data with default seed for maximum reliability
  const currentProfile = profile || personalData;
  const bioParagraphs = (currentProfile.bioParagraphs && currentProfile.bioParagraphs.length > 0)
    ? currentProfile.bioParagraphs
    : personalData.bioParagraphs;

  const primaryEdu = (education && education.length > 0) ? education[0] : null;

  // Fully merged socials ensuring all 5 channels are always available
  const socials = {
    ...personalData.socials,
    ...(profile?.socials || {})
  };

  // Stats array fallback
  const stats = (currentProfile.stats && currentProfile.stats.length > 0)
    ? currentProfile.stats
    : personalData.stats;

  // Floating widget animation configs
  const floatWidget = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -4, 0],
          transition: {
            duration: 4.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      };

  // Parse header title and highlight cleanly
  const getHeaderTitles = () => {
    const raw = currentProfile.bioHeadline || "Bridging Complex Data & Business Impact";
    if (raw.includes("&")) {
      const parts = raw.split("&");
      return {
        title: `${parts[0].trim()} &`,
        highlight: parts.slice(1).join("&").trim()
      };
    }
    if (raw.toLowerCase().includes("behind the data")) {
      return {
        title: "The Person Behind",
        highlight: "The Data."
      };
    }
    const words = raw.split(" ");
    if (words.length > 2) {
      return {
        title: words.slice(0, -2).join(" "),
        highlight: words.slice(-2).join(" ")
      };
    }
    return {
      title: "Bridging Complex Data &",
      highlight: "Business Impact"
    };
  };

  const { title: sectionTitle, highlight: sectionHighlight } = getHeaderTitles();

  const statIcons = [
    <FaLaptopCode key="stat-0" className="h-5 w-5 text-blue-400" />,
    <FaChartLine key="stat-1" className="h-5 w-5 text-indigo-400" />,
    <FaRocket key="stat-2" className="h-5 w-5 text-cyan-400" />,
    <FaGraduationCap key="stat-3" className="h-5 w-5 text-teal-400" />
  ];

  return (
    <section id="about" className="scroll-mt-28 bg-black px-6 py-28 text-white relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader
          subtitle="ABOUT ME"
          title={sectionTitle}
          titleHighlight={sectionHighlight}
          description="A structured overview of my academic foundation, technical specialization, and core focus."
        />

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Profile Card Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative"
          >
            <Card
              hover={false}
              className="relative text-center p-7 sm:p-8 border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-black/80 transition-all duration-300 hover:border-blue-500/30"
            >
              {/* Availability Status Badge */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  {...floatWidget}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10 backdrop-blur-md"
                >
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentProfile.availabilityStatus || "Open for Opportunities"}</span>
                </motion.div>
              </div>

              {/* Profile Image */}
              <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full ring-2 ring-blue-500/30 shadow-[0_0_35px_rgba(59,130,246,0.2)] group">
                <picture>
                  <source srcSet={aboutImageWebp} type="image/webp" />
                  <img
                    src={currentProfile.profileImage || aboutImageDefault}
                    alt={currentProfile.name || "Seif Ahmed Almaz"}
                    loading="lazy"
                    width="144"
                    height="144"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
              </div>

              {/* Name & Title */}
              <h3 className="text-2xl font-bold text-white tracking-tight">{currentProfile.name}</h3>
              <p className="mt-1.5 text-xs sm:text-sm font-semibold text-blue-400">
                {currentProfile.title}
              </p>

              <div className="my-6 h-px bg-white/10" />

              {/* Quick Details List */}
              <div className="space-y-4 text-left text-xs">
                <div className="flex items-start gap-3 group/item">
                  <FaLocationDot className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <span className="text-gray-300">{currentProfile.location}</span>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <FaGraduationCap className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <div>
                    <p className="font-semibold text-white">
                      {primaryEdu?.field_of_study || currentProfile.degree || "Data Science Major"}
                    </p>
                    <p className="text-gray-400">
                      {primaryEdu?.institution || currentProfile.university}
                    </p>
                    {primaryEdu?.gpa && (
                      <p className="text-blue-300 font-mono mt-0.5">GPA: {primaryEdu.gpa}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <FaLaptopCode className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <div>
                    <p className="font-semibold text-white">Focus Domains</p>
                    <p className="text-gray-400">Data Analytics • Machine Learning • BI</p>
                  </div>
                </div>
              </div>

              {/* Professional Profiles & Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3 text-center">
                  Professional Profiles &amp; Freelance
                </p>
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  {socials.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      title="GitHub Profile"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      <FaGithub className="h-4 w-4" />
                    </a>
                  )}

                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn Profile"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      <FaLinkedin className="h-4 w-4" />
                    </a>
                  )}

                  {socials.kaggle && (
                    <a
                      href={socials.kaggle}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Kaggle Profile"
                      title="Kaggle Profile"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      <FaKaggle className="h-4 w-4" />
                    </a>
                  )}

                  {/* Mostaql Freelance Profile */}
                  <a
                    href={socials.mostaql || "https://mostaql.com/u/seifalmaz"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mostaql Freelance Profile"
                    title="Mostaql Freelance Profile"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/5 text-teal-300 transition-all duration-300 hover:scale-110 hover:border-teal-400/60 hover:bg-teal-500/15 hover:text-teal-200 hover:shadow-[0_0_18px_rgba(20,184,166,0.3)] focus-visible:outline-2 focus-visible:outline-teal-400"
                  >
                    <MostaqlIcon className="h-3 w-auto max-w-[22px]" />
                  </a>

                  {socials.email && (
                    <a
                      href={socials.email.startsWith("mailto:") ? socials.email : `mailto:${socials.email}`}
                      aria-label="Send Direct Email"
                      title="Send Direct Email"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] focus-visible:outline-2 focus-visible:outline-blue-400"
                    >
                      <FaEnvelope className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Structured Narrative & Credentials */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Professional Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card
                hover={false}
                className="transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaCircleCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">Professional Summary</h4>
                    <p className="text-xs text-blue-400/80 font-medium">Engineering Approach &amp; Philosophy</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-gray-300 leading-relaxed text-sm md:text-[15px]">
                  {bioParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Core Focus Pills */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {["Predictive Machine Learning", "Azure AI & MLOps", "Power BI & DAX Dashboards", "Automated ETL Pipelines"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* 2. Education & Specialization Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Education Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  hover={false}
                  className="h-full flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <FaGraduationCap className="h-4 w-4" />
                        </span>
                        <h4 className="text-lg font-bold text-white">Education</h4>
                      </div>

                      {primaryEdu?.gpa && (
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          GPA: {primaryEdu.gpa}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      {primaryEdu?.logo_url && (
                        <img
                          src={primaryEdu.logo_url}
                          alt={primaryEdu.institution}
                          className="h-10 w-10 rounded-lg object-contain bg-white p-1 border border-white/10 shrink-0"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <p className="font-semibold text-blue-300 text-sm">
                          {primaryEdu?.degree || "Bachelor of Science"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {primaryEdu?.institution || currentProfile.university}
                        </p>
                        {primaryEdu?.period && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{primaryEdu.period}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                      {primaryEdu?.description || "Specialized coursework in Machine Learning, Statistical Inference, Database Systems, Data Structures, and Algorithms."}
                    </p>

                    {/* Achievements */}
                    {primaryEdu?.achievements && primaryEdu.achievements.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Highlights</p>
                        {primaryEdu.achievements.map((ach, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Specialization Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  hover={false}
                  className="h-full flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] p-6"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <FaLaptopCode className="h-4 w-4" />
                      </span>
                      <h4 className="text-lg font-bold text-white">Specialization</h4>
                    </div>

                    <ul className="space-y-3 text-xs text-gray-300">
                      <li className="flex items-start gap-2.5 group/spec transition-colors hover:text-white">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Predictive Modeling &amp; Machine Learning</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">Scikit-Learn, PyTorch, model evaluation &amp; feature engineering</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5 group/spec transition-colors hover:text-white">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Power BI &amp; DAX Executive Dashboards</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">Interactive drill-through reports, KPIs, and data storytelling</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5 group/spec transition-colors hover:text-white">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform shrink-0" />
                        <div>
                          <p className="font-semibold text-white">SQL &amp; ETL Pipeline Architecture</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">Database staging, data warehousing &amp; Informatica mappings</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-2.5 group/spec transition-colors hover:text-white">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform shrink-0" />
                        <div>
                          <p className="font-semibold text-white">Computer Vision &amp; Deep Learning</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">CNNs, Vision Transformers &amp; OpenCV inference pipelines</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* 3. Key Impact Metrics & Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.slice(0, 4).map((stat, i) => (
                  <div
                    key={stat.label || i}
                    className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(59,130,246,0.15)] flex flex-col items-center text-center"
                  >
                    <div className="mb-2 p-2 rounded-xl bg-white/5 border border-white/5">
                      {statIcons[i % statIcons.length]}
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[11px] font-medium text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. Interests & Currently Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card
                hover={false}
                className="transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaRocket className="h-4 w-4" />
                  </span>
                  <h4 className="text-lg font-bold text-white">Interests &amp; Currently Learning</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                  Expanding expertise in <strong className="text-white">Azure AI &amp; MLOps</strong>, model deployment monitoring via MLflow, and scalable computer vision pipelines using PyTorch and OpenCV.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
