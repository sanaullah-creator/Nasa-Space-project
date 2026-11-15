import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  TriangleAlert,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  FlaskConical,
  Globe,
  CircleHelp,
  MapPin,
  Navigation,
  Power,
  Rocket,
  Target,
  Wrench,
} from 'lucide-react';
import { missions, getMissionById } from '../data/missions';
import { MissionVisual } from '../components/missions/MissionVisual';
import { RobotLastMessage } from '../components/missions/RobotLastMessage';
import { InfoList } from '../components/missions/InfoList';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DESTINATION_META, EVENT_META, STATUS_META } from '../utils/status';
import { formatCoords, formatDate } from '../utils/format';
import { useProgress } from '../hooks/ProgressContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { NotFoundPage } from './NotFoundPage';

export function MissionDetailPage() {
  const { id = '' } = useParams();
  const mission = getMissionById(id);
  const { recordMissionView } = useProgress();
  useDocumentTitle(mission?.name ?? 'Mission not found');

  useEffect(() => {
    if (mission) recordMissionView(mission.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission?.id]);

  if (!mission) return <NotFoundPage message="We couldn't find that mission file. It may have drifted out of range." />;

  const dest = DESTINATION_META[mission.destination];
  const idx = missions.findIndex((m) => m.id === mission.id);
  const prev = missions[(idx - 1 + missions.length) % missions.length];
  const next = missions[(idx + 1) % missions.length];

  return (
    <article>
      {/* hero */}
      <header className="relative isolate overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10 scale-110 opacity-25 blur-2xl" aria-hidden>
          <MissionVisual mission={mission} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-space-900/40 via-space-900/70 to-space-900" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:px-8 lg:py-14">
          <div className="animate-fade-up">
            <Link to="/explore" className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-slate-200 backdrop-blur hover:bg-black/60">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All missions
            </Link>
            <p className="eyebrow" style={{ color: dest.color }}>
              {dest.label} · {mission.program}
            </p>
            <h1 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">{mission.name}</h1>
            <p className="mt-3 max-w-xl text-lg italic text-slate-300">{mission.tagline}</p>
            <div className="mt-5">
              <StatusBadge mission={mission} size="md" />
            </div>
          </div>
          <MissionVisual
            priority
            mission={mission}
            className="aspect-[16/10] w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/60"
            showCredit
          />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* quick facts */}
        <dl className="glass mt-6 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe, label: 'Planet / location', value: dest.label },
            { icon: Rocket, label: 'Launched', value: formatDate(mission.launchDate) },
            { icon: Calendar, label: 'Operations', value: mission.operations },
            { icon: Power, label: 'Status', value: <StatusBadge mission={mission} size="md" /> },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col gap-1 bg-space-900/40 p-5">
              <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
                <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
              </dt>
              <dd className="font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-slate-400">
          <span className="font-semibold" style={{ color: STATUS_META[mission.status].color }}>
            {STATUS_META[mission.status].label}:
          </span>{' '}
          {mission.statusNote}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-8">
            <section className="glass p-6 sm:p-8">
              <h2 className="text-2xl font-bold">The story</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{mission.summary}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nebula-300">
                    <CircleHelp className="h-4 w-4" aria-hidden /> What it was
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{mission.whatItWas}</p>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-nebula-300">
                    <Target className="h-4 w-4" aria-hidden /> Why NASA sent it
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{mission.whySent}</p>
                </div>
              </div>
              <h3 className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-mars-300">
                <BookOpen className="h-4 w-4" aria-hidden /> An interesting story
              </h3>
              <p className="mt-2 leading-relaxed text-slate-300">{mission.story}</p>
            </section>

            <RobotLastMessage mission={mission} />

            <div className="grid gap-6 md:grid-cols-2">
              <InfoList title="Mission objectives" items={mission.objectives} icon={Target} accent="#5ab0ff" />
              <InfoList title="Scientific discoveries" items={mission.discoveries} icon={FlaskConical} accent="#34d399" />
              <InfoList title="Major achievements" items={mission.achievements} icon={Award} accent="#fbbf24" />
              <InfoList title="Challenges" items={mission.challenges} icon={Wrench} accent="#f97350" />
            </div>

            <section className="glass p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-xl font-bold">
                <TriangleAlert className="h-5 w-5 text-slate-400" aria-hidden /> How the mission ended
              </h2>
              <p className="mt-3 leading-relaxed text-slate-300">{mission.ending}</p>
              <h2 className="mt-8 text-xl font-bold">Why it still matters</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{mission.whyItMatters}</p>
            </section>

            {/* mission timeline */}
            <section className="glass p-6 sm:p-8">
              <h2 className="text-xl font-bold">Mission timeline</h2>
              <ol className="relative mt-6 space-y-6 border-l border-white/10 pl-6">
                {mission.timeline.map((e) => (
                  <li key={e.date + e.title} className="relative">
                    <span className="absolute -left-[1.95rem] top-1 h-3 w-3 rounded-full ring-4 ring-space-900" style={{ background: EVENT_META[e.type].color }} aria-hidden />
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: EVENT_META[e.type].color }}>
                      {formatDate(e.date)} · {EVENT_META[e.type].label}
                    </p>
                    <p className="mt-1 font-semibold text-white">{e.title}</p>
                    <p className="text-sm text-slate-400">{e.description}</p>
                  </li>
                ))}
              </ol>
              <Link to="/timeline" className="btn-ghost mt-4 text-nebula-300">
                Open the full Mission Time Machine <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </section>
          </div>

          {/* sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <section className="glass overflow-hidden">
              <div className="border-b border-white/10 bg-gradient-to-r from-violet-500/15 to-transparent px-5 py-4">
                <h2 className="flex items-center gap-2 font-bold">
                  <Navigation className="h-4 w-4 text-violet-300" aria-hidden /> Where is it now?
                </h2>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-sm leading-relaxed text-slate-300">{mission.whereNow}</p>
                {mission.sites && (
                  <ul className="space-y-2">
                    {mission.sites.map((s) => (
                      <li key={s.label} className="flex gap-2 rounded-lg bg-white/[0.03] p-2.5 text-xs">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mars-400" aria-hidden />
                        <span>
                          <span className="block font-semibold text-slate-200">{s.label}</span>
                          <span className="text-slate-500">≈ {formatCoords(s.lat, s.lon)} (approximate)</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {mission.deepSpace && (
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-slate-500">Distance</dt>
                      <dd className="text-slate-200">{mission.deepSpace.distance}</dd>
                      <dd className="text-xs text-slate-500">as of {mission.deepSpace.asOf}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-slate-500">Heading</dt>
                      <dd className="text-slate-200">{mission.deepSpace.heading}</dd>
                    </div>
                  </dl>
                )}
                <Link to={mission.destination === 'deep-space' ? '/map?world=deep-space' : `/map?world=${mission.destination}`} className="btn-secondary w-full">
                  <MapPin className="h-4 w-4" aria-hidden /> Show on the Space Map
                </Link>
              </div>
            </section>

            <section className="glass p-5">
              <h2 className="font-bold">Official NASA sources</h2>
              <ul className="mt-3 space-y-2">
                {mission.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noreferrer" className="group flex items-start gap-2 text-sm text-nebula-300 hover:text-white">
                      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="group-hover:underline">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                {mission.image ? (
                  <>
                    Image: {mission.image.credit}.{' '}
                    <a className="underline hover:text-slate-300" href={mission.image.sourceUrl} target="_blank" rel="noreferrer">
                      View the original
                    </a>
                    . More photos in the{' '}
                  </>
                ) : (
                  <>Find real NASA photos of this mission in the </>
                )}
                <a className="underline hover:text-slate-300" href={`https://images.nasa.gov/search?q=${encodeURIComponent(mission.shortName)}`} target="_blank" rel="noreferrer">
                  NASA Image and Video Library
                </a>
                .
              </p>
            </section>

            <section className="glass p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Did you know?</h2>
              <ul className="mt-3 space-y-3">
                {mission.facts.map((f) => (
                  <li key={f} className="text-sm leading-relaxed text-slate-300">
                    💡 {f}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        <nav className="mt-12 grid gap-4 sm:grid-cols-2" aria-label="More missions">
          <Link to={`/missions/${prev.id}`} className="glass card-hover flex items-center gap-3 p-5">
            <ArrowLeft className="h-5 w-5 text-slate-400" aria-hidden />
            <span>
              <span className="block text-xs uppercase tracking-wider text-slate-500">Previous exhibit</span>
              <span className="font-semibold">{prev.name}</span>
            </span>
          </Link>
          <Link to={`/missions/${next.id}`} className="glass card-hover flex items-center justify-end gap-3 p-5 text-right">
            <span>
              <span className="block text-xs uppercase tracking-wider text-slate-500">Next exhibit</span>
              <span className="font-semibold">{next.name}</span>
            </span>
            <ArrowRight className="h-5 w-5 text-slate-400" aria-hidden />
          </Link>
        </nav>
      </div>
    </article>
  );
}
