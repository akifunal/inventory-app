describe('Inventory app', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('test database connection', () => {
		cy.findByText('Headphones').should('exist');
		cy.findByText('Mouses').should('exist');
	});
});
