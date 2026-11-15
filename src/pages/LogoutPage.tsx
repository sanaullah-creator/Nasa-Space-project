import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { House, LogIn, Rocket } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/** Visiting /logout signs the user out and confirms it. */
export function LogoutPage() {
  useDocumentTitle('Logged out');
  const { user, logout } = useAuth();
  const [params] = useSearchParams();
  const deleted = params.get('deleted') === '1';

  useEffect(() => {
    if (user) logout();
  }, [user, logout]);

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="relative mb-8 h-28 w-28">
        <div className="absolute inset-0 animate-orbit rounded-full border border-dashed border-mars-400/40" />
        <div className="absolute inset-5 grid place-items-center rounded-full bg-gradient-to-br from-space-700 to-space-900 shadow-[0_0_40px_rgba(90,176,255,0.25)]">
          <Rocket className="h-8 w-8 -rotate-45 text-mars-400" aria-hidden />
        </div>
      </div>
      <p className="eyebrow">{deleted ? 'Account deleted' : 'Signed out'}</p>
      <h1 className="mt-3 text-4xl font-bold">{deleted ? 'Your account has been deleted.' : 'You have logged out safely.'}</h1>
      <p className="mt-4 text-slate-400">
        {deleted
          ? 'Your account and its saved progress were removed from this browser.'
          : 'Your badges, quiz progress and mission patch are saved and will be waiting when you log back in.'}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/login" className="btn-primary">
          <LogIn className="h-4 w-4" aria-hidden /> {deleted ? 'Log in with another account' : 'Log in again'}
        </Link>
        <Link to="/" className="btn-secondary">
          <House className="h-4 w-4" aria-hidden /> Back to home
        </Link>
      </div>
    </section>
  );
}
