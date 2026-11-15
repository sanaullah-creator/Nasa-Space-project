import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, User, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { FormField, PasswordField } from '../components/ui/FormField';
import { AuthAside, AuthShell } from '../components/layout/AuthShell';
import { safeRedirect } from '../utils/auth';

export function RegisterPage() {
  useDocumentTitle('Create account');
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = safeRedirect(params.get('redirect'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<{ msg: string; field?: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate(redirect === '/' ? '/profile?welcome=1' : redirect, { replace: true });
  }, [user, redirect, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setError({ msg: 'Passwords do not match.', field: 'confirm' });
    if (!agree) return setError({ msg: 'Please confirm you understand how demo accounts are stored.', field: 'agree' });
    setBusy(true);
    const res = await register({ name, email, password });
    setBusy(false);
    if (!res.ok) setError({ msg: res.error, field: res.field });
  };

  const fieldError = (f: string) => (error?.field === f ? error.msg : null);

  return (
    <AuthShell
      eyebrow="Join the crew"
      title="Create your explorer account"
      subtitle="It takes 30 seconds. Your badges, quiz progress and mission patch will be saved to your profile."
      aside={<AuthAside heading="Every explorer needs a mission log." points={['Earn the Mission Crew Member badge', 'Your own profile and avatar', 'Progress kept separate for each family member']} />}
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        <FormField
          label="Explorer name"
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldError('name')}
          icon={<User className="h-4 w-4" />}
          placeholder="e.g. Ayesha"
          maxLength={40}
          hint="Shown in the header. A first name or nickname is perfect."
          required
        />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldError('email')}
          icon={<Mail className="h-4 w-4" />}
          placeholder="you@example.com"
          required
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldError('password')}
          hint="At least 8 characters, with a letter and a number."
          showStrength
          required
        />
        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={fieldError('confirm')}
          required
        />
        <div>
          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-mars-500" />
            I understand this demo account is stored only in this browser.
          </label>
          {fieldError('agree') && (
            <p className="mt-1.5 text-xs text-rose-300" role="alert">
              {fieldError('agree')}
            </p>
          )}
        </div>
        {error && !error.field && (
          <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200" role="alert">
            {error.msg}
          </p>
        )}
        <button type="submit" className="btn-primary w-full py-3" disabled={busy}>
          <UserPlus className="h-4 w-4" aria-hidden /> {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to={`/login${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-semibold text-nebula-300 hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
