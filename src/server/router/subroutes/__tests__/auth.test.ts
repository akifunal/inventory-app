/**
 * Integration tests for the `auth` router
 */
import { prisma } from '@/server/db/client';
import { CreateContextOptions } from '@/server/router/trpc/context';
import { appRouter } from '@router';
import { sessionMock } from 'mocks';
import { Session } from 'next-auth';

// TODO fix this when tRpc is updated for testing
const createContextInner = async (opts: CreateContextOptions) => ({
	...opts,
});

const getCaller = async (sessionObj?: Session | null) => {
	sessionObj = sessionObj || null;

	const ctx = await createContextInner({
		session: sessionObj,
		prisma: prisma,
	});
	return appRouter.createCaller(ctx);
};

describe('auth router', () => {
	it('should return a session ', async () => {
		// Arrange
		const caller = await getCaller(sessionMock);
		// Act
		// @ts-ignore:next-line
		const session = await caller.query('auth.getSession');

		// Assert
		expect(session).toEqual(sessionMock);
	});

	it('should return an error when the session is not found', async () => {
		// Arrange
		const caller = await getCaller();

		// Act
		const expectedErrorMessage = 'UNAUTHORIZED';

		// @ts-ignore:next-line
		// Assert
		await expect(caller.query('auth.getSecretMessage')).rejects.toThrow(
			expectedErrorMessage
		);
	});

	it('should return a secret message when logged in ', async () => {
		// Arrange
		const caller = await getCaller(sessionMock);

		// Act
		// @ts-ignore:next-line
		const message = await caller.query('auth.getSecretMessage');

		// Assert
		expect(message).toBe(
			'You are logged in and can see this secret message!'
		);
	});
});
