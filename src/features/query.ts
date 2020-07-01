import {Database} from "./index";
import {DatabaseTables} from "./index";

type FilterFn<T> = (value: T) => boolean;

export interface Query<T extends keyof DatabaseTables, K extends keyof DatabaseTables[T]['row']> {
  source: keyof Database | undefined;
  from: (instance: T) => this;
  fields: K[] | "*";
  filters: FilterFn<DatabaseTables[T]['row']>[];
  joins: {
    [B in keyof DatabaseTables]: (
      left: Pick<DatabaseTables[T]['row'], K>,
      value: DatabaseTables[B]['row']
    ) => boolean
  };
  group: K | undefined;
  where: (fun: FilterFn<DatabaseTables[T]['row']>) => this;
  and: (...fns: FilterFn<DatabaseTables[T]['row']>[]) => this;
  join: <B extends keyof DatabaseTables>(
    table: B,
    to: (
      left: Pick<DatabaseTables[T]['row'], K>,
      value: DatabaseTables[B]['row']
    ) => boolean
  ) => this;
  groupBy: (key: K) => this;
  run: (instance: Database) => Promise<
    (Pick<DatabaseTables[T]['row'], K> | Query<T, K>['joins'])[]
  >;
}

export function select<
  T extends keyof DatabaseTables,
  K extends keyof DatabaseTables[T]['row'] = keyof DatabaseTables[T]['row'],
  >(fields: K[] | "*"): Query<T, K> {
  const query: Query<T, K> = {
    source: undefined,
    fields,
    filters: [],
    joins: {} as Query<T, K>['joins'],
    group: undefined,
    from: function (database) {
      query.source = database;
      return query;
    },
    where: function (fun) {
      query.filters.push(fun);
      return this;
    },
    and: function (...fns) {
      fns.forEach(fn => query.filters.push(fn));
      return this;
    },
    join: function (table, to) {
      query.joins[table] = to;
      return this;
    },
    groupBy: function (key) {
      query.group = key;
      return this;
    },
    run: async function (database) {
      console.time('run')
      const results = executeQuery(database, query)
        .then(results =>
          Promise.all(
            Object.entries(query.joins)
              .filter(
                <B extends keyof DatabaseTables>(
                  pair: [string, Function]
                ): pair is [B, (left: Pick<DatabaseTables[T]['row'], K>, row: DatabaseTables[B]['row']) => boolean] =>
                  database.hasOwnProperty(pair[0]) && pair[0] in database
              )
              .map(async ([join, to]) =>
                [join,
                  select('*')
                    .from(join)
                    .where(row => {
                      return results.some((result) => {
                        return to(result, row);
                      })
                    })
                    .run(database)
                ] as const
              )
          )
            .then(joiners =>
              results.reduce((acc, result) =>
                acc.concat(
                  joiners.reduce((res, [join, values]) => ({
                    ...res,
                    [join]: values
                  }), result)
                )
                , [] as Pick<DatabaseTables[T]['row'], K>[])
            )
        )

      console.timeEnd('run')
      return results;
    }
  }
  return query;
}

const executeQuery = async <
  T extends keyof DatabaseTables,
  K extends keyof DatabaseTables[T]['row']
>(db: Database, q: Query<T, K>): Promise<Pick<DatabaseTables[T]['row'], K>[]> => {
  if (!q.source) {
    throw new Error('')
  }
  const instance = db[q.source];
  const label = `query-${q.source}`
  console.time(label);

  const rows: DatabaseTables[T]['row'][] = [];
  await instance.iterate((value: DatabaseTables[T]['row']) => {
    if (q.filters.length === 0 || q.filters.every(filter => filter(value))) {
      rows.push(value);
    }
  })

  const fields: K[] | "*" = q.fields;

  if (fields === "*") {
    console.timeEnd(label)
    return rows;
  }
  const filteredRows = rows.map(row =>
    fields.reduce((acc, field) => ({...acc, [field]: row[field]}), {} as DatabaseTables[T]['row'])
  )
  console.timeEnd(label);
  return filteredRows;
}

