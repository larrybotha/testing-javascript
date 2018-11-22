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

        // use our custom Cypress commands for common assertions
        .assertHome()
        .assertLoggedInAs(user)
    })
  })
})
