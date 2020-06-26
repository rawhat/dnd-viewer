import equipments from "../data/5e-SRD-Equipment.json";

import { initialize } from "./db";

export { equipments };

export type equipment = typeof equipments[0];

export const init = () => initialize<equipment>('equipment', equipments);
