import { expect, test } from '@playwright/test'
import { TESTING_COOKIE_NAME } from '../../../../utils/constants'
import { maevsiTest } from '../../fixtures/maevsiTest'

test.describe('testing', () => {
  maevsiTest('cookie', async ({ defaultPage }) => {
    expect(
      (await defaultPage.page.context().cookies()).filter(
        (cookie) => cookie.name === TESTING_COOKIE_NAME,
      ).length,
    ).toBe(1)
  })
})
