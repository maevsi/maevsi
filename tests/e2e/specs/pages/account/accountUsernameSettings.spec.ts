import { test } from '@playwright/test'

// import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'
// import {
//   COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
//   TIMEZONE_DEFAULT,
// } from '~/cypress/utils/constants'

test.describe('account username settings page', () => {
  // beforeEach(() => {
  //   cy.setCookie(TIMEZONE_COOKIE_NAME, TIMEZONE_DEFAULT)
  //   cy.setCookie('ncc_c', COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT)
  // })
  //
  // TODO: mock data
  // context('page load', () => {
  // it('forbids access when not signed in', () => {
  //   cy.request({
  //     url: '/accounts/username-that-exists/settings',
  //     failOnStatusCode: false,
  //   }).then((resp) => {
  //     expect(resp.status).to.equal(403)
  //     expect(resp.redirectedToUrl).to.equal(undefined)
  //   })
  // })
  //
  // it('does not find page if user does not exists', () => {
  //   cy.request({
  //     url: '/accounts/username-that-does-not-exist/settings',
  //     failOnStatusCode: false,
  //   }).then((resp) => {
  //     expect(resp.status).to.equal(404)
  //     expect(resp.redirectedToUrl).to.equal(undefined)
  //   })
  // })
  // })
  //
  // context('visual regression', () => {
  //   it('looks as before', () => {
  //     cy.visit({ url: '/accounts/username/settings', failOnStatusCode: false })
  //     cy.get('[data-is-loading="false"]').should('be.visible')
  //     cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
  //       'be.visible'
  //     )
  //     cy.compareSnapshot('index')
  //   })
  // })
})
