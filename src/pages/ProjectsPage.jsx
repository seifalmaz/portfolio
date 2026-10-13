import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import PageTransition from "../components/layout/PageTransition";
import ProjectFilterBar from "../components/projects/ProjectFilterBar";
import ProjectGrid from "../components/projects/ProjectGrid";
import { useProjects } from "../hooks/useProjects";
import SEO from "../components/common/SEO";

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialTech = searchParams.get("technology") || "All";
  const initialSort = searchParams.get("sortBy") || "featured";

  const {
    projects,
    categories,
    technologies,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    technology,
    setTechnology,
    sortBy,
    setSortBy,
    resetFilters
  } = useProjects({
    category: initialCategory,
    search: initialSearch,
    technology: initialTech,
    sortBy: initialSort
  });

  // Sync state to URL search parameters for shareable/bookmarkable search links
  useEffect(() => {
    const params = {};
    if (category !== "All") params.category = category;
    if (search) params.search = search;
    if (technology !== "All") params.technology = technology;
    if (sortBy !== "featured") params.sortBy = sortBy;

    setSearchParams(params, { replace: true });
  }, [category, search, technology, sortBy, setSearchParams]);

  const handleTagClick = (techName) => {
    setTechnology(techName);
  };

  return (
    <PageTransition>
      <SEO
        title="Projects & Case Studies"
        description="Explore technical breakdowns, predictive models, Power BI executive dashboards, and computer vision systems built by Seif Almaz."
        pathname="/projects"
      />
      <div className="min-h-screen bg-black pt-32 pb-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
              PORTFOLIO CATALOG
            </p>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
              Projects &amp; <span className="text-blue-400">Case Studies</span>
            </h1>
            <p className="mt-4 max-w-2xl text-gray-400 leading-relaxed font-light">
              Explore complete technical breakdowns, system architectures, machine learning models, real-time computer vision applications, and executive dashboards.
            </p>
          </div>

          {/* Interactive Filter & Search Bar */}
          <ProjectFilterBar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            technology={technology}
            onTechnologyChange={setTechnology}
            technologies={technologies}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onReset={resetFilters}
            totalResults={projects.length}
          />

          {/* Projects Grid */}
          <ProjectGrid
            projects={projects}
            loading={loading}
            onResetFilters={resetFilters}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </PageTransition>
  );
}

export default ProjectsPage;
