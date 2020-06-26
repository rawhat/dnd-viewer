import * as React from "react";
import {useCallback} from "react";
import {useState} from "react";

import {classes} from "./features/classes";

import {
  Table,
  TableDataCell,
  TableRow,
  TableBody,
} from "./Table"
import {Checkbox} from "./Input"

export interface ProficienciesProps {
  proficiencyChoice: typeof classes[0]['proficiency_choices'][0];
}

export function Proficiencies(
  {proficiencyChoice: {
    choose,
    from
  }}: ProficienciesProps
) {
  const [choices, setChoices] = useState<string[]>([]);
  const toggleChoice = useCallback((choice: string) => {
    if (choices.includes(choice)) {
      setChoices(choices.filter(c => c !== choice));
    } else if (choices.length < choose) {
      setChoices(choices.concat(choice));
    }
  }, [choices, choose])
  return (
    <>
      <strong>Select {choose} from the following</strong>
      <Table>
        <TableBody>
          {from.map(({name, url}) => (
            <TableRow key={url}>
              <TableDataCell>
                <Checkbox
                  checked={choices.includes(url)}
                  onChange={() => toggleChoice(url)}
                />
              </TableDataCell>
              <TableDataCell>
                {name}
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
