import { 
  FaChartPie, FaFolderOpen, FaBolt, FaBriefcase, 
  FaAward, FaGraduationCap, FaUserGear, FaEnvelope, 
  FaSliders, FaArrowRightFromBracket, FaXmark
} from 'react-icons/fa6';

export default function AdminSidebar({ 
  activeTab, 
  setActiveTab, 
  user, 
  onSignOut, 
  counts = {}, 
  isOpen, 
  onClose 
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaChartPie },
    { id: 'projects', label: 'Projects', icon: FaFolderOpen, count: counts.projects },
    { id: 'skills', label: 'Skills & Tech', icon: FaBolt, count: counts.skills },
    { id: 'experience', label: 'Experience', icon: FaBriefcase, count: counts.experiences },
    { id: 'certifications', label: 'Certifications', icon: FaAward, count: counts.certifications },
    { id: 'education', label: 'Education', icon: FaGraduationCap, count: counts.education },
    { id: 'profile', label: 'Profile & Hero', icon: FaUserGear },
    { id: 'contact', label: 'Contact & Socials', icon: FaEnvelope },
    { id: 'settings', label: 'Settings & SEO', icon: FaSliders },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900/95 border-r border-slate-800 
        flex flex-col transition-transform duration-300 backdrop-blur-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand / Logo */}
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-500/20">
              CMS
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">PORTFOLIO CMS</h2>
              <p className="text-[10px] text-slate-400 font-mono">v2.0 • Supabase</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white lg:hidden"
          >
            <FaXmark className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {typeof item.count === 'number' && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Sign Out Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="mb-3 px-2">
            <p className="text-[11px] font-semibold text-white truncate">{user?.email || 'Admin User'}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Authenticated Session
            </p>
          </div>

          <button
            onClick={onSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold transition-colors"
          >
            <FaArrowRightFromBracket className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
