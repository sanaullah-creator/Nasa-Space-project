import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Minus, Plus, RotateCcw, X } from 'lucide-react';
import type { Mission } from '../../types';
import { MARS_FEATURES, MOON_FEATURES, PLANET_STYLE, type BasemapFeature } from './basemaps';
import { STATUS_META } from '../../utils/status';
import { clamp, cx, formatCoords } from '../../utils/format';
import { StatusBadge } from '../ui/StatusBadge';

const W = 720;
const H = 360;
const toX = (lon: number) => ((lon + 180) / 360) * W;
const toY = (lat: number) => ((90 - lat) / 180) * H;

export interface MapSite {
  key: string;
  lat: number;
  lon: number;
  label: string;
  entries: { mission: Mission; note: string; label: string; lat: number; lon: number }[];
}

/** Cluster sites within ~1.5° of each other so markers never hide one another
 * (e.g. Apollo 12 & Surveyor 3 are only ~180 m apart). Each entry keeps its own coordinates. */
export function buildSites(world: 'moon' | 'mars', missions: Mission[]): MapSite[] {
  const sites: MapSite[] = [];
  missions
    .filter((m) => m.destination === world && m.sites)
    .forEach((m) =>
      m.sites!.forEach((s) => {
        const near = sites.find((x) => Math.hypot(x.lat - s.lat, x.lon - s.lon) < 1.5);
        if (near) near.entries.push({ mission: m, note: s.note, label: s.label, lat: s.lat, lon: s.lon });
        else
          sites.push({
            key: `${world}:${s.lat.toFixed(2)},${s.lon.toFixed(2)}`,
            lat: s.lat,
            lon: s.lon,
            label: s.label.split(' — ')[1] ?? s.label,
            entries: [{ mission: m, note: s.note, label: s.label, lat: s.lat, lon: s.lon }],
          });
      }),
    );
  return sites;
}

function markerColor(site: MapSite) {
  const order = ['active', 'left-behind', 'inactive', 'mission-ended', 'silent'] as const;
  const top = order.find((st) => site.entries.some((e) => e.mission.status === st)) ?? 'mission-ended';
  return STATUS_META[top].color;
}

function Feature({ f, world, scale }: { f: BasemapFeature; world: 'moon' | 'mars'; scale: number }) {
  const st = PLANET_STYLE[world];
  const cxp = toX(f.lon);
  const cyp = toY(f.lat);
  const rx = f.rx * 2;
  const ry = f.ry * 2;
  const fill =
    f.tone === 'dark' ? st.dark : f.tone === 'light' ? st.light : f.tone === 'canyon' ? '#4a1a0c' : f.tone === 'volcano' ? '#b4532e' : '#fff';
  return (
    <g transform={f.rotate ? `rotate(${f.rotate} ${cxp} ${cyp})` : undefined}>
      {f.tone === 'volcano' ? (
        <>
          <circle cx={cxp} cy={cyp} r={rx} fill="#d07a4e" opacity="0.9" />
          <circle cx={cxp} cy={cyp} r={rx * 0.55} fill={fill} />
          <circle cx={cxp} cy={cyp} r={rx * 0.2} fill="#7a2f17" />
        </>
      ) : (
        <ellipse cx={cxp} cy={cyp} rx={rx} ry={ry} fill={fill} opacity={f.tone === 'canyon' ? 0.95 : 0.75} filter="url(#soft)" />
      )}
      {f.label && (
        <text
          x={cxp}
          y={cyp + ry + 9 * scale}
          textAnchor="middle"
          fontSize={7 * scale}
          fill="rgba(255,255,255,0.55)"
          style={{ fontStyle: 'italic', pointerEvents: 'none' }}
        >
          {f.name}
        </text>
      )}
    </g>
  );
}

interface Props {
  world: 'moon' | 'mars';
  sites: MapSite[];
  selectedKey: string | null;
  onSelect: (key: string | null) => void;
}

export function PlanetMap({ world, sites, selectedKey, onSelect }: Props) {
  const [vb, setVb] = useState({ x: 0, y: 0, w: W, h: H });
  const drag = useRef<{ px: number; py: number; vx: number; vy: number; moved: boolean } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scale = vb.w / W;
  const features = world === 'moon' ? MOON_FEATURES : MARS_FEATURES;
  const style = PLANET_STYLE[world];
  const selected = sites.find((s) => s.key === selectedKey) ?? null;

  const craters = useMemo(() => {
    // deterministic decorative craters
    let seed = world === 'moon' ? 7 : 13;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: world === 'moon' ? 140 : 70 }, () => ({ x: rnd() * W, y: 20 + rnd() * (H - 40), r: 1 + rnd() * (world === 'moon' ? 5 : 3.5) }));
  }, [world]);

  const zoom = (factor: number) =>
    setVb((v) => {
      const w = clamp(v.w * factor, W / 8, W);
      const h = w / 2;
      const cxv = v.x + v.w / 2;
      const cyv = v.y + v.h / 2;
      return { x: clamp(cxv - w / 2, 0, W - w), y: clamp(cyv - h / 2, 0, H - h), w, h };
    });

  const focus = (site: MapSite) => {
    const w = W / 3;
    const h = w / 2;
    setVb({ x: clamp(toX(site.lon) - w / 2, 0, W - w), y: clamp(toY(site.lat) - h / 2, 0, H - h), w, h });
  };

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    drag.current = { px: e.clientX, py: e.clientY, vx: vb.x, vy: vb.y, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    const svg = svgRef.current;
    if (!d || !svg) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    if (!d.moved) svg.setPointerCapture?.(e.pointerId);
    d.moved = true;
    const k = vb.w / svg.clientWidth;
    setVb((v) => ({ ...v, x: clamp(d.vx - dx * k, 0, W - v.w), y: clamp(d.vy - dy * k, 0, H - v.h) }));
  };
  const onPointerUp = () => {
    setTimeout(() => (drag.current = null), 0);
  };

  const popupLeft = selected ? ((toX(selected.lon) - vb.x) / vb.w) * 100 : 0;
  const popupTop = selected ? ((toY(selected.lat) - vb.y) / vb.h) * 100 : 0;
  const popupVisible = selected && popupLeft >= 0 && popupLeft <= 100 && popupTop >= 0 && popupTop <= 100;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-space-950 shadow-2xl shadow-black/50">
        <svg
          ref={svgRef}
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          className={cx('block aspect-[2/1] w-full touch-none select-none', drag.current?.moved ? 'cursor-grabbing' : 'cursor-grab')}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onClick={() => {
            if (!drag.current?.moved) onSelect(null);
          }}
          role="img"
          aria-label={`Illustrated map of ${world === 'moon' ? 'the Moon' : 'Mars'} showing ${sites.length} mission locations`}
        >
          <defs>
            <linearGradient id={`base-${world}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={style.base[0]} />
              <stop offset="1" stopColor={style.base[1]} />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
              <stop offset="0.6" stopColor="#000" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity="0.45" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#base-${world})`} />
          {craters.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
          ))}
          {features.map((f) => (
            <Feature key={f.name} f={f} world={world} scale={scale} />
          ))}
          {style.polar && (
            <>
              <ellipse cx={W / 2} cy={0} rx={W / 2} ry={16} fill={style.polar} opacity="0.85" filter="url(#soft)" />
              <ellipse cx={W / 2} cy={H} rx={W / 2.6} ry={10} fill={style.polar} opacity="0.75" filter="url(#soft)" />
            </>
          )}
          {/* graticule */}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 60} y1={0} x2={(i + 1) * 60} y2={H} stroke={style.grid} strokeWidth={0.6 * scale} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={(i + 1) * 60} x2={W} y2={(i + 1) * 60} stroke={i === 2 ? 'rgba(255,255,255,0.18)' : style.grid} strokeWidth={0.6 * scale} />
          ))}
          {[-120, -60, 0, 60, 120].map((lon) => (
            <text key={lon} x={toX(lon) + 3 * scale} y={H - 4 * scale} fontSize={7 * scale} fill="rgba(255,255,255,0.4)">
              {lon === 0 ? '0°' : `${Math.abs(lon)}°${lon > 0 ? 'E' : 'W'}`}
            </text>
          ))}
          {[60, 30, -30, -60].map((lat) => (
            <text key={lat} x={3 * scale} y={toY(lat) - 3 * scale} fontSize={7 * scale} fill="rgba(255,255,255,0.4)">
              {Math.abs(lat)}°{lat > 0 ? 'N' : 'S'}
            </text>
          ))}
          <rect width={W} height={H} fill="url(#vignette)" pointerEvents="none" />

          {/* markers */}
          {sites.map((s) => {
            const color = markerColor(s);
            const isSel = s.key === selectedKey;
            const r = 5.5 * scale;
            return (
              <g
                key={s.key}
                transform={`translate(${toX(s.lon)} ${toY(s.lat)})`}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (drag.current?.moved) return;
                  onSelect(isSel ? null : s.key);
                }}
                role="button"
                tabIndex={0}
                aria-label={`${s.label}: ${s.entries.map((x) => x.mission.shortName).join(', ')}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(isSel ? null : s.key);
                  }
                }}
              >
                <circle r={r * 2.6} fill={color} opacity="0.18" pointerEvents="none">
                  <animate attributeName="r" values={`${r * 1.4};${r * 3};${r * 1.4}`} dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle r={r * 1.5} fill="transparent" />
                <circle r={r} fill={color} stroke={isSel ? '#fff' : '#0b1130'} strokeWidth={(isSel ? 2 : 1.4) * scale} />
                {s.entries.length > 1 && (
                  <text y={2.4 * scale} textAnchor="middle" fontSize={6.5 * scale} fontWeight="700" fill="#0b1130" pointerEvents="none">
                    {s.entries.length}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {[
            { icon: Plus, label: 'Zoom in', fn: () => zoom(0.6) },
            { icon: Minus, label: 'Zoom out', fn: () => zoom(1 / 0.6) },
            { icon: RotateCcw, label: 'Reset view', fn: () => setVb({ x: 0, y: 0, w: W, h: H }) },
          ].map(({ icon: Icon, label, fn }) => (
            <button key={label} onClick={fn} className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-space-900/80 text-white backdrop-blur hover:bg-space-700" aria-label={label} title={label}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <p className="pointer-events-none absolute bottom-2 left-3 rounded bg-black/50 px-2 py-0.5 text-[0.65rem] text-slate-300">
          Illustrated map · simplified features · drag to pan
        </p>

        {/* popup (desktop) */}
        {popupVisible && selected && (
          <div
            className="absolute z-10 hidden w-72 md:block"
            style={{
              left: `${popupLeft}%`,
              top: `${popupTop}%`,
              transform: `translate(${popupLeft > 60 ? 'calc(-100% - 16px)' : '16px'}, ${popupTop > 55 ? 'calc(-100% + 10px)' : '-10px'})`,
            }}
          >
            <SitePopup site={selected} onClose={() => onSelect(null)} onFocus={() => focus(selected)} />
          </div>
        )}
      </div>

      {/* popup (mobile) */}
      {selected && (
        <div className="md:hidden">
          <SitePopup site={selected} onClose={() => onSelect(null)} onFocus={() => focus(selected)} />
        </div>
      )}
    </div>
  );
}

export function SitePopup({ site, onClose, onFocus }: { site: MapSite; onClose: () => void; onFocus?: () => void }) {
  return (
    <div className="glass-strong animate-fade-up p-4 shadow-2xl shadow-black/60" role="dialog" aria-label={site.label}>
      <div className="flex items-start gap-2">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mars-400" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold text-white">{site.label}</p>
          <p className="text-[0.7rem] text-slate-400">
            {site.entries.length > 1 ? `${site.entries.length} machines at or near this site` : `≈ ${formatCoords(site.lat, site.lon)} · approximate`}
          </p>
        </div>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close popup">
          <X className="h-4 w-4" />
        </button>
      </div>
      <ul className="mt-3 max-h-80 space-y-3 overflow-y-auto pr-1 scrollbar-thin">
        {site.entries.map((e) => (
          <li key={e.mission.id + e.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm font-semibold text-white">{e.mission.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">{e.label}</p>
            <p className="text-xs text-slate-500">
              {e.note} · ≈ {formatCoords(e.lat, e.lon)}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <StatusBadge mission={e.mission} showTravelling={false} />
              <Link to={`/missions/${e.mission.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-nebula-300 hover:text-white">
                Mission file <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {onFocus && (
        <button onClick={onFocus} className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-xs text-slate-300 hover:bg-white/5">
          Zoom to this site
        </button>
      )}
    </div>
  );
}
