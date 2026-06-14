import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    "About",
    "Projects",
    "Experience",
    "Contact",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-white transition duration-300 hover:text-blue-400"
        >
          Seif.
        </a>

        {/* Navigation */}
        <div className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="
                relative
                text-gray-400
                transition-all
                duration-300
                hover:text-white
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-blue-400
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {link}
            </a>
          ))}
        </div>

        {/* Resume Button */}
        <button
          className="
            rounded-full
            border
            border-white/20
            bg-white/5
            px-5
            py-2
            text-sm
            font-medium
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            hover:scale-105
            hover:border-blue-400/50
            hover:bg-blue-500/10
            hover:text-blue-400
          "
        >
          Resume
        </button>

      </div>
    </nav>
  );
}

export default Navbar;