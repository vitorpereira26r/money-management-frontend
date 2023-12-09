describe('Login and Logout tests', () => {
  it('Login-Logout', () => {
    cy.visit('localhost:5173');

    cy.get('[data-cy=login-btn]').click();

    cy.get('[data-cy=login-username-input]').type("vitorpereira");
    cy.get('[data-cy=login-password-input]').type("password");

    cy.wait(3000);

    cy.get('[data-cy=submit-login-btn]').click();

    cy.wait(5000);

    cy.get('[data-cy=logout-nav-link]').click();
  })
})