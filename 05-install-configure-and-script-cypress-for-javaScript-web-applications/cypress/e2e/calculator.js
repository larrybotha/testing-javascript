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
    cy.createUser().then(user => {
      // we're already testing the log in flow in login.js, so doing it again is
      // redundant.
      // Instead, we can make a request to our API directly, and then evaluate
      // that.
      cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
      })
        .then(response => {
          window.localStorage.setItem('token', response.body.user.token)
        })
        .visit('/')

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
