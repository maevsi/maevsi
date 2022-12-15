describe('contact page', () => {
  context('page load', () => {
    it('forbids access when not signed in', () => {
      cy.request({
        url: '/contact',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(403)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
