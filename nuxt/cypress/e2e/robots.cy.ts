import { CYPRESS_BASE_URL } from '~/plugins/util/constants'

describe('robots page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/robots.txt').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('content', () => {
    it('links the sitemap', () => {
      cy.request('/robots.txt').then((resp) => {
        expect(resp.body).to.include(
          `Sitemap: ${CYPRESS_BASE_URL(Cypress.env('NODE_ENV'))}/sitemap.xml`
        )
      })
    })
  })
})
