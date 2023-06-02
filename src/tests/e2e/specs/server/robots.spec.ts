import { test, expect } from '@playwright/test'

import { BASE_URL } from '../../../../playwright.config'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/robots.txt')
    expect(resp.status()).toBe(200)
  })
})

test.describe('content', () => {
  test('links the sitemap', async ({ request }) => {
    const resp = await request.get('/robots.txt')
    expect(await resp.text()).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`)
  })
})
