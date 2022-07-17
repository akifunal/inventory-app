import { authRouter, categoryRouter, productRouter } from './subroutes';
import { t } from './trpc';

// export const appRouter = t.mergeRouters(authRouter, exampleRouter);

/*eslint sort-keys: "error"*/
export const appRouter = t.router({
	auth: authRouter,
	category: categoryRouter,
	product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
