import { authRouter, categoryRouter, productRouter } from './subroutes';
import { t } from './trpc';

// Alternative way to create root router
// export const appRouter = t.mergeRouters(authRouter, exampleRouter);

/**
 * Root router of tRPC-backend
 */
/*eslint sort-keys: "error"*/
export const appRouter = t.router({
	auth: authRouter,
	category: categoryRouter,
	product: productRouter,
});

export type AppRouter = typeof appRouter;
