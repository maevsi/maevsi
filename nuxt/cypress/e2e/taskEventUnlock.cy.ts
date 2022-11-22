describe('task event unlock page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/event/unlock').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/task/event/unlock')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('taskEventUnlock')
    })
  })
})
