// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from '../context';

import { authRouter } from './auth';
import { exampleRouter } from './example';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', exampleRouter)
	.merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
