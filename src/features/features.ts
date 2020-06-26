import features from "../data/5e-SRD-Features.json";

import { initialize } from "./db";

export { features };

export type feature = typeof features[0];

export const init = () => initialize<feature>('features', features);
