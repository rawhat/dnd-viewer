import * as React from "react";

export const Table: React.FC = props => (
  <table>{props.children}</table>
)

export const TableHeader: React.FC = props => (
  <thead>{props.children}</thead>
)

export const TableBody: React.FC = props => (
  <tbody>{props.children}</tbody>
)

export const TableRow: React.FC = props => (
  <tr>{props.children}</tr>
)

export const TableDataCell: React.FC = props => (
  <td>{props.children}</td>
)

interface SimpleTableProps<T> {
  headers: {
    key: keyof T;
    label: string;
  }[];
  rows: T[];
}

export const SimpleTable = <T,>(
  {headers, rows}: SimpleTableProps<T>
) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map(({key, label}) => (
            <TableDataCell key={`${key}-${label}`}>
              <strong>{label}</strong>
            </TableDataCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, id) => (
          <TableRow key={`row-${id}`}>
            {headers.map(({key}) => (
              <TableDataCell key={`row-${id}-${key}`}>
                {row[key]}
              </TableDataCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
