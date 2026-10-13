import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaPen, FaTrash, FaArrowUp, FaArrowDown, 
  FaXmark 
} from 'react-icons/fa6';
import { skillService } from '../../../services/skillService';

export default function SkillsTab({ 
  skills, 
  categories, 
  onRefresh, 
  onShowAlert, 
  onOpenDeleteConfirm 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: categories[0]?.name || 'Data Science & ML',
    level: 'Advanced',
    icon: '',
    years_of_experience: 1,
    featured: false,
    sort_order: 0
  });

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [catForm, setCatForm] = useState({ name: '', description: '', sort_order: 0 });

  const [saving, setSaving] = useState(false);

  const filteredSkills = skills.filter(s => 
    selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleOpenCreateSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: categories[0]?.name || 'Data Science & ML',
      level: 'Advanced',
      icon: '',
      years_of_experience: 1,
      featured: false,
      sort_order: filteredSkills.length
    });
    setIsSkillModalOpen(true);
  };

  const handleOpenEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name || '',
      category: skill.category || categories[0]?.name,
      level: skill.level || 'Advanced',
      icon: skill.icon || '',
      years_of_experience: skill.years_of_experience || 1,
      featured: Boolean(skill.featured),
      sort_order: skill.sort_order ?? 0
    });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!skillForm.name) return;
    setSaving(true);
    try {
      if (editingSkill) {
        await skillService.updateSkill(editingSkill.id, skillForm);
        onShowAlert('success', `Skill "${skillForm.name}" updated!`);
      } else {
        await skillService.createSkill(skillForm);
        onShowAlert('success', `Skill "${skillForm.name}" created!`);
      }
      setIsSkillModalOpen(false);
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleOpenCreateCat = () => {
    setEditingCategory(null);
    setCatForm({ name: '', description: '', sort_order: categories.length });
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (cat) => {
    setEditingCategory(cat);
    setCatForm({ name: cat.name || '', description: cat.description || '', sort_order: cat.sort_order ?? 0 });
    setIsCatModalOpen(true);
  };

  const handleSaveCat = async (e) => {
    e.preventDefault();
    if (!catForm.name) return;
    setSaving(true);
    try {
      if (editingCategory) {
        await skillService.updateCategory(editingCategory.id, catForm);
        onShowAlert('success', `Category "${catForm.name}" updated!`);
      } else {
        await skillService.createCategory(catForm);
        onShowAlert('success', `Category "${catForm.name}" created!`);
      }
      setIsCatModalOpen(false);
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Category save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleMoveSkillOrder = async (index, direction) => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= filteredSkills.length) return;

    const list = [...filteredSkills];
    const [moved] = list.splice(index, 1);
    list.splice(target, 0, moved);

    try {
      await skillService.reorderSkills(list.map(s => s.id));
      onShowAlert('success', 'Skills reordered!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Management Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Skill Categories</h3>
            <p className="text-[11px] text-slate-400">Manage categories displayed on the public Skills section</p>
          </div>
          <button
            onClick={handleOpenCreateCat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            <FaPlus className="text-blue-400" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            All Skills ({skills.length})
          </button>

          {categories.map((c) => {
            const count = skills.filter(s => s.category === c.name).length;
            const isSelected = selectedCategory === c.name;
            return (
              <div key={c.id || c.name} className="flex items-center">
                <button
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-3 py-1.5 rounded-l-xl text-xs font-semibold transition-all ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.name} ({count})
                </button>
                <button
                  onClick={() => handleOpenEditCat(c)}
                  className={`px-2 py-1.5 rounded-r-xl border-l border-slate-700/50 text-[10px] ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                  title="Edit Category"
                >
                  <FaPen />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills List Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white">
            {selectedCategory === 'All' ? 'All Skills' : `${selectedCategory} Skills`}
          </h3>
          <p className="text-xs text-slate-400">Total: {filteredSkills.length} competencies</p>
        </div>

        <button
          onClick={handleOpenCreateSkill}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
        >
          <FaPlus />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSkills.map((s, idx) => (
          <div
            key={s.id || s.name}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <button
                  onClick={() => handleMoveSkillOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20"
                >
                  <FaArrowUp className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={() => handleMoveSkillOrder(idx, 'down')}
                  disabled={idx === filteredSkills.length - 1}
                  className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20"
                >
                  <FaArrowDown className="w-2.5 h-2.5" />
                </button>
              </div>

              <div>
                <p className="font-bold text-white text-xs">{s.name}</p>
                <p className="text-[10px] text-slate-400">{s.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                s.level === 'Advanced' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' :
                s.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
                'bg-slate-800 text-slate-300'
              }`}>
                {s.level || 'Advanced'}
              </span>

              <button
                onClick={() => handleOpenEditSkill(s)}
                className="p-1.5 rounded-lg hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors"
                title="Edit Skill"
              >
                <FaPen className="w-3 h-3" />
              </button>

              <button
                onClick={() => onOpenDeleteConfirm({
                  type: 'skill',
                  id: s.id,
                  name: s.name
                })}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete Skill"
              >
                <FaTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button onClick={() => setIsSkillModalOpen(false)} className="text-slate-400 hover:text-white">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSaveSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name *</label>
                  <input
                    type="text"
                    required
                    value={skillForm.name}
                    onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. PyTorch"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency Level</label>
                    <select
                      value={skillForm.level}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Fundamental">Fundamental</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Identifier</label>
                    <input
                      type="text"
                      value={skillForm.icon}
                      onChange={(e) => setSkillForm(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="e.g. SiPytorch"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSkillModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20"
                  >
                    {saving ? 'Saving...' : 'Save Skill'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {isCatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  {editingCategory ? 'Edit Category' : 'Create Category'}
                </h3>
                <button onClick={() => setIsCatModalOpen(false)} className="text-slate-400 hover:text-white">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSaveCat} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={catForm.name}
                    onChange={(e) => setCatForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Cloud &amp; MLOps"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={catForm.description}
                    onChange={(e) => setCatForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description displayed on category banner"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCatModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20"
                  >
                    {saving ? 'Saving...' : 'Save Category'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
