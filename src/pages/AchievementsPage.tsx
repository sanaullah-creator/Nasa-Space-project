import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, RotateCcw } from 'lucide-react';
import { achievements } from '../data/achievements';
import { missions } from '../data/missions';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { PageHeader } from '../components/ui/SectionHeading';
import { AchievementIcon } from '../components/ui/AchievementIcon';
import { cx, formatDate } from '../utils/format';
import type { AchievementId } from '../types';

export function AchievementsPage() {
  useDocumentTitle('Achievements');
  const { progress, isUnlocked, resetProgress } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const unlocked = achievements.filter((a) => isUnlocked(a.id)).length;
  const pct = Math.round((unlocked / achievements.length) * 100);

  const count = (dest: string) => missions.filter((m) => m.destination === dest && progress.viewedMissions.includes(m.id)).length;
  const total = (dest: string) => missions.filter((m) => m.destination === dest).length;

  const progressFor: Partial<Record<AchievementId, [number, number]>> = {
    'first-contact': [Math.min(progress.viewedMissions.length, 1), 1],
    'moon-explorer': [count('moon'), total('moon')],
    'mars-explorer': [count('mars'), total('mars')],
    'deep-space-navigator': [count('deep-space'), total('deep-space')],
    'mission-historian': [Math.min(Math.max(progress.timelineEventsOpened.length, progress.timeMachineYears.length), 5), 5],
    cartographer: [Math.min(progress.markersClicked.length, 5), 5],
    storyteller: [Math.min(progress.storiesHeard.length, 1), 1],
  };

  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Your explorer badges"
        description="Earn badges by exploring the museum. Your progress is saved in this browser using local storage."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="glass flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
          <div
            className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
            style={{ background: `conic-gradient(#f2603a ${pct * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}
            role="img"
            aria-label={`${pct}% of badges unlocked`}
          >
            <div className="grid h-24 w-24 place-items-center rounded-full bg-space-900">
              <span className="font-display text-2xl font-black">{pct}%</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {unlocked} of {achievements.length} badges unlocked
            </h2>
            <p className="mt-1 text-slate-400">
              Missions explored: {progress.viewedMissions.length}/{missions.length} · Map markers: {progress.markersClicked.length} · Timeline
              events: {progress.timelineEventsOpened.length}
            </p>
          </div>
          <div>
            {confirming ? (
              <div className="flex flex-col items-center gap-2 sm:items-end">
                <p className="text-sm text-slate-300">Erase all progress and badges?</p>
                <div className="flex gap-2">
                  <button
                    className="btn bg-rose-500/90 text-white hover:bg-rose-500"
                    onClick={() => {
                      resetProgress();
                      setConfirming(false);
                    }}
                  >
                    Yes, reset
                  </button>
                  <button className="btn-secondary" onClick={() => setConfirming(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button className="btn-ghost text-slate-400" onClick={() => setConfirming(true)}>
                <RotateCcw className="h-4 w-4" aria-hidden /> Reset progress
              </button>
            )}
          </div>
        </section>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => {
            const got = isUnlocked(a.id);
            const prog = progressFor[a.id];
            return (
              <li key={a.id} className={cx('glass relative overflow-hidden p-6 transition', got ? 'border-white/20' : 'opacity-80')} data-unlocked={got}>
                {got && <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl" style={{ background: a.color }} aria-hidden />}
                <div className="relative flex items-start gap-4">
                  <div
                    className={cx('relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl', !got && 'grayscale')}
                    style={{ background: got ? `${a.color}26` : 'rgba(255,255,255,0.05)', color: got ? a.color : '#64748b', boxShadow: got ? `0 0 30px ${a.color}55` : undefined }}
                  >
                    <AchievementIcon icon={a.icon} className="h-8 w-8" />
                    {!got && <Lock className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-space-800 p-1 text-slate-400" aria-hidden />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold">{a.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{got ? a.description : a.howToEarn}</p>
                    {got ? (
                      <p className="mt-2 text-xs font-semibold text-emerald-300">Unlocked {formatDate(progress.unlocked[a.id]!.slice(0, 10))}</p>
                    ) : (
                      <span className="sr-only">Locked</span>
                    )}
                  </div>
                </div>
                {!got && prog && (
                  <div className="relative mt-4">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-nebula-400" style={{ width: `${(prog[0] / prog[1]) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-right text-xs text-slate-500">
                      {prog[0]}/{prog[1]}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm text-slate-400">
          Need ideas? Start with the <Link to="/explore" className="text-nebula-300 hover:underline">mission catalogue</Link>, the{' '}
          <Link to="/quiz" className="text-nebula-300 hover:underline">quiz</Link> or the <Link to="/patch-lab" className="text-nebula-300 hover:underline">Patch Lab</Link>.
        </p>
      </div>
    </>
  );
}
