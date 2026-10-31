import {
  FaGraduationCap,
  FaCircleCheck,
  FaLaptopCode,
  FaRocket,
  FaGithub,
  FaLinkedin,
  FaKaggle,
  FaEnvelope,
  FaChartLine,
  FaBrain
} from "react-icons/fa6";
import aboutImageWebp from "../../assets/about-profile.webp";
import MostaqlIcon from "../ui/MostaqlIcon";
import { usePortfolio } from "../../context/PortfolioContext";
import { personalData } from "../../data/personalData";

function AboutSection() {
  const { profile } = usePortfolio();

  const currentProfile = profile || personalData;
  const bioParagraphs =
    currentProfile.bioParagraphs && currentProfile.bioParagraphs.length > 0
      ? currentProfile.bioParagraphs
      : personalData.bioParagraphs;

  const socials = {
    ...personalData.socials,
    ...(profile?.socials || {})
  };

  const stats =
    currentProfile.stats && currentProfile.stats.length > 0
      ? currentProfile.stats
      : personalData.stats;

  const statIcons = [
    <FaLaptopCode key="stat-0" className="h-5 w-5 text-[#6E2638]" />,
    <FaChartLine key="stat-1" className="h-5 w-5 text-[#6E2638]" />,
    <FaRocket key="stat-2" className="h-5 w-5 text-[#6E2638]" />,
    <FaGraduationCap key="stat-3" className="h-5 w-5 text-[#6E2638]" />
  ];

  return (
    <section
      id="about"
      className="relative scroll-mt-24 bg-[#FAF6EE] px-4 sm:px-6 py-16 sm:py-28 text-[#292725] border-t border-[#D2C7B6]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6E2638]">
            EDITORIAL BIOGRAPHY
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#292725]">
            The Person Behind <span className="text-[#6E2638]">The Data.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#687568] font-light md:text-lg">
            Bridging raw numerical complexity, predictive machine learning, and actionable business impact.
          </p>
        </div>

        {/* Main Editorial Layout */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Portrait & Quick Credentials */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
            <div className="relative w-full max-w-sm rounded-3xl border border-[#D2C7B6] bg-[#F2E8D5] p-3 shadow-xl overflow-hidden">
              <div className="block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#E8DEC9]">
                <img
                  src={aboutImageWebp}
                  alt="Seif Ahmed Almaz"
                  loading="lazy"
                  decoding="async"
                  width="360"
                  height="450"
                  className="h-full w-full object-cover object-center filter saturate-[0.95]"
                />
              </div>

              {/* Verified Status Tag */}
              <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs">
                <span className="font-semibold text-[#292725] tracking-tight">
                  Seif Ahmed Almaz
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6E2638]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#6E2638]">
                  <FaCircleCheck className="h-3 w-3" />
                  Verified Profile
                </span>
              </div>
            </div>

            {/* Social Connectivity Links - Minimum 44x44px touch targets */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-2">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D2C7B6] bg-[#FAF6EE] text-[#292725] transition duration-200 hover:scale-105 hover:border-[#6E2638] hover:text-[#6E2638] shadow-sm cursor-pointer"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D2C7B6] bg-[#FAF6EE] text-[#292725] transition duration-200 hover:scale-105 hover:border-[#6E2638] hover:text-[#6E2638] shadow-sm cursor-pointer"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D2C7B6] bg-[#FAF6EE] text-[#292725] transition duration-200 hover:scale-105 hover:border-[#6E2638] hover:text-[#6E2638] shadow-sm cursor-pointer"
                >
                  <FaKaggle className="h-4 w-4" />
                </a>
              )}
              <a
                href={socials.mostaql || "https://mostaql.com/u/seifalmaz"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mostaql Freelance Profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D2C7B6] bg-[#FAF6EE] text-[#292725] transition duration-200 hover:scale-105 hover:border-[#6E2638] hover:text-[#6E2638] shadow-sm cursor-pointer"
              >
                <MostaqlIcon className="h-3.5 w-auto max-w-[20px]" />
              </a>
              {socials.email && (
                <a
                  href={socials.email.startsWith("mailto:") ? socials.email : `mailto:${socials.email}`}
                  aria-label="Send Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D2C7B6] bg-[#FAF6EE] text-[#292725] transition duration-200 hover:scale-105 hover:border-[#6E2638] hover:text-[#6E2638] shadow-sm cursor-pointer"
                >
                  <FaEnvelope className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Narrative Prose & Career Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Bio Paragraphs */}
            <div className="space-y-4 text-base leading-relaxed text-[#292725]/85 font-light">
              {bioParagraphs.map((paragraph, idx) => (
                <p key={idx} className="first:text-lg first:font-normal first:text-[#292725]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Focus & Engineering Foundation Card */}
            <div className="rounded-2xl border border-[#D2C7B6] bg-[#F2E8D5] p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6E2638] text-[#FAF6EE]">
                  <FaBrain className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#292725]">
                    Data Science &amp; AI Systems
                  </h4>
                  <p className="text-xs text-[#687568]">
                    Production Machine Learning, Vision &amp; Analytics • Cairo, Egypt
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#292725]/80 leading-relaxed font-light">
                Grounded in statistical inference, computational linear algebra, database architecture, algorithmic optimization, and production deep learning systems.
              </p>
            </div>

            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4">
              {stats.map((s, idx) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[#D2C7B6] bg-[#FAF6EE] p-4 text-center shadow-sm"
                >
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#6E2638]/10 text-[#6E2638]">
                    {statIcons[idx % statIcons.length]}
                  </div>
                  <div className="text-2xl font-black text-[#292725] tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-[#687568] uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
