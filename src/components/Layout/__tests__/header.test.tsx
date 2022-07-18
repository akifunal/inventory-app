import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

describe('Input component', () => {
	it('should render and match the snapshot with default props', async () => {
		// Arrange
		render(<Header defaultLinkStatuses={[true, false]} />);

		// Act
		const listItem = screen.getByTestId('categories-desktop');
		await userEvent.click(listItem);

		// Assert
		expect(listItem).toHaveClass('bg-indigo-600');
	});

	it("should handle mobile menu's click", async () => {
		// Arrange
		render(<Header />);

		// Act
		const item = screen.getByTestId('categories');
		await userEvent.click(item);

		const text = screen.getByTestId('textClicked');

		// Assert
		expect(text).toHaveTextContent('Categories');
	});
});
