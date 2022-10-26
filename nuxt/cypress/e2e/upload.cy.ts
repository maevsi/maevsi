describe('upload page', () => {
  context('pages load correctly', () => {
    it('denies access when not logged in', () => {
      cy.request({
        url: '/upload',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(403)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })
})
