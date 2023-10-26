import { expect, test } from '@playwright/test'
import { maevsiTest } from '../fixtures/maevsiTest'

export const testVisualRegression = (url: string) =>
  test.describe('visual regression', () => {
    maevsiTest('looks as before', async ({ defaultPage }) => {
      await defaultPage.goto(url)

      await expect(defaultPage.page).toHaveScreenshot({ fullPage: true })
    })
  })
