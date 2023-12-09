describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');

    cy.get('[data-cy=register-btn]').click();

    cy.get('[data-cy=register-username-input]').type("vitorpereira");
    cy.get('[data-cy=register-password-input]').type("password");

    cy.wait(3000);

    cy.get('[data-cy=submit-register-btn]').click();

    cy.wait(3000);

    cy.get('[data-cy=login-username-input]').type("vitorpereira");
    cy.get('[data-cy=login-password-input]').type("password");

    cy.wait(3000);

    cy.get('[data-cy=submit-login-btn]').click();
  })
})