import { missions } from './missions';

export interface DidYouKnowFact {
  text: string;
  missionId: string;
  missionName: string;
}

/** All "Did You Know?" facts, gathered from mission records so content stays in one place. */
export const didYouKnowFacts: DidYouKnowFact[] = missions.flatMap((m) =>
  m.facts.map((text) => ({ text, missionId: m.id, missionName: m.shortName })),
);
