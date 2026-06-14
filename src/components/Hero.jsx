import profileImage from "../assets/profile.png";

function Hero() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_80%_30%,rgba(37,99,235,0.12),transparent_35%),linear-gradient(to_bottom,#000,#020617,#000)] text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-8 lg:flex-row lg:justify-between">

        {/* Left Side */}
        <div className="max-w-2xl">

          <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-blue-400">
            DATA ANALYTICS • MACHINE LEARNING • AI
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-none tracking-tight lg:text-7xl">
            Seif Ahmed
            <br />
            Almaz
          </h1>

          <h2 className="mb-8 text-xl font-light text-gray-300 lg:text-2xl">
            Transforming raw data into insights, dashboards, and machine learning solutions.
          </h2>

          <p className="mb-10 max-w-lg text-base leading-relaxed text-gray-400 lg:text-lg">
            I build data-driven solutions using Python, SQL, Power BI, and
            Machine Learning, transforming complex data into actionable
            insights and intelligent systems.
          </p>

          <div className="flex flex-wrap gap-4">

            <button className="rounded-full bg-white px-8 py-3 font-medium text-black transition-all duration-300 hover:scale-105">
              View Projects
            </button>

            <button className="rounded-full border border-gray-700 px-8 py-3 transition-all duration-300 hover:border-blue-400 hover:text-blue-400">
              Download CV
            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="mt-12 lg:mt-0 flex justify-center">

          <img
            src={profileImage}
            alt="Seif Ahmed Almaz"
            className="max-h-[620px] object-contain"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;