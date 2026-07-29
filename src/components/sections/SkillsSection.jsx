import { useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "../../data/skillsData";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function SkillsSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

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
        <div className="mb-12 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {skillsData.map((cat, index) => {
            const active = index === activeCategoryIndex;
            return (
              <button
                key={cat.category}
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

        {/* Selected Category Skill Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillsData[activeCategoryIndex].skills.map((skill) => (
            <Card key={skill.name} className="flex items-center justify-between p-5">
              <div>
                <h4 className="text-base font-bold text-white">{skill.name}</h4>
                <p className="text-xs text-gray-400 mt-1">{skillsData[activeCategoryIndex].category}</p>
              </div>

              {/* Clean Badge without percentage bar */}
              <Badge variant="blue">{skill.level}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
