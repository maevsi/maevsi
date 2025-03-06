import { expect } from '@playwright/test'

import { maevsiTest } from '#tests/e2e/fixtures/maevsiTest'
import { PAGE_READY } from '#tests/e2e/utils/constants'
import {
  testA11y,
  testMetadata,
  testOgImage,
  testPageLoad,
  testVisualRegression,
} from '#tests/e2e/utils/tests'

const PAGE_PATH = '/'

testA11y(PAGE_PATH)
testOgImage(PAGE_PATH)
testPageLoad(PAGE_PATH)
testVisualRegression(PAGE_PATH)

maevsiTest.describe('page', () => {
  maevsiTest('metadata', async ({ page }) => {
    await testMetadata({ page, path: '/', title: 'maevsi' })
  })
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

  // maevsiTest(
  //   'switches between English and German translations',
  //   async ({ defaultPage }) => {
  //     await defaultPage.goto('/')
  //     expect(defaultPage.page.getByText(textEnglish)).toBeDefined()

  //     await defaultPage.page.getByRole('link', { name: 'Deutsch' }).click()
  //     await defaultPage.page.waitForURL('/de')
  //     expect(defaultPage.page.getByText(textGerman)).toBeDefined()

  //     await defaultPage.page
  //       .getByRole('link', {
  //         name: 'English',
  //       })
  //       .click()
  //     await defaultPage.page.waitForURL('/')
  //     expect(defaultPage.page.getByText(textEnglish)).toBeDefined()
  //   },
  // )
})

// test.describe('page load', () => {
// TODO: mock graphql server
// it('sets the session cookie', () => {
//   cy.visit('/')
//   cy.getCookie('__Secure-jwt').should('exist')
// })
// })

maevsiTest.describe('visual regression', () => {
  maevsiTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
