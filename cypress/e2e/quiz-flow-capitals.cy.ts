describe('Quiz Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/quiz/europe');
  });

  it('should display loading state initially', () => {
    cy.get('[data-test=quiz-loading]').should('be.visible');
  });

  it('should complete a full quiz flow', () => {
    // Wait for loading to finish and quiz to start
    cy.get('[data-test=question-view]', { timeout: 10000 }).should(
      'be.visible',
    );

    // Answer multiple questions
    for (let i = 0; i < 10; i++) {
      // Check if question elements are visible
      cy.get('[data-test=country-description]').should('be.visible');
      cy.get('[data-test=answer-options]').should('be.visible');

      // Keep trying options until we find the correct one
      cy.get('[data-test=answer-option]').each(($option) => {
        // Check if we already found the correct answer
        cy.get('body').then(($body) => {
          if (
            $body.find('[data-test=answer-option].bg-green-500').length === 0
          ) {
            cy.wrap($option).click();
            cy.wait(100); // Small wait to allow for UI update
          }
        });
      });

      // Wait for animation before moving to next question
      cy.wait(800);
    }

    // Verify we reach the results page
    cy.url().should('include', '/results');

    // Wait for results to animate in
    cy.wait(2000);

    // Check results page elements
    cy.get('[data-test=results-title]').should('be.visible');
    cy.get('[data-test=results-table]').should('be.visible');
    cy.get('[data-test=results-percentage]')
      .scrollIntoView()
      .should('be.visible')
      .contains('%');
    cy.get('[data-test=home-button]').scrollIntoView().should('be.visible');
    cy.get('[data-test=retry-button]').scrollIntoView().should('be.visible');
  });
});
