import * as React from "react";
import { useMemo } from "react";

import { spell } from "./features/spells";
import { select } from "./features/query";

import { SimpleTable } from "./Table";
import { TextInput } from "./Input";
import { useDebounce } from "./useDebounce";
import { useQuery } from "./useQuery";

interface SpellListProps {
  selectedClass: string;
}

const headers: {key: keyof spell, label: string}[] = [
  {key: "name", label: "Name"},
  {key: "casting_time", label: "Casting Time"},
  {key: "desc", label: "Description"},
  {key: "higher_level", label: "Higher Level"},
  {key: "range", label: "Range"},
  {key: "duration", label: "Duration"},
  {key: "concentration", label: "Concentration"},
  {key: "level", label: "Level"},
];

export const SpellList: React.FC<SpellListProps> = ({selectedClass}) => {
  const [filter, setFilter, filterValue] = useDebounce<string>(200);

  const selectSpells = useMemo(() =>
    select<spell>('*')
      .from('spells')
      .where(spell => spell.classes.some(({name}) => name === selectedClass))
      .where(spell =>
        filter
          ? spell.name.toLowerCase().search(filter.toLowerCase()) !== -1
          : true
      )
  , [filter, selectedClass])

  const [spells] = useQuery(selectSpells);

  if (!spells) {
    return null;
  }

  return (
    <>
      <span>
        <strong>Spell Name:  </strong>
        <TextInput
          onChange={setFilter}
          value={filterValue || ''}
        />
      </span>
      <SimpleTable
        headers={headers}
        rows={spells}
      />
    </>
  )
}
