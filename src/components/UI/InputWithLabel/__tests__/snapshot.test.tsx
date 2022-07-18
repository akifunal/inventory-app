import { render } from '@testing-library/react';
import InputWithLabel from '../index';

describe('InputWithLabel component', () => {
	it('should render and match the snapshot', () => {
		// Arrange and Act
		const { asFragment } = render(
			<InputWithLabel id='test-first' label='test first' value='test' />
		);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render and match the snapshot when success', () => {
		// Arrange and Act
		const { asFragment } = render(
			<InputWithLabel
				id='test-success'
				label='test success'
				status='success'
				value='test2'
			/>
		);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render and match the snapshot when error', () => {
		// Arrange and Act
		const { asFragment } = render(
			<InputWithLabel
				id='test-error'
				label='test error'
				status='error'
				value='test3'
			/>
		);

		// Assert
		expect(asFragment()).toMatchSnapshot();
	});
});
