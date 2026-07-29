import { motion } from "framer-motion";

function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-2xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-md transition-all duration-300 ${
        hover ? "hover:border-blue-500/40 hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Card;
