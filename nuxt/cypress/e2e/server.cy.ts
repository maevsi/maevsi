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

describe('headers middleware', () => {
  context('definition', () => {
    it('sets the correct CSP header', () => {
      cy.request({
        url: '/',
      }).then((resp) => {
        expect(resp.headers['content-security-policy']).to.equal(
          Cypress.env('NODE_ENV') === 'production'
            ? "connect-src 'self' blob: https://localhost:3000 https://postgraphile.localhost:3000 https://tusd.localhost:3000 https://*.google-analytics.com https://*.analytics.google.com https://localhost:3000/cdn-cgi/rum;base-uri 'none';default-src 'none';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self' blob: data: https://tusd.localhost:3000 https://*.google-analytics.com https://www.gravatar.com/avatar/;manifest-src 'self';media-src 'none';object-src 'none';prefetch-src 'self';report-uri https://dargmuesli.report-uri.com/r/d/csp/enforce;script-src blob: 'self' https://static.cloudflareinsights.com https://*.google-analytics.com https://www.googletagmanager.com/gtag/js 'unsafe-inline' 'unsafe-eval';style-src 'self' 'unsafe-inline';"
            : "connect-src 'self' blob: https://maev.si https://postgraphile.maev.si https://tusd.maev.si https://*.google-analytics.com https://*.analytics.google.com http://localhost:24678/_nuxt/ https://localhost:24678/_nuxt/ ws://localhost:24678/_nuxt/ wss://localhost:24678/_nuxt/;base-uri 'none';default-src 'none';font-src 'self';form-action 'self';frame-ancestors 'none';frame-src 'none';img-src 'self' blob: data: https://tusd.maev.si https://*.google-analytics.com https://www.gravatar.com/avatar/;manifest-src 'self';media-src 'none';object-src 'none';prefetch-src 'self';report-uri https://dargmuesli.report-uri.com/r/d/csp/enforce;script-src blob: 'self' https://static.cloudflareinsights.com https://*.google-analytics.com https://www.googletagmanager.com/gtag/js 'unsafe-inline' 'unsafe-eval';style-src 'self' 'unsafe-inline';"
        )
      })
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
