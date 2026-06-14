import aboutImage from "../assets/about-profile.png";

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-32 bg-black px-8 pt-48 pb-32 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Label */}
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
          About
        </p>

        {/* Section Title */}
        <h2 className="mb-16 text-4xl font-bold lg:text-[3rem]">
          The Person Behind The Data.
        </h2>

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Left Side - Profile Card */}
          <div>

            <div className="w-full max-w-[380px] rounded-3xl border border-slate-800 bg-slate-950/50 p-6">

              {/* Image */}
              <div className="relative flex justify-center">

                <div className="absolute h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                <img
                  src={aboutImage}
                  alt="Seif Ahmed Almaz"
                  className="relative h-40 w-40 rounded-full object-cover"
                />

              </div>

              {/* Name */}
              <div className="mt-6 text-center">

                <h3 className="text-2xl font-bold text-white">
                  Seif Ahmed Almaz
                </h3>

                <p className="mt-2 text-sm text-blue-400">
                  Data Analytics • ML • AI
                </p>

              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-slate-800" />

              {/* Details */}
              <div className="space-y-4 text-gray-300">

                <p>📍 Cairo, Egypt</p>

                <p>
                  🎓 Data Science — Helwan National University
                </p>

                <p>
                  📊 DEPI — Google Data Analyst Specialist
                </p>

                <p>
                  🤖 DEPI — Machine Learning Engineer
                </p>

                <p>
                  🏦 CIB Summer Internship
                </p>

                <p>
                  🏦 Banque du Caire IT Internship
                </p>

                <p>
                  👨‍🏫 ICPC Programming Mentor
                </p>

              </div>

            </div>

          </div>

          {/* Right Side - Story */}
          <div className="max-w-2xl">

            <h3 className="mb-6 text-2xl font-semibold">
              About Me
            </h3>

            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              I'm Seif Ahmed Almaz, a Computer Science student
              specializing in Data Science with a strong interest
              in Data Analytics, Machine Learning, and Artificial
              Intelligence.
            </p>

            <p className="mb-6 text-lg leading-relaxed text-gray-400">
              Through internships at CIB and Banque du Caire,
              participation in two DEPI tracks, and mentoring
              students within the ICPC community, I've gained
              practical exposure to analytics, business
              intelligence, machine learning, and software
              development.
            </p>

            <p className="text-lg leading-relaxed text-gray-400">
              My goal is to bridge the gap between data and
              decision-making by transforming complex datasets
              into actionable insights, meaningful dashboards,
              and intelligent systems that create real impact.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;