import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function ProjectNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="group flex flex-col items-start gap-1 p-4 rounded-xl border border-[#FAF6EE]/10 bg-[#211f1e] hover:border-burgundy/50 hover:bg-burgundy/10 transition w-full sm:w-1/2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-sage group-hover:text-[#F2E8D5] transition font-medium">
            <FaArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Previous Project
          </span>
          <span className="text-sm font-bold text-white group-hover:text-[#FAF6EE] transition line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block w-1/2" />
      )}

      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-[#FAF6EE]/10 bg-[#211f1e] hover:border-burgundy/50 hover:bg-burgundy/10 transition w-full sm:w-1/2 text-right"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-sage group-hover:text-[#F2E8D5] transition font-medium">
            Next Project
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="text-sm font-bold text-white group-hover:text-[#FAF6EE] transition line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block w-1/2" />
      )}
    </div>
  );
}

export default ProjectNav;
