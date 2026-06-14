import aboutImage from "../assets/about-profile.png";

import {
  FaLocationDot,
  FaGraduationCap,
  FaChartLine,
  FaRobot,
  FaBuilding,
} from "react-icons/fa6";

import { HiMiniAcademicCap } from "react-icons/hi2";

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-32 bg-black px-8 pt-48 pb-32 text-white"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
          About
        </p>

        <h2 className="mb-16 text-4xl font-bold lg:text-6xl">
          The Person Behind The Data.
        </h2>

        <div className="grid items-start gap-20 lg:grid-cols-2">

          {/* ========================= */}
          {/* Profile Card */}
          {/* ========================= */}

          <div>
            <div
              className="
                group
                w-full
                max-w-[380px]
                rounded-3xl
                border
                border-slate-800
                bg-slate-950/50
                p-8
                transition-all
                duration-500
                hover:border-blue-500/30
                hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]
              "
            >

              {/* Profile Image */}
              <div className="relative flex justify-center">

                <div className="absolute h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

                <img
                  src={aboutImage}
                  alt="Seif Ahmed Almaz"
                  className="
                    relative
                    h-40
                    w-40
                    rounded-full
                    object-cover
                    ring-2
                    ring-blue-500/30
                    transition-all
                    duration-500
                    group-hover:ring-blue-400
                  "
                />

              </div>

              {/* Name */}
              <div className="mt-6 text-center">

                <h3 className="text-3xl font-bold text-white">
                  Seif Ahmed Almaz
                </h3>

                <p className="mt-2 text-sm font-medium text-blue-400">
                  Data Analytics • ML • AI
                </p>

              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-slate-800" />

              {/* Details */}
              <div className="space-y-6 text-sm">

                <div className="flex items-start gap-3">
                  <FaLocationDot className="mt-1 text-blue-400" />
                  <span className="text-gray-300">
                    Cairo, Egypt
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <FaGraduationCap className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      Data Science
                    </p>
                    <p className="text-gray-500">
                      Helwan National University
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaChartLine className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      DEPI
                    </p>
                    <p className="text-gray-500">
                      Google Data Analyst Specialist
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaRobot className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      DEPI
                    </p>
                    <p className="text-gray-500">
                      Machine Learning Engineer
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaBuilding className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      CIB
                    </p>
                    <p className="text-gray-500">
                      Summer Internship
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaBuilding className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      Banque du Caire
                    </p>
                    <p className="text-gray-500">
                      IT Internship
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiMiniAcademicCap className="mt-1 text-blue-400" />
                  <div>
                    <p className="text-white">
                      ICPC Community
                    </p>
                    <p className="text-gray-500">
                      Programming Mentor
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* About Text */}
          {/* ========================= */}

          <div className="max-w-2xl">

            <h3 className="mb-8 text-3xl font-semibold">
              About Me
            </h3>

            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              I'm Seif Ahmed Almaz, a Data Analytics and Machine
              Learning enthusiast focused on transforming complex
              data into actionable insights, business intelligence,
              and intelligent solutions.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-gray-400">
              Through internships at CIB and Banque du Caire,
              participation in two Digital Egypt Pioneers Initiative
              (DEPI) tracks, and mentoring students within the ICPC
              community, I've gained practical exposure to analytics,
              machine learning, software development, and data-driven
              decision making.
            </p>

            <p className="text-lg leading-relaxed text-gray-400">
              My goal is to bridge the gap between data and business
              impact by building dashboards, predictive models, and
              intelligent systems that help organizations make better,
              faster, and more informed decisions.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

export default About;