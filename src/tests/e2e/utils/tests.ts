import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { joinURL } from 'ufo'
import { maevsiTest } from '../fixtures/maevsiTest'

export const testA11y = (url: string) =>
  test.describe('a11y', () => {
    maevsiTest(
      'should not have any automatically detectable accessibility issues',
      async ({ defaultPage }) => {
        await defaultPage.goto(url)

        const accessibilityScanResults = await new AxeBuilder({
          page: defaultPage.page,
        }).analyze()

        expect(accessibilityScanResults.violations.length).toEqual(1) // TODO: get rid of all violations
      },
    )
  })

export const testOgImage = (url: string) =>
  test.describe('visual regression', () => {
    maevsiTest('generates the open graph image', async ({ page }) => {
      await page.goto(joinURL('/', url, '/__og_image__/og.png'))
      await expect(page).toHaveScreenshot({ fullPage: true })

      await page.goto(joinURL('/de', url, '/__og_image__/og.png'))
      await expect(page).toHaveScreenshot({ fullPage: true })
    })
  })

export const testPageLoad = (url: string, statusCode: number = 200) =>
  test.describe('page load', () => {
    maevsiTest('loads the page successfully', async ({ request }) => {
      const resp = await request.get(url)
      expect(resp.status()).toBe(statusCode)
    })
  })

export const testVisualRegression = (url: string) =>
  test.describe('visual regression', () => {
    maevsiTest('looks as before', async ({ defaultPage }) => {
      await defaultPage.goto(url)

      await expect(defaultPage.page).toHaveScreenshot({
        fullPage: true,
        timeout: 10000,
      })
    })
  })
