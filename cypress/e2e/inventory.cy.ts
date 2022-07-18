describe('Inventory app', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('test database connection', () => {
		cy.get('table').contains('Test headphone');
		cy.get('table').contains('Mouses');
	});
});
