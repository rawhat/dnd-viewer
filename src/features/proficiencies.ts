import proficiencies from "../data/5e-SRD-Proficiencies.json";

import { initialize } from "./db";

export { proficiencies };

export type proficiency = typeof proficiencies[0];

export interface Proficiency {
  table: 'proficiencies';
  row: proficiency;
}

export const init = () => initialize<proficiency>('proficiencies', proficiencies);
