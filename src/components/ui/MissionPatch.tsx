import { forwardRef } from 'react';
import type { PatchDesign } from '../../types';

export const PATCH_THEMES: Record<PatchDesign['theme'], { label: string; bg: [string, string]; ring: string; accent: string; text: string }> = {
  mars: { label: 'Mars Red', bg: ['#f2603a', '#5a1a0c'], ring: '#ffd0b5', accent: '#ffb08a', text: '#ffffff' },
  moon: { label: 'Lunar Silver', bg: ['#9aa3b0', '#1f2633'], ring: '#e8ecf2', accent: '#cbd5e1', text: '#ffffff' },
  deep: { label: 'Deep Space Blue', bg: ['#2f8cf0', '#0b1130'], ring: '#9fd3ff', accent: '#a78bfa', text: '#ffffff' },
};

function Emblem({ kind, color }: { kind: PatchDesign['emblem']; color: string }) {
  switch (kind) {
    case 'rocket':
      return (
        <g transform="translate(150 150)">
          <path d="M0 -62 C 22 -40 24 -6 18 26 L -18 26 C -24 -6 -22 -40 0 -62 Z" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <circle cx="0" cy="-18" r="10" fill={color} stroke="#0b1130" strokeWidth="3" />
          <path d="M-18 6 L -36 34 L -16 30 Z M18 6 L 36 34 L 16 30 Z" fill={color} stroke="#0b1130" strokeWidth="3" />
          <path d="M-10 28 Q 0 64 10 28 Z" fill="#fbbf24" />
          <path d="M-5 28 Q 0 48 5 28 Z" fill="#fff7d6" />
        </g>
      );
    case 'rover':
      return (
        <g transform="translate(150 158)">
          <rect x="-46" y="-22" width="92" height="22" rx="4" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <rect x="-56" y="-34" width="112" height="10" rx="2" fill={color} stroke="#0b1130" strokeWidth="3" />
          <line x1="26" y1="-34" x2="26" y2="-68" stroke="#0b1130" strokeWidth="5" />
          <rect x="12" y="-80" width="30" height="14" rx="3" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          {[-38, 0, 38].map((x) => (
            <circle key={x} cx={x} cy="12" r="12" fill="#1f2633" stroke="#f8fafc" strokeWidth="3" />
          ))}
        </g>
      );
    case 'planet':
      return (
        <g transform="translate(150 150)">
          <ellipse cx="0" cy="0" rx="66" ry="18" fill="none" stroke={color} strokeWidth="6" transform="rotate(-18)" />
          <circle r="38" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <path d="M-30 -10 Q 0 -24 30 -10" stroke={color} strokeWidth="5" fill="none" />
          <path d="M-34 10 Q 0 0 34 12" stroke={color} strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M-66 0 A 66 18 0 0 0 66 0" fill="none" stroke={color} strokeWidth="6" transform="rotate(-18)" />
        </g>
      );
    case 'satellite':
      return (
        <g transform="translate(150 150) rotate(-20)">
          <rect x="-82" y="-14" width="50" height="28" fill={color} stroke="#0b1130" strokeWidth="3" />
          <rect x="32" y="-14" width="50" height="28" fill={color} stroke="#0b1130" strokeWidth="3" />
          <line x1="-32" y1="0" x2="32" y2="0" stroke="#0b1130" strokeWidth="4" />
          <rect x="-16" y="-18" width="32" height="36" rx="4" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <path d="M-22 -30 Q 0 -60 22 -30 Z" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
        </g>
      );
    case 'helicopter':
      return (
        <g transform="translate(150 156)">
          <ellipse cx="0" cy="-52" rx="72" ry="6" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <ellipse cx="0" cy="-38" rx="72" ry="6" fill={color} stroke="#0b1130" strokeWidth="3" />
          <line x1="0" y1="-58" x2="0" y2="-12" stroke="#0b1130" strokeWidth="5" />
          <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#f8fafc" stroke="#0b1130" strokeWidth="3" />
          <path d="M-12 14 L -34 42 M 12 14 L 34 42" stroke="#f8fafc" strokeWidth="5" strokeLinecap="round" />
        </g>
      );
  }
}

function shapePath(shape: PatchDesign['shape']) {
  switch (shape) {
    case 'shield':
      return 'M150 12 L270 52 L262 170 C 250 230 200 268 150 288 C 100 268 50 230 38 170 L30 52 Z';
    case 'hexagon':
      return 'M150 10 L271 80 L271 220 L150 290 L29 220 L29 80 Z';
    default:
      return 'M150 10 A140 140 0 1 1 149.9 10 Z';
  }
}

/** The rendered SVG mission patch (forwardRef so it can be exported as an image). */
export const MissionPatch = forwardRef<SVGSVGElement, { design: PatchDesign; size?: number }>(function MissionPatch({ design, size }, ref) {
  const t = PATCH_THEMES[design.theme];
  const path = shapePath(design.shape);
  const name = (design.missionName || 'MY MISSION').toUpperCase().slice(0, 22);
  const explorer = (design.explorerName || 'EXPLORER').toUpperCase().slice(0, 20);
  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width={size} height={size} role="img" aria-label={`Mission patch: ${name}, ${explorer}`}>
      <defs>
        <radialGradient id="patch-bg" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </radialGradient>
        <clipPath id="patch-clip">
          <path d={path} />
        </clipPath>
        <path id="arc-top" d="M 55 150 A 95 95 0 0 1 245 150" />
        <path id="arc-bottom" d="M 48 160 A 102 102 0 0 0 252 160" />
      </defs>
      <path d={path} fill="url(#patch-bg)" />
      <g clipPath="url(#patch-clip)">
        {Array.from({ length: 26 }).map((_, i) => (
          <circle key={i} cx={(i * 73) % 300} cy={(i * 131) % 300} r={(i % 3) * 0.6 + 0.6} fill="#fff" opacity="0.7" />
        ))}
        <circle cx="150" cy="380" r="170" fill="#000" opacity="0.25" />
      </g>
      {/* stars row */}
      {Array.from({ length: design.stars }).map((_, i) => {
        const span = (design.stars - 1) * 18;
        const x = 150 - span / 2 + i * 18;
        return (
          <path
            key={i}
            transform={`translate(${x} 232) scale(0.6)`}
            d="M0 -10 L2.9 -3.1 L10 -3.1 L4.3 1.4 L6.5 8.5 L0 4.2 L-6.5 8.5 L-4.3 1.4 L-10 -3.1 L-2.9 -3.1 Z"
            fill={t.accent}
          />
        );
      })}
      <Emblem kind={design.emblem} color={t.accent} />
      <path d={path} fill="none" stroke={t.ring} strokeWidth="10" />
      <path d={path} fill="none" stroke="#0b1130" strokeWidth="2" transform="translate(150 150) scale(0.93) translate(-150 -150)" opacity="0.6" />
      <text fontFamily="Orbitron, 'Space Grotesk', sans-serif" fontWeight="900" fontSize="19" fill={t.text} letterSpacing="2.5" textAnchor="middle">
        <textPath href="#arc-top" startOffset="50%">
          {name}
        </textPath>
      </text>
      <text fontFamily="'Space Grotesk', Inter, sans-serif" fontWeight="700" fontSize="15" fill={t.ring} letterSpacing="3" textAnchor="middle">
        <textPath href="#arc-bottom" startOffset="50%">
          {explorer}
        </textPath>
      </text>
    </svg>
  );
});
