import { test, expect } from '@playwright/test'

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

test.describe('page load', () => {
  test('loads the page successfully', async ({ request }) => {
    const resp = await request.get('/tasks/account/sign-in')
    expect(resp.status()).toBe(200)
  })
  // TODO: add e2e tests for titles
})

// TODO: mock server
// context('functionality', () => {
//   it('errors on invalid sign-in', () => {
//     cy.intercept(
//       'POST',
//       `https://postgraphile.${VIO_STAGING_HOST || 'localhost:3000'}/graphql`,
//       (req) => {
//         if (hasOperationName(req, 'authenticate')) {
//           req.alias = 'authenticate'
//           req.reply({ fixture: 'pages/taskAccountSignIn.json' })
//         }
//       }
//     )

//     cy.get('input[id=input-username]').type('username-that-does-not-exist')
//     cy.get('input[id=input-password]').type(`password{enter}`)

//     // TODO: button click
//     // cy.get('button[type="submit"]').click()

//     cy.wait('@authenticate')
//       .its('response')
//       .should((res) => {
//         if (!res) return
//         expect(res.body.data.authenticate).to.equal(null)
//         expect(res.body.errors.length).to.equal(1)
//       })

//     cy.contains('Account not found!')
//   })
// })

test.describe('visual regression', () => {
  test('looks as before', async ({ page }) => {
    await page.goto('/tasks/account/sign-in')
    await PAGE_READY({ page })
    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
