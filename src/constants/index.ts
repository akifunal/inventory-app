export const enum Product {
	MinNameLength = 3,
	MaxNameLength = 40,
	MinQuantity = 1,
	MaxQuantity = 1000,
	MaxDescriptionLength = 100,
}

export const enum Category {
	MinNameLength = 3,
	MaxNameLength = 30,
	MaxDescriptionLength = 100,
}

export const lettersOnlyRegex = /^[a-zA-Z\s]*$/;
export const lettersOnlyRegexErrorMessage = 'Only letters are allowed for name';
