import { useState, useEffect } from 'react';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa6';
import { settingsService } from '../../../services/settingsService';

export default function SettingsTab({ settings, onRefresh, onShowAlert }) {
  const [formData, setFormData] = useState({
    section_visibility: {
      hero: true,
      about: true,
      skills: true,
      projects: true,
      experience: true,
      certifications: true,
      education: true,
      contact: true
    },
    show_resume_button: true,
    site_title: '',
    site_description: '',
    accent_color: '#3b82f6'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        section_visibility: {
          hero: true,
          about: true,
          skills: true,
          projects: true,
          experience: true,
          certifications: true,
          education: true,
          contact: true,
          ...(settings.section_visibility || {})
        },
        show_resume_button: settings.show_resume_button ?? true,
        site_title: settings.site_title || 'Seif Ahmed Almaz | Data Analytics & AI Engineer',
        site_description: settings.site_description || 'Personal Portfolio & Case Studies for Data Analytics, Machine Learning, and Business Intelligence.',
        accent_color: settings.accent_color || '#3b82f6'
      });
    }
  }, [settings]);

  const toggleSection = (sectionKey) => {
    setFormData(prev => ({
      ...prev,
      section_visibility: {
        ...prev.section_visibility,
        [sectionKey]: !prev.section_visibility[sectionKey]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.updateSettings(formData);
      onShowAlert('success', 'Portfolio settings and section visibility updated successfully!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Settings save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const sectionsList = [
    { key: 'hero', label: 'Hero Section', desc: 'Main domain headline, animated role rotator, and call-to-action buttons' },
    { key: 'about', label: 'About Me Section', desc: 'Academic credentials, specialization pillars, and bio profile card' },
    { key: 'skills', label: 'Skills & Competencies', desc: 'Tabbed technical stack (Data Science, BI, Databases, CS)' },
    { key: 'projects', label: 'Featured Projects', desc: 'Interactive showcase cards linking to detailed case study pages' },
    { key: 'experience', label: 'Career Timeline', desc: 'Professional experience, banking internships, and mentorship history' },
    { key: 'certifications', label: 'Verified Certifications', desc: 'Microsoft, Google, and ICPC credential cards' },
    { key: 'contact', label: 'Contact Section', desc: 'Direct copy email card, status badge, and social link grid' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Portfolio Settings &amp; SEO</h3>
          <p className="text-xs text-slate-400">Control public section visibility, resume buttons, and page metadata</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <FaCheck />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* 1. Section Visibility Toggles */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">1. Public Section Visibility</h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Turn sections on or off without altering your underlying portfolio data or code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {sectionsList.map((sec) => {
            const isVisible = formData.section_visibility[sec.key] !== false;
            return (
              <div
                key={sec.key}
                onClick={() => toggleSection(sec.key)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                  isVisible 
                    ? 'bg-slate-950/80 border-slate-700/80 hover:border-blue-500/50' 
                    : 'bg-slate-950/30 border-slate-800/40 opacity-60 hover:opacity-100'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-2">
                    {isVisible ? <FaEye className="text-emerald-400 text-xs" /> : <FaEyeSlash className="text-slate-500 text-xs" />}
                    <span>{sec.label}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{sec.desc}</p>
                </div>

                <div className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                  isVisible ? 'bg-blue-600' : 'bg-slate-800'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isVisible ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Feature Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">2. Button &amp; Action Visibility</h4>

        <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <div>
            <p className="text-xs font-bold text-white">Show "Download CV (PDF)" Button</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Displays the resume download button in the Hero section</p>
          </div>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={formData.show_resume_button}
              onChange={(e) => setFormData(prev => ({ ...prev, show_resume_button: e.target.checked }))}
              className="w-5 h-5 rounded bg-slate-900 text-blue-600 border-slate-700"
            />
          </label>
        </div>
      </div>

      {/* 3. SEO Meta Settings */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">3. SEO &amp; Browser Metadata</h4>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Browser Page Title</label>
          <input
            type="text"
            value={formData.site_title}
            onChange={(e) => setFormData(prev => ({ ...prev, site_title: e.target.value }))}
            placeholder="Seif Ahmed Almaz | Data Analytics &amp; AI Engineer"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Search Engine Meta Description</label>
          <textarea
            rows={3}
            value={formData.site_description}
            onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
            placeholder="Personal Portfolio &amp; Case Studies for Data Analytics, Machine Learning, and Business Intelligence."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </form>
  );
}
