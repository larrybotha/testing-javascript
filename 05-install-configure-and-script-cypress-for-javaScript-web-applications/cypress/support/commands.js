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

Cypress.Commands.add('login', user => {
  cy.request({
    url: 'http://localhost:3000/login',
    method: 'POST',
    body: user,
  }).then(response => {
    window.localStorage.setItem('token', response.body.user.token)

    // return the user so that `.then` has access to it inside tests
    return response.body.user
  })
})

// add a command to combine registering and logging in of a new user
Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => {
    cy.login(user)
  })
})
