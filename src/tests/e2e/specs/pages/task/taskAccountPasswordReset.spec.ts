import { test, expect } from '@playwright/test'

import { TIMEZONE_COOKIE_NAME } from '../../../../../utils/constants'
import {
  COOKIE_CONTROL_DEFAULT,
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

// TODO: mock data
// context('page load', () => {
// it('loads the page successfully if reset code is valid', () => {
//   cy.request({
//     url: '/task/account/password/reset?code=valid',
//     followRedirect: false,
//   }).then((resp) => {
//     expect(resp.status).to.equal(200)
//     expect(resp.redirectedToUrl).to.equal(undefined)
//   })
// })
// })

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/task/account/password/reset')
    await expect(page.getByTestId('is-loading')).toHaveAttribute(
      'data-is-loading',
      'false',
    )
    await page.getByRole('button', { name: 'Cookie control' }).isVisible()
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
