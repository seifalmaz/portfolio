import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";
import { usePortfolio } from "../../context/PortfolioContext";
import { staggerContainer, fadeInUp } from "../../lib/motion";

function FeaturedProjectsSection() {
  const { projects: contextProjects } = usePortfolio();
  const featuredProjects = Array.isArray(contextProjects)
    ? contextProjects.filter((p) => p.featured === true)
    : [];

  return (
    <section id="projects" data-section="projects" className="scroll-mt-28 bg-black px-6 py-28 text-white border-t border-white/5 relative">
      <span id="featured-projects" className="absolute -top-28" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="FEATURED CASE STUDIES"
          title="Impactful Data &amp;"
          titleHighlight="AI Solutions"
          description="Selected technical case studies demonstrating real-world problem solving, analytics dashboards, and machine learning models."
        />

        {/* Featured Projects Grid with Staggered Viewport Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer(0.12, 0.05)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-stretch"
        >
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id || project.slug}
              variants={fadeInUp(idx * 0.05, 20)}
              className="flex h-full flex-col"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center">
          <Link to="/projects">
            <Button variant="outline">
              View All Projects Catalog &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjectsSection;
