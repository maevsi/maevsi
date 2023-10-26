import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

import { maevsiTest } from '../../../fixtures/maevsiTest'
import { testVisualRegression } from '../../../utils/tests'

maevsiTest.describe('a11y', () => {
  maevsiTest(
    'should not have any automatically detectable accessibility issues',
    async ({ defaultPage }) => {
      await defaultPage.goto('/')

      const accessibilityScanResults = await new AxeBuilder({
        page: defaultPage.page,
      }).analyze()

      expect(accessibilityScanResults.violations.length).toEqual(1) // TODO: get rid of all violations
    },
  )
})

test.describe('internationalization', () => {
  const textEnglish = 'Personal invitations. Proper feedback.'
  const textGerman = 'Persönliche Einladungen. Geordnetes Feedback.'

  test('displays English translations', async ({ page }) => {
    await page.goto('/')
    expect(page.getByText(textEnglish)).toBeDefined()
  })

  test('displays German translations', async ({ page }) => {
    await page.goto('/de')
    expect(page.getByText(textGerman)).toBeDefined()
  })

  test('switches between English and German translations', async ({ page }) => {
    await page.goto('/')
    expect(page.getByText(textEnglish)).toBeDefined()

    await page.getByRole('link', { name: 'German flag Deutsch' }).click()
    await page.waitForURL('/de')
    expect(page.getByText(textGerman)).toBeDefined()

    await page
      .getByRole('link', { name: 'Flagge des Vereinigten Königreichs English' })
      .click()
    await page.waitForURL('/')
    expect(page.getByText(textEnglish)).toBeDefined()
  })
})

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp.status()).toBe(200)
  })

  // TODO: mock graphql server
  // it('sets the session cookie', () => {
  //   cy.visit('/')
  //   cy.getCookie('__Secure-jwt').should('exist')
  // })
})

test.describe('visual regression', () => {
  testVisualRegression('/')

  maevsiTest('displays the cookie banner', async ({ context, defaultPage }) => {
    // TODO: only remove the cookie control cookie (https://github.com/microsoft/playwright/issues/10143)
    await context.clearCookies()

    await defaultPage.goto('/', { cookieControl: false })
    await expect(defaultPage.page).toHaveScreenshot({ fullPage: true })
  })

  test('generates the open graph image', async ({ page }) => {
    await page.goto('/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/de/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
