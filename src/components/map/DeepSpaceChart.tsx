import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import type { Mission } from '../../types';
import { STATUS_META } from '../../utils/status';
import { StatusBadge } from '../ui/StatusBadge';

const WIDTH = 900;
const HEIGHT = 380;
const LEFT = 40;
const MAX_AU = 190;
/** Square-root scale so the inner planets and 170 AU both fit. */
const sx = (au: number) => LEFT + Math.sqrt(au / MAX_AU) * (WIDTH - LEFT - 30);

const BODIES = [
  { name: 'Earth', au: 1, r: 3, color: '#5ab0ff' },
  { name: 'Jupiter', au: 5.2, r: 6, color: '#e0b98a' },
  { name: 'Saturn', au: 9.5, r: 5.5, color: '#f1d79a' },
  { name: 'Uranus', au: 19.2, r: 4.5, color: '#9fe3e8' },
  { name: 'Neptune', au: 30.1, r: 4.5, color: '#5b7cfa' },
  { name: 'Pluto', au: 39.5, r: 2.5, color: '#d9c7b0' },
];

interface Props {
  missions: Mission[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

/** Schematic (not-to-scale direction) chart of how far each deep-space traveller is from home. */
export function DeepSpaceChart({ missions, selectedId, onSelect }: Props) {
  const travellers = missions.filter((m) => m.deepSpace).sort((a, b) => a.deepSpace!.au - b.deepSpace!.au);
  const selected = travellers.find((m) => m.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-space-950 shadow-2xl shadow-black/50">
        <div className="overflow-x-auto scrollbar-thin">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block min-w-[720px] w-full" role="img" aria-label="Distance chart of deep space spacecraft">
            <defs>
              <radialGradient id="sun" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#fff7d6" />
                <stop offset="0.4" stopColor="#ffd166" />
                <stop offset="1" stopColor="#ff8a3d" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="helio" x1="0" x2="1">
                <stop offset="0" stopColor="#2f8cf0" stopOpacity="0.18" />
                <stop offset="1" stopColor="#2f8cf0" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {/* heliosphere */}
            <rect x={LEFT} y={30} width={sx(120) - LEFT} height={HEIGHT - 80} fill="url(#helio)" rx="12" />
            <line x1={sx(94)} x2={sx(94)} y1={30} y2={HEIGHT - 50} stroke="#5ab0ff" strokeDasharray="4 5" opacity="0.5" />
            <text x={sx(94) - 4} y={46} textAnchor="end" fontSize="11" fill="#9fd3ff" opacity="0.8">
              Termination shock (~85–95 AU)
            </text>
            <line x1={sx(121)} x2={sx(121)} y1={30} y2={HEIGHT - 50} stroke="#a78bfa" strokeWidth="2" opacity="0.7" />
            <text x={sx(121) + 6} y={46} fontSize="11" fill="#c4b5fd">
              Heliopause (~120 AU)
            </text>
            <text x={sx(150)} y={HEIGHT - 60} textAnchor="middle" fontSize="12" fill="#c4b5fd" opacity="0.7" fontStyle="italic">
              Interstellar space
            </text>
            {/* Kuiper belt */}
            <rect x={sx(30)} y={HEIGHT / 2 - 10} width={sx(50) - sx(30)} height={20} fill="#c7b9a6" opacity="0.12" rx="6" />
            <text x={(sx(30) + sx(50)) / 2} y={HEIGHT / 2 + 30} textAnchor="middle" fontSize="10" fill="#c7b9a6" opacity="0.8">
              Kuiper Belt
            </text>
            {/* axis */}
            <line x1={LEFT} x2={WIDTH - 20} y1={HEIGHT / 2} y2={HEIGHT / 2} stroke="rgba(255,255,255,0.15)" />
            {[1, 10, 50, 100, 150].map((au) => (
              <g key={au}>
                <line x1={sx(au)} x2={sx(au)} y1={HEIGHT - 44} y2={HEIGHT - 38} stroke="rgba(255,255,255,0.4)" />
                <text x={sx(au)} y={HEIGHT - 24} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">
                  {au} AU
                </text>
              </g>
            ))}
            {/* sun & planets */}
            <circle cx={LEFT} cy={HEIGHT / 2} r="22" fill="url(#sun)" />
            {BODIES.map((b) => (
              <g key={b.name}>
                <circle cx={sx(b.au)} cy={HEIGHT / 2} r={b.r} fill={b.color} />
                <text x={sx(b.au)} y={HEIGHT / 2 - b.r - 6} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.6)">
                  {b.name}
                </text>
              </g>
            ))}
            {/* travellers */}
            {travellers.map((m, i) => {
              const x = sx(m.deepSpace!.au);
              const y = i % 2 === 0 ? HEIGHT / 2 - 80 : HEIGHT / 2 + 75;
              const color = m.status === 'silent' ? STATUS_META.silent.color : STATUS_META.active.color;
              const isSel = m.id === selectedId;
              return (
                <g
                  key={m.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(isSel ? null : m.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${m.name}: ${m.deepSpace!.distance}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelect(isSel ? null : m.id);
                    }
                  }}
                >
                  <line x1={x} x2={x} y1={HEIGHT / 2} y2={y} stroke={color} strokeDasharray={m.status === 'silent' ? '3 4' : undefined} opacity="0.6" />
                  <circle cx={x} cy={HEIGHT / 2} r="3" fill={color} />
                  <rect x={x - 58} y={y - 15} width="116" height="30" rx="15" fill={isSel ? '#1c2660' : '#0b1130'} stroke={color} strokeWidth={isSel ? 2 : 1} />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">
                    {m.shortName}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="border-t border-white/5 px-4 py-2 text-[0.7rem] text-slate-400">
          Schematic: distances use a square-root scale; directions are not shown. Pioneer distances are at the time of last contact.
        </p>
      </div>
      {selected && (
        <div className="glass-strong animate-fade-up p-5" role="dialog" aria-label={selected.name}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">{selected.name}</h3>
              <div className="mt-1">
                <StatusBadge mission={selected} />
              </div>
            </div>
            <button onClick={() => onSelect(null)} className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Distance from Earth</dt>
              <dd className="text-slate-200">{selected.deepSpace!.distance}</dd>
              <dd className="text-xs text-slate-500">as of {selected.deepSpace!.asOf}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Region</dt>
              <dd className="text-slate-200">{selected.deepSpace!.region}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Heading</dt>
              <dd className="text-slate-200">{selected.deepSpace!.heading}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-slate-400">{selected.statusNote}</p>
          <Link to={`/missions/${selected.id}`} className="btn-secondary mt-4">
            Open mission file <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
