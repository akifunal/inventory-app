import {
	Category,
	startsWithLetterRegex,
	startsWithLetterRegexErrorMessage,
} from 'src/constants';
import { getMinLengthErrorMessage, getMaxLengthErrorMessage } from '@utils';
import z from 'zod';

export const createCategorySchema = z.object({
	id: z.string().cuid().optional(),
	description: z
		.string()
		.trim()
		.max(Category.MaxDescriptionLength)
		.optional(),
	name: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Name'))
		.min(
			Category.MinNameLength,
			getMinLengthErrorMessage(Category.MinNameLength, 'Name')
		)
		.max(
			Category.MaxNameLength,
			getMaxLengthErrorMessage(Category.MaxNameLength, 'Name')
		),
});

export type CreateCategoryInput = z.TypeOf<typeof createCategorySchema>;

export const getCategoryByNameSchema = z.object({
	name: z
		.string()
		.regex(startsWithLetterRegex, startsWithLetterRegexErrorMessage)
		.trim()
		.min(0, getMinLengthErrorMessage(0, 'Name'))
		.min(
			Category.MinNameLength,
			getMinLengthErrorMessage(Category.MinNameLength, 'Category name')
		)
		.max(
			Category.MaxNameLength,
			getMaxLengthErrorMessage(Category.MaxNameLength, 'Category name')
		),
});

export type GetCategoryByNameInput = z.TypeOf<typeof getCategoryByNameSchema>;
