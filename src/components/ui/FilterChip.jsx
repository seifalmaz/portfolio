import { motion } from "framer-motion";

function FilterChip({ label, active, onClick, count }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30"
          : "bg-slate-900/80 text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
            active ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

export default FilterChip;
