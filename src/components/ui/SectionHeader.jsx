import { motion } from "framer-motion";

function SectionHeader({ subtitle, title, titleHighlight, description, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}
    >
      {subtitle && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title} {titleHighlight && <span className="text-blue-400">{titleHighlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeader;
