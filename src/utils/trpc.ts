// src/utils/trpc.ts
import { httpBatchLink, loggerLink } from '@trpc/client';
import { setupTRPC } from '@trpc/next';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import { NextPageContext } from 'next';
import superjson from 'superjson';
import type { AppRouter } from '../server/router';

const getBaseUrl = () => {
	// During client requests browser should use current path
	if (typeof window !== 'undefined') {
		return '';
	}

	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/**
 * Extend `NextPageContext` with meta data that can be picked up by `responseMeta()` when server-side rendering
 */
export interface SSRContext extends NextPageContext {
	/**
	 * Set HTTP Status code
	 * @example
	 * const utils = trpc.useContext();
	 * if (utils.ssrContext) {
	 *   utils.ssrContext.status = 404;
	 * }
	 */
	status?: number;
}

export const trpc = setupTRPC<AppRouter, SSRContext>({
	config() {
		return {
			transformer: superjson,
			links: [
				// adds pretty logs to your console in development and logs errors in production
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' &&
							opts.result instanceof Error),
				}),

				/**
				 * If you want to use SSR, you need to use the server's full URL
				 * @link https://trpc.io/docs/ssr
				 */
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: true,
	/**
	 * Set headers or status code when doing SSR
	 */
	responseMeta(opts) {
		const ctx = opts.ctx as SSRContext;

		if (ctx.status) {
			// If HTTP status set, propagate that
			return {
				status: ctx.status,
			};
		}

		const error = opts.clientErrors[0];
		if (error) {
			// Propagate http first error from API calls
			return {
				status: error.data?.httpStatus ?? 500,
			};
		}

		return {};
	},
});

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
	TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferQueryInput<
	TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureInput<AppRouter['_def']['queries'][TRouteKey]>;

export type inferMutationOutput<
	TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureOutput<AppRouter['_def']['mutations'][TRouteKey]>;

export type inferMutationInput<
	TRouteKey extends keyof AppRouter['_def']['mutations']
> = inferProcedureInput<AppRouter['_def']['mutations'][TRouteKey]>;
