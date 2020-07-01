import { init as initAbilityScores } from "./abilityScores";
import { AbilityScore } from "./abilityScores";
import { abilityScore } from "./abilityScores";

import { init as initClasses } from "./classes";
import { Class } from "./classes";
import { classData } from "./classes";

import { init as initEquipment } from "./equipment";
import { Equipment } from "./equipment";
import { equipment } from "./equipment";

import { init as initFeatures } from "./features";
import { Feature } from "./features";
import { feature } from "./features";

import { init as initLanguages } from "./languages";
import { Language } from "./languages";
import { language } from "./languages";

import { init as initLevels } from "./levels";
import { Level } from "./levels";
import { level } from "./levels";

import { init as initProficiencies } from "./proficiencies";
import { Proficiency } from "./proficiencies";
import { proficiency } from "./proficiencies";

import { init as initRaces } from "./races";
import { Race } from "./races";
import { race } from "./races";

import { init as initSkills } from "./skills";
import { Skill } from "./skills";
import { skill } from "./skills";

import { init as initSpellasting } from "./spellcasting";
import { Spellcasting } from "./spellcasting";
import { spellcasting } from "./spellcasting";

import { init as initSpells } from "./spells";
import { Spell } from "./spells";
import { spell } from "./spells";

import { init as initTraits } from "./traits";
import { Trait } from "./traits";
import { trait } from "./traits";

import { init as initPlayers } from "./players";
import { Player } from "./players";
import { player } from "./players";

import { Client } from "./db";

export interface NamedPath {
  name: string;
  url: string;
}

export interface Database {
  ability_scores: Client<abilityScore>;
  classes: Client<classData>;
  equipment: Client<equipment>;
  features: Client<feature>;
  languages: Client<language>;
  levels: Client<level>;
  players: Client<player>;
  proficiencies: Client<proficiency>;
  races: Client<race>;
  skills: Client<skill>;
  spellcastings: Client<spellcasting>;
  spells: Client<spell>;
  traits: Client<trait>;
}

type Table<T> = T extends Client<infer T> ? T : never;

export interface DatabaseTable<T extends keyof Database> {
  table: T;
  row: Table<Database[T]>;
}

export type Tables =
  | AbilityScore
  | Class
  | Equipment
  | Feature
  | Language
  | Level
  | Player
  | Proficiency
  | Race
  | Skill
  | Spellcasting
  | Spell
  | Trait

type DiscriminateUnion<T, K extends keyof T, V extends T[K]> =
  T extends Record<K, V> ? T : never;

type MapDiscriminatedUnion<T extends Record<K, string>, K extends keyof T> =
  { [V in T[K]]: DiscriminateUnion<T, K, V>};

export type DatabaseTables = MapDiscriminatedUnion<Tables, 'table'>;

export async function setupData(): Promise<Database> {
  const datasets = {
    abilityScores: initAbilityScores(),
    classes: initClasses(),
    equipment: initEquipment(),
    feature: initFeatures(),
    languages: initLanguages(),
    levels: initLevels(),
    players: initPlayers(),
    proficiencies: initProficiencies(),
    races: initRaces(),
    skills: initSkills(),
    spellCasting: initSpellasting(),
    spells: initSpells(),
    traits: initTraits(),
  }

  const instances = await Promise.all(
    Object.entries(datasets)
      .map(async ([key, promise]) =>
        [key, await promise]
      )
  )

  return Object.fromEntries(instances);
}
