describe('task account register page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/account/register').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  // TODO: find out why vuelidate thinks its pending while page load
  // context('visual regression', () => {
  //   it('looks as before', () => {
  //     cy.visit('/task/account/register')
  //     cy.compareSnapshot('taskAccountRegister')
  //   })
  // })
})
