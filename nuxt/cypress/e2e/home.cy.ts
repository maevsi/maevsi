describe('homepage page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('pages load correctly', () => {
    it('loads the page correctly', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
