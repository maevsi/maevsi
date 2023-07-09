import { test, expect } from '@playwright/test'

import { BASE_URL } from '../../../../playwright.config'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/sitemap.xml')
    expect(resp.status()).toBe(200)
  })
})

test.describe('content', () => {
  test('includes the root page', async ({ request }) => {
    const resp = await request.get('/sitemap.xml')
    expect(await resp.text()).toContain(
      `<url><loc>${BASE_URL}/</loc><xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}/de"/><xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/"/></url>`,
    )
  })

  test('includes the root page localized', async ({ request }) => {
    const resp = await request.get('/sitemap.xml')
    expect(await resp.text()).toContain(
      `<url><loc>${BASE_URL}/de</loc><xhtml:link rel="alternate" hreflang="de" href="${BASE_URL}/de"/><xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/"/></url>`,
    )
  })

  test('does not include excluded pages', async ({ request }) => {
    const resp = await request.get('/sitemap.xml')
    expect(await resp.text()).not.toContain('/teapot')
  })
})
