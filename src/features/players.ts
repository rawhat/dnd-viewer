import { initialize } from "./db";

interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface player {
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

export interface Player {
  table: 'players';
  row: player;
}

export const init = () => initialize<player>('players');
