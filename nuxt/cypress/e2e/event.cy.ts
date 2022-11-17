describe('event page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/event').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  // TODO: mock data
  // context('visual regression', () => {
  //   if (Cypress.env('NODE_ENV') !== 'production') return
  //   it('looks as before', () => {
  //     cy.visit('/event')
  //     cy.compareSnapshot('event')
  //   })
  // })
})
