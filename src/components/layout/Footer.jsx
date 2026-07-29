import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaKaggle, FaEnvelope, FaArrowUp } from "react-icons/fa6";
import { personalData } from "../../data/personalData";
import { navItems, handleHybridNavigation } from "../../data/navigationData";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-md text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-5">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition">
              Seif<span className="text-blue-400">.</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-gray-400 leading-relaxed">
              {personalData.tagline}
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaGithub className="h-4 w-4" />
              </a>

              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>

              <a
                href={personalData.socials.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kaggle Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaKaggle className="h-4 w-4" />
              </a>

              <a
                href={personalData.socials.email}
                aria-label="Send Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:scale-110 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaEnvelope className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Quick Navigation
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.type === "route" ? (
                    <Link
                      to={item.href}
                      className="text-gray-400 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleHybridNavigation(e, item, location, navigate)}
                      className="text-gray-400 transition hover:text-white"
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
              <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Curriculum Vitae
              </h4>
              <p className="mt-2 text-xs text-gray-400">
                Download my latest resume summarizing my technical experience & credentials.
              </p>
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-xs font-semibold text-blue-300 transition duration-300 hover:border-blue-400 hover:bg-blue-500/20"
              >
                Download Resume (PDF)
              </a>
            </div>

            {/* Back to Top */}
            <div className="mt-8 flex items-center justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                aria-label="Back to Top"
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-blue-400 transition"
              >
                Back to top
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <FaArrowUp className="h-3 w-3" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Seif Ahmed Almaz. All rights reserved.</p>
          <p>Built with React 19, Vite 8 &amp; Tailwind CSS v4</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
