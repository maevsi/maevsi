describe('event test', () => {
  beforeEach(() => {
    cy.visit('/event')
  })

  context('pages load correctly', () => {
    it('check: page loads correctly', () => {
      cy.request('/event').then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
