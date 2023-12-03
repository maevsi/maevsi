import { expect, test } from '@playwright/test'

import { maevsiTest } from '../../../fixtures/maevsiTest'
import { PAGE_READY } from '../../../utils/constants'
import {
  testA11y,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '../../../utils/tests'

import { helpers } from '../../../../../.nuxt/typed-router/__helpers'

const PAGE_PATH = helpers.path('/').toString()

testA11y(PAGE_PATH)
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

test.describe('internationalization', () => {
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

      await defaultPage.page.getByRole('link', { name: 'Deutsch' }).click()
      await defaultPage.page.waitForURL('/de')
      expect(defaultPage.page.getByText(textGerman)).toBeDefined()

      await defaultPage.page
        .getByRole('link', {
          name: 'English',
        })
        .click()
      await defaultPage.page.waitForURL('/')
      expect(defaultPage.page.getByText(textEnglish)).toBeDefined()
    },
  )
})

// test.describe('page load', () => {
// TODO: mock graphql server
// it('sets the session cookie', () => {
//   cy.visit('/')
//   cy.getCookie('__Secure-jwt').should('exist')
// })
// })

test.describe('visual regression', () => {
  maevsiTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
