import * as React from "react";
import { useMemo } from "react";
import { useState } from "react";

import { classData } from "./features/classes";
import { select } from "./features/query";

import { ClassDetails } from "./ClassDetails";
import { useQuery } from "./useQuery";

export const Class = () => {
  const [selectedClass, setSelectedClass] = useState<string>();

  const selectNames = useMemo(() =>
    select<classData, 'name'>(['name'])
      .from('classes')
  , [])

  const [classNames, _nameError] = useQuery<classData, 'name'>(selectNames);
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
      <ClassDetails selectedClass={selectedClass} />
    </div>
  )
}
