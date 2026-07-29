import { motion } from "framer-motion";
import { FaGraduationCap, FaLocationDot, FaCircleCheck, FaLaptopCode, FaRocket } from "react-icons/fa6";
import aboutImage from "../../assets/about-profile.png";
import { personalData } from "../../data/personalData";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";

function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-black px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="ABOUT ME"
          title="Bridging Complex Data &amp;"
          titleHighlight="Business Impact"
          description="A structured overview of my academic foundation, technical specialization, and core focus."
        />

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Profile Card Sidebar */}
          <div className="lg:col-span-4">
            <Card hover={false} className="text-center p-8">
              <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full ring-2 ring-blue-500/30">
                <img
                  src={aboutImage}
                  alt={personalData.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold text-white">{personalData.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-400">{personalData.title}</p>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-4 text-left text-xs">
                <div className="flex items-start gap-3">
                  <FaLocationDot className="mt-0.5 text-blue-400 h-4 w-4 shrink-0" />
                  <span className="text-gray-300">{personalData.location}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaGraduationCap className="mt-0.5 text-blue-400 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{personalData.degree}</p>
                    <p className="text-gray-400">{personalData.university}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaLaptopCode className="mt-0.5 text-blue-400 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Focus Domains</p>
                    <p className="text-gray-400">Data Analytics • ML • BI</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Structured Profile Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Professional Summary */}
            <Card hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <FaCircleCheck className="h-4 w-4" />
                </span>
                <h4 className="text-xl font-bold text-white">Professional Summary</h4>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {personalData.bioParagraphs[0]}
              </p>
            </Card>

            {/* 2. Education & Specialization Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card hover={false}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaGraduationCap className="h-4 w-4" />
                  </span>
                  <h4 className="text-lg font-bold text-white">Education</h4>
                </div>
                <p className="font-semibold text-blue-300 text-sm">{personalData.degree}</p>
                <p className="text-xs text-gray-400 mt-1">{personalData.university}</p>
                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                  Specialized coursework in Machine Learning, Statistical Inference, Database Systems, Data Structures, and Algorithms.
                </p>
              </Card>

              <Card hover={false}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaLaptopCode className="h-4 w-4" />
                  </span>
                  <h4 className="text-lg font-bold text-white">Specialization</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>Predictive Modeling &amp; Machine Learning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>Power BI &amp; DAX Executive Dashboards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>SQL &amp; ETL Pipeline Architecture</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* 3. Interests & Currently Learning */}
            <Card hover={false}>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <FaRocket className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-white">Interests &amp; Currently Learning</h4>
              </div>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                Expanding expertise in <strong className="text-white">Azure AI &amp; MLOps</strong>, model deployment monitoring via MLflow, and scalable computer vision pipelines using PyTorch and OpenCV.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
