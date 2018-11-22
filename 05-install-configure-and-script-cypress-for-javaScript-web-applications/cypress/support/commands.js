import {userBuilder} from './generate'

// create a new Cypress command that we can reuse for creating users
Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)

  cy.request({
    method: 'POST',
    url: 'http://localhost:3000/register',
    body: user,
  })
    // Our tests will need that user, so we return the user in the response
    // In order to access this user in our tests, we will need to use .then on
    // cy.createUser, and nest the test inside .then's callback where the user
    // will be available
    .then(response => response.body.user)
})

// we can create reusable assertions using custom Cypress commands so that we don't
// rewrite the same asserts that different tests require
Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
    .getByTestId('username-display', {timeout: 500})
    .should('have.text', user.username)
})
