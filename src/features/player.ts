import { initialize } from "./db";

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

interface Player {
  alignment: string;
  attributes: Attributes;
  class: string;
  index: string;
  level: number;
  name: string;
  race: string;
  known_spells: string[];
  memorized_spells: string[];
}

export const init = () => initialize<Player>('players');
