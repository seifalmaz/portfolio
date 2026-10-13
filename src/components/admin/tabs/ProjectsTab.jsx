import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaMagnifyingGlass, FaPen, FaTrash, 
  FaClone, FaArrowUp, FaArrowDown, FaStar, 
  FaEye, FaCloudArrowUp, FaXmark
} from 'react-icons/fa6';
import { projectService } from '../../../services/projectService';
import { storageService } from '../../../services/storageService';

export default function ProjectsTab({ 
  projects, 
  onRefresh, 
  onShowAlert, 
  onOpenDeleteConfirm 
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    subtitle: '',
    category: 'Machine Learning & AI',
    featured: false,
    timeline: '',
    role: '',
    team: '',
    thumbnail: '',
    tagline: '',
    businessProblem: '',
    datasetDescription: '',
    architecture: '',
    methodology: '',
    techStack: '',
    objectives: '',
    keyMetrics: [{ label: '', value: '' }],
    githubUrl: '',
    liveDemoUrl: '',
    sort_order: 0
  };
  const [formData, setFormData] = useState(initialForm);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = search === '' ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.slug?.toLowerCase().includes(search.toLowerCase()) ||
      (p.techStack || p.technologies || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      subtitle: project.subtitle || '',
      category: project.category || 'Machine Learning & AI',
      featured: Boolean(project.featured),
      timeline: project.timeline || '',
      role: project.role || '',
      team: project.team || '',
      thumbnail: project.thumbnail || '',
      tagline: project.tagline || '',
      businessProblem: project.businessProblem || '',
      datasetDescription: project.datasetDescription || '',
      architecture: project.architecture || '',
      methodology: project.methodology || '',
      techStack: Array.isArray(project.techStack || project.technologies) 
        ? (project.techStack || project.technologies).join(', ') 
        : '',
      objectives: Array.isArray(project.objectives) ? project.objectives.join('\n') : '',
      keyMetrics: Array.isArray(project.keyMetrics) && project.keyMetrics.length > 0
        ? project.keyMetrics
        : [{ label: '', value: '' }],
      githubUrl: project.githubUrl || '',
      liveDemoUrl: project.liveDemoUrl || '',
      sort_order: project.sort_order ?? 0
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = async (project) => {
    try {
      await projectService.duplicateProject(project.slug || project.id);
      onShowAlert('success', `Duplicated project "${project.title}" successfully!`);
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Failed to duplicate: ${err.message}`);
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredProjects.length) return;

    const newProjects = [...filteredProjects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);

    try {
      const orderedIds = newProjects.map(p => p.id || p.slug);
      await projectService.reorderProjects(orderedIds);
      onShowAlert('success', 'Project order updated!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Reorder failed: ${err.message}`);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await storageService.uploadFile(file, 'projects');
      setFormData(prev => ({ ...prev, thumbnail: url }));
      onShowAlert('success', 'Image uploaded to Supabase Storage!');
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      onShowAlert('error', 'Title and Slug are required.');
      return;
    }

    setSaving(true);
    try {
      const processed = {
        ...(editingProject || {}),
        ...formData,
        id: editingProject?.id || formData.slug,
        techStack: formData.techStack
          ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean)
          : (editingProject?.techStack || editingProject?.technologies || []),
        objectives: formData.objectives
          ? formData.objectives.split('\n').map(s => s.trim()).filter(Boolean)
          : (editingProject?.objectives || []),
        keyMetrics: (formData.keyMetrics && formData.keyMetrics.filter(m => m.label && m.value).length > 0)
          ? formData.keyMetrics.filter(m => m.label && m.value)
          : (editingProject?.keyMetrics || []),
        sort_order: Number(formData.sort_order) || 0,
        // Crucial: preserve deep-dive case study fields from being overwritten with empty arrays
        gallery: editingProject?.gallery || [],
        pipeline: editingProject?.pipeline || [],
        metricsDeepDive: editingProject?.metricsDeepDive || [],
        codeSnippets: editingProject?.codeSnippets || [],
        keyFeatures: editingProject?.keyFeatures || [],
        challengesAndSolutions: editingProject?.challengesAndSolutions || [],
        businessInsights: editingProject?.businessInsights || [],
        resultsAndImpact: editingProject?.resultsAndImpact || [],
        lessonsLearned: editingProject?.lessonsLearned || [],
        futureImprovements: editingProject?.futureImprovements || [],
        benchmarkTable: editingProject?.benchmarkTable || [],
        tags: editingProject?.tags || []
      };

      if (editingProject) {
        await projectService.updateProject(editingProject.id, processed);
        onShowAlert('success', `Project "${processed.title}" updated!`);
      } else {
        await projectService.createProject(processed);
        onShowAlert('success', `Project "${processed.title}" created!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-1 gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search by title, slug, or tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
        >
          <FaPlus />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            No projects found matching current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProjects.map((p, idx) => (
                  <tr key={p.id || p.slug} className="hover:bg-slate-800/40 transition-colors">
                    {/* Order Controls */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => handleMoveOrder(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                          title="Move Up"
                        >
                          <FaArrowUp className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[10px] font-mono text-slate-500">{idx + 1}</span>
                        <button
                          onClick={() => handleMoveOrder(idx, 'down')}
                          disabled={idx === filteredProjects.length - 1}
                          className="p-1 text-slate-500 hover:text-white disabled:opacity-20"
                          title="Move Down"
                        >
                          <FaArrowDown className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </td>

                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-12 h-9 rounded object-cover border border-slate-800 bg-slate-950 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-9 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 flex-shrink-0">
                            No Img
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white hover:text-blue-400 transition-colors">
                            {p.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            /projects/{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300">
                        {p.category}
                      </span>
                    </td>

                    {/* Featured Status */}
                    <td className="py-3.5 px-4">
                      {p.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                          <FaStar className="text-[10px]" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Standard</span>
                      )}
                    </td>

                    {/* Tech Badges */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {(p.technologies || p.techStack || []).slice(0, 3).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px]">
                            {t}
                          </span>
                        ))}
                        {(p.technologies || p.techStack || []).length > 3 && (
                          <span className="text-[10px] text-slate-500 self-center">
                            +{ (p.technologies || p.techStack || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          to={`/projects/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="View on Public Portfolio"
                        >
                          <FaEye />
                        </Link>

                        <button
                          onClick={() => handleDuplicate(p)}
                          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Duplicate Project"
                        >
                          <FaClone />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors"
                          title="Edit Project"
                        >
                          <FaPen />
                        </button>

                        <button
                          onClick={() => onOpenDeleteConfirm({
                            type: 'project',
                            id: p.id || p.slug,
                            name: p.title
                          })}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete Project"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Project Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 className="text-sm font-bold text-white">
                  {editingProject ? `Edit: ${editingProject.title}` : 'Create New Portfolio Project'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <FaXmark className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          title,
                          slug: editingProject ? prev.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        }));
                      }}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Slug * (URL Identifier)</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Lead ML Engineer"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Timeline</label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      placeholder="e.g. 3 Months • 2025"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Team</label>
                    <input
                      type="text"
                      value={formData.team}
                      onChange={(e) => setFormData(prev => ({ ...prev, team: e.target.value }))}
                      placeholder="e.g. Solo Project"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Featured & Priority */}
                <div className="flex items-center gap-6 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Feature on Home Page</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400">Order Priority:</label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: e.target.value }))}
                      className="w-16 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                {/* Thumbnail Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thumbnail Cover</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="https://... or upload below"
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 transition-colors">
                      <FaCloudArrowUp className="text-blue-400" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Thumbnail preview"
                      className="mt-2 h-20 w-36 object-cover rounded-lg border border-slate-800"
                    />
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tech Stack (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="Python, PyTorch, Scikit-Learn, Power BI"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Tagline & Problem */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline (Brief Hook)</label>
                  <textarea
                    rows={2}
                    value={formData.tagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Problem & Context</label>
                  <textarea
                    rows={3}
                    value={formData.businessProblem}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessProblem: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Objectives */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Objectives (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.objectives}
                    onChange={(e) => setFormData(prev => ({ ...prev, objectives: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo / Dashboard URL</label>
                    <input
                      type="url"
                      value={formData.liveDemoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, liveDemoUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Form Footer */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
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
