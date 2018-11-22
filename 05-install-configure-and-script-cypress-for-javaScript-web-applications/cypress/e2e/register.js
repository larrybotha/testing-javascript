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

      // use our custom Cypress commands for common assertions
      .assertHome()
      .assertLoggedInAs(user)
  })

  it(`shows an error message if the server response is an error`, () => {
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
