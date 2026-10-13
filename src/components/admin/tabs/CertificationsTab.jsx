import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaPen, FaTrash, FaArrowUp, FaArrowDown, 
  FaCloudArrowUp, FaXmark, FaAward, FaStar, FaArrowUpRightFromSquare,
  FaFilePdf, FaEye 
} from 'react-icons/fa6';
import { certificationService } from '../../../services/certificationService';
import { storageService } from '../../../services/storageService';
import { isPdfUrl, getFileName, formatFileSize } from '../../../utils/fileUtils';
import { generateThumbnailFileFromPdf } from '../../../utils/pdfThumbnail';

export default function CertificationsTab({ 
  certifications, 
  onRefresh, 
  onShowAlert, 
  onOpenDeleteConfirm 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: '',
    issuer: '',
    category: 'AI & Machine Learning',
    date: '',
    expiryDate: '',
    credentialId: '',
    verifyUrl: '',
    imageUrl: '',
    thumbnailUrl: '',
    skills: '',
    featured: true,
    sort_order: 0
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenCreate = () => {
    setEditingCert(null);
    setFormData({ ...initialForm, sort_order: certifications.length });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      category: cert.category || 'Specialized',
      date: cert.date || cert.issueDate || '',
      expiryDate: cert.expiryDate || '',
      credentialId: cert.credentialId || '',
      verifyUrl: cert.verifyUrl || '',
      imageUrl: cert.imageUrl || (typeof cert.image === 'string' ? cert.image : ''),
      thumbnailUrl: cert.thumbnailUrl || '',
      skills: Array.isArray(cert.skills) ? cert.skills.join(', ') : '',
      featured: Boolean(cert.featured),
      sort_order: cert.sort_order ?? 0
    });
    setIsModalOpen(true);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 15MB)
    const MAX_MB = 15;
    if (file.size > MAX_MB * 1024 * 1024) {
      onShowAlert('error', `File is too large (${formatFileSize(file.size)}). Maximum allowed is ${MAX_MB}MB.`);
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const allowed = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'svg'];
    if (!allowed.includes(fileExt)) {
      onShowAlert('error', `Unsupported file type (.${fileExt}). Please upload a PDF or image (${allowed.join(', ')}).`);
      return;
    }

    setUploading(true);
    try {
      // 1. Upload original authoritative document (PDF or Image)
      const url = await storageService.uploadFile(file, 'certificates');
      let generatedThumbUrl = null;

      // 2. If it's a PDF, automatically generate a high-res image thumbnail of page 1
      if (fileExt === 'pdf') {
        try {
          const thumbFile = await generateThumbnailFileFromPdf(file, file.name);
          if (thumbFile) {
            generatedThumbUrl = await storageService.uploadFile(thumbFile, 'certificates/thumbnails');
          }
        } catch (thumbErr) {
          console.warn('Automatic thumbnail generation warning:', thumbErr);
        }
      }

      setFormData(prev => ({ 
        ...prev, 
        imageUrl: url,
        thumbnailUrl: generatedThumbUrl || prev.thumbnailUrl || ''
      }));

      onShowAlert(
        'success', 
        fileExt === 'pdf' 
          ? (generatedThumbUrl 
              ? 'PDF Certificate uploaded & visual thumbnail generated successfully!' 
              : 'PDF Certificate uploaded successfully!')
          : 'Certificate image uploaded successfully!'
      );
    } catch (err) {
      onShowAlert('error', `Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      // Reset input value so re-uploading the same file triggers onChange
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      onShowAlert('error', 'Title and Issuer are required.');
      return;
    }

    setSaving(true);
    try {
      const processed = {
        ...formData,
        id: editingCert?.id || `cert-${Date.now()}`,
        skills: formData.skills 
          ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
          : [],
        sort_order: Number(formData.sort_order) || 0
      };

      if (editingCert) {
        await certificationService.updateCertification(editingCert.id, processed);
        onShowAlert('success', `Certificate "${processed.title}" updated!`);
      } else {
        await certificationService.createCertification(processed);
        onShowAlert('success', `Certificate "${processed.title}" created!`);
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
    if (target < 0 || target >= certifications.length) return;

    const list = [...certifications];
    const [moved] = list.splice(index, 1);
    list.splice(target, 0, moved);

    try {
      await certificationService.reorderCertifications(list.map(c => c.id));
      onShowAlert('success', 'Certificates order updated!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Certifications &amp; Courses</h3>
          <p className="text-xs text-slate-400">Total: {certifications.length} verified credentials</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
        >
          <FaPlus />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, idx) => {
          const docUrl = cert.imageUrl || (typeof cert.image === 'string' ? cert.image : null);
          const isPdf = isPdfUrl(docUrl);

          return (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-0.5">
                      <button
                        onClick={() => handleMoveOrder(idx, 'up')}
                        disabled={idx === 0}
                        className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20"
                        title="Move Up"
                      >
                        <FaArrowUp className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(idx, 'down')}
                        disabled={idx === certifications.length - 1}
                        className="p-0.5 text-slate-600 hover:text-white disabled:opacity-20"
                        title="Move Down"
                      >
                        <FaArrowDown className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <div className={`p-2 rounded-xl ${isPdf ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {isPdf ? <FaFilePdf className="w-4 h-4" /> : <FaAward className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {cert.featured && (
                      <span className="p-1 text-amber-400" title="Featured Credential">
                        <FaStar className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {isPdf && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        PDF
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                      {cert.date || cert.issueDate}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{cert.title}</h4>
                <p className="text-xs text-blue-400 font-medium mb-3">{cert.issuer}</p>

                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono truncate max-w-[130px]" title={cert.credentialId || 'Verified'}>
                  {cert.credentialId || (docUrl ? 'Document File' : 'Verified')}
                </span>

                <div className="flex items-center gap-1.5">
                  {docUrl && (
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                      title={isPdf ? "Open Certificate PDF" : "Open Certificate Image"}
                    >
                      <FaEye className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {cert.verifyUrl && cert.verifyUrl !== '#' && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                      title="Open Verification Link"
                    >
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => handleOpenEdit(cert)}
                    className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                    title="Edit Certificate"
                  >
                    <FaPen className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onOpenDeleteConfirm({
                      type: 'certification',
                      id: cert.id,
                      name: cert.title
                    })}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete Certificate"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Create / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  {editingCert ? 'Edit Certification' : 'Add New Certification'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                  <FaXmark />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Certificate Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Microsoft Machine Learning Specialist"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.issuer}
                      onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                      placeholder="e.g. Microsoft &amp; DEPI"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. AI &amp; Machine Learning"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Date</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="e.g. Jul 2026"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Credential ID</label>
                    <input
                      type="text"
                      value={formData.credentialId}
                      onChange={(e) => setFormData(prev => ({ ...prev, credentialId: e.target.value }))}
                      placeholder="e.g. DEPI-MSFT-ML-2026"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Verification URL</label>
                  <input
                    type="url"
                    value={formData.verifyUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, verifyUrl: e.target.value }))}
                    placeholder="https://coursera.org/verify/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Certificate Document (Image or PDF) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Certificate Document (PDF or Image)
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="Supabase Storage URL or upload below"
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition">
                      <FaCloudArrowUp className="text-blue-400" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf,.pdf" 
                        onChange={handleUploadImage} 
                        disabled={uploading}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Document Preview Card */}
                  {formData.imageUrl && (
                    <div className="mt-2.5 p-3 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {formData.thumbnailUrl ? (
                          <img
                            src={formData.thumbnailUrl}
                            alt="Visual Thumbnail"
                            className="w-12 h-10 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                          />
                        ) : isPdfUrl(formData.imageUrl) ? (
                          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                            <FaFilePdf className="w-4 h-4" />
                          </div>
                        ) : (
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-12 h-10 rounded-lg object-cover border border-slate-700 shrink-0 bg-slate-900"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {getFileName(formData.imageUrl)}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {isPdfUrl(formData.imageUrl)
                              ? (formData.thumbnailUrl ? 'PDF + Visual Thumbnail Ready' : 'PDF Document Ready')
                              : 'Image Ready'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={formData.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-[11px] font-semibold transition inline-flex items-center gap-1"
                        >
                          <span>View</span>
                          <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition"
                          title="Remove attached document"
                        >
                          <FaXmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Relevant Skills (Comma-separated)</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    placeholder="Deep Learning, Azure AI, MLOps, PyTorch"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredCert"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <label htmlFor="featuredCert" className="text-xs font-semibold text-slate-300 cursor-pointer">
                    Mark as Featured Credential
                  </label>
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
                    {saving ? 'Saving...' : 'Save Certificate'}
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
