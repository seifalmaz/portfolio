import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navItems, handleHybridNavigation } from "../data/navigationData";
import { personalData } from "../data/personalData";
import { usePortfolio } from "../context/PortfolioContext";
import { useActiveSection } from "../hooks/useActiveSection";

const HOMEPAGE_SECTIONS = ["hero", "about", "skills", "projects", "experience", "contact"];

function Navbar() {
  const { profile, settings } = usePortfolio();
  const currentProfile = profile || personalData;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = useActiveSection(HOMEPAGE_SECTIONS, 140);

  // Scroll detection for backdrop blur (only updates when boolean threshold transitions)
  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 40;
      setScrolled(prev => (prev !== isPast ? isPast : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Determine if a navigation link is currently active
  const isItemActive = (item) => {
    if (location.pathname === "/projects" && item.href === "/projects") {
      return true;
    }
    if (location.pathname === "/" && item.sectionId === activeSection) {
      return true;
    }
    return false;
  };

  const handleItemClick = (e, item) => {
    setMobileMenuOpen(false);
    handleHybridNavigation(e, item, location, navigate);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/50 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold tracking-tight text-white transition duration-300 hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-400 rounded-md"
          >
            Seif<span className="text-blue-400">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <div key={item.label} className="relative px-3 py-1.5">
                  {item.type === "route" ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative z-10 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 rounded-md px-1 py-0.5 ${
                        active ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`relative z-10 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 rounded-md px-1 py-0.5 ${
                        active ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* Active Indicator Pill */}
                  {active && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 z-0 rounded-full bg-blue-500/10 border border-blue-500/20"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action: Resume Download & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {settings?.show_resume_button !== false && (
              <a
                href={currentProfile.resumeUrl || personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300 backdrop-blur-sm transition duration-200 hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-white shadow-[0_0_12px_rgba(59,130,246,0.15)] focus-visible:outline-2 focus-visible:outline-blue-400"
              >
                Resume
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/5 text-gray-300 transition duration-200 hover:text-white hover:border-blue-400/40 hover:bg-blue-500/10 focus-visible:outline-2 focus-visible:outline-blue-400 md:hidden"
            >
              {mobileMenuOpen ? <FaXmark className="h-5 w-5 text-blue-400" /> : <FaBars className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Animated Slide-Over Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm border-l border-blue-500/20 bg-slate-950/95 bg-gradient-to-b from-blue-950/40 via-slate-950 to-slate-950 p-6 shadow-[-10px_0_35px_rgba(37,99,235,0.2)] backdrop-blur-xl md:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-blue-500/15 pb-4">
                  <span className="text-lg font-bold text-white tracking-tight">
                    Navigation<span className="text-blue-400">.</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Menu"
                    className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-blue-500/10 transition duration-150"
                  >
                    <FaXmark className="h-5 w-5 text-blue-400" />
                  </button>
                </div>

                {/* Mobile Drawer Links */}
                <div className="mt-8 flex flex-col gap-3">
                  {navItems.map((item, index) => {
                    const active = isItemActive(item);
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.type === "route" ? (
                          <Link
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition duration-200 ${
                              active
                                ? "bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                                : "text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border hover:border-blue-500/20"
                            }`}
                          >
                            {item.label}
                            {active && <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            onClick={(e) => handleItemClick(e, item)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition duration-200 ${
                              active
                                ? "bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                                : "text-gray-300 hover:bg-blue-500/10 hover:text-blue-200 hover:border hover:border-blue-500/20"
                            }`}
                          >
                            {item.label}
                            {active && <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />}
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Footer Action */}
              {settings?.show_resume_button !== false && (
                <div className="mt-12 pt-6 border-t border-blue-500/15 text-center">
                  <a
                    href={currentProfile.resumeUrl || personalData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={currentProfile.resumeFilename || personalData.resumeFilename || "Seif_Almaz_CV.pdf"}
                    className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-center text-sm font-semibold text-white transition hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/30 border border-blue-400/30"
                  >
                    Download Resume (PDF)
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;