import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { missions } from '../data/missions';
import { MissionCard } from '../components/missions/MissionCard';
import { PageHeader } from '../components/ui/SectionHeading';
import { EmptyState } from '../components/ui/EmptyState';
import { DESTINATION_META, STATUS_META, TRAVELLING_META } from '../utils/status';
import { cx } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Destination, Mission, MissionStatus } from '../types';

type StatusFilter = MissionStatus | 'travelling' | 'all';
type SortKey = 'launch-asc' | 'launch-desc' | 'name';

const DESTS: Array<Destination | 'all'> = ['all', 'moon', 'mars', 'deep-space'];
const STATUSES: StatusFilter[] = ['all', 'active', 'mission-ended', 'inactive', 'silent', 'left-behind', 'travelling'];

export function filterMissions(list: Mission[], q: string, dest: Destination | 'all', status: StatusFilter, sort: SortKey) {
  const query = q.trim().toLowerCase();
  return list
    .filter((m) => dest === 'all' || m.destination === dest)
    .filter((m) => (status === 'all' ? true : status === 'travelling' ? m.travelling : m.status === status))
    .filter(
      (m) =>
        !query ||
        [m.name, m.shortName, m.program, m.tagline, m.summary].some((field) => field.toLowerCase().includes(query)),
    )
    .sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name) : sort === 'launch-desc' ? b.launchDate.localeCompare(a.launchDate) : a.launchDate.localeCompare(b.launchDate),
    );
}

export function ExplorePage() {
  useDocumentTitle('Explore Missions');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const dest = (params.get('world') as Destination | 'all' | null) ?? 'all';
  const status = (params.get('status') as StatusFilter | null) ?? 'all';
  const sort = (params.get('sort') as SortKey | null) ?? 'launch-asc';

  const update = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => filterMissions(missions, q, dest, status, sort), [q, dest, status, sort]);
  const hasFilters = q || dest !== 'all' || status !== 'all';

  const destCount = (d: Destination | 'all') => (d === 'all' ? missions.length : missions.filter((m) => m.destination === d).length);
  const statusLabel = (s: StatusFilter) => (s === 'all' ? 'All statuses' : s === 'travelling' ? TRAVELLING_META.label : STATUS_META[s].label);

  return (
    <>
      <PageHeader
        eyebrow="Mission catalogue"
        title="Explore the Lost Missions"
        description="Search the museum's collection of 15 NASA machines. Filter by world or by what's happening to them today."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass sticky top-[4.5rem] z-20 space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search missions by name</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
              <input
                type="search"
                className="input pl-10"
                placeholder="Search by mission name — e.g. Voyager, Spirit, Apollo…"
                value={q}
                onChange={(e) => update('q', e.target.value, '')}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <span className="whitespace-nowrap">Sort</span>
              <select className="input w-auto" value={sort} onChange={(e) => update('sort', e.target.value, 'launch-asc')}>
                <option value="launch-asc">Launch date (oldest)</option>
                <option value="launch-desc">Launch date (newest)</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by destination">
            <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-slate-500">World</span>
            {DESTS.map((d) => (
              <button
                key={d}
                className={cx('chip', dest === d && 'chip-active')}
                aria-pressed={dest === d}
                onClick={() => update('world', d, 'all')}
              >
                {d !== 'all' && <span className="h-2 w-2 rounded-full" style={{ background: DESTINATION_META[d].color }} aria-hidden />}
                {d === 'all' ? 'All worlds' : DESTINATION_META[d].label}
                <span className="text-slate-500">{destCount(d)}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
            <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-slate-500">Status</span>
            {STATUSES.map((s) => (
              <button key={s} className={cx('chip', status === s && 'chip-active')} aria-pressed={status === s} onClick={() => update('status', s, 'all')}>
                {s !== 'all' && (
                  <span className="h-2 w-2 rounded-full" style={{ background: s === 'travelling' ? TRAVELLING_META.color : STATUS_META[s].color }} aria-hidden />
                )}
                {statusLabel(s)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-400" aria-live="polite">
          <p>
            Showing <strong className="text-white">{results.length}</strong> of {missions.length} missions
          </p>
          {hasFilters && (
            <button className="btn-ghost text-mars-300" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
              <X className="h-4 w-4" aria-hidden /> Clear filters
            </button>
          )}
        </div>

        <div className="mt-6">
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((m, i) => (
                <MissionCard key={m.id} mission={m} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No missions found in this sector"
              message="Try a different name or loosen the filters — the universe is big, but our catalogue is a little smaller."
              action={
                <button className="btn-secondary" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
                  Reset search
                </button>
              }
            />
          )}
        </div>
      </div>
    </>
  );
}
