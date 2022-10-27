describe('index page', () => {
  // beforeEach(() => {
  //   cy.visit('/')
  // })

  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/')
      cy.get('[data-testid="scroll-hint"]').should('be.visible')
      cy.compareSnapshot('index')
    })
  })

  context('internationalization', () => {
    it('displays English translations', () => {
      cy.visit('/')
      cy.contains('Personal invitations. Proper feedback.')
    })
  })
})
