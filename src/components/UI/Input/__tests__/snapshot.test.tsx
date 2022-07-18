import { render } from '@testing-library/react';
import Input from '../index';

describe('Input component', () => {
	it('should render and match the snapshot with default props', () => {
		// Arrange and Act
		const { asFragment } = render(<Input />);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with the correct props', () => {
		// Arrange and Act
		const { asFragment } = render(
			<Input id='testid' value={10} type='number' />
		);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});
});
