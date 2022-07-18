import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';
import Header from '../Header';

jest.mock('next-auth/react');

const mockSession = {
	user: {
		name: 'John Doe',
		email: 'test@example.com',
		image: 'https://example.com/avatar.png',
	},
};

describe('Header component', () => {
	it('should render and match the snapshot with default props', async () => {
		// Arrange
		(useSession as jest.Mock).mockReturnValue({
			data: mockSession,
			status: 'authenticated',
		});

		render(<Header defaultLinkStatuses={[true, false]} />);

		// Act
		const listItem = screen.getByTestId('categories-desktop');
		await userEvent.click(listItem);

		// Assert
		expect(listItem).toHaveClass('bg-indigo-600');
	});

	it("should handle mobile menu's click", async () => {
		// Arrange
		(useSession as jest.Mock).mockReturnValue({
			data: mockSession,
			status: 'authenticated',
		});

		render(<Header />);

		// Act
		const item = screen.getByTestId('categories');
		await userEvent.click(item);

		const text = screen.getByTestId('textClicked');

		// Assert
		expect(text).toHaveTextContent('Categories');
	});
});
