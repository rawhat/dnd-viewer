import * as lf from "localforage";

import { Query } from "./query";

interface IndexedData {
  index: string | number;
}

export interface Client<T> {
  list: () => Promise<T[]>;
  get: (key: string) => Promise<T>;
  set: (key: string, value: T) => Promise<T>;
  delete: (key: string) => Promise<void>;
  execute: <T, K extends keyof T>(query: Query<T, K>) => Promise<Pick<T, K>[]>;
}

export async function initialize<T extends IndexedData>(
  name: string,
  initialData?: T[]
): Promise<Client<T>> {
  const instance = lf.createInstance({name});

  const client: Client<T> = {
    list: async () => {
      let results: T[] = [];
      await instance.iterate((value: T) => {
        results.push(value)
      });
      return results;
    },
    get: (key) => instance.getItem(key),
    set: (key, value) => instance.setItem(key, value),
    delete: (key) => instance.removeItem(key),
    execute: (query) => query.run(instance),
  }

  if (initialData) {
    await Promise.all(
      initialData.map(data => client.set(data.index.toString(), data))
    )
  }

  return client;
}
