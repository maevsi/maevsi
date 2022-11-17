describe('task search page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/search').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    if (Cypress.env('NODE_ENV') !== 'production') return

    it('looks as before', () => {
      cy.visit('/task/search')
      cy.compareSnapshot('taskSearch')
    })
  })
})
