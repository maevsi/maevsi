import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/account/verify').toString()

testVisualRegression(PAGE_PATH)

// TODO: mock data
// context('page load', () => {
// it('loads the page successfully if verify code is valid', () => {
//   cy.request({
//     url: '/tasks/accounts/email-address/verify?code=valid',
//     followRedirect: false,
//   }).then((resp) => {
//     expect(resp.status).to.equal(200)
//     expect(resp.redirectedToUrl).to.equal(undefined)
//   })
// })
// })
