import {userBuilder} from '../support/generate'

describe('user registration', () => {
  it('should register a new user', () => {
    // we could manually create a yserm byt then we have the same user every
    // time our test is run
    // const user = {username: 'blah', password: 'yo'}

    // instead we can use our uerBuilder created with test-data-bot to generate
    // a new user using faker's API every time
    const user = userBuilder()

    cy.visit('/')
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      .url()
      // we have access to the config via Cypress.config()
      // .should('eq', 'http://localhost:8080/')
      .should('eq', `${Cypress.config().baseUrl}/`)
      // make window our subject
      .window()
      // so that we can evaluate the token which should be written to localStorage
      .its('localStorage.token')
      // using the be.a assertsion which appears to evaluate types
      .should('be.a', 'string')
  })
})
