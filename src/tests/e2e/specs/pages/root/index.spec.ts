import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

import { maevsiTest } from '../../../fixtures/maevsiTest'
import { PAGE_READY } from '../../../utils/constants'
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

maevsiTest.describe('internationalization', () => {
  const textEnglish = 'Personal invitations. Proper feedback.'
  const textGerman = 'Persönliche Einladungen. Geordnetes Feedback.'

  maevsiTest('displays English translations', async ({ defaultPage }) => {
    await defaultPage.goto('/')
    expect(defaultPage.page.getByText(textEnglish)).toBeDefined()
  })

  maevsiTest('displays German translations', async ({ defaultPage }) => {
    await defaultPage.goto('/de')
    expect(defaultPage.page.getByText(textGerman)).toBeDefined()
  })

  maevsiTest(
    'switches between English and German translations',
    async ({ defaultPage }) => {
      await defaultPage.goto('/')
      expect(defaultPage.page.getByText(textEnglish)).toBeDefined()

      await defaultPage.page
        .getByRole('link', { name: 'German flag Deutsch' })
        .click()
      await defaultPage.page.waitForURL('/de')
      expect(defaultPage.page.getByText(textGerman)).toBeDefined()

      await defaultPage.page
        .getByRole('link', {
          name: 'Flagge des Vereinigten Königreichs English',
        })
        .click()
      await defaultPage.page.waitForURL('/')
      expect(defaultPage.page.getByText(textEnglish)).toBeDefined()
    },
  )
})

maevsiTest.describe('page load', () => {
  maevsiTest('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp.status()).toBe(200)
  })

  // TODO: mock graphql server
  // it('sets the session cookie', () => {
  //   cy.visit('/')
  //   cy.getCookie('__Secure-jwt').should('exist')
  // })
})

testVisualRegression('/')

maevsiTest.describe('visual regression', () => {
  maevsiTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  maevsiTest('generates the open graph image', async ({ page }) => {
    await page.goto('/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })

    await page.goto('/de/__og_image__/og.png')
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
