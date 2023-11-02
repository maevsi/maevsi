import { test, expect } from '@playwright/test'
import { TESTING_COOKIE_NAME } from '../../../../utils/constants'

test.describe('testing', () => {
  test('cookie', async ({ page }) => {
    expect(
      (await page.context().cookies()).filter(
        (cookie) => cookie.name === TESTING_COOKIE_NAME,
      ).length,
    ).toBe(1)
  })
})
