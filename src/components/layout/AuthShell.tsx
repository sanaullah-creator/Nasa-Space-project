import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

/** Two-column layout shared by the Login and Register pages. */
export function AuthShell({ eyebrow, title, subtitle, children, aside }: { eyebrow: string; title: string; subtitle: string; children: ReactNode; aside: ReactNode }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_28rem] lg:px-8">
      <div className="hidden lg:block">{aside}</div>
      <div className="glass animate-fade-up p-6 sm:p-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <p className="mt-6 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-slate-400">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
          Demo accounts are saved only in this browser — nothing is sent to a server. Please don&apos;t reuse a password you use anywhere else.
        </p>
      </div>
    </section>
  );
}

/** Decorative side panel: an orbiting planet with a few benefit bullets. */
export function AuthAside({ heading, points }: { heading: string; points: string[] }) {
  return (
    <div className="relative">
      <div className="relative mx-auto mb-10 h-56 w-56">
        <div className="absolute inset-0 animate-orbit-slow rounded-full border border-nebula-400/30">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nebula-300 shadow-[0_0_14px_#9fd3ff]" />
        </div>
        <div className="absolute inset-10 rounded-full bg-gradient-to-br from-mars-300 via-mars-600 to-[#3b0f06] planet-glow animate-float" />
      </div>
      <h2 className="font-display text-3xl font-black leading-tight">
        <span className="text-gradient">{heading}</span>
      </h2>
      <ul className="mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-slate-300">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mars-400 shadow-[0_0_10px_#ff8a5c]" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
