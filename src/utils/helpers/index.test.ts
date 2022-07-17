import { getMaxLengthErrorMessage, getMinLengthErrorMessage } from './index';

describe('helpers function tests', () => {
	describe('getMaxLengthErrorMessage', () => {
		it('should return the correct error message', () => {
			// Arrange
			const maxLength = 50;
			const name = 'test';
			const expected = `${name} must be at most ${maxLength} characters long`;

			// Act
			const actual = getMaxLengthErrorMessage(maxLength, name);

			// Assert
			expect(actual).toEqual(expected);
		});
	});

	describe('getMinLengthErrorMessage', () => {
		it('should return the correct error message when minLength is positive', () => {
			// Arrange
			const minLength = 10;
			const name = 'test';
			const expected = `${name} must be at least ${minLength} characters long`;

			// Act
			const actual = getMinLengthErrorMessage(minLength, name);

			// Assert
			expect(actual).toEqual(expected);
		});

		it('should return the correct error message when minLength is 0 or negative', () => {
			// Arrange
			const name = 'test';
			const expected = `${name} is required`;

			// Act
			const resultForZero = getMinLengthErrorMessage(0, name);
			const resultForNegative = getMinLengthErrorMessage(-1, name);

			// Assert
			expect(resultForZero).toBe(expected);
			expect(resultForNegative).toBe(expected);
		});
	});
});
