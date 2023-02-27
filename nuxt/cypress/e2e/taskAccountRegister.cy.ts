describe('task account register page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/account/register').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  // TODO: find out why vuelidate thinks its pending while page load (maybe: https://github.com/maevsi/maevsi/issues/900)
  // context('visual regression', () => {
  //   it('looks as before', () => {
  //     cy.setCookie('ncc_c', 'acltga')
  //     cy.visit('/task/account/register')
  //     cy.get('[data-is-loading="false"]').should('be.visible')
  //     cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
  //       'be.visible'
  //     )
  //     cy.compareSnapshot('taskAccountRegister')
  //   })
  // })
})
