import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Check, KeyRound, LogOut, Mail, PartyPopper, Pencil, Rocket, Save, Trash2, Trophy, User } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FormField, PasswordField } from '../components/ui/FormField';
import { UserAvatar } from '../components/ui/UserAvatar';
import { AchievementIcon } from '../components/ui/AchievementIcon';
import { achievements } from '../data/achievements';
import { missions, getMissionById } from '../data/missions';
import { AVATAR_COLORS } from '../utils/auth';
import { cx, formatDate } from '../utils/format';

type Tab = 'overview' | 'edit' | 'security';
const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'edit', label: 'Edit profile', icon: Pencil },
  { id: 'security', label: 'Security', icon: KeyRound },
];

function Overview() {
  const { user } = useAuth();
  const { progress } = useProgress();
  if (!user) return null;
  const unlocked = achievements.filter((a) => progress.unlocked[a.id]);
  const fav = user.favoriteMissionId ? getMissionById(user.favoriteMissionId) : undefined;
  const stats = [
    { label: 'Missions explored', value: `${progress.viewedMissions.length}/${missions.length}`, icon: Rocket },
    { label: 'Badges unlocked', value: `${unlocked.length}/${achievements.length}`, icon: Trophy },
    { label: 'Member since', value: formatDate(user.createdAt.slice(0, 10)), icon: Calendar },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass p-5">
            <Icon className="h-5 w-5 text-nebula-300" aria-hidden />
            <p className="mt-3 font-display text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="glass p-6">
        <h2 className="text-lg font-bold">Favourite mission</h2>
        {fav ? (
          <Link to={`/missions/${fav.id}`} className="mt-2 inline-flex items-center gap-2 text-nebula-300 hover:underline">
            <Rocket className="h-4 w-4" aria-hidden /> {fav.name}
          </Link>
        ) : (
          <p className="mt-2 text-sm text-slate-400">
            Not chosen yet —{' '}
            <Link to="/profile?tab=edit" className="text-nebula-300 hover:underline">
              pick one in Edit profile
            </Link>
            .
          </p>
        )}
      </div>
      <div className="glass p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your badges</h2>
          <Link to="/achievements" className="text-sm text-nebula-300 hover:underline">
            See all
          </Link>
        </div>
        {unlocked.length ? (
          <ul className="mt-4 flex flex-wrap gap-3">
            {unlocked.map((a) => (
              <li key={a.id} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 text-sm" title={a.description}>
                <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `${a.color}26`, color: a.color }}>
                  <AchievementIcon icon={a.icon} className="h-4 w-4" />
                </span>
                {a.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-400">No badges yet — open a mission file to earn your first one!</p>
        )}
      </div>
    </div>
  );
}

function EditProfile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [color, setColor] = useState(user?.avatarColor ?? AVATAR_COLORS[0]);
  const [fav, setFav] = useState(user?.favoriteMissionId ?? '');
  const [error, setError] = useState<{ msg: string; field?: string } | null>(null);
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = updateProfile({ name, bio, avatarColor: color, favoriteMissionId: fav || null });
    if (res.ok) {
      setError(null);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } else setError({ msg: res.error, field: res.field });
  };

  return (
    <form onSubmit={submit} noValidate className="glass space-y-6 p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <UserAvatar name={name || user.name} color={color} size="lg" />
        <div>
          <p className="text-sm text-slate-400">Live preview</p>
          <p className="font-heading text-lg font-bold text-white">{name.trim() || 'Your name'}</p>
        </div>
      </div>
      <FormField label="Display name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} error={error?.field === 'name' ? error.msg : null} required />
      <FormField label="Email" value={user.email} readOnly disabled hint="Your email is your login and can't be changed in this demo." icon={<Mail className="h-4 w-4" />} />
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-300">Avatar colour</legend>
        <div className="flex flex-wrap gap-3">
          {AVATAR_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={cx('grid h-10 w-10 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-space-900 transition', color === c ? 'ring-white' : 'ring-transparent hover:ring-white/40')}
              style={{ background: c }}
              aria-label={`Avatar colour ${c}`}
              aria-pressed={color === c}
            >
              {color === c && <Check className="h-5 w-5 text-space-900" aria-hidden />}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-slate-300">Favourite mission</span>
        <select className="input" value={fav} onChange={(e) => setFav(e.target.value)}>
          <option value="">— None yet —</option>
          {missions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 flex justify-between text-sm font-semibold text-slate-300">
          About me <span className="font-normal text-slate-500">{bio.length}/160</span>
        </span>
        <textarea className="input min-h-24 resize-y" maxLength={160} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="e.g. Future astronaut. Voyager fan." />
      </label>
      {error && !error.field && <p className="text-sm text-rose-300" role="alert">{error.msg}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          <Save className="h-4 w-4" aria-hidden /> Save changes
        </button>
        <p className="text-sm text-emerald-300" role="status" aria-live="polite">
          {saved && (
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4" aria-hidden /> Profile updated
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

function Security() {
  const { changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwError, setPwError] = useState<{ msg: string; field?: string } | null>(null);
  const [pwOk, setPwOk] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [delPw, setDelPw] = useState('');
  const [delError, setDelError] = useState<string | null>(null);

  const submitPw = async (e: FormEvent) => {
    e.preventDefault();
    setPwOk(false);
    if (next !== confirm) return setPwError({ msg: 'New passwords do not match.', field: 'confirm' });
    const res = await changePassword(current, next);
    if (!res.ok) return setPwError({ msg: res.error, field: res.field });
    setPwError(null);
    setPwOk(true);
    setCurrent('');
    setNext('');
    setConfirm('');
  };

  const submitDelete = async (e: FormEvent) => {
    e.preventDefault();
    const res = await deleteAccount(delPw);
    if (!res.ok) return setDelError(res.error);
    navigate('/logout?deleted=1', { replace: true });
  };

  const f = (field: string) => (pwError?.field === field ? pwError.msg : null);

  return (
    <div className="space-y-6">
      <form onSubmit={submitPw} noValidate className="glass space-y-4 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <KeyRound className="h-5 w-5 text-nebula-300" aria-hidden /> Change password
        </h2>
        <PasswordField label="Current password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={f('current')} />
        <PasswordField label="New password" autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} error={f('next')} showStrength hint="At least 8 characters, with a letter and a number." />
        <PasswordField label="Confirm new password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={f('confirm')} />
        {pwError && !pwError.field && <p className="text-sm text-rose-300" role="alert">{pwError.msg}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            Update password
          </button>
          {pwOk && (
            <p className="inline-flex items-center gap-1.5 text-sm text-emerald-300" role="status">
              <Check className="h-4 w-4" aria-hidden /> Password changed
            </p>
          )}
        </div>
      </form>

      <div className="glass p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <LogOut className="h-5 w-5 text-slate-300" aria-hidden /> Session
        </h2>
        <p className="mt-2 text-sm text-slate-400">Log out of your account on this device. Your progress stays saved for next time.</p>
        <Link to="/logout" className="btn-secondary mt-4">
          <LogOut className="h-4 w-4" aria-hidden /> Log out
        </Link>
      </div>

      <div className="rounded-2xl border border-rose-400/25 bg-rose-500/5 p-6 sm:p-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-rose-200">
          <Trash2 className="h-5 w-5" aria-hidden /> Delete account
        </h2>
        <p className="mt-2 text-sm text-slate-400">Permanently removes your account, badges, quiz progress and saved patch from this browser.</p>
        {delOpen ? (
          <form onSubmit={submitDelete} noValidate className="mt-4 space-y-3">
            <PasswordField label="Enter your password to confirm" autoComplete="current-password" value={delPw} onChange={(e) => setDelPw(e.target.value)} error={delError} />
            <div className="flex flex-wrap gap-2">
              <button type="submit" className="btn bg-rose-500/90 text-white hover:bg-rose-500">
                Delete my account
              </button>
              <button type="button" className="btn-secondary" onClick={() => (setDelOpen(false), setDelPw(''), setDelError(null))}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button className="btn mt-4 border border-rose-400/40 text-rose-200 hover:bg-rose-500/10" onClick={() => setDelOpen(true)}>
            Delete account…
          </button>
        )}
      </div>
    </div>
  );
}

export function ProfilePage() {
  useDocumentTitle('My profile');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tabParam = params.get('tab');
  const tab: Tab = tabParam === 'edit' || tabParam === 'security' ? tabParam : 'overview';
  const welcome = params.get('welcome') === '1';

  // Profile requires an account: send guests to login and bring them back afterwards.
  useEffect(() => {
    if (!user) navigate(`/login?redirect=${encodeURIComponent('/profile')}`, { replace: true });
  }, [user, navigate]);
  if (!user) return null;

  const setTab = (t: Tab) => setParams(t === 'overview' ? new URLSearchParams() : new URLSearchParams({ tab: t }), { replace: true });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {welcome && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100" role="status">
          <PartyPopper className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>
            Welcome aboard, <strong>{user.name}</strong>! Your account is ready and you&apos;ve earned the <strong>Mission Crew Member</strong> badge.{' '}
            <Link to="/explore" className="underline">
              Start exploring
            </Link>
            .
          </p>
        </div>
      )}
      <header className="glass relative flex flex-col items-center gap-5 overflow-hidden p-6 text-center sm:flex-row sm:p-8 sm:text-left">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl" style={{ background: user.avatarColor }} aria-hidden />
        <UserAvatar name={user.name} color={user.avatarColor} size="xl" />
        <div className="relative min-w-0 flex-1">
          <p className="eyebrow">Explorer profile</p>
          <h1 className="mt-1 truncate text-3xl font-bold" data-testid="profile-name">
            {user.name}
          </h1>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-400 sm:justify-start">
            <Mail className="h-4 w-4" aria-hidden /> {user.email}
          </p>
          {user.bio && <p className="mt-2 text-sm italic text-slate-300">“{user.bio}”</p>}
        </div>
        <Link to="/profile?tab=edit" className="btn-secondary relative">
          <Pencil className="h-4 w-4" aria-hidden /> Edit profile
        </Link>
      </header>

      <div className="mt-6 flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 scrollbar-thin" role="tablist" aria-label="Profile sections">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={cx(
              'inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition',
              tab === id ? 'bg-gradient-to-r from-mars-500 to-mars-600 text-white shadow-lg shadow-mars-600/30' : 'text-slate-300 hover:text-white',
            )}
          >
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6 animate-fade-up" key={tab}>
        {tab === 'overview' && <Overview />}
        {tab === 'edit' && <EditProfile />}
        {tab === 'security' && <Security />}
      </div>
    </div>
  );
}
