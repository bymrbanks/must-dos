// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { mustdoRouter } from "./mustdo";
import { authRouter } from "./auth";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("mustdo.", mustdoRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
