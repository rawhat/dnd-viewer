import races from "../data/5e-SRD-Races.json";

import { initialize } from "./db";

export { races };

export type race = typeof races[0];

export interface Race {
  table: 'races';
  row: race;
}

export const init = () => initialize<race>('races', races);
