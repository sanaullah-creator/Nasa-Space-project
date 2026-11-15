import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogIn, LogOut, Menu, Trophy, UserPlus, X } from 'lucide-react';
import { useProgress } from '../../hooks/ProgressContext';
import { useAuth } from '../../hooks/AuthContext';
import { UserMenu, PROFILE_LINKS } from './UserMenu';
import { UserAvatar } from '../ui/UserAvatar';
import { achievements } from '../../data/achievements';
import { cx } from '../../utils/format';

export const NAV_LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/map', label: 'Space Map' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/where-are-they-now', label: 'Where Now?' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/patch-lab', label: 'Patch Lab' },
  { to: '/about', label: 'About' },
  { to: '/credits', label: 'Credits' },
];

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 rounded-full border border-nebula-400/50 animate-orbit-slow" style={{ borderTopColor: 'transparent' }} />
        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-mars-300 via-mars-500 to-mars-700 shadow-[0_0_18px_rgba(242,96,58,0.7)]" />
      </span>
      {!compact && (
        <span className="font-display text-[0.8rem] font-black leading-tight tracking-[0.14em] text-white sm:text-base sm:leading-none sm:tracking-[0.18em]">
          <span className="block sm:inline">COSMIC </span>
          <span className="block sm:inline">
            <span className="text-mars-400">LOST</span> &amp; <span className="text-nebula-400">FOUND</span>
          </span>
        </span>
      )}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { progress } = useProgress();
  const { user } = useAuth();
  const unlockedCount = Object.keys(progress.unlocked).length;

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cx(
      'relative rounded-full px-2.5 py-2 text-sm font-medium transition 2xl:px-3',
      isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white',
    );

  return (
    <header
      className={cx(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled || open ? 'border-b border-white/10 bg-space-900/85 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-space-900">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main">
        <Link to="/" className="shrink-0" aria-label="COSMIC LOST & FOUND home">
          <Logo />
        </Link>
        <div className="ml-auto hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/achievements"
          className={({ isActive }) =>
            cx(
              'ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-semibold transition sm:gap-2 sm:px-3 xl:ml-2 xl:hidden 2xl:inline-flex',
              isActive ? 'border-amber-300/60 bg-amber-400/15 text-amber-200' : 'border-white/10 bg-white/5 text-slate-200 hover:border-amber-300/50',
            )
          }
          aria-label={`Achievements: ${unlockedCount} of ${achievements.length} unlocked`}
        >
          <Trophy className="h-4 w-4 text-amber-300" aria-hidden />
          <span>
            {unlockedCount}/{achievements.length}
          </span>
        </NavLink>
        <UserMenu />
        <button
          className="shrink-0 rounded-full p-2 text-slate-200 hover:bg-white/10 xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="animate-fade-up border-t border-white/10 px-4 pb-6 pt-3 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/achievements" className={linkClass}>
              Achievements
            </NavLink>
          </div>
          <div className="mx-auto mt-4 max-w-7xl border-t border-white/10 pt-4">
            {user ? (
              <>
                <div className="mb-2 flex items-center gap-3 px-3">
                  <UserAvatar name={user.name} color={user.avatarColor} size="md" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">{user.name}</p>
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="grid gap-1 sm:grid-cols-2">
                  {PROFILE_LINKS.map((l) => (
                    <Link key={l.to} to={l.to} className="rounded-full px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                      {l.label}
                    </Link>
                  ))}
                  <Link to="/logout" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/10">
                    <LogOut className="h-4 w-4" aria-hidden /> Log out
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" className="btn-secondary">
                  <LogIn className="h-4 w-4" aria-hidden /> Log in
                </Link>
                <Link to="/register" className="btn-primary">
                  <UserPlus className="h-4 w-4" aria-hidden /> Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
