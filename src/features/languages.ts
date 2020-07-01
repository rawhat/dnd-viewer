import languages from "../data/5e-SRD-Languages.json";

import { initialize } from "./db";

export { languages };

export type language = typeof languages[0];

export interface Language {
  table: 'languages';
  row: language;
}

export const init = () => initialize<language>('languages', languages);
