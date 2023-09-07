import { test, expect } from '@playwright/test'

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/sitemap.xml')
    expect(resp.status()).toBe(200)
  })
})

test.describe('sitemap', () => {
  test('index', async ({ request }) => {
    const resp = await request.get('/sitemap_index.xml')
    const text = await resp.text()

    for (const lang of ['en', 'de']) {
      expect(text).toContain(
        `http://localhost:${
          process.env.NODE_ENV === 'production' ? '3001' : '3000'
        }/${lang}-sitemap.xml`,
      )
    }
  })

  test('content', async ({ request }) => {
    for (const lang of ['en', 'de']) {
      const resp = await request.get(`/${lang}-sitemap.xml`)
      const text = await resp.text()
      expect(text.replace(/\n.+<\/lastmod>/g, '')).toMatchSnapshot(
        `sitemap-content-${lang}-${
          process.env.NODE_ENV === 'production' ? 'production' : 'development'
        }.txt`,
      )
    }
  })
})
