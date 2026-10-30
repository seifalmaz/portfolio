import { motion } from "framer-motion";
import { FaFolderOpen, FaRotateLeft } from "react-icons/fa6";
import Button from "../ui/Button";

function ProjectEmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center p-12 my-8 rounded-2xl border border-[#D2C7B6]/15 bg-[#1C1A19]/60 backdrop-blur-md"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#6E2638]/15 border border-[#6E2638]/30 flex items-center justify-center text-[#F2E8D5] mb-4 shadow-lg shadow-[#6E2638]/15">
        <FaFolderOpen className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#FAF6EE] mb-2">No Matching Projects Found</h3>
      <p className="text-sm text-[#9AA69A] max-w-md mb-6 leading-relaxed">
        We couldn't find any projects matching your search or active filter criteria. Try adjusting your keyword or clearing filters.
      </p>
      {onReset && (
        <Button onClick={onReset} variant="outline" className="gap-2 text-xs">
          <FaRotateLeft className="w-3.5 h-3.5" />
          Reset All Filters
        </Button>
      )}
    </motion.div>
  );
}

export default ProjectEmptyState;
