describe('user login', () => {
  it.only('should log a new user in', () => {
    // use the custom command we created in ../support/commands.js
    cy.createUser().then(user => {
      cy.visit('/')
        .getByText(/login/i)
        .click()
        .getByLabelText(/username/i)
        .type(user.username)
        .getByLabelText(/password/i)
        .type(user.password)
        .getByText(/submit/i)
        .click()

        // assert that we have been directed to the correct location
        .url()
        .should('eq', `${Cypress.config().baseUrl}/`)
        .window()
        .its('localStorage.token')
        .should('be.a', 'string')
        .getByTestId('username-display', {timeout: 500})
        .should('have.text', user.username)
    })
  })
})
