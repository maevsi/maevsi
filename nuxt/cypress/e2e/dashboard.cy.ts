describe('dashboard page', () => {
  beforeEach(() => {
    cy.visit({
      url: '/dashboard',
      failOnStatusCode: false,
    })
  })

  // This is currently broken, due to nuxt3 redirects not working properly
  // Should be fixed in nuxt v3.0.0-rc.12 by substituting
	// `navigateTo` with `redirect`
  // Expected behaviour: redirect to homepage, code 302
  context('pages load correctly', () => {
    it('redirects to homepage when not logged in', () => {
      cy.request('/dashboard').then((resp) => {
        expect(resp.status).to.eq(302)
        expect(resp.redirectedToUrl).to.include('/')
      })
    })
  })
})
