import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CircleCheck } from 'lucide-react';
import type { Mission } from '../../types';
import { MissionVisual } from './MissionVisual';
import { StatusBadge } from '../ui/StatusBadge';
import { DESTINATION_META } from '../../utils/status';
import { useProgress } from '../../hooks/ProgressContext';

export function MissionCard({ mission, index = 0 }: { mission: Mission; index?: number }) {
  const { progress } = useProgress();
  const visited = progress.viewedMissions.includes(mission.id);
  const dest = DESTINATION_META[mission.destination];

  return (
    <article
      className="group glass card-hover flex flex-col overflow-hidden animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 10) * 50}ms` }}
    >
      <Link to={`/missions/${mission.id}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <MissionVisual mission={mission} className="h-full w-full transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-space-900/10 to-transparent" />
        <span
          className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur"
          style={{ color: dest.color }}
        >
          {dest.label}
        </span>
        {visited && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-[0.65rem] font-semibold text-emerald-300 backdrop-blur">
            <CircleCheck className="h-3 w-3" aria-hidden /> Explored
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <StatusBadge mission={mission} />
        <div>
          <h3 className="text-lg font-bold leading-snug">
            <Link to={`/missions/${mission.id}`} className="hover:text-mars-300">
              {mission.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm italic text-slate-400">{mission.tagline}</p>
        </div>
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-nebula-400" aria-hidden />
          {mission.operations}
        </p>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">{mission.summary}</p>
        <div className="mt-auto pt-2">
          <Link to={`/missions/${mission.id}`} className="btn-secondary w-full group-hover:border-mars-400/60">
            View Details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
