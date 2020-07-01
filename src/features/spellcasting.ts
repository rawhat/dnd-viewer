import spellcastings from "../data/5e-SRD-Spellcasting.json";

import { initialize } from "./db";

export { spellcastings };

export type spellcasting = typeof spellcastings[0];

export interface Spellcasting {
  table: 'spellcastings';
  row: spellcasting;
}

export const init = () => initialize<spellcasting>('spellcastings', spellcastings);
