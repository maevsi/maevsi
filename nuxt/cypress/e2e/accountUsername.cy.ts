// import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('account username page', () => {
  context('page load', () => {
    // TODO: mock data
    // it('loads the page successfully if user exists', () => {
    //   cy.request('/account/username-that-exists').then((resp) => {
    //     expect(resp.status).to.equal(200)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })
    //
    // it('does not find page if user does not exists', () => {
    //   cy.request({
    //     url: '/account/username-that-does-not-exist',
    //     failOnStatusCode: false,
    //   }).then((resp) => {
    //     expect(resp.status).to.equal(404)
    //     expect(resp.redirectedToUrl).to.equal(undefined)
    //   })
    // })
  })

  // TODO: mock data
  // TODO: add breadcrumb tests for other pages
  // context('navigation', () => {
  //   it('has working breadcrumbs', () => {
  //     cy.visit({
  //       url: '/account/dargmuesli',
  //     })
  //     cy.get('[data-testid="breadcrumb-prefix-/"]').click()
  //     cy.url().should('equal', `${CYPRESS_BASE_URL(Cypress.env('NODE_ENV'))}/`)

  //     cy.visit({
  //       url: '/account/dargmuesli',
  //     })
  //     cy.get('[data-testid="breadcrumb-prefix-/account"]').click()
  //     cy.url().should(
  //       'equal',
  //       `${CYPRESS_BASE_URL(Cypress.env('NODE_ENV'))}/task/account/sign-in`
  //     )

  //     cy.visit({
  //       url: '/account/dargmuesli',
  //     })
  //     cy.get('[data-testid="breadcrumb-?"]').click()
  //     cy.url().should(
  //       'equal',
  //       `${CYPRESS_BASE_URL(Cypress.env('NODE_ENV'))}/account/dargmuesli`
  //     )
  //   })
  // })
})
