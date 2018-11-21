import {userBuilder} from '../support/generate'

describe('user login', () => {
  it.only('should log a new user in', () => {
    const user = userBuilder()

    // we've already tested registering a user in our registration test, so
    // we're duplicating that test, and making our tests more difficult to
    // maintain.
    // cy.visit('/')
    //   .getByText(/register/i)
    //   .click()
    //   .getByLabelText(/username/i)
    //   .type(user.username)
    //   .getByLabelText(/password/i)
    //   .type(user.password)
    //   .getByText(/submit/i)
    //   .click()

    //   // log the user out
    //   .getByText(/logout/i)
    //   .click()

    // Since our user registration is tested, we can skip that, and make a
    // request for registration directly, and then log our user in
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/register',
      body: user,
    })

    // log user in
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
