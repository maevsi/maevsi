import { test, expect } from '@playwright/test'

import { TIMEZONE_COOKIE_NAME } from '../../../../../utils/constants'
import {
  COOKIE_CONTROL_CONSENT_COOKIE_DEFAUL_VALUE,
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
      value: COOKIE_CONTROL_CONSENT_COOKIE_DEFAUL_VALUE,
      domain: 'localhost',
      path: '/',
    },
  ])
})

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/tasks/events/create')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
