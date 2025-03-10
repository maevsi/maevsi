import { expect } from '@playwright/test'

import { appTest } from '#tests/e2e/fixtures/appTest'
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

appTest.describe('page', () => {
  appTest('metadata', async ({ page }) => {
    await testMetadata({ page, path: '/', title: 'Vibetype' })
  })
})

appTest.describe('internationalization', () => {
  const textEnglish = 'Personal invitations. Proper feedback.'
  const textGerman = 'Persönliche Einladungen. Geordnetes Feedback.'

  appTest('displays English translations', async ({ defaultPage }) => {
    await defaultPage.goto('/')
    expect(defaultPage.page.getByText(textEnglish)).toBeDefined()
  })

  appTest('displays German translations', async ({ defaultPage }) => {
    await defaultPage.goto('/de')
    expect(defaultPage.page.getByText(textGerman)).toBeDefined()
  })

  // appTest(
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

appTest.describe('visual regression', () => {
  appTest('displays the cookie banner', async ({ page }) => {
    await page.goto('/')
    await PAGE_READY({ page, options: { cookieControl: false } })
    await expect(page).toHaveScreenshot({ fullPage: true, timeout: 10000 })
  })
})
