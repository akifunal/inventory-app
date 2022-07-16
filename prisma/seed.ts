/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { type Prisma, PrismaClient } from '@prisma/client';

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
