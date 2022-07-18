import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../index';

describe('Input component', () => {
	it('should render and match the snapshot with default props', async () => {
		// Arrange
		const submit = jest.fn();

		render(
			<Form onSubmit={submit}>
				{' '}
				<button type='submit'>test button</button>{' '}
			</Form>
		);

		// Act
		const button = screen.getByText('test button');
		await userEvent.click(button);

		// Assert
		expect(submit).toHaveBeenCalledTimes(1);
	});
});
