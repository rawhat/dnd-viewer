import skills from "../data/5e-SRD-Skills.json";

import { initialize } from "./db";

export { skills };

export type skill = typeof skills[0];

export const init = () => initialize<skill>('skills', skills);
