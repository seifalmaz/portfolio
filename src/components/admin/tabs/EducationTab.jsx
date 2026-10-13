import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaPen, FaTrash, FaGraduationCap, 
  FaCloudArrowUp, FaXmark 
} from 'react-icons/fa6';
import { educationService } from '../../../services/educationService';
import { storageService } from '../../../services/storageService';

export default function EducationTab({ 
  education, 
  onRefresh, 
  onShowAlert, 
  onOpenDeleteConfirm 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const initialForm = {
    institution: '',
    degree: '',
    field_of_study: '',
    period: '',
    is_current: true,
    gpa: '',
    description: '',
    achievements: '',
    logo_url: '',
    sort_order: 0
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenCreate = () => {
    setEditingEdu(null);
    setFormData({ ...initialForm, sort_order: education.length });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field_of_study: edu.field_of_study || '',
      period: edu.period || '',
      is_current: Boolean(edu.is_current),
      gpa: edu.gpa || '',
      description: edu.description || '',
      achievements: Array.isArray(edu.achievements) ? edu.achievements.join('\n') : '',
      logo_url: edu.logo_url || '',
      sort_order: edu.sort_order ?? 0
    });
    setIsModalOpen(true);
  };

  const handleUploadLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    try {
      const url = await storageService.uploadFile(file, 'institutions');
      setFormData(prev => ({ ...prev, logo_url: url }));
      onShowAlert('success', 'Institution logo uploaded!');
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.institution || !formData.degree) {
      onShowAlert('error', 'Institution and Degree are required.');
      return;
    }

    setSaving(true);
    try {
      const processed = {
        ...formData,
        id: editingEdu?.id || `edu-${Date.now()}`,
        achievements: formData.achievements 
          ? formData.achievements.split('\n').map(a => a.trim()).filter(Boolean)
          : [],
        sort_order: Number(formData.sort_order) || 0
      };

      if (editingEdu) {
        await educationService.updateEducation(editingEdu.id, processed);
        onShowAlert('success', `Education at ${processed.institution} updated!`);
      } else {
        await educationService.createEducation(processed);
        onShowAlert('success', `Education at ${processed.institution} created!`);
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Academic Education</h3>
          <p className="text-xs text-slate-400">Total: {education.length} degrees &amp; programs</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
        >
          <FaPlus />
          <span>Add Degree</span>
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                {edu.logo_url ? (
                  <img src={edu.logo_url} alt={edu.institution} className="w-full h-full object-cover" />
                ) : (
                  <FaGraduationCap className="text-blue-400 w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                  {edu.field_of_study && (
                    <span className="text-xs text-blue-400">• {edu.field_of_study}</span>
                  )}
                  {edu.is_current && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Enrolled
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 font-medium mt-0.5">{edu.institution}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {edu.period} {edu.gpa && `• GPA: ${edu.gpa}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => handleOpenEdit(edu)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-colors"
                title="Edit Education"
              >
                <FaPen className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenDeleteConfirm({
                  type: 'education',
                  id: edu.id,
                  name: `${edu.degree} at ${edu.institution}`
                })}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete Education"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Education Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  {editingEdu ? 'Edit Degree' : 'Add Academic Degree'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    placeholder="e.g. Helwan National University"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.degree}
                      onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Major / Field</label>
                    <input
                      type="text"
                      value={formData.field_of_study}
                      onChange={(e) => setFormData(prev => ({ ...prev, field_of_study: e.target.value }))}
                      placeholder="e.g. Data Science Major"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Period / Years</label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                      placeholder="e.g. 2022 – 2026"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={formData.gpa}
                      onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="e.g. 3.8 / 4.0"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Institution Logo</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={formData.logo_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                      placeholder="URL or upload"
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                      <FaCloudArrowUp className="text-blue-400" />
                      <span>{uploadingLogo ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleUploadLogo} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
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
                    {saving ? 'Saving...' : 'Save Degree'}
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
