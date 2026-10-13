import { 
  FaFolderOpen, FaBolt, FaBriefcase, FaAward, 
  FaGraduationCap, FaPlus, FaArrowUpRightFromSquare, 
  FaDatabase, FaServer
} from 'react-icons/fa6';

export default function OverviewTab({ 
  counts, 
  lastUpdated, 
  onNavigateTab, 
  onSyncAll, 
  syncing 
}) {
  const statCards = [
    { title: 'Total Projects', count: counts.projects ?? 0, icon: FaFolderOpen, color: 'text-blue-400', tab: 'projects' },
    { title: 'Skills & Tools', count: counts.skills ?? 0, icon: FaBolt, color: 'text-amber-400', tab: 'skills' },
    { title: 'Experience Entries', count: counts.experiences ?? 0, icon: FaBriefcase, color: 'text-emerald-400', tab: 'experience' },
    { title: 'Certifications', count: counts.certifications ?? 0, icon: FaAward, color: 'text-purple-400', tab: 'certifications' },
    { title: 'Education Degrees', count: counts.education ?? 0, icon: FaGraduationCap, color: 'text-cyan-400', tab: 'education' },
    { title: 'Featured Projects', count: counts.featuredProjects ?? 0, icon: FaFolderOpen, color: 'text-yellow-400', tab: 'projects' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Content Management System
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Welcome to Your Portfolio CMS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Manage your projects, professional experience, technical competencies, and visual content in real-time. Changes are instantly published to your public portfolio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onSyncAll}
              disabled={syncing}
              title="Save all active CMS content to Supabase database"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-xl shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              <FaDatabase className={syncing ? 'animate-spin' : ''} />
              <span>{syncing ? 'Syncing to Supabase...' : 'Sync to Supabase'}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
            >
              <span>View Public Site</span>
              <FaArrowUpRightFromSquare className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Calculated Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Portfolio Inventory
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            Last checked: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Just now'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigateTab(card.tab)}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-2 rounded-xl bg-slate-800/80 ${card.color}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono group-hover:text-blue-400 transition-colors">
                    Manage &rarr;
                  </span>
                </div>
                <p className="text-2xl font-black text-white">{card.count}</p>
                <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate">{card.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('projects', { openCreate: true })}
            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <FaPlus className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Add New Project</p>
                <p className="text-[11px] text-slate-400">Publish a new case study</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('skills', { openCreate: true })}
            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/80 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <FaBolt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Add Skill or Tool</p>
                <p className="text-[11px] text-slate-400">Add technical proficiency</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('experience', { openCreate: true })}
            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <FaBriefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Add Career Experience</p>
                <p className="text-[11px] text-slate-400">Record a role or internship</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('certifications', { openCreate: true })}
            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80 text-left transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <FaAward className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Add Certification</p>
                <p className="text-[11px] text-slate-400">Attach new credential</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Database & Cloud Architecture Details */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <FaServer className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Storage &amp; Data Pipeline Architecture</h4>
            <p className="text-[11px] text-slate-400">PostgreSQL Database with Supabase Storage Buckets</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="text-slate-400 text-[11px] font-semibold">Row-Level Security (RLS)</p>
            <p className="text-emerald-400 font-mono mt-1">✓ Enabled on all 8 tables</p>
            <p className="text-[10px] text-slate-500 mt-1">Visitors have read-only access. Only authenticated admin writes.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="text-slate-400 text-[11px] font-semibold">Media &amp; File Storage</p>
            <p className="text-blue-400 font-mono mt-1">✓ portfolio-assets bucket</p>
            <p className="text-[10px] text-slate-500 mt-1">Images, logos, credentials, and resume PDFs hosted securely.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <p className="text-slate-400 text-[11px] font-semibold">Client-Side Fallback</p>
            <p className="text-amber-400 font-mono mt-1">✓ Zero-Downtime Guarantee</p>
            <p className="text-[10px] text-slate-500 mt-1">Seamlessly falls back to local data if network or credentials drop.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
