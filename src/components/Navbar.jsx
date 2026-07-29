import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaXmark } from "react-icons/fa6";
import { navItems, handleHybridNavigation } from "../data/navigationData";
import { personalData } from "../data/personalData";
import { useActiveSection } from "../hooks/useActiveSection";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Observed section IDs on the homepage
  const homepageSections = ["hero", "about", "skills", "projects", "experience", "contact"];
  const activeSection = useActiveSection(homepageSections);

  // Scroll detection for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action: Resume Download & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Resume Button */}
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-blue-400"
            >
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400 md:hidden"
            >
              {mobileMenuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
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
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm border-l border-white/10 bg-slate-950 p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-lg font-bold text-white">
                  Navigation<span className="text-blue-400">.</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="rounded-lg p-2 text-gray-400 hover:text-white"
                >
                  <FaXmark className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Drawer Links */}
              <div className="mt-8 flex flex-col gap-4">
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
                          className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                            active
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.label}
                          {active && <span className="h-2 w-2 rounded-full bg-blue-400" />}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => handleItemClick(e, item)}
                          className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                            active
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.label}
                          {active && <span className="h-2 w-2 rounded-full bg-blue-400" />}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Footer Action */}
              <div className="mt-12 pt-6 border-t border-white/10 text-center">
                <a
                  href={personalData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-full bg-blue-500 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-600 shadow-lg shadow-blue-500/25"
                >
                  Download Resume (PDF)
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;