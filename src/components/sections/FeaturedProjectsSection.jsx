import { Link } from "react-router-dom";
import { projectsData } from "../../data/projectsData";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import Button from "../ui/Button";

function FeaturedProjectsSection() {
  const featuredProjects = projectsData.filter((p) => p.featured === true);

  return (
    <section id="featured-projects" className="scroll-mt-28 bg-black px-6 py-28 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="FEATURED CASE STUDIES"
          title="Impactful Data &amp;"
          titleHighlight="AI Solutions"
          description="Selected technical case studies demonstrating real-world problem solving, analytics dashboards, and machine learning models."
        />

        {/* Featured Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

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
