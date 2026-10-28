import { motion } from "framer-motion";

function FilterChip({ label, active, onClick, count }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
        active
          ? "bg-burgundy text-[#FAF6EE] shadow-md shadow-burgundy/30 border border-burgundy/50"
          : "bg-[#211f1e] text-[#F2E8D5]/70 hover:text-white border border-[#FAF6EE]/10 hover:border-[#FAF6EE]/25"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
            active ? "bg-white/20 text-white" : "bg-white/10 text-[#9AA69A]"
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}

export default FilterChip;
