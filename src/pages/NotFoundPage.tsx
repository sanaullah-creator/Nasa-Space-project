import { Link } from 'react-router-dom';
import { House, Rocket } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage({ message }: { message?: string }) {
  useDocumentTitle('Signal lost');
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <div className="relative mb-8 h-32 w-32">
        <div className="absolute inset-0 animate-orbit rounded-full border border-dashed border-nebula-400/40" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-600 moon-glow" />
        <Rocket className="absolute -right-2 top-2 h-7 w-7 rotate-45 text-mars-400" aria-hidden />
      </div>
      <p className="eyebrow">Error 404 · Signal lost</p>
      <h1 className="mt-3 text-4xl font-bold">Houston, we can&apos;t find that page.</h1>
      <p className="mt-4 text-slate-400">{message ?? 'This page has drifted beyond the edge of our map.'}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <House className="h-4 w-4" aria-hidden /> Return to base
        </Link>
        <Link to="/explore" className="btn-secondary">
          Explore missions
        </Link>
      </div>
    </section>
  );
}
