describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display all the main elements on the page', () => {
    // Check title
    cy.get('.text-3xl')
      .should('exist')
      .contains('Learn Geography the Fun Way with GeoQuiz!');

    // Check navbar
    cy.get('[data-test=navbar]').should('exist').should('be.visible');

    // Check login button
    cy.get('[data-test=login-modal-trigger]').contains('Login');

    // Check footer
    cy.get('[data-test=footer]')
      .scrollIntoView()
      .should('exist')
      .should('be.visible');
  });
});
