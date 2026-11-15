import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  items: string[];
  icon: LucideIcon;
  accent: string;
}

export function InfoList({ title, items, icon: Icon, accent }: Props) {
  return (
    <section className="glass p-6">
      <h2 className="flex items-center gap-3 text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `${accent}22`, color: accent }}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
