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
      // get the element with testid of username-display, and set the timeout to
      // less than the default 4000ms that Cypress uses, because if don't have it
      // by now, we're probabliy not going to get it at all
      .getByTestId('username-display', {timeout: 500})
      .should('have.text', user.username)
  })

  it.only(`shows an error message if the server response is an error`, () => {
    // indicate to Cypress that we want to setup a mock server
    cy.server()

    // Provide the stub that we want to evaluate an error for
    // If a request is made to this path, then Cypress will intercept it, and
    // respond with the options defined in this config.
    cy.route({
      url: 'http://localhost:3000/register',
      method: 'POST',
      status: 500,
      response: {},
    })

    // go to the register page, click the submit button, and assert that there's
    // error text
    cy.visit('/register')
      .getByText(/submit/i)
      .click()
      .getByText(/error.*try again/i)
  })
})
