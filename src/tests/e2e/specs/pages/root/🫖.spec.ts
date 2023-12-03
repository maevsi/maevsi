import { testPageLoad, testVisualRegression } from '../../../utils/tests'

import { helpers } from '@typed-router'

const PAGE_PATH = helpers.route({ path: '/%F0%9F%AB%96' })

testPageLoad(PAGE_PATH, 418)
testVisualRegression(PAGE_PATH)

// test.describe('visual regression', () => {
// // TODO: enable (https://github.com/harlan-zw/nuxt-og-image/issues/81)
// test('generates the open graph image', async ({ page }) => {
//   await page.goto('/teapot/__og_image__/og.png')
//   await expect(page).toHaveScreenshot({ fullPage: true })

//   await page.goto('/de/teapot/__og_image__/og.png')
//   await expect(page).toHaveScreenshot({ fullPage: true })
// })
// })
