describe('homepage test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('pages load correctly', () => {
    it('check: page loads correctly', () => {
      cy.request('/').then((resp) => {
        expect(resp.status).to.eq(200)
        expect(resp.redirectedToUrl).to.eq(undefined)
      })
    })
  })
})
