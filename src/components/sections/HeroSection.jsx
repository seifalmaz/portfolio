import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaLocationDot, FaArrowDown } from "react-icons/fa6";
import { usePortfolio } from "../../context/PortfolioContext";

function HeroSection() {
  const { profile, settings } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = profile?.roles && profile.roles.length > 0 ? profile.roles : ["Data Science & AI Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToFeaturedProjects = () => {
    const el = document.getElementById("projects") || document.getElementById("featured-projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split name for styling
  const nameParts = (profile?.name || "Seif Ahmed Almaz").split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || "Seif Ahmed";
  const lastName = nameParts[nameParts.length - 1] || "Almaz";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center bg-[radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.12),transparent_40%),linear-gradient(to_bottom,#000,#020617,#000)] px-6 pt-32 pb-20 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Top Domain Badge */}
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400 backdrop-blur-sm">
            {profile?.title || "DATA ANALYTICS • MACHINE LEARNING • AI"}
          </p>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
            {firstName} <br />
            <span className="text-blue-400">{lastName}</span>
          </h1>

          {/* Smooth Animated Capability Rotator */}
          <div className="mb-6 h-10 flex items-center overflow-hidden">
            <p className="text-xl font-light text-gray-300 md:text-2xl lg:text-3xl flex items-center gap-2">
              <span>Building</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="font-semibold text-blue-400"
                >
                  {roles[roleIndex % roles.length]}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>

          {/* Subtitle Tagline */}
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
            {profile?.tagline}
          </p>

          {/* Trust Indicators / Badges */}
          <div className="mb-12 flex flex-wrap items-center gap-4 text-xs font-medium text-gray-300">
            {profile?.degree && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                <FaGraduationCap className="text-blue-400 h-4 w-4" />
                <span>{profile.degree}</span>
              </div>
            )}

            {profile?.university && (
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                <FaLocationDot className="text-blue-400 h-3.5 w-3.5" />
                <span>{profile.university}</span>
              </div>
            )}

            {profile?.isAvailable !== false && (
              <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span>{profile?.availabilityStatus || "Open for Opportunities"}</span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToFeaturedProjects}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-gray-200 shadow-lg shadow-white/10"
            >
              View Projects
              <FaArrowDown className="h-3.5 w-3.5" />
            </button>

            {settings?.show_resume_button !== false && profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={profile.resumeFilename || "Seif_Almaz_CV.pdf"}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 shadow-sm"
              >
                Download CV (PDF)
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
