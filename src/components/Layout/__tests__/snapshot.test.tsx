import { render } from '@testing-library/react';
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

describe('Layout', () => {
	describe('Header', () => {
		it('should render and match the snapshot with default props', () => {
			(useSession as jest.Mock).mockReturnValue({
				data: mockSession,
				status: 'authenticated',
			});

			// Arrange and Act
			const { asFragment } = render(<Header />);
			// Assert
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
