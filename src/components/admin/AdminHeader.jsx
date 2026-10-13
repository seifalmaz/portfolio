import { Link } from 'react-router-dom';
import { FaBars, FaArrowUpRightFromSquare, FaCircleCheck } from 'react-icons/fa6';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminHeader({ activeTabTitle, onToggleMobileSidebar }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white lg:hidden"
        >
          <FaBars className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-white tracking-tight">
          {activeTabTitle}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Supabase connection indicator */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[11px] font-medium text-emerald-300">
          <FaCircleCheck className="text-emerald-400 text-xs" />
          <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback'}</span>
        </div>

        {/* Live Site Preview Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
        >
          <span>Live Site</span>
          <FaArrowUpRightFromSquare className="text-[10px]" />
        </Link>
      </div>
    </header>
  );
}
