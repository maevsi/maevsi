describe('task account sign-in page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/account/sign-in').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/task/account/sign-in')
      cy.compareSnapshot('taskAccountSignin')
    })
  })
})
