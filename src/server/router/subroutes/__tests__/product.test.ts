/**
 * Integration tests for the `product` router
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

describe('product router', () => {
	it('should get all products', async () => {
		// Arrange
		const caller = await getCaller();

		// Act
		// @ts-ignore:next-line
		const all = await caller.query('product.getAll');

		// Assert
		expect(all.length).toBeGreaterThan(2);
	});

	it('should create and get product', async () => {
		// Arrange
		const caller = await getCaller();

		const input: inferMutationInput<'product.create'> = {
			name: 'integration test keyboard',
			quantity: 150,
			categoryName: 'integration test keyboards',
		};

		// Act
		const post = await caller.mutation('product.create', input);
		const byName = await caller.query('product.getByName', {
			name: post.name,
		});

		// Assert
		expect(byName).toMatchObject(input);
	});

	it('should return error when product already exists', async () => {
		// Arrange
		const caller = await getCaller();

		const input: inferMutationInput<'product.create'> = {
			name: 'integration test mouse',
			quantity: 150,
			categoryName: 'integration test mouses',
		};

		// Act
		await caller.mutation('product.create', input);

		// Assert
		await expect(caller.mutation('product.create', input)).rejects.toThrow(
			'"integration test mouse" product already exists'
		);
	});

	it('should create or update product with createOrUpdate', async () => {
		// Arrange
		const caller = await getCaller();

		const input: inferMutationInput<'product.createOrUpdate'> = {
			name: 'integration test mouse',
			quantity: 150,
			categoryName: 'integration test mouses',
		};

		// Act
		const post = await caller.mutation('product.createOrUpdate', input);
		const byName = await caller.query('product.getByName', {
			name: post.name,
		});

		// Assert
		expect(byName).toMatchObject(input);
	});
});
