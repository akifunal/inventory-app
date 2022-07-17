/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import { CreateProductInput } from 'src/server/schema';

const prisma = new PrismaClient();

type UserDataInput = {
	name: string | null | undefined;
	email: string | undefined;
};

const userData: UserDataInput[] = [
	{
		name: 'test user',
		email: 'test@prisma.io',
	},
	{
		name: 'Nilu',
		email: 'nilu@prisma.io',
	},
	{
		name: 'Mahmoud',
		email: 'mahmoud@prisma.io',
	},
];

const productData: CreateProductInput[] = [
	{
		name: 'Test keyboard',
		quantity: 150,
		categoryName: 'Keyboards',
	},
	{
		name: 'Test mouse',
		quantity: 15,
		categoryName: 'Mouses',
	},
	{
		name: 'Test headphones',
		quantity: 430,
		categoryName: 'Headphones',
	},
];

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
