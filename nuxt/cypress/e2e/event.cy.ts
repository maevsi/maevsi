describe('event page', () => {
	beforeEach(() => {
    cy.visit('/event')
  })

  context('pages load correctly', () => {
    it('loads the page correctly', () => {
      cy.request('/event').then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
