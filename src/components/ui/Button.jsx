import { motion } from "framer-motion";

function Button({ children, onClick, href, variant = "primary", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm transition duration-300 focus-visible:outline-2 focus-visible:outline-blue-400";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 hover:scale-105 px-6 py-3 shadow-lg shadow-white/10",
    blue: "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 px-6 py-3 shadow-lg shadow-blue-500/25",
    outline: "border border-white/20 bg-white/5 text-white hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400 px-6 py-3 backdrop-blur-sm"
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={combinedClass}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
