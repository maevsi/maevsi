import { test, expect } from '@playwright/test'

import { TIMEZONE_COOKIE_NAME } from '../../../../../utils/constants'
import {
  COOKIE_CONTROL_DEFAULT,
  PAGE_READY,
  TIMEZONE_DEFAULT,
} from '../../../utils/constants'

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
    const resp = await request.get('/privacy-policy')
    expect(resp.status()).toBe(200)
  })
})

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/privacy-policy')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('generates the open graph image', async ({ page }) => {
    await page.goto('/privacy-policy/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/de/privacy-policy/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
