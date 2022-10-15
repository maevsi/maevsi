describe('account test', () => {
  beforeEach(() => {
    cy.visit('/account')
  })

  // This is currently broken, due to nuxt3 redirects not working properly
  // Should be fixed in nuxt v3.0.0-rc.12
  // Expected behaviour: redirect to homepage, code 302
  context('pages load correctly', () => {
    it('check: redirect to log-in (when not logged in)', () => {
      cy.request('/account').then((resp) => {
        expect(resp.status).to.eq(302)
        expect(resp.redirectedToUrl).to.include('/task/account/sign-in')
      })
    })
  })
})
