describe('root page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Displays a sign in button', () => {
    cy.contains('Personal invitations. Proper feedback.')

    cy.get('[data-testid="scroll-hint"]').should('be.visible')
    cy.compareSnapshot('maevsi')
  })
})
