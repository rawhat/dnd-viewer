import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { dbContext } from "./dbContext";
import { setupData } from "./features";

export const DbProvider: React.FC = ({children}) => {
  const [db, setDb] = useState();

  useEffect(() => {
    setupData().then(setDb);
  }, []);

  const {Provider} = dbContext;
  return (
    <Provider value={db}>
      {children}
    </Provider>
  )
}
