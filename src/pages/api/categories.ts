import { prisma } from '@db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
	const products = await prisma.category.findMany();
	res.status(200).json(products);
};

export default examples;
