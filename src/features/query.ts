import * as lf from "localforage"

import { Database } from "./index";

type FilterFn<T> = (value: T) => boolean;

export interface Query<T, K extends keyof T> {
  source: keyof Database | undefined;
  from: (instance: keyof Database) => this;
  where: (fun: FilterFn<T>) => this;
  and: (...fns: FilterFn<T>[]) => this;
  run: (instance: typeof lf) => Promise<(Pick<T, K> | T)[]>;
}

export function select<T, K extends keyof T = keyof T>(fields: K[] | "*"): Query<T, K> {
  let source: keyof Database | undefined;
  const filters: FilterFn<T>[] = [];

  const query: Query<T, K> = {
    source,
    from: function(database: keyof Database) {
      query.source = database;
      return query;
    },
    where: function(fun: FilterFn<T>) {
      filters.push(fun);
      return this;
    },
    and: function(...fns: FilterFn<T>[]) {
      fns.forEach(fn => filters.push(fn));
      return this;
    },
    run: async function(instance) {
      const label = `query-${query.source}`
      console.time(label);

      const rows: T[] = [];
      await instance.iterate((value: T) => {
        if (filters.length === 0 || filters.every(filter => filter(value))) {
          rows.push(value);
        }
      })

      if (fields === "*") {
        console.timeEnd(label)
        return rows as T[];
      }
      const filteredRows = rows.map((row: T): Pick<T, K> => {
        let obj: Partial<Pick<T, K>> = {};
        fields.forEach(field => {
          obj[field] = row[field];
        });
        return obj as Pick<T, K>;
      })
      console.timeEnd(label);
      return filteredRows;
    }
  }
  return query;
}
