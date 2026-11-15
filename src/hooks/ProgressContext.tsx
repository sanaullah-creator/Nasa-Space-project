import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { achievements } from '../data/achievements';
import { missions } from '../data/missions';
import type { Achievement, AchievementId, ProgressState } from '../types';
import { readStorage, writeStorage, removeStorage } from '../utils/storage';
import { useAuth } from './AuthContext';

/** Per-user keys: `progress` for guests, `u:<id>:progress` for signed-in users. */
const scoped = (userId: string | null, base: string) => (userId ? `u:${userId}:${base}` : base);

const EMPTY: ProgressState = {
  viewedMissions: [],
  markersClicked: [],
  timelineEventsOpened: [],
  timeMachineYears: [],
  storiesHeard: [],
  unlocked: {},
};

interface ProgressContextValue {
  progress: ProgressState;
  isUnlocked: (id: AchievementId) => boolean;
  unlock: (id: AchievementId) => void;
  recordMissionView: (missionId: string) => void;
  recordMarkerClick: (markerKey: string) => void;
  recordTimelineEvent: (eventKey: string) => void;
  recordTimeMachineYear: (year: number) => void;
  recordStoryHeard: (missionId: string) => void;
  recordQuizResult: (score: number, total: number) => void;
  resetProgress: () => void;
  /** Most recent unlocked achievement waiting to be shown as a toast */
  toastQueue: Achievement[];
  dismissToast: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const idsFor = (dest: string) => missions.filter((m) => m.destination === dest).map((m) => m.id);
const MOON_IDS = idsFor('moon');
const MARS_IDS = idsFor('mars');
const DEEP_IDS = idsFor('deep-space');

const addUnique = <T,>(list: T[], item: T) => (list.includes(item) ? list : [...list, item]);

/** Pure function: which achievements should be unlocked for this progress state? */
export function evaluateAchievements(p: ProgressState, signedIn = false): AchievementId[] {
  const earned: AchievementId[] = [];
  const viewed = new Set(p.viewedMissions);
  if (viewed.size >= 1) earned.push('first-contact');
  if (MOON_IDS.every((id) => viewed.has(id))) earned.push('moon-explorer');
  if (MARS_IDS.every((id) => viewed.has(id))) earned.push('mars-explorer');
  if (DEEP_IDS.every((id) => viewed.has(id))) earned.push('deep-space-navigator');
  if (p.timelineEventsOpened.length >= 5 || p.timeMachineYears.length >= 5) earned.push('mission-historian');
  if (p.markersClicked.length >= 5) earned.push('cartographer');
  if (p.storiesHeard.length >= 1) earned.push('storyteller');
  if (signedIn) earned.push('crew-member');
  return earned;
}

/** Wrap with `key={userId}` so switching accounts loads that user's own progress. */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const STORAGE_KEY = scoped(userId, 'progress');
  const [progress, setProgress] = useState<ProgressState>(() => ({ ...EMPTY, ...readStorage(STORAGE_KEY, EMPTY) }));
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const prevUnlocked = useRef<Set<string>>(new Set(Object.keys(progress.unlocked)));

  // Persist + auto-evaluate activity-based achievements.
  useEffect(() => {
    const due = evaluateAchievements(progress, Boolean(userId)).filter((id) => !progress.unlocked[id]);
    if (due.length) {
      const now = new Date().toISOString();
      setProgress((p) => ({ ...p, unlocked: { ...p.unlocked, ...Object.fromEntries(due.map((id) => [id, now])) } }));
      return;
    }
    writeStorage(STORAGE_KEY, progress);

    // queue toasts for newly unlocked achievements
    const newly = Object.keys(progress.unlocked).filter((id) => !prevUnlocked.current.has(id));
    if (newly.length) {
      newly.forEach((id) => prevUnlocked.current.add(id));
      const found = achievements.filter((a) => newly.includes(a.id));
      setToastQueue((q) => [...q, ...found]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, userId]);

  const unlock = useCallback((id: AchievementId) => {
    setProgress((p) => (p.unlocked[id] ? p : { ...p, unlocked: { ...p.unlocked, [id]: new Date().toISOString() } }));
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isUnlocked: (id) => Boolean(progress.unlocked[id]),
      unlock,
      recordMissionView: (missionId) =>
        setProgress((p) => (p.viewedMissions.includes(missionId) ? p : { ...p, viewedMissions: addUnique(p.viewedMissions, missionId) })),
      recordMarkerClick: (key) =>
        setProgress((p) => (p.markersClicked.includes(key) ? p : { ...p, markersClicked: addUnique(p.markersClicked, key) })),
      recordTimelineEvent: (key) =>
        setProgress((p) =>
          p.timelineEventsOpened.includes(key) ? p : { ...p, timelineEventsOpened: addUnique(p.timelineEventsOpened, key) },
        ),
      recordTimeMachineYear: (year) =>
        setProgress((p) => (p.timeMachineYears.includes(year) ? p : { ...p, timeMachineYears: addUnique(p.timeMachineYears, year) })),
      recordStoryHeard: (missionId) =>
        setProgress((p) => (p.storiesHeard.includes(missionId) ? p : { ...p, storiesHeard: addUnique(p.storiesHeard, missionId) })),
      recordQuizResult: (score, total) => {
        const pct = total ? score / total : 0;
        unlock('quiz-cadet');
        if (pct >= 0.8) unlock('space-knowledge-expert');
        if (score === total && total > 0) unlock('perfect-orbit');
      },
      resetProgress: () => {
        removeStorage(['progress', 'quiz-progress', 'quiz-history', 'patch'].map((k) => scoped(userId, k)));
        prevUnlocked.current = new Set();
        setToastQueue([]);
        setProgress(EMPTY);
      },
      toastQueue,
      dismissToast: () => setToastQueue((q) => q.slice(1)),
    }),
    [progress, toastQueue, unlock, userId],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>');
  return ctx;
}
