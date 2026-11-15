import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, KeyRound, LogIn, LogOut, Palette, Pencil, Trophy, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/AuthContext';
import { useProgress } from '../../hooks/ProgressContext';
import { achievements } from '../../data/achievements';
import { UserAvatar } from '../ui/UserAvatar';
import { cx } from '../../utils/format';

export const PROFILE_LINKS = [
  { to: '/profile', label: 'My profile', icon: User },
  { to: '/profile?tab=edit', label: 'Edit profile', icon: Pencil },
  { to: '/profile?tab=security', label: 'Change password', icon: KeyRound },
  { to: '/achievements', label: 'My badges', icon: Trophy },
  { to: '/patch-lab', label: 'My mission patch', icon: Palette },
];

/** Header account area: Log in / Sign up for guests, avatar dropdown for signed-in users. */
export function UserMenu() {
  const { user } = useAuth();
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const redirect = location.pathname.startsWith('/login') || location.pathname.startsWith('/register') || location.pathname.startsWith('/logout') ? '' : `?redirect=${encodeURIComponent(location.pathname)}`;

  useEffect(() => setOpen(false), [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link to={`/login${redirect}`} className="btn-ghost px-3 py-2">
          <LogIn className="h-4 w-4" aria-hidden /> Log in
        </Link>
        <Link to={`/register${redirect}`} className="btn-primary px-4 py-2">
          <UserPlus className="h-4 w-4" aria-hidden /> Sign up
        </Link>
      </div>
    );
  }

  const badges = Object.keys(progress.unlocked).length;
  const firstName = user.name.split(/\s+/)[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cx('flex items-center gap-2 rounded-full border py-1 pl-1 pr-2 transition sm:pr-3', open ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/25')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${user.name}`}
      >
        <UserAvatar name={user.name} color={user.avatarColor} size="sm" />
        <span className="hidden max-w-[8rem] truncate text-sm font-semibold text-white sm:inline" data-testid="header-user-name">
          {firstName}
        </span>
        <ChevronDown className={cx('hidden h-4 w-4 text-slate-400 transition sm:block', open && 'rotate-180')} aria-hidden />
      </button>

      {open && (
        <div className="glass-strong animate-fade-up absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden p-0 shadow-2xl shadow-black/60" role="menu" aria-label="Account">
          <div className="flex items-center gap-3 border-b border-white/10 p-4">
            <UserAvatar name={user.name} color={user.avatarColor} size="md" />
            <div className="min-w-0">
              <p className="truncate font-semibold text-white">{user.name}</p>
              <p className="truncate text-xs text-slate-400">{user.email}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-amber-300">
                <Trophy className="h-3 w-3" aria-hidden /> {badges}/{achievements.length} badges
              </p>
            </div>
          </div>
          <ul className="p-1.5">
            {PROFILE_LINKS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link to={to} role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-white">
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden /> {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 p-1.5">
            <Link to="/logout" role="menuitem" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/10">
              <LogOut className="h-4 w-4" aria-hidden /> Log out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
