import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaPen, FaTrash, FaArrowUp, FaArrowDown, 
  FaCloudArrowUp, FaXmark, FaAward, FaBriefcase 
} from 'react-icons/fa6';
import { experienceService } from '../../../services/experienceService';
import { storageService } from '../../../services/storageService';

export default function ExperienceTab({ 
  experiences, 
  onRefresh, 
  onShowAlert, 
  onOpenDeleteConfirm 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  const initialForm = {
    role: '',
    organization: '',
    type: 'Internship',
    period: '',
    location: 'Cairo, Egypt',
    description: '',
    highlights: '',
    technologies: '',
    logo_url: '',
    certificate_title: '',
    certificate_issuer: '',
    certificate_image: '',
    is_current: false,
    sort_order: 0
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenCreate = () => {
    setEditingExp(null);
    setFormData({ ...initialForm, sort_order: experiences.length });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role || '',
      organization: exp.organization || '',
      type: exp.type || 'Internship',
      period: exp.period || '',
      location: exp.location || '',
      description: exp.description || '',
      highlights: Array.isArray(exp.highlights) ? exp.highlights.join('\n') : '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : '',
      logo_url: exp.logo_url || (typeof exp.logo === 'string' ? exp.logo : ''),
      certificate_title: exp.certificate?.title || exp.certificate_title || '',
      certificate_issuer: exp.certificate?.issuer || exp.certificate_issuer || '',
      certificate_image: exp.certificate?.image || exp.certificate_image || '',
      is_current: Boolean(exp.is_current),
      sort_order: exp.sort_order ?? 0
    });
    setIsModalOpen(true);
  };

  const handleUploadLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await storageService.uploadFile(file, 'logos');
      setFormData(prev => ({ ...prev, logo_url: url }));
      onShowAlert('success', 'Logo uploaded successfully!');
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUploadCertImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCert(true);
    try {
      const url = await storageService.uploadFile(file, 'certificates');
      setFormData(prev => ({ ...prev, certificate_image: url }));
      onShowAlert('success', 'Certificate image uploaded!');
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploadingCert(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.role || !formData.organization) {
      onShowAlert('error', 'Role and Organization are required.');
      return;
    }

    setSaving(true);
    try {
      const processed = {
        ...formData,
        id: editingExp?.id || `exp-${Date.now()}`,
        highlights: formData.highlights 
          ? formData.highlights.split('\n').map(h => h.trim()).filter(Boolean)
          : [],
        technologies: formData.technologies
          ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
          : [],
        sort_order: Number(formData.sort_order) || 0
      };

      if (editingExp) {
        await experienceService.updateExperience(editingExp.id, processed);
        onShowAlert('success', `Experience at ${processed.organization} updated!`);
      } else {
        await experienceService.createExperience(processed);
        onShowAlert('success', `Experience at ${processed.organization} created!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleMoveOrder = async (index, direction) => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= experiences.length) return;

    const list = [...experiences];
    const [moved] = list.splice(index, 1);
    list.splice(target, 0, moved);

    try {
      await experienceService.reorderExperiences(list.map(e => e.id));
      onShowAlert('success', 'Timeline order updated!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Career Timeline</h3>
          <p className="text-xs text-slate-400">Total: {experiences.length} positions &amp; traineeships</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
        >
          <FaPlus />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience List Cards */}
      <div className="space-y-3">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              {/* Order Controls */}
              <div className="flex flex-col items-center gap-0.5 pt-1">
                <button
                  onClick={() => handleMoveOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 text-slate-600 hover:text-white disabled:opacity-20"
                >
                  <FaArrowUp className="w-2.5 h-2.5" />
                </button>
                <span className="text-[10px] font-mono text-slate-500">{idx + 1}</span>
                <button
                  onClick={() => handleMoveOrder(idx, 'down')}
                  disabled={idx === experiences.length - 1}
                  className="p-1 text-slate-600 hover:text-white disabled:opacity-20"
                >
                  <FaArrowDown className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Logo Preview */}
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                {exp.logo || exp.logo_url ? (
                  <img src={exp.logo || exp.logo_url} alt={exp.organization} className="w-full h-full object-cover" />
                ) : (
                  <FaBriefcase className="text-slate-500 w-5 h-5" />
                )}
              </div>

              {/* Role & Org Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {exp.type}
                  </span>
                </div>
                <p className="text-xs text-blue-400 font-medium mt-0.5">{exp.organization}</p>
                <p className="text-[11px] text-slate-400 mt-1">{exp.period} • {exp.location}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {exp.certificate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                  <FaAward /> Cert Attached
                </span>
              )}

              <button
                onClick={() => handleOpenEdit(exp)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-colors"
                title="Edit Experience"
              >
                <FaPen className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenDeleteConfirm({
                  type: 'experience',
                  id: exp.id,
                  name: `${exp.role} at ${exp.organization}`
                })}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete Experience"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Experience Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 className="text-sm font-bold text-white">
                  {editingExp ? 'Edit Position' : 'Add Career Experience'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Job Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Data Engineering Intern"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="e.g. Banque du Caire"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Professional Program">Professional Program</option>
                      <option value="Mentorship">Mentorship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                      placeholder="e.g. Jul 2025 – Aug 2025"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Cairo, Egypt"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Company Logo Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company Logo</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.logo_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                      placeholder="Image URL or upload"
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700">
                      <FaCloudArrowUp className="text-blue-400" />
                      <span>{uploadingLogo ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleUploadLogo} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Summary Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Highlights */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Responsibilities &amp; Achievements (One per line)</label>
                  <textarea
                    rows={3}
                    value={formData.highlights}
                    onChange={(e) => setFormData(prev => ({ ...prev, highlights: e.target.value }))}
                    placeholder="Optimized complex SQL queries...&#10;Engineered automated ETL mappings..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies Used (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="SQL, Informatica, ETL, Oracle DB"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Optional Certificate Attachment */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <FaAward /> Attached Certificate (Optional)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Certificate Title"
                      value={formData.certificate_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, certificate_title: e.target.value }))}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Issuer"
                      value={formData.certificate_issuer}
                      onChange={(e) => setFormData(prev => ({ ...prev, certificate_issuer: e.target.value }))}
                      className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="Certificate Image URL"
                      value={formData.certificate_image}
                      onChange={(e) => setFormData(prev => ({ ...prev, certificate_image: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                      <FaCloudArrowUp className="text-blue-400" />
                      <span>{uploadingCert ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleUploadCertImage} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20"
                  >
                    {saving ? 'Saving...' : 'Save Position'}
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
