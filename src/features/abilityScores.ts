import abilityScores from "../data/5e-SRD-Ability-Scores.json";

import { initialize } from "./db";

export { abilityScores };

export type abilityScore = typeof abilityScores[0];

export interface AbilityScore {
  table: 'ability_scores';
  row: abilityScore;
}

export const init = () => initialize<abilityScore>('ability_scores', abilityScores);
