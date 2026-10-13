import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { usePortfolio } from "../../context/PortfolioContext";

function SkillsSection() {
  const { skills } = usePortfolio();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const skillCategories = Array.isArray(skills) && skills.length > 0 ? skills : [];
  const currentCategory = skillCategories[activeCategoryIndex] || skillCategories[0] || { category: "Skills", skills: [] };

  return (
    <section id="skills" className="scroll-mt-28 bg-slate-950/80 px-6 py-28 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="SKILLS &amp; COMPETENCIES"
          title="Technical"
          titleHighlight="Expertise"
          description="Cleanly categorized technological stack across Data Science, Business Intelligence, Data Engineering, and Core CS."
        />

        {/* Category Tabs */}
        {skillCategories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {skillCategories.map((cat, index) => {
              const active = index === activeCategoryIndex;
              return (
                <button
                  key={cat.category || index}
                  onClick={() => setActiveCategoryIndex(index)}
                  className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat.category}
                  {active && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 z-0 rounded-xl bg-blue-500/10 border border-blue-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Category Skill Cards Grid */}
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(currentCategory.skills || []).map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <Card className="flex items-center justify-between p-5 hover:border-blue-500/30 transition-all duration-200">
                <div>
                  <h4 className="text-base font-bold text-white">{skill.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{currentCategory.category}</p>
                </div>

                {/* Clean Badge without percentage bar */}
                <Badge variant="blue">{skill.level || "Advanced"}</Badge>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
