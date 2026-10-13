import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck, FaGithub, FaLinkedin, FaKaggle, FaEnvelope } from "react-icons/fa6";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Button from "../ui/Button";
import MostaqlIcon from "../ui/MostaqlIcon";
import { usePortfolio } from "../../context/PortfolioContext";

function ContactSection() {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const directEmail = profile?.email || "siefalmaz3@gmail.com";
  const socials = profile?.socials || {};

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="scroll-mt-28 bg-black px-6 py-28 text-white border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="Let's Connect &"
          titleHighlight="Collaborate"
          description="Whether you have an opportunity, a data science inquiry, or just want to connect, feel free to reach out directly."
          center
        />

        {/* Contact Container */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Availability Status Badge */}
          {profile?.isAvailable !== false && (
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-300 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>{profile?.availabilityStatus || "Open for Full-Time Roles, Internships & Projects"}</span>
            </div>
          )}

          {/* Copy Email Card */}
          <Card hover={false} className="mb-12 p-8 text-center bg-slate-950/80">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Direct Email Address</p>
            <p className="text-2xl font-black text-white md:text-3xl tracking-tight mb-6">
              {directEmail}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button onClick={handleCopyEmail} variant="blue" className="px-6 py-3 text-xs font-semibold">
                {copied ? (
                  <>
                    <FaCheck className="h-4 w-4 text-green-300" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="h-4 w-4" />
                    Copy Email Address
                  </>
                )}
              </Button>

              <a
                href={socials.email || `mailto:${directEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-medium text-white transition hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                Open Email Client
              </a>
            </div>

            {/* Success Toast Notification */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 inline-block rounded-lg bg-green-500/20 border border-green-500/30 px-4 py-2 text-xs font-medium text-green-300"
                >
                  &check; Email copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaLinkedin className="h-6 w-6 text-blue-400" />
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>
            )}

            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaGithub className="h-6 w-6 text-blue-400" />
                <span className="text-xs font-semibold">GitHub</span>
              </a>
            )}

            {socials.kaggle && (
              <a
                href={socials.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kaggle Profile"
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaKaggle className="h-6 w-6 text-blue-400" />
                <span className="text-xs font-semibold">Kaggle</span>
              </a>
            )}

            {/* Mostaql Freelance Profile */}
            <a
              href={socials.mostaql || "https://mostaql.com/u/seifalmaz"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mostaql freelance profile"
              className="flex flex-col items-center gap-3 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-teal-400/60 hover:bg-teal-500/15 hover:text-teal-300"
            >
              <MostaqlIcon className="h-6 w-auto max-w-[36px] text-teal-400" />
              <span className="text-xs font-semibold">Mostaql</span>
            </a>

            <a
              href={socials.email || `mailto:${directEmail}`}
              aria-label="Direct Email"
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaEnvelope className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-semibold">Direct Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
