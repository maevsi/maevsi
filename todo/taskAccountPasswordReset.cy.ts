import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'
import {
  COOKIE_CONTROL_DEFAULT,
  TIMEZONE_DEFAULT,
} from '~/cypress/utils/constants'

describe('task account password reset page', () => {
  beforeEach(() => {
    cy.setCookie(TIMEZONE_COOKIE_NAME, TIMEZONE_DEFAULT)
    cy.setCookie('ncc_c', COOKIE_CONTROL_DEFAULT)
  })

  // TODO: mock data
  // context('page load', () => {
  // it('loads the page successfully if reset code is valid', () => {
  //   cy.request({
  //     url: '/task/account/password/reset?code=valid',
  //     followRedirect: false,
  //   }).then((resp) => {
  //     expect(resp.status).to.equal(200)
  //     expect(resp.redirectedToUrl).to.equal(undefined)
  //   })
  // })
  // })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit({
        url: '/task/account/password/reset',
        failOnStatusCode: false,
      })
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
        'be.visible'
      )
      cy.compareSnapshot('index')
    })
  })
})
