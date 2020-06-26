import levels from "../data/5e-SRD-Levels.json";

import { initialize } from "./db";

export { levels };

export type level = typeof levels[0];

export const init = () => initialize<level>('levels', levels);
