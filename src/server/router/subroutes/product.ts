import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';

import { createProductSchema, getProductByNameSchema } from '../../schema';
import { t } from '../trpc';

export const productRouter = t.router({
	getAll: t.procedure.query(async ({ ctx }) => {
		return await ctx.prisma.product.findMany({
			orderBy: {
				updatedAt: 'desc',
			},
		});
	}),
	getByName: t.procedure
		.input(getProductByNameSchema)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.product.findUnique({
				where: {
					name: input.name,
				},
			});
		}),
	create: t.procedure
		.input(createProductSchema)
		.mutation(async ({ ctx, input }) => {
			const { description, name, quantity, categoryName } = input;

			try {
				const product = await ctx.prisma.product.create({
					data: {
						name,
						description,
						quantity,
						category: {
							connectOrCreate: {
								where: {
									name: categoryName,
								},
								create: {
									name: categoryName,
								},
							},
						},
					},
				});

				return product;
			} catch (e) {
				if (e instanceof PrismaClientKnownRequestError) {
					if (e.code === 'P2002') {
						throw new TRPCError({
							code: 'CONFLICT',
							message: `${input.name} already exists`,
						});
					}
				}

				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Something went wrong',
				});
			}
		}),
	createOrUpdate: t.procedure
		.input(createProductSchema)
		.mutation(async ({ ctx, input }) => {
			const { description, name, quantity, categoryName } = input;

			const product = await ctx.prisma.product.upsert({
				where: { name },
				update: {
					name,
					description,
					quantity,
					category: {
						connectOrCreate: {
							where: {
								name: categoryName,
							},
							create: {
								name: categoryName,
							},
						},
					},
				},
				create: {
					name,
					description,
					quantity,
					category: {
						connectOrCreate: {
							where: {
								name: categoryName,
							},
							create: {
								name: categoryName,
							},
						},
					},
				},
			});

			return product;
		}),
});
