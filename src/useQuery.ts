import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { Query } from "./features/query";

import { dbContext } from "./dbContext";

export function useQuery<T, K extends keyof T = keyof T>(
  query?: Query<T, K>
): [Pick<T, K>[] | undefined, Error | undefined] {
  const [results, setResults] = useState();
  const [error, setError] = useState();
  const db = useContext(dbContext);

  useEffect(() => {
    setError(undefined);
    if (db && query?.source) {
      db[query.source].execute(query)
        .then(setResults)
        .catch(setError)
    }
  }, [db, query]);

  return [results, error];
}
