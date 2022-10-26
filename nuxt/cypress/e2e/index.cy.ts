describe('root page', () => {
  // beforeEach(() => {
  //   cy.visit('/')
  // })

  context('pages load correctly', () => {
    it('loads the page correctly', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  it('displays a sign in button', () => {
    cy.visit('/')
    cy.contains('Personal invitations. Proper feedback.')

    cy.get('[data-testid="scroll-hint"]').should('be.visible')
    cy.compareSnapshot('index')
  })
})
