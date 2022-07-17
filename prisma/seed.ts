/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { categoryData, productData, userData } from '../mocks';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		});
		console.log(`Created user with name: ${user.email}`);
	}

	for (const c of categoryData) {
		const category = await prisma.category.upsert({
			where: { name: c.name },
			update: {},
			create: c,
		});
		console.log(`Created category with name: ${category.name}`);
	}

	for (const p of productData) {
		const { categoryName, ...rest } = p;
		const product = await prisma.product.upsert({
			where: { name: rest.name },
			update: {},
			create: {
				...rest,
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
		console.log(`Created product with name: ${product.name}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
