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
