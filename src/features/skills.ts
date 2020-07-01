import skills from "../data/5e-SRD-Skills.json";

import { initialize } from "./db";

export { skills };

export type skill = typeof skills[0];

export interface Skill {
  table: 'skills';
  row: skill;
}

export const init = () => initialize<skill>('skills', skills);
