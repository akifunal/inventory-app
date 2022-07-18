import { render } from '@testing-library/react';
import Header from '../Header';

describe('Layout', () => {
	describe('Header', () => {
		it('should render and match the snapshot with default props', () => {
			// Arrange and Act
			const { asFragment } = render(<Header />);

			// Assert
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
