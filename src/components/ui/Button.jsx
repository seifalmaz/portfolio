import { motion } from "framer-motion";

function Button({ children, onClick, href, variant = "primary", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#6E2638]";

  const variants = {
    primary: "bg-[#6E2638] text-[#FAF6EE] hover:bg-[#451824] px-6 py-3 shadow-lg shadow-[#6E2638]/25 border border-[#6E2638]",
    burgundy: "bg-[#6E2638] text-[#FAF6EE] hover:bg-[#451824] px-6 py-3 shadow-lg shadow-[#6E2638]/25 border border-[#6E2638]",
    cream: "bg-[#F2E8D5] text-[#292725] hover:bg-[#FAF6EE] px-6 py-3 shadow-md border border-[#D2C7B6]",
    outline: "border border-[#D2C7B6]/30 bg-[#292725]/40 text-[#FAF6EE] hover:border-[#6E2638] hover:bg-[#6E2638]/15 px-6 py-3 backdrop-blur-sm"
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        href={href}
        className={combinedClass}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={combinedClass}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
