import { createContext } from "react";

import { Database } from "./features";

export const dbContext = createContext<Database | null>(null);
