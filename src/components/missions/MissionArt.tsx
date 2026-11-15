import { memo, useMemo } from 'react';
import type { Destination, HardwareKind } from '../../types';

/* Original vector illustrations created for this museum.
 * They are artistic interpretations — NOT NASA photographs. */

interface MissionArtProps {
  id: string;
  hardware: HardwareKind;
  destination: Destination;
  className?: string;
  title?: string;
}

/** Deterministic PRNG so every mission always gets the same starfield. */
function seeded(seedStr: string) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GOLD = '#d9a441';
const GOLD_DARK = '#9a6b1f';
const SILVER = '#cfd6e0';
const SILVER_DARK = '#7d8796';
const PANEL = '#1f3a7a';

function Hardware({ kind, uid }: { kind: HardwareKind; uid: string }) {
  switch (kind) {
    case 'descent-stage':
      return (
        <g transform="translate(200 158)">
          {/* legs */}
          {[-1, 1].map((s) => (
            <g key={s} stroke={SILVER_DARK} strokeWidth="4" strokeLinecap="round">
              <line x1={s * 40} y1={-10} x2={s * 78} y2={38} />
              <line x1={s * 40} y1={10} x2={s * 70} y2={38} />
              <ellipse cx={s * 78} cy={40} rx="13" ry="4" fill={SILVER} stroke="none" />
            </g>
          ))}
          <line x1="0" y1="20" x2="0" y2="40" stroke={SILVER_DARK} strokeWidth="4" />
          <ellipse cx="0" cy="42" rx="12" ry="4" fill={SILVER} />
          {/* octagonal gold body */}
          <polygon points="-48,-30 -30,-44 30,-44 48,-30 48,14 30,26 -30,26 -48,14" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} strokeWidth="2" />
          <path d="M-48 -8 H48 M-20 -44 V26 M20 -44 V26" stroke={GOLD_DARK} strokeWidth="1.2" opacity="0.6" />
          <path d="M-14 26 L-18 38 H18 L14 26 Z" fill="#555c66" />
          {/* plaque */}
          <rect x="-12" y="-30" width="24" height="14" rx="2" fill={SILVER} opacity="0.85" />
          {/* flag */}
          <line x1="96" y1="44" x2="96" y2="-28" stroke={SILVER} strokeWidth="2" />
          <rect x="96" y="-28" width="34" height="20" fill="#e6edf5" />
          <rect x="96" y="-28" width="14" height="10" fill="#3b5bdb" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={110} x2={130} y1={-26 + i * 5} y2={-26 + i * 5} stroke="#d64545" strokeWidth="2" />
          ))}
        </g>
      );
    case 'lunar-rover':
      return (
        <g transform="translate(200 170)">
          <rect x="-80" y="-22" width="160" height="14" rx="4" fill={SILVER} />
          <rect x="-70" y="-38" width="44" height="16" rx="3" fill="#5a6270" />
          <rect x="-16" y="-38" width="44" height="16" rx="3" fill="#5a6270" />
          <rect x="40" y="-34" width="34" height="12" rx="2" fill={GOLD} />
          {/* fenders */}
          {[-58, 58].map((x) => (
            <path key={x} d={`M${x - 26} -8 Q${x} -34 ${x + 26} -8`} fill="none" stroke="#a5adba" strokeWidth="5" />
          ))}
          {/* wheels */}
          {[-58, 58].map((x) => (
            <g key={x}>
              <circle cx={x} cy="6" r="22" fill="#2a2f38" stroke={SILVER_DARK} strokeWidth="3" />
              <circle cx={x} cy="6" r="15" fill="none" stroke={SILVER_DARK} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={x} cy="6" r="5" fill={SILVER} />
            </g>
          ))}
          {/* high-gain umbrella antenna */}
          <line x1="-70" y1="-22" x2="-70" y2="-86" stroke={SILVER_DARK} strokeWidth="3" />
          <path d="M-100 -86 Q-70 -110 -40 -86 Z" fill="#e7ecf2" stroke={SILVER_DARK} strokeWidth="1.5" />
          {/* TV camera */}
          <line x1="70" y1="-34" x2="70" y2="-58" stroke={SILVER_DARK} strokeWidth="3" />
          <rect x="60" y="-70" width="22" height="13" rx="2" fill="#3b4250" />
          <circle cx="84" cy="-63" r="4" fill="#5ab0ff" />
        </g>
      );
    case 'instruments':
      return (
        <g transform="translate(200 172)">
          {/* cables */}
          <path d="M-10 6 C -60 30 -110 10 -130 20" stroke="#8b93a1" strokeWidth="1.5" fill="none" />
          <path d="M10 6 C 50 26 90 30 120 18" stroke="#8b93a1" strokeWidth="1.5" fill="none" />
          {/* central station */}
          <rect x="-30" y="-26" width="60" height="32" rx="3" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} />
          <rect x="-34" y="-34" width="68" height="8" fill={SILVER} />
          <line x1="0" y1="-34" x2="0" y2="-70" stroke={SILVER_DARK} strokeWidth="2.5" />
          <path d="M-14 -70 L14 -70 L0 -86 Z" fill={SILVER} />
          {/* RTG */}
          <rect x="-96" y="-18" width="20" height="30" rx="4" fill="#6f7785" />
          {[-14, -6, 2].map((y) => (
            <line key={y} x1="-100" x2="-72" y1={y} y2={y} stroke="#4a515d" strokeWidth="3" />
          ))}
          {/* seismometer dome */}
          <path d="M-150 22 Q-130 -6 -110 22 Z" fill="#e8ecf2" stroke={SILVER_DARK} />
          {/* retroreflector array */}
          <g transform="translate(130 0) rotate(-12)">
            <rect x="-30" y="-24" width="60" height="34" rx="2" fill="#2b3240" stroke={SILVER} strokeWidth="2" />
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={-22 + (i % 5) * 11} cy={-14 + Math.floor(i / 5) * 14} r="4.2" fill="#9fd3ff" opacity="0.85" />
            ))}
            <line x1="-20" y1="10" x2="-26" y2="26" stroke={SILVER_DARK} strokeWidth="3" />
            <line x1="20" y1="10" x2="26" y2="26" stroke={SILVER_DARK} strokeWidth="3" />
          </g>
          {/* laser beam */}
          <line x1="140" y1="-14" x2="260" y2="-200" stroke="#34d399" strokeWidth="2" opacity="0.7" strokeDasharray="6 4" />
        </g>
      );
    case 'lander':
      return (
        <g transform="translate(200 160)">
          {[-1, 0, 1].map((s) => (
            <g key={s}>
              <line x1={s * 20} y1="0" x2={s * 66} y2={s === 0 ? 42 : 36} stroke={SILVER_DARK} strokeWidth="4" />
              <ellipse cx={s * 66} cy={s === 0 ? 44 : 38} rx="12" ry="4" fill={SILVER} />
            </g>
          ))}
          <polygon points="-34,10 34,10 0,-30" fill="none" stroke={SILVER} strokeWidth="4" />
          <rect x="-26" y="-6" width="20" height="16" fill={SILVER} />
          <rect x="6" y="-6" width="20" height="16" fill="#e8ecf2" />
          <line x1="0" y1="-30" x2="0" y2="-92" stroke={SILVER_DARK} strokeWidth="3" />
          <rect x="-36" y="-110" width="40" height="30" fill={PANEL} stroke={SILVER} strokeWidth="1.5" transform="rotate(-18 -16 -95)" />
          <rect x="6" y="-106" width="28" height="22" fill={SILVER} transform="rotate(14 20 -95)" />
          {/* TV camera with mirror */}
          <rect x="22" y="-26" width="12" height="26" rx="3" fill="#4a515d" />
          <circle cx="28" cy="-28" r="5" fill="#5ab0ff" />
        </g>
      );
    case 'micro-rover':
      return (
        <g transform="translate(200 180)">
          {/* Pathfinder lander petals behind */}
          <g opacity="0.95">
            <polygon points="-170,6 -110,6 -140,-34" fill="#3c4558" stroke={SILVER_DARK} />
            <polygon points="-110,6 -60,6 -86,-30" fill={PANEL} stroke={SILVER_DARK} />
            <circle cx="-118" cy="-48" r="9" fill={SILVER} />
            <line x1="-118" y1="-40" x2="-118" y2="-6" stroke={SILVER_DARK} strokeWidth="3" />
            <path d="M-130 -70 Q -118 -86 -106 -70 Z" fill="#e8ecf2" />
            <line x1="-118" y1="-70" x2="-118" y2="-58" stroke={SILVER_DARK} strokeWidth="2" />
          </g>
          {/* ramp */}
          <line x1="-62" y1="6" x2="-24" y2="18" stroke={SILVER_DARK} strokeWidth="3" />
          {/* rover body */}
          <rect x="-30" y="-24" width="70" height="14" rx="2" fill={PANEL} stroke={SILVER} strokeWidth="1.5" />
          {[-20, -6, 8, 22].map((x) => (
            <line key={x} x1={x} y1="-24" x2={x} y2="-10" stroke="#6b8fd8" strokeWidth="0.8" />
          ))}
          <rect x="-24" y="-10" width="58" height="10" fill="#c0c7d2" />
          <line x1="32" y1="-24" x2="32" y2="-38" stroke={SILVER_DARK} strokeWidth="2" />
          {/* rocker-bogie + wheels */}
          <path d="M-26 2 L-10 10 L10 2 L30 10 L44 2" stroke={SILVER_DARK} strokeWidth="2.5" fill="none" />
          {[-26, 5, 40].map((x) => (
            <circle key={x} cx={x} cy="14" r="9" fill="#2a2f38" stroke={SILVER} strokeWidth="2" />
          ))}
          {/* APXS on the back */}
          <rect x="-40" y="-6" width="10" height="10" fill={GOLD} />
        </g>
      );
    case 'mer-rover':
      return (
        <g transform="translate(200 172)">
          {/* solar wings */}
          <path d="M-96 -18 L-60 -34 L60 -34 L104 -22 L96 -10 L-90 -8 Z" fill={PANEL} stroke={SILVER} strokeWidth="1.5" />
          {[-60, -30, 0, 30, 60].map((x) => (
            <line key={x} x1={x} y1="-34" x2={x + 2} y2="-9" stroke="#6b8fd8" strokeWidth="0.8" />
          ))}
          {/* body */}
          <rect x="-44" y="-8" width="88" height="20" rx="2" fill="#d8dde5" stroke={SILVER_DARK} />
          {/* mast & head */}
          <line x1="-30" y1="-34" x2="-30" y2="-92" stroke={SILVER_DARK} strokeWidth="4" />
          <rect x="-48" y="-104" width="36" height="14" rx="3" fill="#e8ecf2" stroke={SILVER_DARK} />
          <circle cx="-40" cy="-97" r="3.5" fill="#1d2433" />
          <circle cx="-20" cy="-97" r="3.5" fill="#1d2433" />
          {/* low-gain & high-gain antennas */}
          <line x1="40" y1="-34" x2="40" y2="-64" stroke={SILVER_DARK} strokeWidth="2" />
          <ellipse cx="20" cy="-42" rx="12" ry="4" fill={SILVER} transform="rotate(-20 20 -42)" />
          {/* arm */}
          <path d="M44 4 L66 -2 L70 16" stroke={SILVER_DARK} strokeWidth="3.5" fill="none" />
          {/* suspension & wheels */}
          <path d="M-50 12 L-28 24 L0 12 L28 24 L50 12" stroke={SILVER_DARK} strokeWidth="3" fill="none" />
          {[-50, 0, 50].map((x) => (
            <circle key={x} cx={x} cy="28" r="12" fill="#2a2f38" stroke={SILVER} strokeWidth="2.5" />
          ))}
        </g>
      );
    case 'geophysics-lander':
      return (
        <g transform="translate(200 160)">
          {/* solar panels */}
          {[-1, 1].map((s) => (
            <g key={s}>
              <polygon
                points={Array.from({ length: 10 })
                  .map((_, i) => {
                    const a = (i / 10) * Math.PI * 2;
                    return `${s * 82 + Math.cos(a) * 46},${-6 + Math.sin(a) * 15}`;
                  })
                  .join(' ')}
                fill={`url(#panel-${uid})`}
                stroke={SILVER}
                strokeWidth="1.5"
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={s * 82} y1={-6} x2={s * 82 + Math.cos((i / 5) * Math.PI) * 46} y2={-6 + Math.sin((i / 5) * Math.PI) * 15} stroke="#6b8fd8" strokeWidth="0.7" />
              ))}
            </g>
          ))}
          {/* deck */}
          <rect x="-36" y="-12" width="72" height="22" rx="4" fill="#d8dde5" stroke={SILVER_DARK} />
          {/* legs */}
          {[-24, 24].map((x) => (
            <line key={x} x1={x} y1="10" x2={x * 1.5} y2="40" stroke={SILVER_DARK} strokeWidth="4" />
          ))}
          {/* robotic arm */}
          <path d="M28 -10 L58 -46 L92 -20" stroke={SILVER_DARK} strokeWidth="4" fill="none" strokeLinejoin="round" />
          {/* SEIS dome on ground */}
          <path d="M80 40 Q 98 10 116 40 Z" fill="#e8ecf2" stroke={SILVER_DARK} />
          {/* HP3 mole */}
          <rect x="-110" y="24" width="20" height="16" rx="2" fill={GOLD} />
          {/* seismic waves */}
          {[18, 30, 42].map((r) => (
            <path key={r} d={`M${98 - r} 52 Q 98 ${52 + r / 3} ${98 + r} 52`} fill="none" stroke="#ffb08a" strokeWidth="1.5" opacity={1 - r / 60} />
          ))}
        </g>
      );
    case 'big-rover':
      return (
        <g transform="translate(200 168)">
          {/* RTG */}
          <g transform="rotate(-28 -70 -16)">
            <rect x="-96" y="-28" width="34" height="24" rx="4" fill="#8a929f" />
            {[-26, -18, -10].map((y) => (
              <line key={y} x1="-100" x2="-58" y1={y} y2={y} stroke="#5d6470" strokeWidth="3" />
            ))}
          </g>
          {/* body */}
          <rect x="-60" y="-26" width="120" height="30" rx="4" fill="#e3e7ee" stroke={SILVER_DARK} strokeWidth="1.5" />
          <rect x="-50" y="-34" width="70" height="8" fill="#b9c0cb" />
          {/* mast */}
          <line x1="36" y1="-26" x2="36" y2="-104" stroke={SILVER_DARK} strokeWidth="5" />
          <rect x="16" y="-122" width="44" height="20" rx="4" fill="#eef1f5" stroke={SILVER_DARK} />
          <circle cx="28" cy="-112" r="4" fill="#1d2433" />
          <circle cx="48" cy="-112" r="4" fill="#1d2433" />
          <circle cx="38" cy="-118" r="2" fill="#f2603a" />
          {/* HGA */}
          <rect x="-34" y="-50" width="26" height="16" rx="2" fill={SILVER} transform="rotate(-12 -21 -42)" />
          {/* arm with turret */}
          <path d="M60 -6 L92 -24 L104 6" stroke={SILVER_DARK} strokeWidth="5" fill="none" strokeLinejoin="round" />
          <circle cx="106" cy="12" r="9" fill="#9aa3b0" stroke={SILVER_DARK} />
          {/* suspension & wheels */}
          <path d="M-56 8 L-30 22 L0 8 L30 22 L56 8" stroke={SILVER_DARK} strokeWidth="4" fill="none" />
          {[-56, 0, 56].map((x) => (
            <g key={x}>
              <circle cx={x} cy="28" r="16" fill="#2a2f38" stroke="#c3cad5" strokeWidth="3" />
              <circle cx={x} cy="28" r="5" fill="#8a929f" />
            </g>
          ))}
          {/* sample tube on ground */}
          <rect x="-130" y="38" width="22" height="6" rx="3" fill="#e8ecf2" transform="rotate(-8 -119 41)" />
        </g>
      );
    case 'helicopter':
      return (
        <g transform="translate(200 150)">
          {/* rotors */}
          <ellipse cx="0" cy="-58" rx="96" ry="7" fill="#c9cfd8" opacity="0.9" />
          <ellipse cx="0" cy="-42" rx="96" ry="7" fill="#aeb6c2" opacity="0.9" transform="rotate(8 0 -42)" />
          <rect x="-46" y="-80" width="92" height="12" fill={PANEL} stroke={SILVER} strokeWidth="1.5" />
          <line x1="0" y1="-68" x2="0" y2="-14" stroke={SILVER_DARK} strokeWidth="5" />
          {/* body */}
          <rect x="-20" y="-16" width="40" height="30" rx="4" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} />
          {/* legs */}
          {[-1, 1].map((s) => (
            <g key={s} stroke={SILVER_DARK} strokeWidth="3" strokeLinecap="round">
              <line x1={s * 14} y1="12" x2={s * 46} y2="48" />
              <line x1={s * 6} y1="12" x2={s * 22} y2="52" />
            </g>
          ))}
          {/* rotor blur arcs */}
          <path d="M-100 -64 Q 0 -86 100 -64" fill="none" stroke="#9fd3ff" strokeWidth="1" opacity="0.5" />
          <path d="M-100 -36 Q 0 -14 100 -36" fill="none" stroke="#9fd3ff" strokeWidth="1" opacity="0.5" />
          {/* dust swirl */}
          {[-70, -40, 40, 70].map((x, i) => (
            <circle key={x} cx={x} cy={64 + (i % 2) * 6} r={10 + (i % 2) * 6} fill="#d98a5a" opacity="0.25" />
          ))}
        </g>
      );
    case 'voyager':
      return (
        <g transform="translate(200 128)">
          {/* magnetometer boom */}
          <line x1="20" y1="10" x2="186" y2="-52" stroke="#b8c0cc" strokeWidth="1.8" />
          {/* RTG boom */}
          <line x1="-20" y1="18" x2="-120" y2="64" stroke={SILVER_DARK} strokeWidth="3" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={-112 + i * -10} y={52 + i * 5} width="12" height="18" rx="3" fill="#8a929f" transform={`rotate(-24 ${-106 + i * -10} ${61 + i * 5})`} />
          ))}
          {/* science boom */}
          <line x1="20" y1="22" x2="104" y2="70" stroke={SILVER_DARK} strokeWidth="3" />
          <rect x="96" y="62" width="22" height="14" rx="2" fill="#5a6270" />
          {/* bus */}
          <polygon points="-26,8 -14,-4 14,-4 26,8 14,22 -14,22" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} />
          {/* golden record */}
          <circle cx="0" cy="10" r="7" fill="#f3c74f" stroke="#a87b1a" />
          {/* dish */}
          <ellipse cx="0" cy="-22" rx="62" ry="16" fill={`url(#dish-${uid})`} stroke={SILVER_DARK} strokeWidth="1.5" />
          <line x1="0" y1="-22" x2="0" y2="-50" stroke={SILVER_DARK} strokeWidth="2" />
          <circle cx="0" cy="-52" r="3.5" fill={SILVER} />
        </g>
      );
    case 'pioneer':
      return (
        <g transform="translate(200 128)">
          <line x1="-10" y1="10" x2="-120" y2="58" stroke={SILVER_DARK} strokeWidth="3" />
          <line x1="10" y1="10" x2="120" y2="58" stroke={SILVER_DARK} strokeWidth="3" />
          {[-1, 1].map((s) => (
            <g key={s}>
              <rect x={s * 104 - 7} y="46" width="14" height="22" rx="3" fill="#8a929f" />
              <rect x={s * 124 - 7} y="56" width="14" height="22" rx="3" fill="#8a929f" />
            </g>
          ))}
          <line x1="0" y1="8" x2="0" y2="96" stroke="#b8c0cc" strokeWidth="1.8" />
          <polygon points="-22,4 -10,-6 10,-6 22,4 22,20 -22,20" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} />
          {/* plaque */}
          <rect x="-8" y="6" width="16" height="10" fill="#e8c75a" stroke="#a87b1a" />
          <ellipse cx="0" cy="-20" rx="56" ry="14" fill={`url(#dish-${uid})`} stroke={SILVER_DARK} strokeWidth="1.5" />
          <line x1="-30" y1="-24" x2="0" y2="-54" stroke={SILVER_DARK} strokeWidth="1.5" />
          <line x1="30" y1="-24" x2="0" y2="-54" stroke={SILVER_DARK} strokeWidth="1.5" />
          <circle cx="0" cy="-56" r="3.5" fill={SILVER} />
        </g>
      );
    case 'new-horizons':
      return (
        <g transform="translate(200 132)">
          {/* RTG */}
          <line x1="30" y1="22" x2="90" y2="50" stroke={SILVER_DARK} strokeWidth="4" />
          <rect x="84" y="40" width="34" height="18" rx="5" fill="#7d8796" transform="rotate(24 101 49)" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={90 + i * 7} y1="38" x2={86 + i * 7} y2="62" stroke="#5d6470" strokeWidth="2" />
          ))}
          {/* triangular gold body */}
          <polygon points="-50,40 50,40 0,-12" fill={`url(#gold-${uid})`} stroke={GOLD_DARK} strokeWidth="2" />
          <polygon points="-50,40 -34,52 34,52 50,40" fill="#b38630" />
          {/* LORRI telescope */}
          <circle cx="-26" cy="34" r="8" fill="#2a2f38" stroke={SILVER} />
          {/* dish */}
          <ellipse cx="0" cy="-14" rx="48" ry="12" fill={`url(#dish-${uid})`} stroke={SILVER_DARK} strokeWidth="1.5" />
          <line x1="0" y1="-14" x2="0" y2="-38" stroke={SILVER_DARK} strokeWidth="2" />
          <circle cx="0" cy="-40" r="3" fill={SILVER} />
        </g>
      );
    default:
      return null;
  }
}

function Scene({ destination, seed, uid }: { destination: Destination; seed: string; uid: string }) {
  const { stars, craters } = useMemo(() => {
    const rand = seeded(seed);
    const deep = destination === 'deep-space';
    return {
      stars: Array.from({ length: deep ? 90 : 55 }, () => ({ x: rand() * 400, y: rand() * (deep ? 250 : 150), r: rand() * 1.3 + 0.3, o: rand() * 0.7 + 0.3 })),
      craters: Array.from({ length: 9 }, () => ({ x: rand() * 400, y: 200 + rand() * 45, r: 4 + rand() * 14 })),
    };
  }, [destination, seed]);

  if (destination === 'mars') {
    return (
      <>
        <rect width="400" height="250" fill={`url(#marsSky-${uid})`} />
        <circle cx="330" cy="54" r="14" fill="#fff4e0" opacity="0.6" />
        <circle cx="330" cy="54" r="30" fill="#ffe2c2" opacity="0.15" />
        <path d="M0 170 Q 60 130 130 158 T 270 146 T 400 160 V250 H0Z" fill="#8a3a1f" opacity="0.85" />
        <path d="M0 196 Q 100 176 200 192 T 400 186 V250 H0Z" fill={`url(#marsGround-${uid})`} />
        {craters.slice(0, 6).map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y + 6} rx={c.r} ry={c.r / 3.2} fill="#6e2a14" opacity="0.5" />
        ))}
        {[40, 90, 300, 360].map((x, i) => (
          <ellipse key={x} cx={x} cy={222 + (i % 2) * 10} rx={6 + i} ry={3 + i / 2} fill="#5a2210" />
        ))}
      </>
    );
  }
  if (destination === 'moon') {
    return (
      <>
        <rect width="400" height="250" fill="#04050c" />
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
        ))}
        {/* Earth */}
        <circle cx="330" cy="50" r="18" fill={`url(#earth-${uid})`} />
        <path d="M318 44 q8 -6 14 2 q6 8 -6 10 z" fill="#3fa266" opacity="0.9" />
        <path d="M312 50 a18 18 0 0 0 36 0" fill="#000" opacity="0.35" />
        <path d="M0 186 Q 90 172 200 182 T 400 178 V250 H0Z" fill={`url(#moonGround-${uid})`} />
        {craters.map((c, i) => (
          <ellipse key={i} cx={c.x} cy={c.y} rx={c.r} ry={c.r / 3.4} fill="#5d6470" opacity="0.6" stroke="#9aa1ac" strokeWidth="0.6" />
        ))}
      </>
    );
  }
  return (
    <>
      <rect width="400" height="250" fill="#03040c" />
      <ellipse cx="90" cy="70" rx="160" ry="80" fill={`url(#nebula-${uid})`} />
      <ellipse cx="330" cy="200" rx="140" ry="70" fill={`url(#nebula2-${uid})`} />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />
      ))}
      <circle cx="54" cy="206" r="26" fill={`url(#planet-${uid})`} />
      <ellipse cx="54" cy="206" rx="44" ry="9" fill="none" stroke="#e5c07b" strokeWidth="2" opacity="0.6" transform="rotate(-14 54 206)" />
    </>
  );
}

function MissionArtBase({ id, hardware, destination, className, title }: MissionArtProps) {
  const uid = id.replace(/[^a-z0-9]/gi, '');
  return (
    <svg viewBox="0 0 400 250" className={className} role="img" aria-label={title ?? 'Illustration'} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6d27a" />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor={GOLD_DARK} />
        </linearGradient>
        <linearGradient id={`panel-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c4fa3" />
          <stop offset="1" stopColor="#14275a" />
        </linearGradient>
        <radialGradient id={`dish-${uid}`} cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#a7b0bd" />
        </radialGradient>
        <linearGradient id={`marsSky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1410" />
          <stop offset="0.55" stopColor="#a4583a" />
          <stop offset="1" stopColor="#e3a06f" />
        </linearGradient>
        <linearGradient id={`marsGround-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c0552d" />
          <stop offset="1" stopColor="#6e2a14" />
        </linearGradient>
        <linearGradient id={`moonGround-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8afba" />
          <stop offset="1" stopColor="#4b515c" />
        </linearGradient>
        <radialGradient id={`earth-${uid}`} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#9fd3ff" />
          <stop offset="1" stopColor="#1d4ea8" />
        </radialGradient>
        <radialGradient id={`nebula-${uid}`}>
          <stop offset="0" stopColor="#5b3cc4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#5b3cc4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`nebula2-${uid}`}>
          <stop offset="0" stopColor="#2f8cf0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2f8cf0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`planet-${uid}`} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#f6dfa8" />
          <stop offset="1" stopColor="#8a5a22" />
        </radialGradient>
      </defs>
      <Scene destination={destination} seed={id} uid={uid} />
      <Hardware kind={hardware} uid={uid} />
    </svg>
  );
}

export const MissionArt = memo(MissionArtBase);
