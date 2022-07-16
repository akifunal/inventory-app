import { t } from './trpc';

import { authRouter } from './subroutes/auth';
import { exampleRouter } from './subroutes/example';

// export const appRouter = t.mergeRouters(authRouter, exampleRouter);

/*eslint sort-keys: "error"*/
export const appRouter = t.router({
	auth: authRouter,
	example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
