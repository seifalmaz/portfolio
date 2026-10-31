import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaArrowLeft, FaShieldHalved } from 'react-icons/fa6';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        throw error;
      }

      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1C1A19] flex items-center justify-center px-4 py-12 selection:bg-[#6E2638]/40 selection:text-[#FAF6EE] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6E2638]/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#9AA69A]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-[#292725]/90 border border-[#D2C7B6]/20 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9AA69A] hover:text-[#FAF6EE] transition-colors mb-6 group"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#6E2638]/15 border border-[#6E2638]/30 text-[#F2E8D5] rounded-xl">
            <FaShieldHalved className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#FAF6EE] tracking-tight">Admin Console</h1>
            <p className="text-xs text-[#9AA69A]">Sign in to manage portfolio content</p>
          </div>
        </div>

        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs font-medium"
          >
            {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9AA69A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA69A] text-sm" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C1A19]/80 border border-[#D2C7B6]/20 rounded-xl text-[#FAF6EE] placeholder-[#9AA69A]/50 text-sm focus:outline-none focus:border-[#6E2638] focus:ring-1 focus:ring-[#6E2638] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9AA69A] mb-1.5">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA69A] text-sm" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1C1A19]/80 border border-[#D2C7B6]/20 rounded-xl text-[#FAF6EE] placeholder-[#9AA69A]/50 text-sm focus:outline-none focus:border-[#6E2638] focus:ring-1 focus:ring-[#6E2638] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#6E2638] hover:bg-[#451824] text-[#FAF6EE] font-semibold rounded-xl text-sm shadow-lg shadow-[#6E2638]/25 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#FAF6EE]/20 border-t-[#FAF6EE] rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#D2C7B6]/15 text-center">
          <p className="text-xs text-[#9AA69A]">
            Protected area reserved exclusively for portfolio administration.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
