import { test, expect } from '@playwright/test'

import AxeBuilder from '@axe-core/playwright'

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

test.describe('a11y', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/')
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations.length).toEqual(
      process.env.NODE_ENV !== 'production' ? 2 : 1,
    ) // TODO: get rid of all violations
  })
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
  test('looks as before', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('displays the cookie banner', async ({ context, page }) => {
    // TODO: only remove the cookie control cookie (https://github.com/microsoft/playwright/issues/10143)
    await context.clearCookies()

    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
