import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('task account password reset page', () => {
  context('page load', () => {
    // TODO: mock data
    // it('loads the page successfully if reset code is valid', () => {
    //   cy.request({
    //     url: '/task/account/password/reset?code=valid',
    //     followRedirect: false,
    //   }).then((resp) => {
    //     expect(resp.status).to.equal(200)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })

    it('redirects to index if reset code is invalid', () => {
      cy.request({
        url: '/task/account/password/reset?code=invalid',
        followRedirect: false,
      }).then((resp) => {
        expect(resp.status).to.equal(302)
        expect(resp.redirectedToUrl).to.equal(`${CYPRESS_BASE_URL}/`)
      })
    })
  })
})
