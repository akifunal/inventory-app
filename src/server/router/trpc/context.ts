import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import {
	type Session,
	unstable_getServerSession as getServerSession,
} from 'next-auth';
import { authOptions as nextAuthOptions } from '../../../pages/api/auth/[...nextauth]';
import { prisma } from '../../db/client';

interface CreateContextOptions {
	session: Session | null;
	prisma: PrismaClient;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async (opts: CreateContextOptions) => ({
	...opts,
});

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
	opts: trpcNext.CreateNextContextOptions
): Promise<Context> => {
	const session = await getServerSession(opts.req, opts.res, nextAuthOptions);

	return await createContextInner({ prisma, session });
};
