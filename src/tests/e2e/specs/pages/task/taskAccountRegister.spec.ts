import { testPageLoad } from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/account/create').toString()

testPageLoad(PAGE_PATH)

// TODO: find out why vuelidate thinks its pending while page load (maybe: https://github.com/maevsi/maevsi/issues/900)
// context('visual regression', () => {
//   it('looks as before', () => {
//     cy.visit('/tasks/accounts/register')
//     cy.get('[data-is-loading="false"]').should('be.visible')
//     cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
//       'be.visible'
//     )
//     cy.compareSnapshot('taskAccountRegister')
//   })
// })
