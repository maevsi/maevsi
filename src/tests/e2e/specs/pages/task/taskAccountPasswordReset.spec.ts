import { testVisualRegression } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/account/password/reset').toString()

testVisualRegression(PAGE_PATH)

// TODO: mock data
// context('page load', () => {
// it('loads the page successfully if reset code is valid', () => {
//   cy.request({
//     url: '/tasks/accounts/password/reset?code=valid',
//     followRedirect: false,
//   }).then((resp) => {
//     expect(resp.status).to.equal(200)
//     expect(resp.redirectedToUrl).to.equal(undefined)
//   })
// })
// })
