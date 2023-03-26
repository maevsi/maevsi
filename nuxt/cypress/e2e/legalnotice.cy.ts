import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'
import {
  COOKIE_CONTROL_DEFAULT,
  TIMEZONE_DEFAULT,
} from '~/cypress/utils/constants'

describe('legal-notice page', () => {
  beforeEach(() => {
    cy.setCookie(TIMEZONE_COOKIE_NAME, TIMEZONE_DEFAULT)
    cy.setCookie('ncc_c', COOKIE_CONTROL_DEFAULT)
  })

  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/legal-notice').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    it('looks as before', () => {
      cy.visit('/legal-notice')
      cy.get('[data-is-loading="false"]').should('be.visible')
      cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
        'be.visible'
      )
      cy.compareSnapshot('legal-notice')
    })
  })
})
