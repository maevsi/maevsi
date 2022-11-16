import { CYPRESS_BASE_URL } from '~/utils/constants'

describe('dashboard page', () => {
  context('page load', () => {
    it('forbids access when not signed in', () => {
      cy.request({
        url: '/dashboard',
        failOnStatusCode: false,
        followRedirect: false,
      }).then((resp) => {
        expect(resp.status).to.equal(302)
        expect(resp.redirectedToUrl).to.equal(`${CYPRESS_BASE_URL}/`)
      })
    })
  })
})
