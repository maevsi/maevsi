import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('account page', () => {
  context('pages load correctly', () => {
    it('redirects to log-in when not logged in', () => {
      cy.request({
        url: '/account',
        followRedirect: false,
      }).then((resp) => {
        expect(resp.status).to.equal(307)
        expect(resp.redirectedToUrl).to.equal(
          `${CYPRESS_BASE_URL}/task/account/sign-in`
        )
      })
    })
  })
})
