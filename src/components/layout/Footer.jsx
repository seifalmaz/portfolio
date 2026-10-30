import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaKaggle, FaEnvelope, FaArrowUp } from "react-icons/fa6";
import MostaqlIcon from "../ui/MostaqlIcon";
import { personalData } from "../../data/personalData";
import { navItems, handleHybridNavigation } from "../../data/navigationData";
import { usePortfolio } from "../../context/PortfolioContext";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = usePortfolio();

  const currentProfile = profile || personalData;
  const socials = currentProfile.socials || personalData.socials;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[#D2C7B6]/15 bg-[#1C1A19] text-[#FAF6EE]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-5">
            <Link to="/" className="group flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6E2638] text-xs font-bold text-[#FAF6EE] shadow-sm">
                SA
              </span>
              <span className="text-xl font-bold tracking-tight text-[#FAF6EE] group-hover:text-[#F2E8D5] transition">
                Seif Almaz<span className="text-[#6E2638]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-[#9AA69A] leading-relaxed">
              {currentProfile.tagline || personalData.tagline}
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] transition duration-200 hover:scale-110 hover:border-[#6E2638] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] transition duration-200 hover:scale-110 hover:border-[#6E2638] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] transition duration-200 hover:scale-110 hover:border-[#6E2638] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20"
                >
                  <FaKaggle className="h-4 w-4" />
                </a>
              )}

              {/* Mostaql Freelance Profile */}
              <a
                href={socials.mostaql || "https://mostaql.com/u/seifalmaz"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mostaql freelance profile"
                title="Mostaql Freelance Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] transition duration-200 hover:scale-110 hover:border-[#6E2638] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20"
              >
                <MostaqlIcon className="h-3.5 w-auto max-w-[24px]" />
              </a>

              {socials.email && (
                <a
                  href={socials.email.startsWith("mailto:") ? socials.email : `mailto:${socials.email}`}
                  aria-label="Send Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725] text-[#9AA69A] transition duration-200 hover:scale-110 hover:border-[#6E2638] hover:text-[#FAF6EE] hover:bg-[#6E2638]/20"
                >
                  <FaEnvelope className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#6E2638]">
              Quick Navigation
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === "route" ? (
                    <Link
                      to={item.href}
                      className="text-[#9AA69A] transition hover:text-[#FAF6EE]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleHybridNavigation(e, item, location, navigate)}
                      className="text-[#9AA69A] transition hover:text-[#FAF6EE]"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resume & Direct Action */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#6E2638]">
                Curriculum Vitae
              </h4>
              <p className="mt-2 text-xs text-[#9AA69A] leading-relaxed">
                Download my verified resume summarizing data science achievements and research.
              </p>
              <a
                href={currentProfile.resumeUrl || personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={currentProfile.resumeFilename || personalData.resumeFilename || "Seif_Almaz_CV.pdf"}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#6E2638] bg-[#6E2638] px-5 py-2 text-xs font-semibold text-[#FAF6EE] transition duration-200 hover:bg-[#451824] shadow-md shadow-[#6E2638]/20"
              >
                Download Résumé (PDF)
              </a>
            </div>

            {/* Back to Top */}
            <div className="mt-8 flex items-center justify-start lg:justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                aria-label="Back to Top"
                className="flex items-center gap-2 text-xs font-medium text-[#9AA69A] hover:text-[#FAF6EE] transition"
              >
                <span>Back to top</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D2C7B6]/20 bg-[#292725]">
                  <FaArrowUp className="h-3 w-3 text-[#FAF6EE]" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#D2C7B6]/10 flex flex-col items-center justify-between gap-4 text-xs text-[#9AA69A] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Seif Ahmed Almaz. All rights reserved.</p>
          <p className="text-[#687568]">Data Science &amp; AI Engineer • Cairo, Egypt</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
