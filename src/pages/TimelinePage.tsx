import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Clock, History } from 'lucide-react';
import { missions } from '../data/missions';
import { PageHeader } from '../components/ui/SectionHeading';
import { EmptyState } from '../components/ui/EmptyState';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DESTINATION_META, EVENT_META } from '../utils/status';
import { allTimelineEvents, DECADES, eventsInYear, missionsActiveIn, TIMELINE_END_YEAR, TIMELINE_START_YEAR } from '../utils/timeline';
import { cx, formatDate } from '../utils/format';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Destination, TimelineEventType } from '../types';

function TimeMachine() {
  const [year, setYear] = useState(1969);
  const { recordTimeMachineYear, progress } = useProgress();
  const events = eventsInYear(year);
  const operating = missionsActiveIn(year);
  const resting = missions.filter((m) => m.activeTo !== null && m.activeTo < year);

  const travel = (y: number) => {
    const clamped = Math.min(TIMELINE_END_YEAR, Math.max(TIMELINE_START_YEAR, y));
    setYear(clamped);
    recordTimeMachineYear(clamped);
  };

  return (
    <section className="glass relative overflow-hidden p-6 sm:p-8" aria-labelledby="time-machine-title">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" aria-hidden />
      <div className="relative flex flex-wrap items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
          <History className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2 id="time-machine-title" className="text-2xl font-bold">
            Mission Time Machine
          </h2>
          <p className="text-sm text-slate-400">Pick a year and see what was happening across the solar system.</p>
        </div>
        <p className="ml-auto text-xs text-slate-500">Years visited: {progress.timeMachineYears.length}</p>
      </div>

      <div className="relative mt-8 flex items-center gap-4">
        <button className="btn-secondary h-11 w-11 shrink-0 p-0" onClick={() => travel(year - 1)} aria-label="Previous year" disabled={year <= TIMELINE_START_YEAR}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <p className="font-display text-6xl font-black tabular-nums text-gradient sm:text-7xl" aria-live="polite">
            {year}
          </p>
        </div>
        <button className="btn-secondary h-11 w-11 shrink-0 p-0" onClick={() => travel(year + 1)} aria-label="Next year" disabled={year >= TIMELINE_END_YEAR}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <label className="relative mt-6 block">
        <span className="sr-only">Select year</span>
        <input
          type="range"
          min={TIMELINE_START_YEAR}
          max={TIMELINE_END_YEAR}
          value={year}
          onChange={(e) => travel(Number(e.target.value))}
          className="w-full accent-mars-500"
        />
      </label>
      <div className="relative mt-3 flex flex-wrap justify-center gap-2">
        {DECADES.map((d) => (
          <button key={d} className={cx('chip', Math.floor(year / 10) * 10 === d && 'chip-active')} onClick={() => travel(d === 1960 ? 1966 : d)}>
            {d}s
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">Events in {year}</h3>
          {events.length ? (
            <ul className="mt-3 space-y-3">
              {events.map((e) => (
                <li key={e.key} className="animate-fade-up rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: EVENT_META[e.type].color }}>
                    {formatDate(e.date)} · {EVENT_META[e.type].label}
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {e.title} <span className="font-normal text-slate-400">— {e.missionName}</span>
                  </p>
                  <p className="text-sm text-slate-400">{e.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
              No headline events from our 15 exhibits this year — but {operating.length ? `${operating.length} of them were busy working.` : 'the machines were waiting quietly.'} Try
              the decade buttons to jump ahead.
            </p>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300">Operating in {year}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {operating.length ? (
                operating.map((m) => (
                  <li key={m.id}>
                    <Link to={`/missions/${m.id}`} className="chip">
                      <span className="h-2 w-2 rounded-full" style={{ background: DESTINATION_META[m.destination].color }} aria-hidden />
                      {m.shortName}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500">None of our exhibits</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Already resting · {resting.length}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{resting.map((m) => m.shortName).join(' · ') || 'None yet'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TimelinePage() {
  useDocumentTitle('Mission Timeline');
  const [dest, setDest] = useState<Destination | 'all'>('all');
  const [type, setType] = useState<TimelineEventType | 'all'>('all');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const { recordTimelineEvent, progress } = useProgress();

  const events = useMemo(
    () => allTimelineEvents.filter((e) => (dest === 'all' || e.destination === dest) && (type === 'all' || e.type === type)),
    [dest, type],
  );

  const toggle = (key: string) => {
    setOpenKey((k) => (k === key ? null : key));
    recordTimelineEvent(key);
  };

  let lastDecade = -1;

  return (
    <>
      <PageHeader
        eyebrow="Mission timeline"
        title="Sixty years of exploration"
        description="From the first robotic Moon landings in 1966 to Perseverance's record drive in 2026 — travel through history and click any event to learn more."
      />
      <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
        <TimeMachine />

        <section aria-labelledby="timeline-title">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="timeline-title" className="flex items-center gap-2 text-2xl font-bold">
              <Clock className="h-6 w-6 text-nebula-300" aria-hidden /> Historical timeline
            </h2>
            <p className="ml-auto text-xs text-slate-500">Events opened: {progress.timelineEventsOpened.length}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by world">
            {(['all', 'moon', 'mars', 'deep-space'] as const).map((d) => (
              <button key={d} className={cx('chip', dest === d && 'chip-active')} aria-pressed={dest === d} onClick={() => setDest(d)}>
                {d === 'all' ? 'All worlds' : DESTINATION_META[d].label}
              </button>
            ))}
            <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" aria-hidden />
            {(['all', 'launch', 'landing', 'discovery', 'event', 'end'] as const).map((t) => (
              <button key={t} className={cx('chip', type === t && 'chip-active')} aria-pressed={type === t} onClick={() => setType(t)}>
                {t !== 'all' && <span className="h-2 w-2 rounded-full" style={{ background: EVENT_META[t].color }} aria-hidden />}
                {t === 'all' ? 'All events' : EVENT_META[t].label}
              </button>
            ))}
          </div>

          {events.length === 0 ? (
            <div className="mt-6">
              <EmptyState title="No events match" message="Try a different combination of filters." />
            </div>
          ) : (
            <ol className="relative mt-8 border-l-2 border-white/10 pl-6 sm:pl-10">
              {events.map((e) => {
                const decade = Math.floor(Number(e.date.slice(0, 4)) / 10) * 10;
                const showDecade = decade !== lastDecade;
                lastDecade = decade;
                const isOpen = openKey === e.key;
                const mission = missions.find((m) => m.id === e.missionId)!;
                return (
                  <li key={e.key} className="relative pb-5">
                    {showDecade && (
                      <p className="-ml-6 mb-4 font-display text-2xl font-black text-white/20 sm:-ml-10">{decade}s</p>
                    )}
                    <span
                      className="absolute -left-[1.95rem] mt-5 h-4 w-4 rounded-full ring-4 ring-space-900 sm:-left-[2.95rem]"
                      style={{ background: EVENT_META[e.type].color, boxShadow: `0 0 14px ${EVENT_META[e.type].color}` }}
                      aria-hidden
                    />
                    <div className={cx('glass transition', isOpen && 'border-white/25')}>
                      <button className="flex w-full items-start gap-4 p-4 text-left" onClick={() => toggle(e.key)} aria-expanded={isOpen}>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: EVENT_META[e.type].color }}>
                            {formatDate(e.date)} · {EVENT_META[e.type].label} · <span className="text-slate-400">{DESTINATION_META[e.destination].label}</span>
                          </p>
                          <p className="mt-1 font-semibold text-white">{e.title}</p>
                          <p className="text-sm text-slate-400">{e.missionName}</p>
                        </div>
                        <ChevronDown className={cx('mt-1 h-5 w-5 shrink-0 text-slate-400 transition', isOpen && 'rotate-180')} aria-hidden />
                      </button>
                      {isOpen && (
                        <div className="animate-fade-up border-t border-white/10 px-4 pb-4 pt-3">
                          <p className="text-sm leading-relaxed text-slate-300">{e.description}</p>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <StatusBadge mission={mission} />
                            <Link to={`/missions/${e.missionId}`} className="inline-flex items-center gap-1 text-sm font-semibold text-nebula-300 hover:text-white">
                              Open mission file <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </>
  );
}
