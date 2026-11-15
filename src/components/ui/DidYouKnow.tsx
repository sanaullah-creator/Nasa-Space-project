import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, Shuffle } from 'lucide-react';
import { didYouKnowFacts } from '../../data/facts';

/** Rotating "Did You Know?" panel with manual controls. */
export function DidYouKnow({ autoRotate = true }: { autoRotate?: boolean }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * didYouKnowFacts.length));
  const [paused, setPaused] = useState(false);
  const total = didYouKnowFacts.length;
  const fact = didYouKnowFacts[index];

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total]);
  const shuffle = () => setIndex((i) => (i + 1 + Math.floor(Math.random() * (total - 1))) % total);

  useEffect(() => {
    if (!autoRotate || paused) return;
    const t = window.setInterval(() => go(1), 9000);
    return () => window.clearInterval(t);
  }, [autoRotate, paused, go]);

  return (
    <section
      className="glass relative overflow-hidden p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Did you know? Space facts"
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
          <Lightbulb className="h-5 w-5" aria-hidden />
        </div>
        <h2 className="text-xl font-bold">Did You Know?</h2>
        <span className="ml-auto text-xs text-slate-500">
          {index + 1} / {total}
        </span>
      </div>
      <p key={index} className="animate-fade-up mt-5 min-h-[4.5rem] text-lg leading-relaxed text-slate-200" aria-live="polite">
        {fact.text}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link to={`/missions/${fact.missionId}`} className="chip">
          From: {fact.missionName}
        </Link>
        <div className="ml-auto flex gap-1">
          <button className="btn-ghost" onClick={() => go(-1)} aria-label="Previous fact">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="btn-ghost" onClick={shuffle} aria-label="Random fact">
            <Shuffle className="h-4 w-4" />
          </button>
          <button className="btn-ghost" onClick={() => go(1)} aria-label="Next fact">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
