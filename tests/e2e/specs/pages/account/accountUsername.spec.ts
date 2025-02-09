import { test } from '@playwright/test'

// import { TIMEZONE_COOKIE_NAME } from '~/utils/constants'
// import {
//   COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT,
//   TIMEZONE_DEFAULT,
// } from '~/cypress/utils/constants'

test.describe('account username page', () => {
  // TODO: mock data
  // beforeEach(() => {
  //   cy.setCookie(TIMEZONE_COOKIE_NAME, TIMEZONE_DEFAULT)
  //   cy.setCookie('ncc_c', COOKIE_CONTROL_CONSENT_COOKIE_DEFAULT)
  // })
  //
  // TODO: mock data
  // context('page load', () => {
  // it('loads the page successfully if user exists', () => {
  //   cy.request('/accounts/username-that-exists').then((resp) => {
  //     expect(resp.status).to.equal(200)
  //     expect(resp.redirectedToUrl).to.equal(undefined)
  //   })
  // })
  //
  // it('does not find page if user does not exists', () => {
  //   cy.request({
  //     url: '/accounts/username-that-does-not-exist',
  //     failOnStatusCode: false,
  //   }).then((resp) => {
  //     expect(resp.status).to.equal(404)
  //     expect(resp.redirectedToUrl).to.equal(undefined)
  //   })
  // })
  // })
  //
  // TODO: mock data
  // context('visual regression', () => {
  //   it('looks as before', () => {
  //     cy.visit('/accounts/username')
  //     cy.get('[data-is-loading="false"]').should('be.visible')
  //     cy.get('[data-testid="nuxt-cookie-control-control-button"]').should(
  //       'be.visible'
  //     )
  //     cy.compareSnapshot('index')
  //   })
  // })
})
