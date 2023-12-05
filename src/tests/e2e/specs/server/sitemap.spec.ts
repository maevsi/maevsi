import { test, expect } from '@playwright/test'

import { testPageLoad } from '../../utils/tests'
import type { TypedLocalePathParameter } from '../../../../.nuxt/typed-router/__paths'

const PAGE_PATH = '/sitemap.xml' as TypedLocalePathParameter<never> // TODO: have server routes included (https://github.com/victorgarciaesgi/nuxt-typed-router/issues/110)

testPageLoad(PAGE_PATH)

test.describe('sitemap', () => {
  test('index', async ({ request }) => {
    const resp = await request.get('/sitemap_index.xml')
    const text = await resp.text()

    for (const lang of ['en', 'de']) {
      expect(text).toContain(`http://localhost:3001/${lang}-sitemap.xml`)
    }
  })

  test('content', async ({ request }) => {
    for (const lang of ['en', 'de']) {
      const resp = await request.get(`/${lang}-sitemap.xml`)
      const text = await resp.text()
      expect(text.replace(/\n.+<\/lastmod>/g, '')).toMatchSnapshot(
        `sitemap-content-${lang}.xml`,
      )
    }
  })
})
