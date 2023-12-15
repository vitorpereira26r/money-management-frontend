describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');

    // login
    cy.get('[data-cy=login-btn]').click();

    cy.get('[data-cy=login-username-input]').type("vitorpereira");
    cy.get('[data-cy=login-password-input]').type("password");

    cy.wait(2000);

    cy.get('[data-cy=submit-login-btn]').click();

    // create account
    cy.wait(4000);

    cy.get('[data-cy=create-account-btn]').click();

    cy.wait(1000);

    cy.get('[data-cy=create-account-input]').type("new_bank_test");

    cy.wait(1000);

    cy.get('[data-cy=submit-account-create-btn]').click();

    cy.wait(6000);

    // go to transactions
    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // create transaction
    cy.get('[data-cy=create-transaction-btn]').click();

    cy.get('[data-cy=create-ammont-input]').type(200);
    cy.get('[data-cy=create-description-input]').type("description income");

    cy.get('[data-cy=account-options-select]').select("new_bank_test");

    cy.get('[data-cy=category-options-select]').select("Earn");

    cy.get('[data-cy=type-options-select]').select("INCOME");

    cy.wait(4000);

    cy.get('[data-cy=submit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // create transaction
    cy.get('[data-cy=create-transaction-btn]').click();

    cy.get('[data-cy=create-ammont-input]').type(100);
    cy.get('[data-cy=create-description-input]').type("description expense");

    cy.get('[data-cy=account-options-select]').select("new_bank_test");

    cy.get('[data-cy=category-options-select]').select("Buy");

    cy.get('[data-cy=type-options-select]').select("EXPENSE");

    cy.wait(4000);

    cy.get('[data-cy=submit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);


    // edit transaction ammout and description
    cy.get('[data-cy=edit-transaction-2-btn]').click();

    cy.wait(2000);
    
    cy.get('[data-cy=edit-description-input]').clear().type("new description");

    cy.wait(4000);

    cy.get('[data-cy=submit-edit-transaction-btn]').click();

    cy.wait(4000);

    // edit transaction type INCOME -> INCOME | +200 -> +100
    cy.get('[data-cy=edit-transaction-2-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=edit-ammont-input]').clear().type(10);
    cy.get('[data-cy=type-options-select]').select("INCOME");

    cy.wait(4000);

    cy.get('[data-cy=submit-edit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // edit transaction type INCOME -> EXPENSE | +100 -> -100
    cy.get('[data-cy=edit-transaction-2-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=edit-ammont-input]').clear().type(10);
    cy.get('[data-cy=type-options-select]').select("EXPENSE");

    cy.wait(4000);

    cy.get('[data-cy=submit-edit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // edit transaction type EXPENSE -> EXPENSE | -100 -> -200
    cy.get('[data-cy=edit-transaction-3-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=edit-ammont-input]').clear().type(20);
    cy.get('[data-cy=type-options-select]').select("EXPENSE");

    cy.wait(4000);

    cy.get('[data-cy=submit-edit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // edit transaction type EXPENSE -> INCOME | -100 -> +200
    cy.get('[data-cy=edit-transaction-3-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=edit-ammont-input]').clear().type(20);
    cy.get('[data-cy=type-options-select]').select("INCOME");

    cy.wait(4000);

    cy.get('[data-cy=submit-edit-transaction-btn]').click();

    cy.wait(4000);

    // go see the amount in the user and account amount and return
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(6000);

    cy.get('[data-cy=transactions-nav-link]').click();

    cy.wait(2000);

    // delete transaction
    cy.get('[data-cy=delete-transaction-2-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=delete-transaction-confirm-btn]').click();

    cy.wait(4000);

    // back to home page
    cy.get('[data-cy=back-home-btn]').click();

    cy.wait(2000);

    // filter by income
    cy.get('[data-cy=type-filter-select-btn]').select("INCOME");

    cy.wait(6000);

    // delete the account
    cy.get('[data-cy=delete-account-new_bank_test-btn]').click();

    cy.wait(2000);

    cy.get('[data-cy=delete-confirmation-account-btn]').click();
  })
})