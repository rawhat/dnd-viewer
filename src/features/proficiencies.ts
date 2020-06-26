import proficiencies from "../data/5e-SRD-Proficiencies.json";

import { initialize } from "./db";

export { proficiencies };

export type proficiency = typeof proficiencies[0];

export const init = () => initialize<proficiency>('proficiencies', proficiencies);
