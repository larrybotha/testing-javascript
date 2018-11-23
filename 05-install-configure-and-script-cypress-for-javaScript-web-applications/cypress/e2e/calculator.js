describe('anonymous calculator', () => {
  it('adds numbers', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      // use .then to set a debugger statement wherever you want in a test
      // .then(subject => {
      //   debugger
      //   return subject
      // })
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '3')
  })
})

// test the calculaor for an authenticated user
describe('authenticated calculator', () => {
  it(`displays the user's name`, () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/')

        // assert that they are in fact logged in
        .assertLoggedInAs(user)

        // log the user out
        .getByText(/logout/i)
        .click()

        // assert that the user's display name is no longer in the DOM
        .queryByText('username-display', {timeout: 300})
        .should('not.exist')
    })
  })
})
