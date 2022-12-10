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
    it('looks as before', () => {
      cy.setCookie('cookie_control_consent', 'true')
      cy.visit('/task/search')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.compareSnapshot('taskSearch')
    })
  })
})
