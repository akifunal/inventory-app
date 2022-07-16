describe('Inventory app', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('test trpc server is running', () => {
		cy.findByText('Hello from tRPC').should('exist');
	});

	it('test database connection', () => {
		cy.findByText('test user').should('exist');
	});
});
