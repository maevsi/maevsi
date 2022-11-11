describe('task account sign-in page', () => {
  beforeEach(() => {
    cy.visit('/task/account/sign-in')
  })

  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/task/account/sign-in').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })

    // TODO: add e2e tests for titles
    it('has the correct title when not logged in', () => {
      cy.title().should('equal', 'Sign in · maevsi')
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.compareSnapshot('taskAccountSignin')
    })
  })
})
