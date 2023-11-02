import { test, expect } from '@playwright/test'
import { testPageLoad } from '../../utils/tests'

const PAGE_PATH = '/sitemap.xml'

testPageLoad(PAGE_PATH)

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
