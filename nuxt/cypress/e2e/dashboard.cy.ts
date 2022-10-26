import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('dashboard page', () => {
  context('pages load correctly', () => {
    it('redirects to homepage when not logged in', () => {
      cy.request({ url: '/dashboard', followRedirect: false }).then((resp) => {
        expect(resp.status).to.equal(307)
        expect(resp.redirectedToUrl).to.equal(
          `${CYPRESS_BASE_URL(Cypress.env('NODE_ENV'))}/`
        )
      })
    })
  })
})
