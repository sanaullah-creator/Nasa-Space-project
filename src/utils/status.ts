import type { Destination, MissionStatus, TimelineEventType } from '../types';

export interface StatusMeta {
  label: string;
  description: string;
  /** Tailwind classes for the badge */
  badge: string;
  /** Hex color for SVG markers */
  color: string;
}

export const STATUS_META: Record<MissionStatus, StatusMeta> = {
  active: {
    label: 'Active',
    description: 'Still operating and returning data to Earth.',
    badge: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/40',
    color: '#34d399',
  },
  'mission-ended': {
    label: 'Mission ended',
    description: 'NASA has formally ended the mission.',
    badge: 'bg-orange-500/15 text-orange-300 ring-orange-400/40',
    color: '#fb923c',
  },
  inactive: {
    label: 'Inactive',
    description: 'Switched off — though some passive parts may still be used.',
    badge: 'bg-amber-500/15 text-amber-200 ring-amber-300/40',
    color: '#fcd34d',
  },
  silent: {
    label: 'Silent',
    description: 'No signal received for years; the spacecraft still exists.',
    badge: 'bg-slate-400/15 text-slate-300 ring-slate-300/40',
    color: '#94a3b8',
  },
  'left-behind': {
    label: 'Intentionally left behind',
    description: 'Deliberately left in place by astronauts after use.',
    badge: 'bg-sky-500/15 text-sky-300 ring-sky-400/40',
    color: '#38bdf8',
  },
};

export const TRAVELLING_META: StatusMeta = {
  label: 'Still travelling',
  description: 'Still moving outward through space.',
  badge: 'bg-violet-500/15 text-violet-300 ring-violet-400/40',
  color: '#a78bfa',
};

export const DESTINATION_META: Record<Destination, { label: string; color: string; gradient: string }> = {
  moon: { label: 'Moon', color: '#cbd5e1', gradient: 'from-slate-300/30 to-slate-500/5' },
  mars: { label: 'Mars', color: '#f97350', gradient: 'from-orange-500/30 to-red-700/5' },
  'deep-space': { label: 'Deep Space', color: '#818cf8', gradient: 'from-indigo-400/30 to-violet-700/5' },
};

export const EVENT_META: Record<TimelineEventType, { label: string; color: string }> = {
  launch: { label: 'Launch', color: '#60a5fa' },
  landing: { label: 'Landing', color: '#f97350' },
  discovery: { label: 'Discovery', color: '#34d399' },
  event: { label: 'Milestone', color: '#fbbf24' },
  end: { label: 'Mission ending', color: '#94a3b8' },
};
