describe('privacy-policy page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/privacy-policy').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/privacy-policy')
      cy.compareSnapshot('privacy-policy')
    })
  })
})
