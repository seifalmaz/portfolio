function Badge({ children, variant = "burgundy", className = "" }) {
  const variants = {
    burgundy: "bg-[#6E2638]/20 border-[#6E2638]/40 text-[#FAF6EE]",
    blue: "bg-[#6E2638]/20 border-[#6E2638]/40 text-[#FAF6EE]", // alias for backward compatibility
    sage: "bg-[#9AA69A]/20 border-[#9AA69A]/30 text-[#FAF6EE]",
    cream: "bg-[#F2E8D5]/15 border-[#D2C7B6]/30 text-[#FAF6EE]",
    green: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    yellow: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    slate: "bg-[#292725] border-[#D2C7B6]/20 text-[#9AA69A]"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold transition ${
        variants[variant] || variants.burgundy
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
