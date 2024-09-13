import { test, expect } from '@playwright/test'

import type { TypedLocalePathParameter } from '#src/.nuxt/typed-router/__paths'
import { testPageLoad } from '#tests/e2e/utils/tests'

const PAGE_PATH = '/sitemap.xml' as TypedLocalePathParameter<never> // TODO: have server routes included (https://github.com/victorgarciaesgi/nuxt-typed-router/issues/110)

testPageLoad(PAGE_PATH)

test.describe('sitemap', () => {
  const languages = ['en', 'de']

  test('index', async ({ request }) => {
    const resp = await request.get('/sitemap_index.xml')
    const text = await resp.text()

    for (const language of languages) {
      expect(text).toContain(
        `http://localhost:3001/__sitemap__/${language}.xml`,
      )
    }
  })

  test('content', async ({ request }) => {
    for (const language of languages) {
      const resp = await request.get(`/__sitemap__/${language}.xml`)
      const text = await resp.text()
      expect(text.replace(/\n.+<\/lastmod>/g, '')).toMatchSnapshot(
        `sitemap-content-${language}.xml`,
      )
    }
  })
})
