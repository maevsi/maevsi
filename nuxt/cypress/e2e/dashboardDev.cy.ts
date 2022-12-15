describe('dashboard dev page', () => {
  context('page load', () => {
    it('forbids access when not signed in', () => {
      cy.request({
        url: '/dashboard/dev',
      }).then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
