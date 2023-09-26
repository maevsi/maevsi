import { test, expect } from '@playwright/test'

import { TIMEZONE_COOKIE_NAME } from '../../../../../utils/constants'
import {
  COOKIE_CONTROL_DEFAULT,
  PAGE_READY,
  TIMEZONE_DEFAULT,
} from '../../../utils/constants'

const PAGE_PATH = '/🫖'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: TIMEZONE_COOKIE_NAME,
      value: TIMEZONE_DEFAULT,
      domain: 'localhost',
      path: '/',
    },
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_DEFAULT,
      domain: 'localhost',
      path: '/',
    },
  ])
})

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get(PAGE_PATH)
    expect(resp.status()).toBe(418)
  })
})

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto(PAGE_PATH)
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  // // TODO: enable (https://github.com/harlan-zw/nuxt-og-image/issues/81)
  // test('generates the open graph image', async ({ page }) => {
  //   await page.goto('/teapot/__og_image__/og.png')
  //   await expect(page).toHaveScreenshot({ fullPage: true })

  //   await page.goto('/de/teapot/__og_image__/og.png')
  //   await expect(page).toHaveScreenshot({ fullPage: true })
  // })
})
