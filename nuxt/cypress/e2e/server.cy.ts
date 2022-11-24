import { CYPRESS_BASE_URL } from '~/utils/constants'

describe('ical api', () => {
  context('api load', () => {
    it('only allows POST requests', () => {
      const disallowedMethods = ['GET', 'PUT', 'DELETE', 'TRACE', 'PATCH']

      for (const disallowedMethod of disallowedMethods) {
        cy.request({
          url: '/api/ical',
          method: disallowedMethod,
          followRedirect: false,
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.equal(405)
          expect(resp.redirectedToUrl).to.equal(undefined)
          expect(resp.body.message).to.equal('Only POST requests are allowed!')
        })
      }
    })

    it('validates input data', () => {
      const inputData = [
        { data: undefined, message: 'Body is not set!' },
        { data: { contact: {}, invitation: {} }, message: 'Event is not set!' },
      ]

      for (const inputDataElement of inputData) {
        cy.request({
          url: '/api/ical',
          method: 'POST',
          followRedirect: false,
          failOnStatusCode: false,
          body: inputDataElement.data,
        }).then((resp) => {
          expect(resp.status).to.equal(400)
          expect(resp.redirectedToUrl).to.equal(undefined)
          expect(resp.body.message).to.equal(inputDataElement.message)
        })
      }
    })
  })
})

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
        expect(resp.body).to.include(`Sitemap: ${CYPRESS_BASE_URL}/sitemap.xml`)
      })
    })
  })
})

describe('sitemap page', () => {
  context('page load', () => {
    it('loads the page successfully', () => {
      cy.request('/sitemap.xml').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('content', () => {
    it('includes the root page', () => {
      cy.request('/sitemap.xml').then((resp) => {
        expect(resp.body).to.include(
          `<url><loc>${CYPRESS_BASE_URL}/</loc><xhtml:link rel="alternate" hreflang="de" href="${CYPRESS_BASE_URL}/de"/><xhtml:link rel="alternate" hreflang="en" href="${CYPRESS_BASE_URL}/"/></url>`
        )
      })
    })

    it('includes the root page localized', () => {
      cy.request('/sitemap.xml').then((resp) => {
        expect(resp.body).to.include(
          `<url><loc>${CYPRESS_BASE_URL}/de</loc><xhtml:link rel="alternate" hreflang="de" href="${CYPRESS_BASE_URL}/de"/><xhtml:link rel="alternate" hreflang="en" href="${CYPRESS_BASE_URL}/"/></url>`
        )
      })
    })

    it('does not include excluded pages', () => {
      cy.request('/sitemap.xml').then((resp) => {
        expect(resp.body).to.not.include('/teapot')
      })
    })
  })
})
