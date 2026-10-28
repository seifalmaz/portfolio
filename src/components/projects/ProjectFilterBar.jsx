import SearchInput from "../ui/SearchInput";
import FilterChip from "../ui/FilterChip";
import { FaFilter, FaSort, FaRotateLeft } from "react-icons/fa6";

function ProjectFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  technology,
  onTechnologyChange,
  technologies = [],
  sortBy,
  onSortByChange,
  onReset,
  totalResults
}) {
  const isFiltered = search || category !== "All" || technology !== "All" || sortBy !== "featured";

  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl border border-[#FAF6EE]/10 bg-[#211f1e]/80 backdrop-blur-lg mb-8">
      {/* Upper Bar: Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput value={search} onChange={onSearchChange} />

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Tech Stack Dropdown */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              value={technology}
              onChange={(e) => onTechnologyChange(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 bg-[#292725] border border-[#FAF6EE]/15 rounded-xl text-xs text-[#F2E8D5] focus:outline-none focus:border-burgundy transition cursor-pointer"
            >
              <option value="All">All Tech Stack</option>
              {technologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sage">
              <FaFilter className="w-3 h-3" />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none min-w-[140px]">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 bg-[#292725] border border-[#FAF6EE]/15 rounded-xl text-xs text-[#F2E8D5] focus:outline-none focus:border-burgundy transition cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="newest">Newest</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sage">
              <FaSort className="w-3 h-3" />
            </div>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition"
              title="Reset all filters"
            >
              <FaRotateLeft className="w-3 h-3" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Lower Bar: Category Pills & Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => onCategoryChange(cat)}
            />
          ))}
        </div>

        <div className="text-xs text-gray-400 font-medium">
          Showing <span className="text-white font-bold">{totalResults}</span> {totalResults === 1 ? 'project' : 'projects'}
        </div>
      </div>
    </div>
  );
}

export default ProjectFilterBar;
