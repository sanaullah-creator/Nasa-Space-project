import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { missions } from '../data/missions';
import { PageHeader } from '../components/ui/SectionHeading';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MissionVisual } from '../components/missions/MissionVisual';
import { DESTINATION_META, STATUS_META, TRAVELLING_META } from '../utils/status';
import { cx } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { MissionStatus } from '../types';

const ORDER: MissionStatus[] = ['active', 'left-behind', 'inactive', 'mission-ended', 'silent'];

export function WhereNowPage() {
  useDocumentTitle('Where Are They Now?');
  const [group, setGroup] = useState<'status' | 'world'>('status');

  const groups =
    group === 'status'
      ? ORDER.map((s) => ({ key: s, title: STATUS_META[s].label, desc: STATUS_META[s].description, color: STATUS_META[s].color, items: missions.filter((m) => m.status === s) }))
      : (['moon', 'mars', 'deep-space'] as const).map((d) => ({
          key: d,
          title: DESTINATION_META[d].label,
          desc: d === 'deep-space' ? 'Spacecraft heading out of the solar system.' : `Hardware resting on or exploring ${d === 'moon' ? 'the Moon' : 'Mars'}.`,
          color: DESTINATION_META[d].color,
          items: missions.filter((m) => m.destination === d),
        }));

  return (
    <>
      <PageHeader
        eyebrow="Where are they now?"
        title="The current whereabouts of every machine"
        description="Some are parked exactly where astronauts left them. Some are frozen in Martian dust. Some are still talking to us from interstellar space."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Group by</span>
          <button className={cx('chip', group === 'status' && 'chip-active')} aria-pressed={group === 'status'} onClick={() => setGroup('status')}>
            Status
          </button>
          <button className={cx('chip', group === 'world' && 'chip-active')} aria-pressed={group === 'world'} onClick={() => setGroup('world')}>
            World
          </button>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-violet-300">
            <Navigation className="h-3.5 w-3.5" aria-hidden /> {missions.filter((m) => m.travelling).length} spacecraft are {TRAVELLING_META.label.toLowerCase()}
          </span>
        </div>

        <div className="mt-8 space-y-12">
          {groups
            .filter((g) => g.items.length)
            .map((g) => (
              <section key={g.key} aria-labelledby={`g-${g.key}`}>
                <div className="flex items-baseline gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: g.color, boxShadow: `0 0 12px ${g.color}` }} aria-hidden />
                  <h2 id={`g-${g.key}`} className="text-2xl font-bold">
                    {g.title} <span className="text-base font-normal text-slate-500">({g.items.length})</span>
                  </h2>
                </div>
                <p className="mt-1 text-sm text-slate-400">{g.desc}</p>
                <ul className="mt-5 grid gap-4 md:grid-cols-2">
                  {g.items.map((m) => (
                    <li key={m.id} className="glass card-hover flex gap-4 overflow-hidden p-0">
                      <div className="w-28 shrink-0 sm:w-36">
                        <MissionVisual mission={m} className="h-full min-h-40 w-full" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold">{m.name}</h3>
                        </div>
                        <StatusBadge mission={m} />
                        <p className="flex gap-1.5 text-sm text-slate-300">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mars-400" aria-hidden />
                          <span>{m.whereNow}</span>
                        </p>
                        <p className="text-xs text-slate-500">{m.statusNote}</p>
                        <Link to={`/missions/${m.id}`} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-nebula-300 hover:text-white">
                          Mission file <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </>
  );
}
