import { CreateCategoryInput, CreateProductInput } from 'src/server/schema';

type UserDataInput = {
	name: string | null | undefined;
	email: string | undefined;
};

export const userData: UserDataInput[] = [
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

export const productData: CreateProductInput[] = [
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

export const categoryData: CreateCategoryInput[] = [
	{
		name: 'Cars',
	},
	{
		name: 'Houses',
	},
	{
		name: 'Televisions',
	},
	{
		name: 'Mobile Phones',
	},
];

export const sessionMock = {
	user: {
		id: '1041',
		name: 'test user',
		image: 'https://via.placeholder.com/150',
	},
	expires: '2020-01-01T00:00:00.000Z',
};
