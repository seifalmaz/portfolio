import { useState, useEffect } from 'react';
import { FaCloudArrowUp, FaCheck, FaTrash } from 'react-icons/fa6';
import { profileService } from '../../../services/profileService';
import { storageService } from '../../../services/storageService';

export default function ProfileTab({ profile, onRefresh, onShowAlert }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    roles: '',
    tagline: '',
    location: '',
    university: '',
    degree: '',
    email: '',
    resumeUrl: '',
    resumeFilename: 'Seif_Almaz_CV.pdf',
    profileImage: '',
    bioHeadline: '',
    bioParagraphs: ['', '', ''],
    stats: [{ label: '', value: '' }],
    availabilityStatus: 'Open for Full-Time Roles, Internships & Projects',
    isAvailable: true
  });

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        roles: Array.isArray(profile.roles) ? profile.roles.join('\n') : '',
        tagline: profile.tagline || '',
        location: profile.location || '',
        university: profile.university || '',
        degree: profile.degree || '',
        email: profile.email || '',
        resumeUrl: profile.resumeUrl || '',
        resumeFilename: profile.resumeFilename || 'Seif_Almaz_CV.pdf',
        profileImage: profile.profileImage || '',
        bioHeadline: profile.bioHeadline || '',
        bioParagraphs: Array.isArray(profile.bioParagraphs) ? profile.bioParagraphs : ['', ''],
        stats: Array.isArray(profile.stats) && profile.stats.length > 0 ? profile.stats : [{ label: '', value: '' }],
        availabilityStatus: profile.availabilityStatus || 'Open for Opportunities',
        isAvailable: profile.isAvailable ?? true
      });
    }
  }, [profile]);

  const handleUploadAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await storageService.uploadFile(file, 'avatars');
      setFormData(prev => ({ ...prev, profileImage: url }));
      onShowAlert('success', 'Profile photo uploaded!');
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await storageService.uploadFile(file, 'resumes');
      setFormData(prev => ({ 
        ...prev, 
        resumeUrl: url,
        resumeFilename: file.name
      }));
      onShowAlert('success', `Resume PDF uploaded: ${file.name}`);
    } catch (err) {
      onShowAlert('error', err.message);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleAddStat = () => {
    setFormData(prev => ({ ...prev, stats: [...prev.stats, { label: '', value: '' }] }));
  };

  const handleRemoveStat = (index) => {
    setFormData(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  const handleStatChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.stats];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, stats: updated };
    });
  };

  const handleBioParaChange = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.bioParagraphs];
      updated[index] = value;
      return { ...prev, bioParagraphs: updated };
    });
  };

  const handleAddBioPara = () => {
    setFormData(prev => ({ ...prev, bioParagraphs: [...prev.bioParagraphs, ''] }));
  };

  const handleRemoveBioPara = (index) => {
    setFormData(prev => ({ ...prev, bioParagraphs: prev.bioParagraphs.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        roles: formData.roles.split('\n').map(r => r.trim()).filter(Boolean),
        bioParagraphs: formData.bioParagraphs.map(p => p.trim()).filter(Boolean),
        stats: formData.stats.filter(s => s.label && s.value)
      };

      await profileService.updateProfile(payload);
      onShowAlert('success', 'Personal Profile & Hero details updated successfully!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Save Button Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Profile &amp; Hero Section</h3>
          <p className="text-xs text-slate-400">Configure public personal information, headline, and bio content</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <FaCheck />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {/* 1. Hero Identity */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">1. Hero Section Identification</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. Seif Ahmed Almaz"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Domain Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. DATA ANALYTICS • MACHINE LEARNING • AI"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Animated Rotating Roles (One per line)
          </label>
          <p className="text-[11px] text-slate-500 mb-1.5">
            These strings cycle dynamically inside "Building [Role]" on the main Hero headline.
          </p>
          <textarea
            rows={4}
            value={formData.roles}
            onChange={(e) => setFormData(prev => ({ ...prev, roles: e.target.value }))}
            placeholder="Machine Learning Models&#10;Executive BI Dashboards&#10;End-to-End Data Pipelines"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle Tagline</label>
          <textarea
            rows={2}
            value={formData.tagline}
            onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Cairo, Egypt"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">University</label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
              placeholder="Helwan National University"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Major</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
              placeholder="Data Science Major"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        {/* Availability Badge */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Availability Status Message</label>
            <input
              type="text"
              value={formData.availabilityStatus}
              onChange={(e) => setFormData(prev => ({ ...prev, availabilityStatus: e.target.value }))}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer self-start sm:self-center">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
              className="w-4 h-4 rounded bg-slate-900 text-blue-600 border-slate-700"
            />
            <span className="text-xs font-semibold text-emerald-400">Display Green Badge</span>
          </label>
        </div>
      </div>

      {/* 2. Media & Resume */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">2. Profile Image &amp; Resume / CV</h4>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Profile Avatar / Headshot</label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={formData.profileImage}
              onChange={(e) => setFormData(prev => ({ ...prev, profileImage: e.target.value }))}
              placeholder="Image URL or upload"
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300">
              <FaCloudArrowUp className="text-blue-400" />
              <span>{uploadingAvatar ? 'Uploading...' : 'Upload Image'}</span>
              <input type="file" accept="image/*" onChange={handleUploadAvatar} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Resume / CV Document (PDF)</label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={formData.resumeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, resumeUrl: e.target.value }))}
              placeholder="PDF URL or upload"
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300">
              <FaCloudArrowUp className="text-blue-400" />
              <span>{uploadingResume ? 'Uploading...' : 'Upload PDF'}</span>
              <input type="file" accept=".pdf" onChange={handleUploadResume} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* 3. About Section Content */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">3. About Section Content</h4>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">About Section Headline</label>
          <input
            type="text"
            value={formData.bioHeadline}
            onChange={(e) => setFormData(prev => ({ ...prev, bioHeadline: e.target.value }))}
            placeholder="e.g. Bridging Complex Data &amp; Business Impact"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300">Bio Narrative Paragraphs</label>
            <button
              type="button"
              onClick={handleAddBioPara}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              + Add Paragraph
            </button>
          </div>

          <div className="space-y-3">
            {formData.bioParagraphs.map((para, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => handleBioParaChange(idx, e.target.value)}
                  placeholder={`Paragraph ${idx + 1}`}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBioPara(idx)}
                  disabled={formData.bioParagraphs.length === 1}
                  className="p-2 text-slate-500 hover:text-red-400 disabled:opacity-20"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Stats Counter */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">4. Key Profile Statistics &amp; Metrics</h4>
            <p className="text-[11px] text-slate-400">Metrics displayed across your portfolio cards</p>
          </div>
          <button
            type="button"
            onClick={handleAddStat}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            + Add Metric
          </button>
        </div>

        <div className="space-y-2">
          {formData.stats.map((st, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Label (e.g. Completed Projects)"
                value={st.label}
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Value (e.g. 12+)"
                value={st.value}
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                className="w-36 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="p-2 text-slate-500 hover:text-red-400"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-xl shadow-blue-500/25 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </div>
    </form>
  );
}
