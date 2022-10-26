describe('teapot page', () => {
  context('pages load correctly', () => {
    it('refuses to brew coffee', () => {
      cy.request({
        url: '/teapot',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(418)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
