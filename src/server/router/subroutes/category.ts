import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';

import { createCategorySchema, getCategoryByNameSchema } from '../../schema';
import { t } from '../trpc';

export const categoryRouter = t.router({
	getAll: t.procedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			orderBy: {
				name: 'asc',
			},
		});
	}),
	getByName: t.procedure
		.input(getCategoryByNameSchema)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.category.findUnique({
				where: {
					name: input.name,
				},
			});
		}),
	create: t.procedure
		.input(createCategorySchema)
		.mutation(async ({ ctx, input }) => {
			const { name } = input;

			try {
				const product = await ctx.prisma.category.create({
					data: {
						name,
					},
				});

				return product;
			} catch (e) {
				if (e instanceof PrismaClientKnownRequestError) {
					if (e.code === 'P2002') {
						throw new TRPCError({
							code: 'CONFLICT',
							message: `"${input.name}" category already exists`,
						});
					}
				}

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}
		}),
});
