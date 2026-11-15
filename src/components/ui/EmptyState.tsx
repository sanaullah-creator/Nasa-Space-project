import type { ReactNode } from 'react';
import { Telescope } from 'lucide-react';

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="glass flex flex-col items-center gap-4 px-6 py-14 text-center" role="status">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-nebula-500/30 blur-xl" />
        <div className="relative rounded-full border border-white/10 bg-space-800 p-4">
          <Telescope className="h-8 w-8 text-nebula-300" aria-hidden />
        </div>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-slate-400">{message}</p>
      {action}
    </div>
  );
}
