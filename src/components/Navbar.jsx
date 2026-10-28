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

  // Scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 30;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
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
    <header className="fixed top-0 left-0 z-50 w-full transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-[#D2C7B6]/15 bg-[#1C1A19]/85 backdrop-blur-xl shadow-lg shadow-black/30 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Brand Logo with SA Monogram */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-[#6E2638]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6E2638] text-xs font-bold text-[#FAF6EE] shadow-sm transition duration-200 group-hover:bg-[#451824]">
              SA
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#FAF6EE] transition duration-200 group-hover:text-[#F2E8D5]">
              Seif Almaz<span className="text-[#6E2638]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex rounded-full border border-[#D2C7B6]/15 bg-[#292725]/60 px-2 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <div key={item.label} className="relative px-3 py-1.5">
                  {item.type === "route" ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative z-10 text-xs uppercase tracking-wider font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-[#6E2638] rounded-md px-1.5 py-0.5 ${
                        active ? "text-[#FAF6EE]" : "text-[#9AA69A] hover:text-[#FAF6EE]"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`relative z-10 text-xs uppercase tracking-wider font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-[#6E2638] rounded-md px-1.5 py-0.5 ${
                        active ? "text-[#FAF6EE]" : "text-[#9AA69A] hover:text-[#FAF6EE]"
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
                      className="absolute inset-0 z-0 rounded-full bg-[#6E2638]/20 border border-[#6E2638]/40"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action: Resume & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {settings?.show_resume_button !== false && (
              <a
                href={currentProfile.resumeUrl || personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#6E2638] bg-[#6E2638] px-4 py-1.5 text-xs font-semibold text-[#FAF6EE] shadow-[0_2px_12px_rgba(110,38,56,0.3)] transition duration-200 hover:bg-[#451824] hover:border-[#451824] focus-visible:outline-2 focus-visible:outline-[#6E2638]"
              >
                <span>Résumé</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D2C7B6]/20 bg-[#292725]/80 text-[#FAF6EE] transition duration-200 hover:text-[#FAF6EE] hover:border-[#6E2638] hover:bg-[#6E2638]/20 focus-visible:outline-2 focus-visible:outline-[#6E2638] md:hidden"
            >
              {mobileMenuOpen ? <FaXmark className="h-4 w-4 text-[#FAF6EE]" /> : <FaBars className="h-4 w-4" />}
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
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm border-l border-[#D2C7B6]/20 bg-[#1C1A19]/95 p-6 shadow-2xl backdrop-blur-xl md:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#D2C7B6]/15 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6E2638] text-xs font-bold text-[#FAF6EE]">
                      SA
                    </span>
                    <span className="text-base font-bold text-[#FAF6EE] tracking-tight">
                      Navigation<span className="text-[#6E2638]">.</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Menu"
                    className="rounded-lg p-2 text-[#9AA69A] hover:text-[#FAF6EE] hover:bg-[#292725] transition duration-150"
                  >
                    <FaXmark className="h-5 w-5 text-[#FAF6EE]" />
                  </button>
                </div>

                {/* Mobile Drawer Links */}
                <div className="mt-8 flex flex-col gap-2.5">
                  {navItems.map((item, index) => {
                    const active = isItemActive(item);
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        {item.type === "route" ? (
                          <Link
                            to={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                              active
                                ? "bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/40"
                                : "text-[#9AA69A] hover:bg-[#292725] hover:text-[#FAF6EE]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {active && <span className="h-2 w-2 rounded-full bg-[#6E2638]" />}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            onClick={(e) => handleItemClick(e, item)}
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                              active
                                ? "bg-[#6E2638]/20 text-[#FAF6EE] border border-[#6E2638]/40"
                                : "text-[#9AA69A] hover:bg-[#292725] hover:text-[#FAF6EE]"
                            }`}
                          >
                            <span>{item.label}</span>
                            {active && <span className="h-2 w-2 rounded-full bg-[#6E2638]" />}
                          </a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Footer Action */}
              {settings?.show_resume_button !== false && (
                <div className="mt-12 pt-6 border-t border-[#D2C7B6]/15 text-center">
                  <a
                    href={currentProfile.resumeUrl || personalData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={currentProfile.resumeFilename || personalData.resumeFilename || "Seif_Almaz_CV.pdf"}
                    className="block w-full rounded-full bg-[#6E2638] py-3 text-center text-sm font-semibold text-[#FAF6EE] transition hover:bg-[#451824] shadow-md shadow-[#6E2638]/25"
                  >
                    Download Résumé (PDF)
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