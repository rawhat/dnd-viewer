import spells from "../data/5e-SRD-Spells.json";

import { initialize } from "./db";

export { spells };

export type spell = typeof spells[0];

export interface Spell {
  table: 'spells';
  row: spell;
}

export const init = () => initialize<spell>('spells', spells);
