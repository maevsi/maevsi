import { testPageLoad } from '#tests/e2e/utils/tests'

const PAGE_PATH = '/account/create'

testPageLoad(PAGE_PATH)

// TODO: find out why vuelidate thinks its pending while page load (maybe: https://github.com/maevsi/vibetype/issues/900)
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
