import { useState, useEffect } from 'react';
import { FaCheck, FaLinkedin, FaGithub, FaKaggle, FaEnvelope } from 'react-icons/fa6';
import MostaqlIcon from '../../ui/MostaqlIcon';
import { profileService } from '../../../services/profileService';

export default function ContactTab({ profile, onRefresh, onShowAlert }) {
  const [email, setEmail] = useState('');
  const [socials, setSocials] = useState({
    linkedin: '',
    github: '',
    kaggle: '',
    mostaql: '',
    email: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || '');
      setSocials({
        linkedin: profile.socials?.linkedin || '',
        github: profile.socials?.github || '',
        kaggle: profile.socials?.kaggle || '',
        mostaql: profile.socials?.mostaql || '',
        email: profile.socials?.email || ''
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileService.updateProfile({
        ...profile,
        email,
        socials
      });
      onShowAlert('success', 'Contact info and social links updated successfully!');
      onRefresh();
    } catch (err) {
      onShowAlert('error', `Save failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact &amp; Social Links</h3>
          <p className="text-xs text-slate-400">Configure email addresses and profile links displayed in Contact and Footer</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          <FaCheck />
          <span>{saving ? 'Saving...' : 'Save Contact Info'}</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Primary Email Address (Displayed on Contact Card)
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="siefalmaz3@gmail.com"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
          <div className="relative">
            <FaLinkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-xs" />
            <input
              type="url"
              value={socials.linkedin}
              onChange={(e) => setSocials(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://www.linkedin.com/in/seif-almaz"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Profile URL</label>
          <div className="relative">
            <FaGithub className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
            <input
              type="url"
              value={socials.github}
              onChange={(e) => setSocials(prev => ({ ...prev, github: e.target.value }))}
              placeholder="https://github.com/seifalmaz"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Kaggle Profile URL</label>
          <div className="relative">
            <FaKaggle className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 text-xs" />
            <input
              type="url"
              value={socials.kaggle}
              onChange={(e) => setSocials(prev => ({ ...prev, kaggle: e.target.value }))}
              placeholder="https://kaggle.com/seifalmaz"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Mostaql Profile URL</label>
          <div className="relative">
            <MostaqlIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-400 h-3 w-auto max-w-[20px]" />
            <input
              type="url"
              value={socials.mostaql}
              onChange={(e) => setSocials(prev => ({ ...prev, mostaql: e.target.value }))}
              placeholder="https://mostaql.com/u/seifalmaz"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Mailto Destination (Optional)</label>
          <input
            type="text"
            value={socials.email}
            onChange={(e) => setSocials(prev => ({ ...prev, email: e.target.value }))}
            placeholder="mailto:siefalmaz3@gmail.com"
            className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </form>
  );
}
