import ProjectCard from "../ui/ProjectCard";
import SectionHeader from "../ui/SectionHeader";

function RelatedProjects({ projects = [] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-20 pt-12 border-t border-white/10">
      <SectionHeader
        eyebrow="Recommendations"
        title="Related Case Studies"
        subtitle="Explore similar engineering projects in the same domain or technology stack."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.id || project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProjects;
