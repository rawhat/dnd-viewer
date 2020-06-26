import { init as initAbilityScores } from "./abilityScores";
import { abilityScore } from "./abilityScores";

import { init as initClasses } from "./classes";
import { classData } from "./classes";

import { init as initEquipment } from "./equipment";
import { equipment } from "./equipment";

import { init as initFeatures } from "./features";
import { feature } from "./features";

import { init as initLanguages } from "./languages";
import { language } from "./languages";

import { init as initLevels } from "./levels";
import { level } from "./levels";

import { init as initProficiencies } from "./proficiencies";
import { proficiency } from "./proficiencies";

import { init as initRaces } from "./races";
import { race } from "./races";

import { init as initSkills } from "./skills";
import { skill } from "./skills";

import { init as initSpellasting } from "./spellcasting";
import { spellcasting } from "./spellcasting";

import { init as initSpells } from "./spells";
import { spell } from "./spells";

import { init as initTraits } from "./traits";
import { trait } from "./traits";

import { Client } from "./db";

export interface NamedPath {
  name: string;
  url: string;
}

export interface Database {
  abilityScores: Client<abilityScore>;
  classes: Client<classData>;
  equipment: Client<equipment>;
  feature: Client<feature>;
  languages: Client<language>;
  levels: Client<level>;
  proficiencies: Client<proficiency>;
  races: Client<race>;
  skills: Client<skill>;
  spellCasting: Client<spellcasting>;
  spells: Client<spell>;
  traits: Client<trait>;
}

export async function setupData(): Promise<Database> {
  const datasets = {
    abilityScores: initAbilityScores(),
    classes: initClasses(),
    equipment: initEquipment(),
    feature: initFeatures(),
    languages: initLanguages(),
    levels: initLevels(),
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
