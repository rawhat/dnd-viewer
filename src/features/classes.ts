import classes from "../data/5e-SRD-Classes.json";

import { initialize } from "./db";

export { classes }

export type classData = typeof classes[0];

export interface Class {
  table: 'classes';
  row: classData;
}

export const init = () => initialize<classData>('classes', classes);
