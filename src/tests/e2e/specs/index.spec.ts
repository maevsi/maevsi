import { test, expect } from '@playwright/test'

// TODO: wait for current playwright compatibility (https://github.com/dequelabs/axe-core-npm/pull/731)
// import AxeBuilder from '@axe-core/playwright'

import { TIMEZONE_COOKIE_NAME } from '../../utils/constants'
import { COOKIE_CONTROL_DEFAULT, TIMEZONE_DEFAULT } from './utils/constants'

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: TIMEZONE_COOKIE_NAME,
      value: TIMEZONE_DEFAULT,
      domain: '127.0.0.1',
      path: '/',
    },
    {
      name: 'ncc_c',
      value: COOKIE_CONTROL_DEFAULT,
      domain: '127.0.0.1',
      path: '/',
    },
  ])
})

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/')
    expect(resp).toBeOK()
  })

  // TODO: mock graphql server
  // it('sets the session cookie', () => {
  //   cy.visit('/')
  //   cy.getCookie('__Secure-jwt').should('exist')
  // })
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

// test.describe('a11y', () => {
//   test('should not have any automatically detectable accessibility issues', async ({
//     page,
//   }) => {
//     await page.goto('/')
//     const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
//     expect(accessibilityScanResults.violations).toEqual([])
//   })
// })

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false'
    )
    await page.getByRole('button', { name: 'Cookie control' }).isVisible()
    await expect(page).toHaveScreenshot({ fullPage: true })
  })

  test('displays the cookie banner', async ({ context, page }) => {
    // TODO: only remove the cookie control cookie (https://github.com/microsoft/playwright/issues/10143)
    await context.clearCookies()

    await page.goto('/')
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false'
    )
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
