import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useProgress } from '../../hooks/ProgressContext';
import { AchievementIcon } from './AchievementIcon';

/** Pops up whenever a new badge is unlocked. */
export function AchievementToast() {
  const { toastQueue, dismissToast } = useProgress();
  const current = toastQueue[0];

  useEffect(() => {
    if (!current) return;
    const t = window.setTimeout(dismissToast, 5000);
    return () => window.clearTimeout(t);
  }, [current, dismissToast]);

  if (!current) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6" role="status" aria-live="polite">
      <div key={current.id} className="glass-strong animate-toast-in flex w-full max-w-sm items-center gap-4 p-4 shadow-2xl shadow-black/60">
        <div className="relative shrink-0">
          <span className="absolute inset-0 animate-pulse-ring rounded-full" style={{ background: current.color, opacity: 0.4 }} />
          <div className="relative grid h-12 w-12 place-items-center rounded-full" style={{ background: `${current.color}26`, boxShadow: `0 0 24px ${current.color}66` }}>
            <AchievementIcon icon={current.icon} className="h-6 w-6" />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-[0.6rem]">Badge unlocked</p>
          <p className="font-heading font-bold text-white">{current.title}</p>
          <Link to="/achievements" onClick={dismissToast} className="text-xs text-nebula-300 hover:underline">
            View all badges
          </Link>
        </div>
        <button onClick={dismissToast} className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
