import { motion, AnimatePresence } from 'framer-motion';
import { FaTriangleExclamation } from 'react-icons/fa6';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDestructive = true }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDestructive ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
              <FaTriangleExclamation className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-all ${
                isDestructive
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
