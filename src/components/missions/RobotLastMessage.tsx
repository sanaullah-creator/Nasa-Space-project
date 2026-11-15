import { useEffect, useState } from 'react';
import { Pause, Play, Radio, Square, Volume2, VolumeX } from 'lucide-react';
import type { Mission } from '../../types';
import { useSpeech } from '../../hooks/useSpeech';
import { useProgress } from '../../hooks/ProgressContext';

/** "Robot's Last Message" — creative first-person storytelling with typewriter reveal and optional narration. */
export function RobotLastMessage({ mission }: { mission: Mission }) {
  const { supported, speaking, paused, error, speak, stop, togglePause } = useSpeech();
  const { recordStoryHeard } = useProgress();
  const [shown, setShown] = useState(0);
  const text = mission.lastMessage;
  const done = shown >= text.length;

  // Typewriter effect, restarts whenever the mission changes.
  useEffect(() => {
    setShown(0);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(text.length);
      return;
    }
    const t = window.setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 3;
      });
    }, 18);
    return () => window.clearInterval(t);
  }, [text]);

  const play = () => {
    setShown(text.length);
    speak(`${mission.shortName}. A creative story. ${text}`, () => recordStoryHeard(mission.id));
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-nebula-400/25 bg-gradient-to-br from-space-800/90 via-space-850/90 to-[#1a0f1f]/90 p-6 sm:p-8" aria-labelledby="last-message-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)' }} aria-hidden />
      <div className="relative flex flex-wrap items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-nebula-500/15 text-nebula-300">
          <Radio className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2 id="last-message-title" className="text-xl font-bold">
            Robot&apos;s Last Message
          </h2>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Creative storytelling · not a real NASA transmission</p>
        </div>
      </div>

      <blockquote className="relative mt-6 font-mono text-[0.95rem] leading-relaxed text-nebula-200 sm:text-base">
        <span className="select-none text-nebula-400">&gt; </span>
        <span aria-hidden={!done}>{text.slice(0, shown)}</span>
        {!done && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-nebula-300 align-middle" aria-hidden />}
        <span className="sr-only">{done ? '' : text}</span>
      </blockquote>
      {!done && (
        <button className="relative mt-3 text-xs text-slate-400 underline hover:text-white" onClick={() => setShown(text.length)}>
          Show full message
        </button>
      )}

      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        {supported ? (
          <>
            {!speaking ? (
              <button className="btn-primary" onClick={play}>
                <Volume2 className="h-4 w-4" aria-hidden /> Listen to the story
              </button>
            ) : (
              <>
                <button className="btn-secondary" onClick={togglePause}>
                  {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
                  {paused ? 'Resume' : 'Pause'}
                </button>
                <button className="btn-secondary" onClick={stop}>
                  <Square className="h-4 w-4" aria-hidden /> Stop
                </button>
              </>
            )}
          </>
        ) : (
          <p className="inline-flex items-center gap-2 text-sm text-slate-400">
            <VolumeX className="h-4 w-4" aria-hidden /> Voice narration isn&apos;t supported in this browser.
          </p>
        )}
        {error ? (
          <p className="text-xs text-amber-300" role="status">
            Your device couldn&apos;t play the narration (no speech voice available). You can still read the story above.
          </p>
        ) : (
          <p className="text-xs text-slate-500">Uses your browser&apos;s built-in text-to-speech voice.</p>
        )}
      </div>
    </section>
  );
}
