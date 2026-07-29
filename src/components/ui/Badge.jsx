function Badge({ children, variant = "blue", className = "" }) {
  const variants = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    green: "bg-green-500/10 border-green-500/30 text-green-300",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    slate: "bg-white/5 border-white/10 text-gray-300"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition ${
        variants[variant] || variants.blue
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
