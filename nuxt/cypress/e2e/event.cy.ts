describe('event page', () => {
  context('pages load correctly', () => {
    it('loads the page correctly', () => {
      cy.request('/event').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
