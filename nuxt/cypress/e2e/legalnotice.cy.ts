describe('legal-notice page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/legal-notice').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.setCookie('cookie_control_is_consent_given', 'true')
      cy.visit('/legal-notice')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
        'be.visible'
      )
      cy.compareSnapshot('legal-notice')
    })
  })
})
