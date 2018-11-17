describe('anonymous calculator', () => {
  it('adds numbers', () => {
    cy.visit('/')
      // use the commands that cypress-testing-library has provided us with to
      // make getting elements more convenient and easier to read
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '3')
  })
})
