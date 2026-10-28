import { motion } from "framer-motion";

function Card({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19]/80 p-6 backdrop-blur-md transition-all duration-300 ${
        hover ? "hover:border-[#6E2638] hover:shadow-[0_8px_30px_rgba(110,38,56,0.15)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Card;
