import { expect, test } from '@playwright/test'
import { pwTest } from '../fixtures/pwTest'

export const visualRegressionTest = (url: string) =>
  test.describe('visual regression', () => {
    pwTest('looks as before', async ({ defaultPage }) => {
      await defaultPage.goto(url)

      await expect(defaultPage.page).toHaveScreenshot({ fullPage: true })
    })
  })
