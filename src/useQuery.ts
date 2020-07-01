import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { DatabaseTables } from "./features";
import { Query } from "./features/query";

import { dbContext } from "./dbContext";

export function useQuery<T extends keyof DatabaseTables, K extends keyof DatabaseTables[T]['row'] = keyof DatabaseTables[T]['row']>(
  query?: Query<T, K>
): [Pick<DatabaseTables[T]['row'], K>[] | undefined, Error | undefined] {
  const [results, setResults] = useState();
  const [error, setError] = useState();
  const db = useContext(dbContext);

  useEffect(() => {
    setError(undefined);
    if (db && query?.source) {
      query.run(db)
        .then(setResults)
        .catch(setError)
    }
  }, [db, query]);

  return [results, error];
}
