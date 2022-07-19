import { getMaxLengthErrorMessage, getMinLengthErrorMessage } from '@/utils';
import {
	Category,
	startsWithLetterRegex,
	startsWithLetterRegexErrorMessage,
	Product,
} from 'src/constants';
import z from 'zod';

export const createProductSchema = z.object({
	id: z.string().cuid().optional(),
	description: z.string().trim().max(Product.MaxDescriptionLength).optional(),
	name: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Name'))
		.min(
			Product.MinNameLength,
			getMinLengthErrorMessage(Product.MinNameLength, 'Name')
		)
		.max(
			Product.MaxNameLength,
			getMaxLengthErrorMessage(Product.MaxNameLength, 'Name')
		),
	quantity: z.number().min(Product.MinQuantity).max(Product.MaxQuantity),
	categoryName: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Category name'))
		.min(
			Category.MinNameLength,
			getMinLengthErrorMessage(Category.MinNameLength, 'Category name')
		)
		.max(
			Category.MaxNameLength,
			getMaxLengthErrorMessage(Category.MaxNameLength, 'Category name')
		),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;

export const getProductByNameSchema = z.object({
	name: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Name'))
		.min(
			Product.MinNameLength,
			getMinLengthErrorMessage(Product.MinNameLength, 'Name')
		)
		.max(
			Product.MaxNameLength,
			getMaxLengthErrorMessage(Product.MaxNameLength, 'Name')
		),
});

export type GetProductByNameInput = z.TypeOf<typeof getProductByNameSchema>;
