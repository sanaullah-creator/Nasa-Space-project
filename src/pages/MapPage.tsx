import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, MapPin } from 'lucide-react';
import { missions } from '../data/missions';
import { PlanetMap, buildSites } from '../components/map/PlanetMap';
import { DeepSpaceChart } from '../components/map/DeepSpaceChart';
import { PageHeader } from '../components/ui/SectionHeading';
import { STATUS_META } from '../utils/status';
import { cx, formatCoords } from '../utils/format';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type World = 'moon' | 'mars' | 'deep-space';
const TABS: { id: World; label: string; blurb: string }[] = [
  { id: 'moon', label: 'Moon', blurb: 'Apollo landing sites and Surveyor landers on the lunar surface.' },
  { id: 'mars', label: 'Mars', blurb: 'Where NASA\'s landers, rovers and helicopter touched down on the Red Planet.' },
  { id: 'deep-space', label: 'Deep Space', blurb: 'How far each traveller has gone on its way out of the solar system.' },
];

export function MapPage() {
  useDocumentTitle('Interactive Space Map');
  const [params, setParams] = useSearchParams();
  const worldParam = params.get('world');
  const world: World = worldParam === 'mars' || worldParam === 'deep-space' ? worldParam : 'moon';
  const [selected, setSelected] = useState<string | null>(null);
  const { recordMarkerClick, progress } = useProgress();

  const sites = useMemo(() => (world === 'deep-space' ? [] : buildSites(world, missions)), [world]);

  const select = (key: string | null) => {
    setSelected(key);
    if (key) recordMarkerClick(key);
  };
  const switchWorld = (w: World) => {
    setSelected(null);
    const next = new URLSearchParams(params);
    if (w === 'moon') next.delete('world');
    else next.set('world', w);
    setParams(next, { replace: true });
  };

  const tab = TABS.find((t) => t.id === world)!;
  const charted = progress.markersClicked.length;

  return (
    <>
      <PageHeader
        eyebrow="Interactive space map"
        title="Where in the solar system?"
        description="Click a glowing marker to open its mission popup. Markers show approximate coordinates — rounded and simplified for this illustrated map."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1" role="tablist" aria-label="Choose a world">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={world === t.id}
                onClick={() => switchWorld(t.id)}
                className={cx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5',
                  world === t.id ? 'bg-gradient-to-r from-mars-500 to-mars-600 text-white shadow-lg shadow-mars-600/30' : 'text-slate-300 hover:text-white',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400">{tab.blurb}</p>
          <p className="ml-auto text-xs text-slate-500">Markers charted: {Math.min(charted, 5)}/5 for the Cartographer badge</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div>
            {world === 'deep-space' ? (
              <DeepSpaceChart missions={missions} selectedId={selected} onSelect={select} />
            ) : (
              <PlanetMap key={world} world={world} sites={sites} selectedKey={selected} onSelect={select} />
            )}
          </div>
          <aside className="space-y-4">
            <div className="glass p-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Legend</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ background: STATUS_META[k].color }} aria-hidden />
                    <span className="text-slate-300">{STATUS_META[k].label}</span>
                  </li>
                ))}
                <li className="pt-1 text-xs text-slate-500">A number on a marker means several machines share that site.</li>
              </ul>
            </div>
            {world !== 'deep-space' && (
              <div className="glass p-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Locations ({sites.length})</h2>
                <ul className="mt-3 max-h-[26rem] space-y-1 overflow-y-auto pr-1 scrollbar-thin">
                  {sites.map((s) => (
                    <li key={s.key}>
                      <button
                        onClick={() => select(s.key === selected ? null : s.key)}
                        className={cx(
                          'flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition',
                          s.key === selected ? 'bg-mars-500/15 text-white' : 'text-slate-300 hover:bg-white/5',
                        )}
                        aria-pressed={s.key === selected}
                      >
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mars-400" aria-hidden />
                        <span>
                          <span className="block font-medium">{s.label}</span>
                          <span className="text-xs text-slate-500">
                            {s.entries.map((e) => e.mission.shortName).filter((v, i, a) => a.indexOf(v) === i).join(' · ')} · ≈ {formatCoords(s.lat, s.lon)}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2 rounded-xl border border-amber-300/20 bg-amber-400/5 p-3 text-xs leading-relaxed text-amber-100/80">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>
                Coordinates are approximate values from NASA and NSSDCA records. Surface features on these illustrated maps are simplified
                artistic shapes, not survey-grade outlines.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
