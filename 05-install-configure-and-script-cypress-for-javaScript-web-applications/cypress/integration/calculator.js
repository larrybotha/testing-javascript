// we'll treat this test as if it's an anonymous user to our calculator app
describe('anonymous calculator', () => {
  it('adds numbers', () => {
    // A useful way to think of the cy object is as a user.
    // Each command is going to happen in the future, and doesn't happen
    // immediately.
    // cy is isomorphic to giving a list of instructions for a user to execute

    cy.visit('http://localhost:8080')
      // these selectors aren't great, as they're copied from the Cypress ui, and
      // use css-modules generated classes, but we'll deal with that later
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(5)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)')
      .click()
      .get('[data-testid=total]')
      // contain is less strict than have.text, which expects an exact match
      // .should('contain', 4)
      .should('have.text', '4')
  })
})
