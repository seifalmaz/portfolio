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

  const bioPara = profile?.bioParagraphs && profile.bioParagraphs.length > 0 
    ? profile.bioParagraphs[0] 
    : "Dedicated to bridging the gap between raw data and impactful business decisions.";

  const primaryEdu = education && education.length > 0 ? education[0] : null;
  const socials = profile?.socials || personalData.socials;

  // Floating widget animation configs (different natural timing & distance)
  const floatWidget1 = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -6, 0],
          rotate: [0, 0.5, 0],
          transition: {
            duration: 4.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      };


  const floatWidget3 = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -5, 0],
          transition: {
            duration: 4.2,
            delay: 1.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }
      };

  return (
    <section id="about" className="scroll-mt-28 bg-black px-6 py-28 text-white relative overflow-hidden">
      {/* Subtle background ambient glow for layered depth */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader
          subtitle="ABOUT ME"
          title={profile?.bioHeadline ? profile.bioHeadline : "Bridging Complex Data &"}
          titleHighlight="Business Impact"
          description="A structured overview of my academic foundation, technical specialization, and core focus."
        />

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Profile Card Sidebar & Floating Interactive Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 relative"
          >
            {/* Top Floating Widget: Data Science Track */}
            <motion.div
              {...floatWidget1}
              whileHover={{ scale: 1.05, y: -2 }}
              className="hidden sm:inline-flex absolute -top-4 -left-3 z-20 items-center gap-2 rounded-full border border-blue-500/30 bg-slate-950/90 px-3.5 py-1.5 text-xs font-semibold text-blue-300 shadow-xl shadow-blue-500/10 backdrop-blur-md transition-shadow hover:shadow-blue-500/25"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Data Science Major</span>
            </motion.div>


            <Card
              hover={false}
              className="relative text-center p-8 border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-black/80 transition-all duration-300 hover:border-blue-500/30"
            >
              {/* Profile Image with subtle layered depth */}
              <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full ring-2 ring-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
                <picture>
                  <source srcSet={aboutImageWebp} type="image/webp" />
                  <img
                    src={profile?.profileImage || aboutImageDefault}
                    alt={profile?.name || "Seif Ahmed Almaz"}
                    loading="lazy"
                    width="144"
                    height="144"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </picture>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">{profile?.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-400">{profile?.title}</p>

              {/* Floating micro-chip for completed projects */}
              <div className="mt-4 flex justify-center">
                <motion.div
                  {...floatWidget3}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-300"
                >
                  <FaChartLine className="h-3 w-3 text-blue-400" />
                  <span>12+ Completed Projects</span>
                </motion.div>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-4 text-left text-xs">
                <div className="flex items-start gap-3 group/item">
                  <FaLocationDot className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <span className="text-gray-300">{profile?.location}</span>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <FaGraduationCap className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <div>
                    <p className="font-semibold text-white">{primaryEdu?.degree || profile?.degree}</p>
                    <p className="text-gray-400">{primaryEdu?.institution || profile?.university}</p>
                    {primaryEdu?.gpa && (
                      <p className="text-blue-300 font-mono mt-0.5">GPA: {primaryEdu.gpa}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 group/item">
                  <FaLaptopCode className="mt-0.5 text-blue-400 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                  <div>
                    <p className="font-semibold text-white">Focus Domains</p>
                    <p className="text-gray-400">Data Analytics • ML • BI</p>
                  </div>
                </div>
              </div>

              {/* Profile Social Links Section including Mostaql */}
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

                  {/* Mostaql Freelance Profile with official brand logo */}
                  <a
                    href={socials.mostaql || "https://mostaql.com/u/seifalmaz"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Mostaql freelance profile"
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

          {/* Structured Profile Content with Layered Depth & Interactive Motion */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Professional Summary */}
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
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaCircleCheck className="h-4 w-4" />
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">Professional Summary</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {bioPara}
                </p>
                {profile?.bioParagraphs && profile.bioParagraphs.length > 1 && (
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base mt-4">
                    {profile.bioParagraphs[1]}
                  </p>
                )}
              </Card>
            </motion.div>

            {/* 2. Education & Specialization Grid */}
            <div className="grid gap-6 md:grid-cols-2">
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
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <FaGraduationCap className="h-4 w-4" />
                      </span>
                      <h4 className="text-lg font-bold text-white">Education</h4>
                    </div>
                    <p className="font-semibold text-blue-300 text-sm">
                      {primaryEdu?.degree || profile?.degree}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {primaryEdu?.institution || profile?.university}
                    </p>
                    {primaryEdu?.period && (
                      <p className="text-xs text-slate-500 mt-1">{primaryEdu.period}</p>
                    )}
                    <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                      {primaryEdu?.description || "Specialized coursework in Machine Learning, Statistical Inference, Database Systems, Data Structures, and Algorithms."}
                    </p>
                  </div>
                </Card>
              </motion.div>

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
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <FaLaptopCode className="h-4 w-4" />
                      </span>
                      <h4 className="text-lg font-bold text-white">Specialization</h4>
                    </div>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li className="flex items-center gap-2 group/spec transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform" />
                        <span>Predictive Modeling &amp; Machine Learning</span>
                      </li>
                      <li className="flex items-center gap-2 group/spec transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform" />
                        <span>Power BI &amp; DAX Executive Dashboards</span>
                      </li>
                      <li className="flex items-center gap-2 group/spec transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform" />
                        <span>SQL &amp; ETL Pipeline Architecture</span>
                      </li>
                      <li className="flex items-center gap-2 group/spec transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover/spec:scale-125 transition-transform" />
                        <span>Computer Vision &amp; Deep Learning Deployments</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* 3. Interests & Currently Learning */}
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
