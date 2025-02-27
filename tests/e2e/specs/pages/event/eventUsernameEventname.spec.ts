import { test } from '@playwright/test'

test.describe('event username eventname page', () => {
  // context('page load', () => {
  //   TODO: mock data
  //   it('loads a public event page successfully', () => {
  //     cy.request('/events/username-that-exists/public-event').then((resp) => {
  //       expect(resp.status).to.equal(200)
  //       expect(resp.redirectedToUrl).to.equal(undefined)
  //     })
  //   })
  //
  //   it('forbids access to a unlisted event when not signed in', () => {
  //     cy.request({
  //       url: '/events/username-that-exists/unlisted-event',
  //       failOnStatusCode: false,
  //     }).then((resp) => {
  //       expect(resp.status).to.equal(403)
  //       expect(resp.redirectedToUrl).to.equal(undefined)
  //     })
  //   })
  //
  //   it('does not find page if user does not exists', () => {
  //     cy.request({
  //       url: '/events/username-that-does-not-exist/event-that-exists',
  //       failOnStatusCode: false,
  //     }).then((resp) => {
  //       expect(resp.status).to.equal(404)
  //       expect(resp.redirectedToUrl).to.equal(undefined)
  //     })
  //   })
  //
  //   it('does not find page if event does not exists', () => {
  //     cy.request({
  //       url: '/events/username-that-exists/event-that-does-not-exist',
  //       failOnStatusCode: false,
  //     }).then((resp) => {
  //       expect(resp.status).to.equal(404)
  //       expect(resp.redirectedToUrl).to.equal(undefined)
  //     })
  //   })
  // })
})
