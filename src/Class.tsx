import * as React from "react";
import {useMemo} from "react";
import {useState} from "react";

import {select} from "./features/query";

import {ClassDetails} from "./ClassDetails";
import {SpellList} from "./SpellList";
import {useQuery} from "./useQuery";

export const Class = () => {
  const [selectedClass, setSelectedClass] = useState<string>();

  const selectClassData = useMemo(() =>
    select<'classes'>('*')
      .from('classes')
      .join('spells', (classRow, spellRow) =>
        spellRow.classes.some(({name}) => name === classRow.name)
      )
    , [])

  const [classNames] = useQuery<'classes'>(selectClassData);

  return (
    <div>
      {classNames && (
        <div>
          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            placeholder="Select a class"
            value={selectedClass}
          >
            {classNames.map(({name}) => (
              <option id={name} key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedClass && (
        <>
          <ClassDetails selectedClass={selectedClass} />
          <SpellList selectedClass={selectedClass} />
        </>
      )}
    </div>
  )
}
