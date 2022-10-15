describe('upload page', () => {
  beforeEach(() => {
    cy.visit({
      url: '/upload',
      failOnStatusCode: false,
    })
  })

  context('pages load correctly', () => {
    it('denies access when not logged in', () => {
      cy.request({
        url: '/upload',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(403)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
