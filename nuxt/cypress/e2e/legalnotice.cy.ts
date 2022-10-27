describe('legal-notice page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/legal-notice').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/legal-notice')
      cy.compareSnapshot('legal-notice')
    })
  })
})
