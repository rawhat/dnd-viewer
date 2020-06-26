import * as React from "react";
import { useMemo } from "react";

import { classData } from "./features/classes";
import { select } from "./features/query";

import {
  SimpleTable,
  TableBody,
  TableDataCell,
  TableRow,
  Table
} from "./Table";

import { Proficiencies } from "./Proficiencies"
import { useQuery } from "./useQuery";

interface ClassDetailsProps {
  selectedClass: string;
}

export const ClassDetails: React.FC<ClassDetailsProps> = ({selectedClass}) => {
  const selectClassDetails = useMemo(() =>
    select<classData>('*')
      .from('classes')
      .where(({name}) => name === selectedClass)
  , [selectedClass]);

  const [classDetailsRow] = useQuery<classData>(selectClassDetails);
  const classDetails = classDetailsRow ? classDetailsRow[0] : undefined;

  if (!classDetails) {
    return null;
  }

  return (
    <div>
      <div>
        <strong>Details</strong>
        <Table>
          <TableBody>
            <TableRow>
              <TableDataCell>Name</TableDataCell>
              <TableDataCell>{classDetails.name}</TableDataCell>
            </TableRow>
            <TableRow>
              <TableDataCell>Hit Die</TableDataCell>
              <TableDataCell>{classDetails.hit_die}</TableDataCell>
            </TableRow>
          </TableBody>
        </Table>
        <SimpleTable
          headers={[{label: "Proficiency", key: "name"}]}
          rows={classDetails.proficiencies}
        />
        <SimpleTable
          headers={[{label: "Saving Throws", key: "name"}]}
          rows={classDetails.saving_throws}
        />
        {classDetails.proficiency_choices.map(pc => (
          <Proficiencies
            key={`pc-${pc.from.join(',')}`}
            proficiencyChoice={pc}
          />
        ))}
      </div>
    </div>
  )
}
