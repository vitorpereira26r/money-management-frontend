describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');

    cy.get('[data-cy=login-btn]').click();

    cy.get('[data-cy=login-username-input]').type("vitorpereira");
    cy.get('[data-cy=login-password-input]').type("password");

    cy.wait(2000);

    cy.get('[data-cy=submit-login-btn]').click();

    cy.wait(4000);

    cy.get('[data-cy=create-account-btn]').click();

    cy.wait(1000);

    cy.get('[data-cy=create-account-input]').type("new_bank");

    cy.wait(1000);

    cy.get('[data-cy=submit-account-create-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=edit-account-new_bank-btn]').click();
    cy.get('[data-cy=edit-account-input]').clear().type("edited");

    cy.wait(1000);

    cy.get('[data-cy=submit-account-edit-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=delete-account-edited-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=delete-confirmation-account-btn]').click();
  })
})