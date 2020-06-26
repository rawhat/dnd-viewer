import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { select } from "./features/query";
import { setupData } from "./features";

import { dbContext } from "./dbContext";

export const DbProvider: React.FC = ({children}) => {
  const [db, setDb] = useState();

  useEffect(() => {
    setupData().then(database => {
      setDb(database);

      // DEBUG
      (window as any).db = database;
      (window as any).query = select;
    });
  }, []);

  const {Provider} = dbContext;
  return (
    <Provider value={db}>
      {children}
    </Provider>
  )
}
