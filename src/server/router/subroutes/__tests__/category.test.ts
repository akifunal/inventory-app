/**
 * Integration tests for the `category` router
 */
import { prisma } from '@/server/db/client';
import { CreateContextOptions } from '@/server/router/trpc/context';
import { inferMutationInput } from '@/utils';
import { appRouter } from '@router';

// TODO fix this when tRpc is updated for testing
const createContextInner = async (opts: CreateContextOptions) => ({
	...opts,
});

const getCaller = async () => {
	const ctx = await createContextInner({
		session: null,
		prisma: prisma,
	});
	return appRouter.createCaller(ctx);
};

describe('category router', () => {
	it('should get all categories', async () => {
		// Arrange
		const caller = await getCaller();

		// Act
		// @ts-ignore:next-line
		const all = await caller.query('category.getAll');

		// Assert
		expect(all.length).toBeGreaterThan(2);
	});

	it('should create and get category', async () => {
		// Arrange
		const caller = await getCaller();

		const input: inferMutationInput<'category.create'> = {
			name: 'integration test category name',
		};

		// Act
		const post = await caller.mutation('category.create', input);
		const byId = await caller.query('category.getByName', {
			name: post.name,
		});

		// Assert
		expect(byId).toMatchObject(input);
	});

	it('should return error when category already exists', async () => {
		// Arrange
		const caller = await getCaller();

		const input: inferMutationInput<'category.create'> = {
			name: 'integration tests',
		};

		// Act
		await caller.mutation('category.create', input);

		// Assert
		await expect(caller.mutation('category.create', input)).rejects.toThrow(
			'"integration tests" category already exists'
		);
	});
});
