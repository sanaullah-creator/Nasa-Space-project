import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, Mail } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FormField, PasswordField } from '../components/ui/FormField';
import { AuthAside, AuthShell } from '../components/layout/AuthShell';
import { safeRedirect } from '../utils/auth';

export function LoginPage() {
  useDocumentTitle('Log in');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = safeRedirect(params.get('redirect'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<{ msg: string; field?: string } | null>(null);
  const [busy, setBusy] = useState(false);

  // Already signed in? Go straight to the destination.
  useEffect(() => {
    if (user) navigate(redirect, { replace: true });
  }, [user, redirect, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await login({ email, password, remember });
    setBusy(false);
    if (!res.ok) setError({ msg: res.error, field: res.field });
  };

  return (
    <AuthShell
      eyebrow="Mission control access"
      title="Welcome back, explorer"
      subtitle="Log in to continue your journey and keep your badges, quiz progress and mission patch."
      aside={<AuthAside heading="Your mission log is waiting." points={['Pick up the quiz where you left off', 'Keep every badge you have earned', 'Your own saved mission patch']} />}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error?.field === 'email' ? error.msg : null}
          icon={<Mail className="h-4 w-4" />}
          placeholder="you@example.com"
          required
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error?.field === 'password' ? error.msg : null}
          required
        />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-mars-500" />
          Keep me logged in on this device
        </label>
        {error && !error.field && (
          <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">
            {error.msg}
          </p>
        )}
        <button type="submit" className="btn-primary w-full py-3" disabled={busy}>
          <LogIn className="h-4 w-4" aria-hidden /> {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">
        New to the museum?{' '}
        <Link to={`/register${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-semibold text-nebula-300 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
