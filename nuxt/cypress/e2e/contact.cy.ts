describe('contact test', () => {
  beforeEach(() => {
    cy.visit({
      url: '/contact',
      failOnStatusCode: false,
    })
  })

  context('pages load correctly', () => {
    it('check: access denied (no log-in)', () => {
      cy.request({
        url: '/contact',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.eq(403)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
