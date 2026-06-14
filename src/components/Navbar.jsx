function Navbar() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

                {/* Logo */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Seif.
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="hidden gap-8 md:flex">

                    <a
                        href="#about"
                        className="text-gray-400 transition hover:text-white"
                    >
                        About
                    </a>

                    <a
                        href="#projects"
                        className="text-gray-400 transition hover:text-white"
                    >
                        Projects
                    </a>

                    <a
                        href="#experience"
                        className="text-gray-400 transition hover:text-white"
                    >
                        Experience
                    </a>

                    <a
                        href="#contact"
                        className="text-gray-400 transition hover:text-white"
                    >
                        Contact
                    </a>

                </div>

                {/* Resume Button */}
                <div>

                    <button className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10">
                        Resume
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;