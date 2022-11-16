import { CYPRESS_BASE_URL } from '~/utils/constants'

describe('account page', () => {
  context('page load', () => {
    it('redirects to sign-in when not signed in', () => {
      cy.request({
        url: '/account',
        followRedirect: false,
      }).then((resp) => {
        expect(resp.status).to.equal(302)
        expect(resp.redirectedToUrl).to.equal(
          `${CYPRESS_BASE_URL}/task/account/sign-in`
        )
      })
    })
  })
})
