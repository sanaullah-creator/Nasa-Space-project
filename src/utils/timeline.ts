import { missions } from '../data/missions';
import type { Destination, MissionTimelineEvent } from '../types';

export interface GlobalTimelineEvent extends MissionTimelineEvent {
  key: string;
  missionId: string;
  missionName: string;
  destination: Destination;
}

/** Every timeline event from every mission, sorted chronologically. */
export const allTimelineEvents: GlobalTimelineEvent[] = missions
  .flatMap((m) =>
    m.timeline.map((e, i) => ({
      ...e,
      key: `${m.id}-${i}`,
      missionId: m.id,
      missionName: m.shortName,
      destination: m.destination,
    })),
  )
  .sort((a, b) => a.date.localeCompare(b.date));

export const TIMELINE_START_YEAR = 1966;
export const TIMELINE_END_YEAR = 2026;

/** Missions that were operating (or present on their target) in a given year. */
export function missionsActiveIn(year: number) {
  return missions.filter((m) => m.activeFrom <= year && (m.activeTo === null || m.activeTo >= year));
}

export function eventsInYear(year: number) {
  return allTimelineEvents.filter((e) => Number(e.date.slice(0, 4)) === year);
}

export const DECADES = [1960, 1970, 1980, 1990, 2000, 2010, 2020];
