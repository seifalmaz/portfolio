import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck, FaGithub, FaLinkedin, FaKaggle, FaEnvelope } from "react-icons/fa6";
import { personalData } from "../../data/personalData";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Button from "../ui/Button";

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("siefalmaz3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="scroll-mt-28 bg-black px-6 py-28 text-white border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="Let's Connect &amp;"
          titleHighlight="Collaborate"
          description="Whether you have an opportunity, a data science inquiry, or just want to connect, feel free to reach out directly."
          center
        />

        {/* Contact Container */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Availability Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Open for Full-Time Roles, Internships &amp; Projects</span>
          </div>

          {/* Copy Email Card */}
          <Card hover={false} className="mb-12 p-8 text-center bg-slate-950/80">
            <p className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">Direct Email Address</p>
            <p className="text-2xl font-black text-white md:text-3xl tracking-tight mb-6">
              siefalmaz3@gmail.com
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
                href={personalData.socials.email}
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaLinkedin className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-semibold">LinkedIn</span>
            </a>

            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaGithub className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-semibold">GitHub</span>
            </a>

            <a
              href={personalData.socials.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaKaggle className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-semibold">Kaggle</span>
            </a>

            <a
              href={personalData.socials.email}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaEnvelope className="h-6 w-6 text-blue-400" />
              <span className="text-xs font-semibold">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
