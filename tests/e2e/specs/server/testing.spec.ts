import { expect } from '@playwright/test'

import { TESTING_COOKIE_NAME } from '#src/shared/utils/constants'
import { maevsiTest } from '#tests/e2e/fixtures/maevsiTest'

maevsiTest.describe('testing', () => {
  maevsiTest('cookie', async ({ defaultPage }) => {
    expect(
      (await defaultPage.page.context().cookies()).filter(
        (cookie) => cookie.name === TESTING_COOKIE_NAME,
      ).length,
    ).toBe(1)
  })
})
