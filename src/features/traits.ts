import traits from "../data/5e-SRD-Traits.json";

import { initialize } from "./db"

export { traits };

export type trait = typeof traits[0];

export interface Trait {
  table: 'traits';
  row: trait;
}

export const init = () => initialize<trait>('traits', traits);
