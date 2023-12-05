import { test, expect } from '@playwright/test'

import { testPageLoad } from '../../utils/tests'
import type { TypedLocalePathParameter } from '../../../../.nuxt/typed-router/__paths'

const PAGE_PATH = '/robots.txt' as TypedLocalePathParameter<never> // TODO: have server routes included (https://github.com/victorgarciaesgi/nuxt-typed-router/issues/110)

testPageLoad(PAGE_PATH)

test.describe('robots.txt', () => {
  test('content', async ({ request }) => {
    const resp = await request.get(PAGE_PATH)
    expect(await resp.text()).toMatchSnapshot(`robots-txt-content.txt`)
  })
})
