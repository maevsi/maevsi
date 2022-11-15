import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('task account email-address verify page', () => {
  context('page load', () => {
    // TODO: mock data
    // it('loads the page successfully if verify code is valid', () => {
    //   cy.request({
    //     url: '/task/account/email-address/verify?code=valid',
    //     followRedirect: false,
    //   }).then((resp) => {
    //     expect(resp.status).to.equal(200)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })

    it('redirects to index if verify code is invalid', () => {
      cy.request({
        url: '/task/account/email-address/verify?code=invalid',
        followRedirect: false,
      }).then((resp) => {
        expect(resp.status).to.equal(302)
        expect(resp.redirectedToUrl).to.equal(`${CYPRESS_BASE_URL}/`)
      })
    })
  })
})
