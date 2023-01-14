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
  //   it('looks as before', () => {
  //     cy.setCookie('cookie_control_is_consent_given', 'true')
  //     cy.visit('/event')
  //     cy.get('[data-is-loading="false"]').should('be.visible')
  //     cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
  //       'be.visible'
  //     )
  //     cy.compareSnapshot('event')
  //   })
  // })
})
