/* ------------------------------------------------------------------
 * Core data types for COSMIC LOST & FOUND
 * Mission content lives in src/data — UI components only consume these types.
 * ------------------------------------------------------------------ */

export type Destination = 'moon' | 'mars' | 'deep-space';

/**
 * Primary status of a piece of hardware.
 * - active:        operating and returning data to Earth today
 * - mission-ended: NASA formally ended the mission
 * - inactive:      hardware switched off / no longer operating (parts may still be used passively)
 * - silent:        no signal has been received for years; the spacecraft still exists
 * - left-behind:   intentionally left in place by astronauts after use
 * "Still travelling" is tracked separately with `travelling: true`, because a spacecraft
 * can be both active (Voyager 1) or silent (Pioneer 10) AND still travelling.
 */
export type MissionStatus = 'active' | 'mission-ended' | 'inactive' | 'silent' | 'left-behind';

export type HardwareKind =
  | 'descent-stage'
  | 'lunar-rover'
  | 'instruments'
  | 'lander'
  | 'micro-rover'
  | 'mer-rover'
  | 'geophysics-lander'
  | 'big-rover'
  | 'helicopter'
  | 'voyager'
  | 'pioneer'
  | 'new-horizons';

export type TimelineEventType = 'launch' | 'landing' | 'discovery' | 'event' | 'end';

export interface MissionTimelineEvent {
  /** ISO date YYYY-MM-DD */
  date: string;
  type: TimelineEventType;
  title: string;
  description: string;
}

export interface SurfaceSite {
  /** Planetocentric latitude, degrees (+N / −S) */
  lat: number;
  /** East longitude, degrees in the range −180..180 */
  lon: number;
  label: string;
  /** Short explanation shown in the map popup */
  note: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface MissionImage {
  /** Full NASA URL of the photo (loaded if no local copy exists) */
  src: string;
  /** Second NASA URL to try if the first fails */
  fallbackSrc?: string;
  /** Local copy in /public (created by `npm run images`), tried first */
  localSrc?: string;
  /** NASA image ID, e.g. PIA01122 or as11-40-5927 */
  nasaId?: string;
  alt: string;
  credit: string;
  sourceUrl: string;
}

export interface Mission {
  id: string;
  name: string;
  shortName: string;
  destination: Destination;
  status: MissionStatus;
  /** True if the spacecraft is still moving outward through space */
  travelling: boolean;
  statusNote: string;
  hardware: HardwareKind;
  /** Program / mission family, e.g. "Apollo 15–17" */
  program: string;
  tagline: string;
  /** ISO date of (first) launch */
  launchDate: string;
  /** Human-readable operating period */
  operations: string;
  /** Year operations started / ended (ended = null if still active) */
  activeFrom: number;
  activeTo: number | null;
  summary: string;
  whatItWas: string;
  whySent: string;
  objectives: string[];
  story: string;
  discoveries: string[];
  achievements: string[];
  challenges: string[];
  ending: string;
  whereNow: string;
  whyItMatters: string;
  /** Surface locations (Moon / Mars only). Coordinates are approximate. */
  sites?: SurfaceSite[];
  /** Deep-space distance info */
  deepSpace?: {
    distance: string;
    /** Approximate distance from Earth in AU used for the schematic chart */
    au: number;
    asOf: string;
    heading: string;
    region: string;
  };
  /** CREATIVE first-person story — not a real transmission */
  lastMessage: string;
  facts: string[];
  timeline: MissionTimelineEvent[];
  sources: SourceLink[];
  image?: MissionImage;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  missionId?: string;
}

export interface QuizProgress {
  currentIndex: number;
  /** answer index chosen per question id */
  answers: Record<string, number>;
  completed: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  date: string;
}

export type AchievementId =
  | 'first-contact'
  | 'moon-explorer'
  | 'mars-explorer'
  | 'deep-space-navigator'
  | 'mission-historian'
  | 'cartographer'
  | 'quiz-cadet'
  | 'space-knowledge-expert'
  | 'perfect-orbit'
  | 'patch-designer'
  | 'storyteller'
  | 'crew-member';

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  howToEarn: string;
  icon: 'moon' | 'mars' | 'orbit' | 'clock' | 'map' | 'brain' | 'trophy' | 'star' | 'palette' | 'radio' | 'rocket' | 'user';
  color: string;
}

export interface ProgressState {
  viewedMissions: string[];
  markersClicked: string[];
  timelineEventsOpened: string[];
  timeMachineYears: number[];
  storiesHeard: string[];
  unlocked: Partial<Record<AchievementId, string>>;
}

export interface PatchDesign {
  shape: 'circle' | 'shield' | 'hexagon';
  theme: 'mars' | 'moon' | 'deep';
  emblem: 'rocket' | 'rover' | 'planet' | 'satellite' | 'helicopter';
  missionName: string;
  explorerName: string;
  stars: number;
}

/* ---------------- Accounts (stored in this browser only) ---------------- */

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  /** SHA-256 hash of salt + password (never the plain password) */
  passwordHash: string;
  salt: string;
  avatarColor: string;
  favoriteMissionId: string | null;
  bio: string;
  createdAt: string;
  lastLoginAt: string;
}

/** User data that is safe to expose to components (no password fields). */
export type PublicUser = Omit<StoredUser, 'passwordHash' | 'salt'>;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  responsibilities: string[];
  skills: string[];
  accent: string;
}
