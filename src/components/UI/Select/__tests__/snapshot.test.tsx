import { render } from '@testing-library/react';
import Select from '../index';

describe('Input component', () => {
	it('should render and match the snapshot with default props', () => {
		// Arrange and Act
		const { asFragment } = render(<Select />);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render and match the snapshot with the correct props', () => {
		// Arrange and Act
		const options = ['Option 1', 'Option 2', 'Option 3'];

		const { asFragment } = render(
			<Select options={options} label='Test label' value={options[1]} />
		);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});
});
