import { render } from '@testing-library/react';
import Form from '../index';

describe('Input component', () => {
	it('should render and match the snapshot with default props', () => {
		// Arrange and Act
		const { asFragment } = render(<Form> Test </Form>);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});
});
