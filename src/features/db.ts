import * as lf from "localforage";

interface IndexedData {
  index: string | number;
}

export interface Client<T> {
  iterate: typeof lf['iterate'];
  list: () => Promise<T[]>;
  get: (key: string) => Promise<T>;
  set: (key: string, value: T) => Promise<T>;
  delete: (key: string) => Promise<void>;
}

export async function initialize<T extends IndexedData>(
  name: string,
  initialData?: T[]
): Promise<Client<T>> {
  const instance = lf.createInstance({name});

  const client: Client<T> = {
    iterate: instance.iterate,
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
  }

  if (initialData) {
    await Promise.all(
      initialData.map(data => client.set(data.index.toString(), data))
    )
  }

  return client;
}
